# Enabling Embedded Wallets in Dynamic SDK

## Problem

Users who sign up with email/social authentication don't automatically get a blockchain wallet address. They only have email credentials, but no `primaryWallet` to use for blockchain transactions.

## Solution: Enable Embedded Wallets

Dynamic SDK has a feature called **Embedded Wallets** that automatically creates a blockchain wallet for every user who signs up, even if they use email/social login instead of connecting an external wallet.

---

## Step-by-Step Setup

### 1. Enable Embedded Wallets in Dynamic Dashboard

You need to configure this in your Dynamic Dashboard (this CANNOT be done in code):

1. **Go to Dynamic Dashboard**: https://app.dynamic.xyz/
2. **Navigate to**: Dashboard → **Developers** section
3. **Find**: "Embedded Wallets" section
4. **Enable**: Turn on "Embedded Wallets"
5. **Configure**:
   - Toggle **"Create on Sign up"** to ON
   - Select which blockchain chains you want wallets created on (e.g., Ethereum, Polygon, etc.)
6. **(Optional) Advanced**:
   - Expand "Advanced Options"
   - Enable "Embedded Wallet for Third-Party Wallets" if you want embedded wallets created even for users who connect external wallets

### 2. Install Required Package (if not already installed)

The embedded wallet functionality might require an additional package:

```bash
pnpm add @dynamic-labs/ethereum-aa
```

or

```bash
pnpm add @dynamic-labs/viem-utils
```

### 3. Update Your Code (if needed)

After enabling in the Dashboard, you can optionally use the `useEmbeddedWallet` hook for custom logic:

```tsx
import { useEmbeddedWallet } from '@dynamic-labs/sdk-react-core';

function MyComponent() {
  const { createEmbeddedWallet } = useEmbeddedWallet();

  // This is only needed if you want to manually trigger wallet creation
  // Otherwise, it happens automatically on signup
}
```

---

## How It Works After Setup

### Before (Current State):

- User signs up with email
- `primaryWallet` = `null`
- User has no blockchain address
- Cannot receive funds

### After (With Embedded Wallets):

- User signs up with email
- Dynamic **automatically creates** a blockchain wallet
- `primaryWallet?.address` = actual blockchain address (e.g., `0x123...`)
- User can receive funds immediately
- QR code and address display works perfectly

---

## Testing

1. **Enable embedded wallets** in the Dynamic Dashboard (as described above)
2. **Create a new test account** (sign up with a new email)
3. **Open the Fund Wallet modal**
4. You should now see:
   - ✅ Real blockchain address
   - ✅ Working QR code
   - ✅ Copy functionality

---

## Important Notes

- **Dashboard Configuration**: Embedded wallets MUST be enabled in the Dashboard - there's no code configuration for this
- **Existing Users**: Users who signed up before enabling embedded wallets might need to log out and back in, or you may need to manually create wallets for them
- **Security**: Embedded wallets are non-custodial and securely managed by Dynamic
- **Chain Support**: Make sure to enable the blockchain chains you need (Ethereum, Polygon, etc.)

---

## Documentation

- [Dynamic Embedded Wallets Docs](https://docs.dynamic.xyz/embedded-wallets/overview)
- [React SDK Reference](https://docs.dynamic.xyz/react-sdk/hooks/useembeddedwallet)

---

## Current Status

✅ Fund Wallet Modal is ready - it will work automatically once embedded wallets are enabled in the Dashboard
✅ Code properly uses `primaryWallet?.address` from Dynamic SDK
⏳ **Action Required**: Enable embedded wallets in your Dynamic Dashboard

Once you enable embedded wallets in the Dashboard, every new user who signs up will automatically get a blockchain wallet address!
