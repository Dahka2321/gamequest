import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createServer } from 'node:http';
import { questsRouter } from './routes/quests.js';
import { completionsRouter } from './routes/completions.js';
import { leaderboardRouter } from './routes/leaderboard.js';

const PORT = process.env.PORT || 3000;
const CORS_ORIGINS = process.env.CORS_ORIGINS || '*';

const app = new Hono();

// Middleware
app.use('*', cors({ 
  origin: CORS_ORIGINS, 
  allowHeaders: ['Content-Type', 'x-api-key'] 
}));

// Health check
app.get('/health', c => c.json({ 
  status: 'ok', 
  service: 'gamequest-api',
  timestamp: Date.now() 
}));

// API routes
app.route('/quests', questsRouter);
app.route('/completions', completionsRouter);
app.route('/leaderboard', leaderboardRouter);

// 404 handler
app.notFound(c => c.json({ error: 'Not found' }, 404));

// Error handler
app.onError((err, c) => {
  console.error('API Error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

const server = createServer(app.fetch);
server.listen(PORT, () => {
  console.log(`🎮 GameQuest API running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

