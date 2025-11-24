import { Hono } from 'hono';
import { CompletionManager } from '../core/completionManager.js';

export const completionsRouter = new Hono();
const completionManager = new CompletionManager();

// Submit quest completion
completionsRouter.post('/', async c => {
  try {
    const body = await c.req.json();
    const completion = completionManager.submitCompletion(body);
    return c.json(completion, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

// Get user completions
completionsRouter.get('/user/:address', c => {
  try {
    const completions = completionManager.getUserCompletions(c.req.param('address'));
    return c.json(completions);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Get quest completions
completionsRouter.get('/quest/:questId', c => {
  try {
    const completions = completionManager.getQuestCompletions(c.req.param('questId'));
    return c.json(completions);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

