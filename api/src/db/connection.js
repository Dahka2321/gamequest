import Database from 'better-sqlite3';

const DB_FILE = process.env.DATABASE_FILE || './gamequest.db';

let database = null;

export function getDB() {
  if (!database) {
    database = new Database(DB_FILE);
    database.pragma('journal_mode = WAL');
    database.pragma('foreign_keys = ON');
  }
  return database;
}

export function closeDB() {
  if (database) {
    database.close();
    database = null;
  }
}

