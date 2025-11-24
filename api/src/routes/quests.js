import { Hono } from 'hono';
import { QuestManager } from '../core/questManager.js';
import { requireAuth } from '../utils/auth.js';

export const questsRouter = new Hono();
const questManager = new QuestManager();

// Get all quests
questsRouter.get('/', c => {
  try {
    const category = c.req.query('category');
    const difficulty = c.req.query('difficulty');
    const quests = questManager.getAllQuests({ category, difficulty });
    return c.json(quests);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Get quest by ID
questsRouter.get('/:id', c => {
  try {
    const quest = questManager.getQuestById(c.req.param('id'));
    if (!quest) return c.json({ error: 'Quest not found' }, 404);
    return c.json(quest);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Create quest (requires auth)
questsRouter.post('/', requireAuth, async c => {
  try {
    const body = await c.req.json();
    const quest = questManager.createQuest(body);
    return c.json(quest, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

// Deactivate quest (requires auth)
questsRouter.post('/:id/deactivate', requireAuth, c => {
  try {
    const result = questManager.deactivateQuest(c.req.param('id'));
    return c.json(result);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

