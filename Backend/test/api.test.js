const assert = require('node:assert/strict');
const { once } = require('node:events');
const test = require('node:test');
const { createApp } = require('../server');
const { readSeedProfiles } = require('../database');

const currentUserId = 'kabir';
const profiles = [
  { id: currentUserId, name: 'Kabir', photos: [], interests: [] },
  { id: 'meera', name: 'Meera', photos: ['meera.jpg'], interests: [] },
  { id: 'ananya', name: 'Ananya', photos: ['ananya.jpg'], interests: [] }
];

test('seed data contains at least 30 profiles and includes the configured demo user', () => {
  const seedProfiles = readSeedProfiles();
  const ids = new Set(seedProfiles.map((profile) => profile.id));

  assert.ok(seedProfiles.length >= 30);
  assert.ok(ids.has(currentUserId));
  assert.ok(seedProfiles.every((profile) =>
    profile.name &&
    Number.isInteger(profile.age) &&
    profile.photos.length > 0 &&
    profile.bio &&
    profile.location &&
    profile.interests.length > 0
  ));
});

function createTestPool(initialSwipes = []) {
  const swipes = new Map(initialSwipes.map(({ swiperId, targetId, action }) => [
    `${swiperId}:${targetId}`,
    action
  ]));
  const profileById = new Map(profiles.map((profile) => [profile.id, profile]));

  return {
    async query(sql, params = []) {
      if (sql.includes('NOT EXISTS')) {
        const feed = profiles.filter((profile) =>
          profile.id !== params[0] && !swipes.has(`${params[0]}:${profile.id}`)
        );
        return { rows: feed.map((data) => ({ data })) };
      }

      if (sql.includes('SELECT id FROM profiles')) {
        const rows = profileById.has(params[0]) ? [{ id: params[0] }] : [];
        return { rows, rowCount: rows.length };
      }

      if (sql.includes('INSERT INTO swipes')) {
        const [swiperId, targetId, action] = params;
        const key = `${swiperId}:${targetId}`;
        if (swipes.has(key)) return { rows: [], rowCount: 0 };
        swipes.set(key, action);
        return { rows: [{ target_id: targetId }], rowCount: 1 };
      }

      if (sql.includes('JOIN swipes incoming')) {
        const [targetId, profileId] = params;
        const isMutual = swipes.get(`${profileId}:${targetId}`) === 'like';
        return { rows: isMutual ? [{ data: profileById.get(profileId) }] : [] };
      }

      if (sql.includes('FROM swipes mine')) {
        const matches = [];
        for (const profile of profiles) {
          if (
            swipes.get(`${params[0]}:${profile.id}`) === 'like' &&
            swipes.get(`${profile.id}:${params[0]}`) === 'like'
          ) {
            matches.push({ data: profile });
          }
        }
        return { rows: matches };
      }

      throw new Error(`Unexpected query in test: ${sql}`);
    }
  };
}

async function withServer(pool, callback) {
  const server = createApp(pool, currentUserId).listen(0);
  await once(server, 'listening');
  const { port } = server.address();

  try {
    await callback(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
}

test('feed omits swiped profiles and does not expose incoming likes', async () => {
  const pool = createTestPool([
    { swiperId: 'ananya', targetId: currentUserId, action: 'like' },
    { swiperId: currentUserId, targetId: 'meera', action: 'pass' }
  ]);

  await withServer(pool, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/feed`);
    const feed = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(feed.map((profile) => profile.id), ['ananya']);
    assert.equal(Object.hasOwn(feed[0], 'likedCurrentUser'), false);
  });
});

test('CORS preflight allows the deployed Vercel frontend', async () => {
  const origin = 'https://coy-assignment-ten.vercel.app';

  await withServer(createTestPool(), async (baseUrl) => {
    const response = await fetch(`${baseUrl}/feed`, {
      method: 'OPTIONS',
      headers: {
        Origin: origin,
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'content-type'
      }
    });

    assert.equal(response.status, 204);
    assert.equal(response.headers.get('access-control-allow-origin'), origin);
  });
});

test('a like only creates and lists a match when the other profile liked back', async () => {
  const pool = createTestPool([
    { swiperId: 'meera', targetId: currentUserId, action: 'like' }
  ]);

  await withServer(pool, async (baseUrl) => {
    const swipeResponse = await fetch(`${baseUrl}/swipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId: 'meera', action: 'like' })
    });
    const swipe = await swipeResponse.json();
    assert.equal(swipe.matchCreated, true);
    assert.equal(swipe.match.id, 'meera');

    const matchesResponse = await fetch(`${baseUrl}/matches`);
    const matches = await matchesResponse.json();
    assert.deepEqual(matches.map((profile) => profile.id), ['meera']);
  });
});

test('a pass never matches and a profile cannot be swiped on twice', async () => {
  const pool = createTestPool([
    { swiperId: 'meera', targetId: currentUserId, action: 'like' }
  ]);

  await withServer(pool, async (baseUrl) => {
    const firstResponse = await fetch(`${baseUrl}/swipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId: 'meera', action: 'pass' })
    });
    const firstSwipe = await firstResponse.json();
    assert.equal(firstSwipe.matchCreated, false);

    const duplicateResponse = await fetch(`${baseUrl}/swipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId: 'meera', action: 'like' })
    });
    assert.equal(duplicateResponse.status, 409);

    const matchesResponse = await fetch(`${baseUrl}/matches`);
    assert.deepEqual(await matchesResponse.json(), []);
  });
});
