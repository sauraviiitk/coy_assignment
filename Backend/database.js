const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_LIKERS = ['meera', 'ananya', 'kavya'];

function readSeedProfiles() {
  const profilePath = path.join(__dirname, 'Data', 'profile.json');
  const profiles = JSON.parse(fs.readFileSync(profilePath, 'utf8'));

  if (!Array.isArray(profiles) || profiles.length < 30) {
    throw new Error('Data/profile.json must contain at least 30 profiles');
  }

  const ids = new Set();
  for (const profile of profiles) {
    if (
      !profile.id ||
      !profile.name ||
      !Number.isInteger(profile.age) ||
      typeof profile.bio !== 'string' ||
      typeof profile.location !== 'string' ||
      !Array.isArray(profile.photos) ||
      profile.photos.length === 0 ||
      !profile.photos.every((photo) => typeof photo === 'string' && photo.length > 0) ||
      !Array.isArray(profile.interests) ||
      profile.interests.length === 0
    ) {
      throw new Error('Every seed profile must include name, age, photo, bio, location, and interests');
    }
    if (ids.has(profile.id)) {
      throw new Error(`Duplicate profile id in Data/profile.json: ${profile.id}`);
    }
    ids.add(profile.id);
  }

  return profiles;
}

async function initializeDatabase(pool, profiles, currentUserId) {
  const userIds = new Set(profiles.map((profile) => profile.id));
  if (!userIds.has(currentUserId)) {
    throw new Error(`CURRENT_USER_ID "${currentUserId}" must match a profile in Data/profile.json`);
  }

  const configuredLikers = process.env.SEED_LIKER_IDS
    ? process.env.SEED_LIKER_IDS.split(',').map((id) => id.trim()).filter(Boolean)
    : DEFAULT_LIKERS;
  const unknownLikers = configuredLikers.filter((id) => !userIds.has(id) || id === currentUserId);
  if (unknownLikers.length > 0) {
    throw new Error(`SEED_LIKER_IDS contains unknown or invalid profiles: ${unknownLikers.join(', ')}`);
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL,
      data JSONB NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS swipes (
      swiper_id TEXT NOT NULL,
      target_id TEXT NOT NULL,
      action TEXT NOT NULL CHECK (action IN ('like', 'pass')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (swiper_id, target_id),
      CHECK (swiper_id <> target_id)
    )
  `);
  await pool.query('CREATE INDEX IF NOT EXISTS swipes_target_idx ON swipes (target_id)');

  for (const [sortOrder, profile] of profiles.entries()) {
    await pool.query(
      `INSERT INTO profiles (id, sort_order, data)
       VALUES ($1, $2, $3::jsonb)
       ON CONFLICT (id) DO UPDATE
       SET sort_order = EXCLUDED.sort_order, data = EXCLUDED.data`,
      [profile.id, sortOrder, JSON.stringify(profile)]
    );
  }

  for (const likerId of configuredLikers) {
    await pool.query(
      `INSERT INTO swipes (swiper_id, target_id, action)
       VALUES ($1, $2, 'like')
       ON CONFLICT (swiper_id, target_id) DO NOTHING`,
      [likerId, currentUserId]
    );
  }
}

module.exports = { initializeDatabase, readSeedProfiles };
