import { TOKEN_MINT_ADDRESS } from '../config';

interface BondingCurveData {
  progress: number;
  currentMarketCap: number;
  athMarketCap: number;
  isBonded: boolean;
}

export async function fetchBondingProgress(): Promise<BondingCurveData> {
  try {
    // Fetch from Pump.fun API
    const response = await fetch(`https://frontend-api.pump.fun/coins/${TOKEN_MINT_ADDRESS}`);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('Pump.fun API response:', data);

    // Extract market cap data
    const currentMarketCap = data.usd_market_cap || 0;
    
    // Pump.fun graduation typically happens around $69k market cap (85 SOL at ~$800/SOL)
    const graduationMarketCap = 69000;
    
    // Calculate progress based on market cap
    let progress = 0;
    let isBonded = false;

    // Check if token has graduated (bonding curve complete)
    if (data.complete || data.raydium_pool) {
      isBonded = true;
      progress = 100;
    } else if (currentMarketCap > 0) {
      progress = Math.min((currentMarketCap / graduationMarketCap) * 100, 100);
    }

    // Get ATH (all-time high) - Pump.fun doesn't provide this directly in basic API
    // We'll need to track it client-side or use their chart data
    // For now, use current market cap as ATH if not graduated, or graduation cap if graduated
    let athMarketCap = currentMarketCap;
    
    // If there's a king_of_the_hill_timestamp or similar, the token was once at top
    // Otherwise, use current or graduation as ATH
    if (isBonded) {
      athMarketCap = Math.max(currentMarketCap, graduationMarketCap);
    }

    return {
      progress: Math.round(progress),
      currentMarketCap: Math.round(currentMarketCap),
      athMarketCap: Math.round(athMarketCap),
      isBonded,
    };

  } catch (error) {
    console.error('Error fetching bonding curve data:', error);
    
    // Return fallback data
    return {
      progress: 0,
      currentMarketCap: 0,
      athMarketCap: 0,
      isBonded: false,
    };
  }
}
