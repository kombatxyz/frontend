# Getting Mantle Testnet Funds

## Overview

To test your Kombat application on Mantle testnet, you'll need testnet MNT tokens. Here's how to get them:

## Methods to Get Mantle Testnet Funds

### 1. **Official Mantle Testnet Faucet**

The easiest way to get testnet MNT is through the official Mantle faucet:

- **Faucet URL**: https://faucet.sepolia.mantle.xyz/
- **Steps**:
  1. Visit the faucet website
  2. Connect your wallet (make sure you're on Mantle Sepolia Testnet)
  3. Enter your wallet address
  4. Click "Request Tokens"
  5. Wait a few seconds for the tokens to arrive

**Limits**: Usually you can request tokens once per day per address.

### 2. **Alternative Faucets**

If the official faucet is not working, try these community faucets:

- **Alchemy Faucet**: https://mantlesepolia.hub.caldera.xyz/
- **QuickNode Faucet**: https://faucet.quicknode.com/mantle/sepolia

### 3. **Discord/Community Channels**

Join the Mantle Discord community and request testnet tokens:

- **Mantle Discord**: https://discord.gg/mantlenetwork
- Look for the #faucet or #testnet-support channel
- Follow the bot commands to request tokens

### 4. **Bridge from Sepolia**

If you have Sepolia ETH, you can bridge to Mantle Sepolia:

- **Mantle Bridge**: https://bridge.sepolia.mantle.xyz/
- Bridge your Sepolia ETH to Mantle Sepolia testnet

## Network Configuration

Your app is already configured with Mantle Sepolia Testnet:

```typescript
Chain ID: 5003
Network Name: Mantle Testnet
RPC URL: https://rpc.sepolia.mantle.xyz
Block Explorer: https://explorer.sepolia.mantle.xyz
Native Currency: MNT (18 decimals)
```

## Adding Mantle Testnet to MetaMask Manually

If you need to add the network manually:

1. Open MetaMask
2. Click on the network dropdown
3. Click "Add Network"
4. Click "Add a network manually"
5. Enter the following details:
   - **Network Name**: Mantle Sepolia Testnet
   - **New RPC URL**: https://rpc.sepolia.mantle.xyz
   - **Chain ID**: 5003
   - **Currency Symbol**: MNT
   - **Block Explorer URL**: https://explorer.sepolia.mantle.xyz

## Verifying Your Balance

After receiving testnet tokens:

1. Your balance should automatically appear in the navbar of the app
2. You can also check your balance on the Mantle Explorer: https://explorer.sepolia.mantle.xyz
3. The app will display your balance in the format: `X.XXXX MNT`

## Troubleshooting

### Balance Not Showing?

- Make sure you're connected to the correct wallet
- Verify you're on Mantle Sepolia Testnet (Chain ID: 5003)
- Try refreshing the page
- Check the transaction on the block explorer

### Faucet Not Working?

- Check if you've already claimed in the last 24 hours
- Try a different faucet from the list above
- Ask for help in the Mantle Discord community

### Wrong Network?

- Your app will automatically prompt you to switch to Mantle testnet
- Dynamic wallet will handle network switching automatically

## Important Notes

⚠️ **Testnet tokens have NO real value**

- These are test tokens only
- Do not attempt to trade or sell them
- They cannot be converted to mainnet tokens

✅ **Free and Safe**

- All testnet faucets are free
- Never share your private keys or seed phrase
- Testnet transactions are safe for testing

## Need More Help?

- Check the Mantle documentation: https://docs.mantle.xyz/
- Join the Mantle Discord: https://discord.gg/mantlenetwork
- Browse the Mantle forums: https://forum.mantle.xyz/
