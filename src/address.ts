/**
 * Stacks address utilities
 */

/**
 * Check if address is mainnet
 */
export function isMainnetAddress(address: string): boolean {
  return address.startsWith('SP') || address.startsWith('SM');
}

/**
 * Check if address is testnet
 */
export function isTestnetAddress(address: string): boolean {
  return address.startsWith('ST') || address.startsWith('SN');
}

/**
 * Get network type from address
 */
export function getNetworkFromAddress(address: string): 'mainnet' | 'testnet' | 'unknown' {
  if (isMainnetAddress(address)) return 'mainnet';
  if (isTestnetAddress(address)) return 'testnet';
  return 'unknown';
}

/**
 * Basic Stacks address validation
 */
export function isValidAddress(address: string): boolean {
  // Basic validation: starts with valid prefix and has correct length
  const validPrefixes = ['SP', 'SM', 'ST', 'SN'];
  const hasValidPrefix = validPrefixes.some(p => address.startsWith(p));
  const hasValidLength = address.length >= 39 && address.length <= 41;
  return hasValidPrefix && hasValidLength;
}

/**
 * Parse a contract identifier (address.contract-name)
 */
export function parseContractIdentifier(contractId: string): {
  address: string;
  contractName: string;
} | null {
  const parts = contractId.split('.');
  if (parts.length !== 2) return null;
  
  const [address, contractName] = parts;
  if (!isValidAddress(address)) return null;
  
  return { address, contractName };
}

/**
 * Create a contract identifier from address and name
 */
export function createContractIdentifier(address: string, contractName: string): string {
  return `${address}.${contractName}`;
}

/**
 * Check if string is a valid contract identifier
 */
export function isValidContractIdentifier(contractId: string): boolean {
  return parseContractIdentifier(contractId) !== null;
}

/**
 * Shorten address for display (SP12...XYZ)
 */
export function shortenAddress(address: string, chars: number = 4): string {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Get principal type from address/identifier
 */
export function getPrincipalType(principal: string): 'standard' | 'contract' | 'invalid' {
  if (principal.includes('.')) {
    return isValidContractIdentifier(principal) ? 'contract' : 'invalid';
  }
  return isValidAddress(principal) ? 'standard' : 'invalid';
}
