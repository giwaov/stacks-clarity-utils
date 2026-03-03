/**
 * STX formatting and conversion utilities
 */

// 1 STX = 1,000,000 microSTX
const MICRO_STX_PER_STX = 1_000_000;

/**
 * Convert STX to microSTX
 */
export function stxToMicro(stx: number): bigint {
  return BigInt(Math.floor(stx * MICRO_STX_PER_STX));
}

/**
 * Convert microSTX to STX
 */
export function microToStx(microStx: bigint | number): number {
  return Number(microStx) / MICRO_STX_PER_STX;
}

/**
 * Format microSTX as human-readable STX string
 */
export function formatStx(microStx: bigint | number, decimals: number = 6): string {
  const stx = microToStx(microStx);
  return stx.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format microSTX with STX suffix
 */
export function formatStxWithSymbol(microStx: bigint | number, decimals: number = 6): string {
  return `${formatStx(microStx, decimals)} STX`;
}

/**
 * Parse STX string to microSTX
 */
export function parseStxInput(input: string): bigint {
  const cleaned = input.replace(/[^0-9.]/g, '');
  const stx = parseFloat(cleaned);
  if (isNaN(stx)) throw new Error('Invalid STX amount');
  return stxToMicro(stx);
}

/**
 * Format block height with commas
 */
export function formatBlockHeight(height: number): string {
  return height.toLocaleString();
}

/**
 * Calculate estimated time from block height difference
 * Average Stacks block time is ~10 minutes
 */
export function estimateTimeFromBlocks(blocks: number): string {
  const minutes = blocks * 10;
  if (minutes < 60) return `~${minutes} minutes`;
  if (minutes < 1440) return `~${Math.round(minutes / 60)} hours`;
  return `~${Math.round(minutes / 1440)} days`;
}

/**
 * Format a transaction fee display
 */
export function formatFee(microStx: bigint | number): string {
  const stx = microToStx(microStx);
  if (stx < 0.001) return `${Number(microStx)} μSTX`;
  return formatStxWithSymbol(microStx, 6);
}

/**
 * Check if amount is dust (< 1 μSTX)
 */
export function isDustAmount(microStx: bigint | number): boolean {
  return Number(microStx) < 1;
}

/**
 * Format large numbers compactly (1.5M, 2.3K, etc.)
 */
export function formatCompact(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}
