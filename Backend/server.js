const path = require('node:path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const feedRoutes = require('./routes/feed');
const swipeRoutes = require('./routes/swipe');
const matchRoutes = require('./routes/matches');
const { initializeDatabase, readSeedProfiles } = require('./database');

dotenv.config({ path: path.join(__dirname, '.env') });

const CURRENT_USER_ID = process.env.CURRENT_USER_ID || 'kabir';

function createApp(pool, currentUserId = CURRENT_USER_ID) {
  const app = express();
  const allowedOrigins = new Set([
    'http://localhost:3000',
    'https://coy-assignment-ten.vercel.app',
    ...(process.env.FRONTEND_ORIGIN || '').split(','),
    ...(process.env.FRONTEND_ORIGINS || '').split(',')
  ].map((origin) => origin.trim()).filter(Boolean));

  app.use(cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.has(origin));
    }
  }));
  app.use(express.json({ limit: '16kb' }));

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/feed', feedRoutes(pool, currentUserId));
  app.use('/swipe', swipeRoutes(pool, currentUserId));
  app.use('/matches', matchRoutes(pool, currentUserId));

  app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  app.use((error, _req, res, _next) => {
    console.error('Request failed:', error);
    res.status(500).json({ error: 'An unexpected server error occurred' });
  });

  return app;
}

async function startServer() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is required. Copy .env.example to .env and configure PostgreSQL.');
  }

  const pool = new Pool({ connectionString });
  pool.on('error', (error) => console.error('Unexpected PostgreSQL pool error:', error));

  try {
    const seedProfiles = readSeedProfiles();
    await initializeDatabase(pool, seedProfiles, CURRENT_USER_ID);

    const port = Number(process.env.PORT || 4000);
    const app = createApp(pool, CURRENT_USER_ID);
    const server = app.listen(port, () => {
      console.log(`Coy API listening on http://localhost:${port}`);
    });

    const shutdown = () => {
      server.close(() => {
        pool.end().then(() => process.exit(0)).catch((error) => {
          console.error('Failed to close PostgreSQL pool:', error);
          process.exit(1);
        });
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    await pool.end();
    throw error;
  }
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Unable to start Coy API:', error.message);
    process.exitCode = 1;
  });
}

module.exports = { createApp, startServer };