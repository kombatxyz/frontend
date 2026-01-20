'use client';

import React from 'react';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { createConfig, WagmiProvider, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defineChain } from 'viem';
import { WalletEffects } from '@/components/WalletEffects';

// Define Mantle Sepolia Testnet chain
const mantleSepolia = defineChain({
  id: 5003,
  name: 'Mantle Sepolia Testnet',
  nativeCurrency: {
    name: 'MNT',
    symbol: 'MNT',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.mantle.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Mantle Sepolia Explorer',
      url: 'https://explorer.sepolia.mantle.xyz',
    },
  },
  testnet: true,
});

// Configure wagmi with ONLY Mantle Sepolia
const config = createConfig({
  chains: [mantleSepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mantleSepolia.id]: http('https://rpc.sepolia.mantle.xyz'),
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
          evmNetworks: (networks) => {
            // Only allow Mantle Sepolia - filter out all other networks
            return [
              {
                chainId: 5003,
                networkId: 5003,
                name: 'Mantle Sepolia',
                vanityName: 'Mantle Sepolia Testnet',
                nativeCurrency: {
                  name: 'MNT',
                  symbol: 'MNT',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc.sepolia.mantle.xyz'],
                blockExplorerUrls: ['https://explorer.sepolia.mantle.xyz'],
                iconUrls: ['https://icons.llamao.fi/icons/chains/rsz_mantle.jpg'],
              },
            ];
          },
        },
        recommendedWallets: [
          { walletKey: 'metamask' },
          { walletKey: 'walletconnect' },
        ],
        networkValidationMode: 'always', // Always validate network
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
