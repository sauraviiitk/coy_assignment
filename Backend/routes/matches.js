const express = require('express');

module.exports = (pool, currentUserId) => {
  const router = express.Router();

  router.get('/', async (_req, res, next) => {
    try {
      const { rows } = await pool.query(
        `SELECT p.data
         FROM swipes mine
         JOIN swipes theirs
           ON theirs.swiper_id = mine.target_id
          AND theirs.target_id = mine.swiper_id
          AND theirs.action = 'like'
         JOIN profiles p ON p.id = mine.target_id
         WHERE mine.swiper_id = $1
           AND mine.action = 'like'
         ORDER BY mine.created_at DESC`,
        [currentUserId]
      );

      res.json(rows.map((row) => row.data));
    } catch (error) {
      next(error);
    }
  });

  return router;
};