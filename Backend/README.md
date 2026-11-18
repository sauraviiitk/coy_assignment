# Coy Discover

A mobile-first swipe discovery feature with a React/Vite frontend and an Express API backed by PostgreSQL. The Home tab is intentionally blank; profile discovery and matches are in the Discover tab.

## Features

- One profile at a time, with swipe gestures and Like/Pass buttons.
- Profiles already swiped on are excluded from future feeds.
- Likes are matched only when both users like each other.
- A Matches view lists mutual matches only.
- Profiles and swipes are stored in PostgreSQL and persist across reloads.
- A demo seed includes 35 profiles and incoming likes so a mutual match can be demonstrated.

There is no authentication. `CURRENT_USER_ID` identifies the single demo user.

## Tech stack

- Frontend: React 18, Vite, Tailwind CSS.
- Backend: Node.js, Express, `pg`.
- Database: PostgreSQL.

## Requirements

- Node.js 20 or newer.
- A PostgreSQL database and its connection URI.

## Setup

### 1. Configure PostgreSQL

Create a database, then configure `Backend/.env` with its connection string. If you do not already have a private `.env`, copy the example:

```powershell
Copy-Item Backend\.env.example Backend\.env
```

Set `DATABASE_URL` to the connection URI supplied by your PostgreSQL provider. The general format is:

```text
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Use the SSL options required by your provider, and URL-encode special characters in the username or password. Keep `.env` private; never commit or share it.

Available variables:

| Variable | Required | Default | Description |
|---|---:|---|---|
| `DATABASE_URL` | Yes | - | PostgreSQL connection URI. |
| `PORT` | No | `4000` | Express API port. |
| `CURRENT_USER_ID` | No | `kabir` | ID of the logged-in demo profile. Must exist in `Data/profile.json`. |
| `FRONTEND_ORIGIN` | No | `http://localhost:3000` | Browser origin allowed by the API's CORS configuration. |
| `SEED_LIKER_IDS` | No | Demo defaults | Comma-separated profile IDs to seed as having liked the demo user. Each ID must exist in `Data/profile.json` and must not equal `CURRENT_USER_ID`. |

### 2. Install and start the backend

From the repository root:

```powershell
cd Backend
npm ci
npm run dev
```

For a non-watch run, use `npm start`. The API listens on `http://localhost:4000` by default.

On startup, the backend creates the `profiles` and `swipes` tables if needed, imports or updates profile data from `Backend/Data/profile.json`, and inserts the demo incoming likes. Startup is repeatable and does not erase existing swipes.

### 3. Install and start the frontend

In a second terminal:

```powershell
cd Frontend
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Vite proxies frontend requests from `/api/*` to the backend and removes the `/api` prefix. For example, the frontend request `/api/feed` is sent to the backend's `/feed`.

## API

The backend endpoints are available directly on port 4000.

### `GET /health`

Returns an API health response:

```json
{ "status": "ok" }
```

### `GET /feed`

Returns a JSON array of profiles the configured user has not swiped on. The logged-in user's own profile is excluded. Each profile includes its seeded profile fields, such as `id`, `name`, `age`, `photos`, `bio`, `location`, and `interests`.

```bash
curl http://localhost:4000/feed
```

The number of profiles in the feed decreases as the user swipes. Refreshing or reloading does not reset saved swipes.

### `POST /swipe`

Records one like or pass. A profile can only be swiped on once by the configured user.

Request:

```json
{ "profileId": "meera", "action": "like" }
```

`action` must be `like` or `pass`. A successful request returns `201`:

```json
{
  "profileId": "meera",
  "action": "like",
  "matchCreated": true,
  "match": {
    "id": "meera",
    "name": "Meera"
  }
}
```

If there is no reciprocal like, `matchCreated` is `false` and `match` is `null`. The matched profile is returned only when both likes exist.

```bash
curl -X POST http://localhost:4000/swipe `
  -H "Content-Type: application/json" `
  -d '{ "profileId": "meera", "action": "like" }'
```

### `GET /matches`

Returns a JSON array containing only mutual matches. Incoming likes that are not mutual are never listed or marked in feed responses.

```bash
curl http://localhost:4000/matches
```

### Error responses

| Status | Meaning |
|---:|---|
| `400` | Missing or invalid profile ID/action, or attempting to swipe on the current user's own profile. |
| `404` | Unknown endpoint or profile ID. |
| `409` | The current user has already swiped on that profile. |
| `500` | Unexpected server or database error. |

## Data and privacy behavior

- Seed profiles are read from `Backend/Data/profile.json`; the seed currently contains at least 30 profiles.
- `profiles` stores profile JSON and feed order.
- `swipes` stores the swiper, target, action, and timestamp. A unique key prevents duplicate swipes.
- `GET /feed` excludes profiles with an existing swipe from the current user.
- `GET /matches` and the match response from `POST /swipe` require a reciprocal like.
- There is no endpoint for listing incoming likes. Do not add a `likedYou` field or equivalent to feed responses.
- Demo liker configuration is mock data. Do not use real identities or secrets in public seed files.

## Tests and production build

Backend API behavior tests use a test pool and do not require a live PostgreSQL connection:

```powershell
cd Backend
npm test
```

Build the frontend for production:

```powershell
cd Frontend
npm run build
```

The production frontend expects `/api` to be routed to the Express API by the hosting platform or reverse proxy. The Vite proxy is for local development.

## Troubleshooting

- **`DATABASE_URL is required`**: create `Backend/.env` and set `DATABASE_URL`.
- **Database connection error**: verify the connection URI, database availability, network access, and any provider-specific SSL requirement.
- **Frontend cannot reach the API**: start the backend on port 4000 and use the Vite development URL on port 3000.
- **The feed has fewer profiles after testing**: this is expected because previously swiped profiles stay excluded. The refresh button reloads the feed; it does not clear database history.
- **A demo user ID error occurs at startup**: set `CURRENT_USER_ID` to an ID present in `Data/profile.json`.
