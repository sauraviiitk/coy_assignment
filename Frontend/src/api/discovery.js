const defaultApiBaseUrl = import.meta.env.DEV
  ? '/api'
  : 'https://coy-assignment.onrender.com';
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl).replace(/\/+$/, '');

async function request(path, options) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error(`The API returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(body.error || `Request failed (${response.status})`);
  }

  return body;
}

export function getFeed() {
  return request('/feed');
}

export function getMatches() {
  return request('/matches');
}

export function recordSwipe(profileId, action) {
  return request('/swipe', {
    method: 'POST',
    body: JSON.stringify({ profileId, action })
  });
}
