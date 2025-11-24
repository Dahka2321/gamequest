import { Hono } from 'hono';
import { LeaderboardManager } from '../core/leaderboardManager.js';

export const leaderboardRouter = new Hono();
const leaderboardManager = new LeaderboardManager();

// Get top players
leaderboardRouter.get('/', c => {
  try {
    const limit = parseInt(c.req.query('limit') || '50');
    const players = leaderboardManager.getTopPlayers(limit);
    return c.json(players);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Get user rank
leaderboardRouter.get('/user/:address', c => {
  try {
    const rank = leaderboardManager.getUserRank(c.req.param('address'));
    return c.json(rank);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

