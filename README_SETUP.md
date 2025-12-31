# 🚀 First Memecoin Setup Guide

Your site is now live and connected to Solana/Pump.fun!

## 🌐 Live Site
**Production URL**: https://memecoin-site-pi.vercel.app

---

## ⚙️ How to Update When You Launch Your Token

### Step 1: Launch Your Token on Pump.fun
1. Go to [Pump.fun](https://pump.fun)
2. Create your token
3. Copy your **Token Mint Address**

### Step 2: Update Configuration
Open the file `app/config.ts` and update these values:

```typescript
// Replace with YOUR token mint address
export const TOKEN_MINT_ADDRESS = 'YOUR_TOKEN_MINT_HERE';

// Update social links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/your_handle',
  dexscreener: 'https://dexscreener.com/solana/your_token_address',
};
```

### Step 3: Deploy Updates
Run these commands in your terminal:

```bash
git add .
git commit -m "Update token address for launch"
git push
```

Vercel will automatically redeploy your site with the new settings!

---

## 🔧 What's Connected

### ✅ Live Bonding Progress
- **Fetches real-time data** from Solana blockchain
- **Updates every 10 seconds** automatically
- **Shows progress** from 0% → 100% (graduation to Raydium)
- **Displays SOL raised** vs target (85 SOL)

### ✅ Contract Address Copy
- Clicking the copy button copies your **full token mint address**
- Displays a shortened version for cleaner UI

### ✅ Social Links
- Twitter/X button links to your profile
- Dexscreener button for live charts

---

## 🎨 Current Features

- ✨ **Realistic Fireworks** with rocket trails
- 💥 **Explosion bursts** with hearts, stars, shapes
- 📊 **Live bonding curve** from Pump.fun
- ⏱️ **Countdown timer** to New Year
- 📋 **Copy contract address** functionality
- 🔗 **Social media buttons**
- 📱 **Fully responsive** design

---

## 🔄 Testing Right Now

The site is currently using a **test token** address:
```
HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC
```

You can see how it works live on your deployed site. When you launch, just follow Step 2 above to swap in your real token address!

---

## 📝 Optional Customizations

### Change RPC Endpoint (for faster updates)
Get a free RPC from:
- [Helius](https://helius.dev) - 100k requests/day free
- [QuickNode](https://quicknode.com) - 30M requests/month free

Then update in `app/config.ts`:
```typescript
export const SOLANA_RPC_ENDPOINT = 'YOUR_RPC_URL_HERE';
```

### Adjust Update Frequency
In `app/components/BondingProgress.tsx`, change:
```typescript
const interval = setInterval(fetchData, 10000); // 10 seconds
```

---

## 🐛 Troubleshooting

### Bonding progress shows "..."
- Check that your token mint address is correct
- Verify the token exists on Pump.fun
- Check browser console for errors

### Progress shows 100% immediately
- Token may have already graduated to Raydium
- This is normal for completed bonding curves

### Need help?
Check the browser console (F12) for detailed error messages.

---

## 🎯 Next Steps

1. **Test the site** with the current test token
2. **Launch your token** on Pump.fun
3. **Update config.ts** with your real address
4. **Push to GitHub** and let Vercel auto-deploy
5. **Share your site** and watch the bonding progress live!

---

**Happy launching! 🚀🌙**

