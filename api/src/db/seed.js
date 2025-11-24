import { getDB } from './connection.js';

const db = getDB();

// Sample quest for testing
const sampleQuest = {
  id: crypto.randomUUID(),
  title: 'First Web3 Transaction',
  description: 'Make your first transaction on Ethereum mainnet',
  difficulty: 'easy',
  reward_amount: 10,
  reward_token: 'QUEST',
  created_by: '0xGameMaster',
  created_at: Date.now(),
  expires_at: Date.now() + 90 * 24 * 60 * 60 * 1000, // 90 days
  is_active: 1,
  category: 'onboarding',
  max_completions: 0
};

try {
  db.prepare(`
    INSERT INTO quests (id, title, description, difficulty, reward_amount, reward_token, created_by, created_at, expires_at, is_active, category, max_completions)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    sampleQuest.id,
    sampleQuest.title,
    sampleQuest.description,
    sampleQuest.difficulty,
    sampleQuest.reward_amount,
    sampleQuest.reward_token,
    sampleQuest.created_by,
    sampleQuest.created_at,
    sampleQuest.expires_at,
    sampleQuest.is_active,
    sampleQuest.category,
    sampleQuest.max_completions
  );
  console.log('✅ Sample quest created');
} catch (e) {
  console.log('ℹ️  Sample data already exists:', e.message);
}

