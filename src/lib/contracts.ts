// Contract addresses and ABIs for Mantle Sepolia
export const CONTRACTS = {
  PM_EXCHANGE: '0x141a0f81704a0ed4acfa77033662bde0425eb7ca',
  PM_ROUTER: '0x01d8397f37e1374586ab62c9a915606c493aad66',
  CONDITIONAL_TOKENS: '0xfb07957c80d7e2e40d0c4fc1eae9592f7349fc94',
  USDC: '0x0274a137ac99db6856dc098cce0aeae55412db8e'
} as const;

export const PM_EXCHANGE_ABI = [
  {
    "name": "getOrderBookDepth",
    "type": "function",
    "inputs": [
      {"name": "conditionId", "type": "bytes32"},
      {"name": "depth", "type": "uint8"}
    ],
    "outputs": [
      {"name": "bidTicks", "type": "uint8[]"},
      {"name": "bidSizes", "type": "uint128[]"},
      {"name": "askTicks", "type": "uint8[]"},
      {"name": "askSizes", "type": "uint128[]"}
    ],
    "stateMutability": "view"
  },
  {
    "name": "getNoBookDepth",
    "type": "function",
    "inputs": [
      {"name": "conditionId", "type": "bytes32"},
      {"name": "depth", "type": "uint8"}
    ],
    "outputs": [
      {"name": "bidTicks", "type": "uint8[]"},
      {"name": "bidSizes", "type": "uint128[]"},
      {"name": "askTicks", "type": "uint8[]"},
      {"name": "askSizes", "type": "uint128[]"}
    ],
    "stateMutability": "view"
  },
  {
    "name": "getMarketPrices",
    "type": "function",
    "inputs": [{"name": "conditionId", "type": "bytes32"}],
    "outputs": [
      {"name": "yesPrice", "type": "uint256"},
      {"name": "noPrice", "type": "uint256"},
      {"name": "spreadBps", "type": "uint256"}
    ],
    "stateMutability": "view"
  }
] as const;

export const PM_ROUTER_ABI = [
  {
    "name": "marketBuyYes",
    "type": "function",
    "inputs": [
      {"name": "conditionId", "type": "bytes32"},
      {"name": "minShares", "type": "uint128"}
    ],
    "outputs": [{"name": "sharesBought", "type": "uint128"}],
    "stateMutability": "nonpayable"
  },
  {
    "name": "marketBuyNo",
    "type": "function",
    "inputs": [
      {"name": "conditionId", "type": "bytes32"},
      {"name": "minShares", "type": "uint128"}
    ],
    "outputs": [{"name": "sharesBought", "type": "uint128"}],
    "stateMutability": "nonpayable"
  },
  {
    "name": "marketSellYes",
    "type": "function",
    "inputs": [
      {"name": "conditionId", "type": "bytes32"},
      {"name": "shares", "type": "uint128"},
      {"name": "minCost", "type": "uint128"}
    ],
    "outputs": [{"name": "usdcReceived", "type": "uint128"}],
    "stateMutability": "nonpayable"
  },
  {
    "name": "marketSellNo",
    "type": "function",
    "inputs": [
      {"name": "conditionId", "type": "bytes32"},
      {"name": "shares", "type": "uint128"},
      {"name": "minCost", "type": "uint128"}
    ],
    "outputs": [{"name": "usdcReceived", "type": "uint128"}],
    "stateMutability": "nonpayable"
  },
  {
    "name": "limitBuyYes",
    "type": "function",
    "inputs": [
      {"name": "conditionId", "type": "bytes32"},
      {"name": "tick", "type": "uint8"},
      {"name": "size", "type": "uint128"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "limitBuyNo",
    "type": "function",
    "inputs": [
      {"name": "conditionId", "type": "bytes32"},
      {"name": "tick", "type": "uint8"},
      {"name": "size", "type": "uint128"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "limitSellYes",
    "type": "function",
    "inputs": [
      {"name": "conditionId", "type": "bytes32"},
      {"name": "tick", "type": "uint8"},
      {"name": "size", "type": "uint128"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "limitSellNo",
    "type": "function",
    "inputs": [
      {"name": "conditionId", "type": "bytes32"},
      {"name": "tick", "type": "uint8"},
      {"name": "size", "type": "uint128"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
] as const;
