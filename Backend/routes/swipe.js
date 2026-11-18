const express = require('express');

module.exports = (pool, currentUserId) => {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    const { profileId, action } = req.body || {};
    if (typeof profileId !== 'string' || !profileId.trim()) {
      return res.status(400).json({ error: 'profileId is required' });
    }
    if (action !== 'like' && action !== 'pass') {
      return res.status(400).json({ error: 'action must be "like" or "pass"' });
    }
    if (profileId === currentUserId) {
      return res.status(400).json({ error: 'You cannot swipe on your own profile' });
    }

    try {
      const profileResult = await pool.query(
        'SELECT id FROM profiles WHERE id = $1',
        [profileId]
      );
      if (profileResult.rowCount === 0) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      const swipeResult = await pool.query(
        `INSERT INTO swipes (swiper_id, target_id, action)
         VALUES ($1, $2, $3)
         ON CONFLICT (swiper_id, target_id) DO NOTHING
         RETURNING target_id`,
        [currentUserId, profileId, action]
      );

      if (swipeResult.rowCount === 0) {
        return res.status(409).json({ error: 'This profile has already been swiped on' });
      }

      let match = null;
      if (action === 'like') {
        const matchResult = await pool.query(
          `SELECT p.data
           FROM profiles p
           JOIN swipes incoming
             ON incoming.swiper_id = p.id
            AND incoming.target_id = $1
            AND incoming.action = 'like'
           WHERE p.id = $2`,
          [currentUserId, profileId]
        );
        match = matchResult.rows[0]?.data || null;
      }

      return res.status(201).json({
        profileId,
        action,
        matchCreated: Boolean(match),
        match
      });
    } catch (error) {
      return next(error);
    }
  });

  return router;
};