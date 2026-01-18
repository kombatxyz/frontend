'use client';

import React from 'react';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { createConfig, WagmiProvider, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mantleSepoliaTestnet } from 'wagmi/chains';
import { WalletEffects } from '@/components/WalletEffects';

// Create a custom chain config for Mantle testnet
const mantleTestnet = {
  ...mantleSepoliaTestnet,
  id: 5003,
  name: 'Mantle Testnet',
  network: 'mantle-testnet',
  nativeCurrency: {
    name: 'MNT',
    symbol: 'MNT',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.mantle.xyz'],
    },
    public: {
      http: ['https://rpc.sepolia.mantle.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Mantle Testnet Explorer',
      url: 'https://explorer.sepolia.mantle.xyz',
    },
  },
  testnet: true,
};

// Configure wagmi with Mantle testnet
const config = createConfig({
  chains: [mantleTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mantleTestnet.id]: http(),
  },
});

// Create a query client for react-query
const queryClient = new QueryClient();

export default function DynamicWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicContextProvider
      theme="dark"
      settings={{
        shadowDOMEnabled: false,
        environmentId:
          process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID ||
          '63050245-921f-4bf3-ae24-c06ffd98dac2',
        walletConnectors: [EthereumWalletConnectors],
        overrides: {
          evmNetworks: [
            {
              chainId: 5003,
              networkId: 5003,
              name: 'Mantle Testnet',
              vanityName: 'Mantle Testnet',
              nativeCurrency: {
                name: 'MNT',
                symbol: 'MNT',
                decimals: 18,
              },
              rpcUrls: ['https://rpc.sepolia.mantle.xyz'],
              blockExplorerUrls: ['https://explorer.sepolia.mantle.xyz'],
              iconUrls: ['https://icons.llamao.fi/icons/chains/rsz_mantle.jpg'],
            },
          ],
        },
        recommendedWallets: [
          { walletKey: 'metamask' },
          { walletKey: 'walletconnect' },
        ],
        initialAuthenticationMode: 'connect-only',
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <WalletEffects />
            {children}
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
