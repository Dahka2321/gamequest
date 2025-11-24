import { http, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { cookieStorage, createStorage } from 'wagmi';

export const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: { [mainnet.id]: http() },
  storage: createStorage({ storage: cookieStorage }),
});

