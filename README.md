# Coy Discover

Coy Discover is a mobile-first profile discovery app built around a swipe-and-match experience. Browse one profile at a time, view profile details, and see a match when two people have liked each other.

> **Video demonstration:** [  video link .](https://drive.google.com/file/d/1E6F56WZEejZucgbahPT1R11yNwo0mpTV/view?usp=sharing)

## Features

- Browse a seeded set of profiles and like or pass.
- Open profile details and browse profile photos.
- Save swipes in PostgreSQL so they persist between visits.
- Show matches only when both profiles have liked each other.
- Use the Matches screen to view mutual matches.
- Adjust discovery preferences with the filter interface.

## Tech stack

- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL

## Project structure

```text
Backend/
  Data/              Seed profile data
  routes/            Feed, swipe, and match API routes
  database.js        PostgreSQL schema setup and seeding
  server.js          Express app and server startup
  test/              API behavior tests
Frontend/
  src/
    api/             Backend API client
    components/      Discovery, profile, and match screens
    App.jsx          Main application flow
```

## Requirements

- Node.js 20 or newer
- A PostgreSQL database

## Run locally

### 1. Configure the backend

From the repository root, copy the example environment file:

```powershell
Copy-Item Backend\.env.example Backend\.env
```

Edit `Backend\.env` and set `DATABASE_URL` to your PostgreSQL connection string. Keep this file private; it is ignored by Git.

The backend also supports `PORT` (defaults to `4000`), `CURRENT_USER_ID` (defaults to `kabir`), and `FRONTEND_ORIGINS` for configuring allowed frontend origins. See `Backend/.env.example` for the full list.

### 2. Start the backend

In a terminal at the repository root:

```powershell
cd Backend
npm ci
npm run dev
```

The API starts at `http://localhost:4000`. On startup, it initializes the database and loads the demo profiles from `Backend/Data/profile.json`.

### 3. Start the frontend

In a second terminal at the repository root:

```powershell
cd Frontend
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). During development, Vite proxies `/api` requests to the backend on port `4000`.

## Tests and production build

Run the backend API tests:

```powershell
cd Backend
npm test
```

Build the frontend:

```powershell
cd Frontend
npm run build
```

## API overview

The backend exposes these endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Check API health |
| `GET` | `/feed` | Get profiles not yet swiped on |
| `POST` | `/swipe` | Save a like or pass and report a mutual match |
| `GET` | `/matches` | Get mutual matches |

The app is a demo and does not include authentication. `CURRENT_USER_ID` selects the demo profile used by the API.
