import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_MINT_ADDRESS, SOLANA_RPC_ENDPOINT } from '../config';

interface BondingCurveData {
  progress: number;
  currentMarketCap: number;
  athMarketCap: number;
  isBonded: boolean;
}

// Pump.fun program ID
const PUMP_PROGRAM_ID = new PublicKey('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P');

export async function fetchBondingProgress(): Promise<BondingCurveData> {
  try {
    const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');
    const mintPubkey = new PublicKey(TOKEN_MINT_ADDRESS);

    // Derive the bonding curve PDA
    const [bondingCurvePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from('bonding-curve'), mintPubkey.toBuffer()],
      PUMP_PROGRAM_ID
    );

    console.log('Fetching bonding curve for:', TOKEN_MINT_ADDRESS);
    console.log('Bonding curve PDA:', bondingCurvePDA.toString());

    // Fetch the bonding curve account
    const accountInfo = await connection.getAccountInfo(bondingCurvePDA);

    if (!accountInfo || accountInfo.data.length === 0) {
      console.log('Bonding curve account not found - token may have graduated');
      return {
        progress: 100,
        currentMarketCap: 69000,
        athMarketCap: 69000,
        isBonded: true,
      };
    }

    // Parse the bonding curve data
    const data = accountInfo.data;
    
    // Pump.fun bonding curve structure (approximate):
    // 8 bytes: discriminator
    // 32 bytes: mint
    // 8 bytes: virtual_token_reserves
    // 8 bytes: virtual_sol_reserves  
    // 8 bytes: real_token_reserves
    // 8 bytes: real_sol_reserves
    
    const virtualTokenReserves = data.readBigUInt64LE(40);
    const virtualSolReserves = data.readBigUInt64LE(48);
    const realTokenReserves = data.readBigUInt64LE(56);
    const realSolReserves = data.readBigUInt64LE(64);

    console.log('Bonding curve data:', {
      virtualTokenReserves: virtualTokenReserves.toString(),
      virtualSolReserves: virtualSolReserves.toString(),
      realTokenReserves: realTokenReserves.toString(),
      realSolReserves: realSolReserves.toString(),
    });

    // Convert lamports to SOL
    const virtualSol = Number(virtualSolReserves) / 1e9;
    const realSol = Number(realSolReserves) / 1e9;

    // Pump.fun starts with 30 SOL virtual reserves and graduates at 85 SOL total
    const initialVirtualSol = 30;
    const graduationSol = 85;
    
    // Calculate progress
    const solRaised = Math.max(0, virtualSol - initialVirtualSol + realSol);
    const progress = Math.min((solRaised / graduationSol) * 100, 100);
    const isBonded = progress >= 100;

    // Estimate market cap (1 SOL ≈ $800, adjust as needed)
    const solPrice = 800;
    const currentMarketCap = Math.round(solRaised * solPrice);
    const graduationMarketCap = graduationSol * solPrice;
    const athMarketCap = isBonded ? graduationMarketCap : currentMarketCap;

    console.log('Calculated values:', {
      solRaised,
      progress: Math.round(progress),
      currentMarketCap,
      athMarketCap,
      isBonded,
    });

    return {
      progress: Math.round(progress),
      currentMarketCap,
      athMarketCap,
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
