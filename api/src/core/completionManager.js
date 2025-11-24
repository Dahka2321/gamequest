import { getDB } from '../db/connection.js';

export class CompletionManager {
  constructor() {
    this.db = getDB();
  }

  submitCompletion(data) {
    const { questId, userAddress, proofData } = data;
    
    if (!questId || !userAddress) {
      throw new Error('Missing required fields');
    }
    
    // Check if quest exists and is active
    const quest = this.db.prepare('SELECT is_active, expires_at FROM quests WHERE id = ?').get(questId);
    if (!quest) throw new Error('Quest not found');
    if (!quest.is_active) throw new Error('Quest is inactive');
    if (quest.expires_at && Date.now() > quest.expires_at) throw new Error('Quest expired');
    
    const now = Date.now();
    
    try {
      const result = this.db.prepare(`
        INSERT INTO completions (quest_id, user_address, proof_data, completed_at)
        VALUES (?, ?, ?, ?)
      `).run(questId, userAddress, proofData || null, now);
      
      // Update leaderboard
      this.updateLeaderboard(userAddress);
      
      return {
        id: result.lastInsertRowid,
        questId,
        userAddress,
        completedAt: now
      };
    } catch (error) {
      throw new Error('Quest already completed by this user');
    }
  }

  getUserCompletions(userAddress) {
    return this.db.prepare(`
      SELECT 
        c.id,
        c.quest_id as questId,
        c.user_address as userAddress,
        c.completed_at as completedAt,
        c.verified,
        c.reward_claimed as rewardClaimed,
        q.title as questTitle,
        q.reward_amount as rewardAmount,
        q.reward_token as rewardToken
      FROM completions c
      JOIN quests q ON c.quest_id = q.id
      WHERE c.user_address = ?
      ORDER BY c.completed_at DESC
    `).all(userAddress);
  }

  getQuestCompletions(questId) {
    return this.db.prepare(`
      SELECT 
        user_address as userAddress,
        completed_at as completedAt,
        verified,
        reward_claimed as rewardClaimed
      FROM completions
      WHERE quest_id = ?
      ORDER BY completed_at DESC
    `).all(questId);
  }

  updateLeaderboard(userAddress) {
    const stats = this.db.prepare(`
      SELECT 
        COUNT(*) as total_completed,
        SUM(q.reward_amount) as total_rewards
      FROM completions c
      JOIN quests q ON c.quest_id = q.id
      WHERE c.user_address = ? AND c.verified = 1
    `).get(userAddress);
    
    const now = Date.now();
    
    this.db.prepare(`
      INSERT INTO leaderboard (user_address, total_quests_completed, total_rewards_earned, last_activity)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(user_address) DO UPDATE SET
        total_quests_completed = excluded.total_quests_completed,
        total_rewards_earned = excluded.total_rewards_earned,
        last_activity = excluded.last_activity
    `).run(userAddress, stats.total_completed || 0, stats.total_rewards || 0, now);
  }
}

