const express = require('express');

module.exports = (pool, currentUserId) => {
  const router = express.Router();

  router.get('/', async (_req, res, next) => {
    try {
      const { rows } = await pool.query(
        `SELECT p.data
         FROM profiles p
         WHERE p.id <> $1
           AND NOT EXISTS (
             SELECT 1
             FROM swipes s
             WHERE s.swiper_id = $1 AND s.target_id = p.id
           )
         ORDER BY p.sort_order ASC`,
        [currentUserId]
      );

      res.json(rows.map((row) => row.data));
    } catch (error) {
      next(error);
    }
  });

  return router;
};