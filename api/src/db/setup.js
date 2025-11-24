import { getDB } from './connection.js';

const db = getDB();

db.exec(`
CREATE TABLE IF NOT EXISTS quests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  reward_amount INTEGER NOT NULL,
  reward_token TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER,
  is_active INTEGER DEFAULT 1,
  category TEXT DEFAULT 'general',
  max_completions INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_quests_active ON quests(is_active);
CREATE INDEX IF NOT EXISTS idx_quests_category ON quests(category);
CREATE INDEX IF NOT EXISTS idx_quests_difficulty ON quests(difficulty);

CREATE TABLE IF NOT EXISTS completions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quest_id TEXT NOT NULL,
  user_address TEXT NOT NULL,
  proof_data TEXT,
  completed_at INTEGER NOT NULL,
  verified INTEGER DEFAULT 0,
  reward_claimed INTEGER DEFAULT 0,
  UNIQUE(quest_id, user_address),
  FOREIGN KEY (quest_id) REFERENCES quests(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_completions_user ON completions(user_address);
CREATE INDEX IF NOT EXISTS idx_completions_quest ON completions(quest_id);
CREATE INDEX IF NOT EXISTS idx_completions_verified ON completions(verified);

CREATE TABLE IF NOT EXISTS leaderboard (
  user_address TEXT PRIMARY KEY,
  total_quests_completed INTEGER DEFAULT 0,
  total_rewards_earned INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  experience_points INTEGER DEFAULT 0,
  last_activity INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(total_quests_completed DESC, total_rewards_earned DESC);
`);

console.log('✅ Database setup complete');
console.log('📁 Tables: quests, completions, leaderboard');

