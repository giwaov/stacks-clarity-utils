/**
 * Network configuration utilities
 */

import { StacksMainnet, StacksTestnet, StacksDevnet } from '@stacks/network';

export type NetworkType = 'mainnet' | 'testnet' | 'devnet';

/**
 * Get Stacks network instance by type
 */
export function getNetwork(type: NetworkType = 'mainnet') {
  switch (type) {
    case 'mainnet':
      return new StacksMainnet();
    case 'testnet':
      return new StacksTestnet();
    case 'devnet':
      return new StacksDevnet();
    default:
      throw new Error(`Unknown network type: ${type}`);
  }
}

/**
 * Get explorer URL for address
 */
export function getExplorerAddressUrl(
  address: string,
  network: NetworkType = 'mainnet'
): string {
  const baseUrl =
    network === 'mainnet'
      ? 'https://explorer.stacks.co'
      : 'https://explorer.stacks.co/?chain=testnet';
  return `${baseUrl}/address/${address}`;
}

/**
 * Get explorer URL for transaction
 */
export function getExplorerTxUrl(
  txId: string,
  network: NetworkType = 'mainnet'
): string {
  const baseUrl =
    network === 'mainnet'
      ? 'https://explorer.stacks.co'
      : 'https://explorer.stacks.co/?chain=testnet';
  return `${baseUrl}/txid/${txId}`;
}

/**
 * Get explorer URL for contract
 */
export function getExplorerContractUrl(
  contractId: string,
  network: NetworkType = 'mainnet'
): string {
  const baseUrl =
    network === 'mainnet'
      ? 'https://explorer.stacks.co'
      : 'https://explorer.stacks.co/?chain=testnet';
  return `${baseUrl}/txid/${contractId}`;
}

/**
 * Get API URL for network
 */
export function getApiUrl(network: NetworkType = 'mainnet'): string {
  switch (network) {
    case 'mainnet':
      return 'https://stacks-node-api.mainnet.stacks.co';
    case 'testnet':
      return 'https://stacks-node-api.testnet.stacks.co';
    case 'devnet':
      return 'http://localhost:3999';
    default:
      throw new Error(`Unknown network type: ${network}`);
  }
}

/**
 * Validate Stacks address format
 */
export function isValidStacksAddress(address: string): boolean {
  // Mainnet addresses start with SP, testnet with ST
  const mainnetRegex = /^SP[0-9A-Z]{38,39}$/;
  const testnetRegex = /^ST[0-9A-Z]{38,39}$/;
  return mainnetRegex.test(address) || testnetRegex.test(address);
}

/**
 * Get address prefix for network
 */
export function getAddressPrefix(network: NetworkType): string {
  return network === 'mainnet' ? 'SP' : 'ST';
}
