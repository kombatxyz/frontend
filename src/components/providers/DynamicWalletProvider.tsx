'use client';

import React from 'react';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
// import { dynamicCssOverrides } from './dynamic-style-overrides';

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
        // cssOverrides,
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
