# 🎮 GameQuest

Web3 platform for creating and completing crypto-rewarded quests and challenges.

## 🌟 Features

- ✅ Create quests with crypto rewards
- ✅ Complete challenges and earn tokens
- ✅ Global leaderboard with top players
- ✅ Web3 wallet integration
- ✅ Farcaster Frame support
- ✅ Real-time quest updates

## 📦 Project Structure

```
gamequest/
├── api/              # Node.js backend (Hono + SQLite)
│   ├── src/
│   │   ├── core/     # Core business logic
│   │   ├── db/       # Database and schemas
│   │   ├── routes/   # API endpoints
│   │   └── utils/    # Utilities
│   └── package.json
│
└── client/           # React 19 + TypeScript + Vite
    ├── src/
    │   ├── views/    # Page views
    │   ├── modules/  # Feature modules
    │   ├── shared/   # Shared components
    │   ├── hooks/    # Custom hooks
    │   └── api/      # API layer
    └── package.json
```

## 🚀 Quick Start

### API Server

```bash
cd api
npm install
npm run db:setup      # Initialize database
npm run dev           # http://localhost:3000
```

### Client

```bash
cd client
npm install
npm run dev           # http://localhost:5173
```

## 🔧 Technologies

### Backend
- **Hono** - Fast web framework
- **SQLite** + better-sqlite3
- **Modular architecture**

### Frontend
- **React 19** + TypeScript
- **Vite 7** - Lightning fast build
- **Wagmi 3** - Ethereum integration
- **WalletConnect AppKit** - Wallet connection
- **@tanstack/react-query** - Data fetching
- **Farcaster Frame SDK**
- **Lens Protocol, ZeroDev, Solana** and more Web3 libraries

## 🎮 How It Works

1. **Quest Creation** - Admins create quests with rewards
2. **Quest Discovery** - Users browse available quests
3. **Quest Completion** - Users complete challenges
4. **Reward Distribution** - Automatic token rewards
5. **Leaderboard** - Compete for top positions

## 🤖 Dependabot

Auto-updates configured for:
- `/client` - Daily at 7 AM (Warsaw time)
- `/api` - Daily at 7 AM (Warsaw time)

## 📄 License

MIT

## 🎯 Built With

Modern Web3 stack with React 19, TypeScript, Wagmi v3, and comprehensive wallet support.

