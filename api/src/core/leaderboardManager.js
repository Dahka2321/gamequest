import { getDB } from '../db/connection.js';

export class LeaderboardManager {
  constructor() {
    this.db = getDB();
  }

  getTopPlayers(limit = 50) {
    return this.db.prepare(`
      SELECT 
        user_address as userAddress,
        total_quests_completed as totalQuestsCompleted,
        total_rewards_earned as totalRewardsEarned,
        level,
        experience_points as experiencePoints,
        last_activity as lastActivity,
        ROW_NUMBER() OVER (ORDER BY total_quests_completed DESC, total_rewards_earned DESC) as rank
      FROM leaderboard
      ORDER BY total_quests_completed DESC, total_rewards_earned DESC
      LIMIT ?
    `).all(limit);
  }

  getUserRank(userAddress) {
    const result = this.db.prepare(`
      WITH ranked AS (
        SELECT 
          user_address,
          total_quests_completed,
          total_rewards_earned,
          level,
          experience_points,
          ROW_NUMBER() OVER (ORDER BY total_quests_completed DESC, total_rewards_earned DESC) as rank
        FROM leaderboard
      )
      SELECT * FROM ranked WHERE user_address = ?
    `).get(userAddress);
    
    return result || { userAddress, rank: null, totalQuestsCompleted: 0, totalRewardsEarned: 0 };
  }
}

