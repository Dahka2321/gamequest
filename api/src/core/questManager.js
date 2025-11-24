import { getDB } from '../db/connection.js';

export class QuestManager {
  constructor() {
    this.db = getDB();
  }

  getAllQuests(filters = {}) {
    let query = `
      SELECT 
        id, title, description, difficulty,
        reward_amount as rewardAmount,
        reward_token as rewardToken,
        created_by as createdBy,
        created_at as createdAt,
        expires_at as expiresAt,
        is_active as isActive,
        category,
        max_completions as maxCompletions
      FROM quests 
      WHERE is_active = 1
    `;
    
    const params = [];
    
    if (filters.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }
    
    if (filters.difficulty) {
      query += ' AND difficulty = ?';
      params.push(filters.difficulty);
    }
    
    query += ' ORDER BY created_at DESC';
    
    return this.db.prepare(query).all(...params);
  }

  getQuestById(id) {
    return this.db.prepare(`
      SELECT 
        id, title, description, difficulty,
        reward_amount as rewardAmount,
        reward_token as rewardToken,
        created_by as createdBy,
        created_at as createdAt,
        expires_at as expiresAt,
        is_active as isActive,
        category,
        max_completions as maxCompletions
      FROM quests 
      WHERE id = ?
    `).get(id);
  }

  createQuest(data) {
    const { title, description, difficulty, rewardAmount, rewardToken, createdBy, expiresAt, category, maxCompletions } = data;
    
    if (!title || !description || !difficulty || !rewardAmount || !rewardToken || !createdBy) {
      throw new Error('Missing required fields');
    }
    
    const id = crypto.randomUUID();
    const now = Date.now();
    
    this.db.prepare(`
      INSERT INTO quests (id, title, description, difficulty, reward_amount, reward_token, created_by, created_at, expires_at, category, max_completions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, title, description, difficulty, rewardAmount, rewardToken, createdBy, now, expiresAt || null, category || 'general', maxCompletions || 0);
    
    return this.getQuestById(id);
  }

  deactivateQuest(id) {
    this.db.prepare('UPDATE quests SET is_active = 0 WHERE id = ?').run(id);
    return { success: true, id };
  }
}

