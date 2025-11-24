import { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@modules/web3/config';

type View = 'quests' | 'create' | 'leaderboard';

export function App() {
  const [activeView, setActiveView] = useState<View>('quests');

  return (
    <WagmiProvider config={wagmiConfig}>
      <div className="container">
        <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <h1>🎮 GameQuest</h1>
          <button className="btn btn-primary">Connect Wallet</button>
        </header>
        
        <nav style={{display:'flex',gap:'12px',marginBottom:'24px'}}>
          {['quests', 'create', 'leaderboard'].map(view => (
            <button
              key={view}
              className={activeView === view ? 'btn btn-primary' : 'btn'}
              onClick={() => setActiveView(view as View)}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </nav>

        <main>
          <div className="quest-card">
            <h2>{activeView} View</h2>
            <p>GameQuest is ready! 🎮</p>
          </div>
        </main>

        <footer style={{marginTop:'48px',textAlign:'center',opacity:0.6}}>
          <p>GameQuest • Web3 Gaming Platform • WalletConnect • Wagmi v3</p>
        </footer>
      </div>
    </WagmiProvider>
  );
}

