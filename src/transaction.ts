/**
 * Transaction utilities
 */

import {
  makeSTXTokenTransfer,
  broadcastTransaction,
  SignedTokenTransferOptions,
} from '@stacks/transactions';
import { StacksNetwork } from '@stacks/network';

export interface STXTransferParams {
  recipient: string;
  amount: number; // in microSTX
  senderKey: string;
  network: StacksNetwork;
  memo?: string;
  fee?: number;
}

// API URLs for different networks
const API_URLS: Record<string, string> = {
  mainnet: 'https://api.mainnet.hiro.so',
  testnet: 'https://api.testnet.hiro.so',
};

function getApiUrl(network: StacksNetwork): string {
  const chainId = network.chainId;
  return chainId === 1 ? API_URLS.mainnet : API_URLS.testnet;
}

/**
 * Send STX tokens
 */
export async function sendSTX(params: STXTransferParams) {
  const { recipient, amount, senderKey, network, memo, fee } = params;

  const txOptions: SignedTokenTransferOptions = {
    recipient,
    amount: BigInt(amount),
    senderKey,
    network,
    memo: memo,
    fee: fee ? BigInt(fee) : undefined,
  };

  const transaction = await makeSTXTokenTransfer(txOptions);
  const broadcastResponse = await broadcastTransaction({ transaction });

  return {
    txId: broadcastResponse.txid,
    transaction,
  };
}

/**
 * Get account nonce from API
 */
export async function getAccountNonce(
  address: string,
  network: StacksNetwork
): Promise<number> {
  const apiUrl = getApiUrl(network);
  const response = await fetch(`${apiUrl}/extended/v1/address/${address}/nonces`);
  const data = await response.json() as { possible_next_nonce: number };
  return data.possible_next_nonce;
}

/**
 * Wait for transaction confirmation
 */
export async function waitForTransaction(
  txId: string,
  network: StacksNetwork,
  maxAttempts: number = 30,
  intervalMs: number = 10000
): Promise<{ status: string; data?: any }> {
  const apiUrl = getApiUrl(network);

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(`${apiUrl}/extended/v1/tx/${txId}`);
      const data = await response.json() as { tx_status: string };

      if (data.tx_status === 'success') {
        return { status: 'success', data };
      } else if (data.tx_status === 'abort_by_response' || data.tx_status === 'abort_by_post_condition') {
        return { status: 'failed', data };
      }
    } catch (error) {
      // Continue polling
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Transaction ${txId} not confirmed after ${maxAttempts} attempts`);
}

/**
 * Get transaction status
 */
export async function getTransactionStatus(
  txId: string,
  network: StacksNetwork
): Promise<string> {
  const apiUrl = getApiUrl(network);
  const response = await fetch(`${apiUrl}/extended/v1/tx/${txId}`);
  const data = await response.json() as { tx_status: string };
  return data.tx_status;
}

/**
 * Check if transaction is pending
 */
export async function isTransactionPending(
  txId: string,
  network: StacksNetwork
): Promise<boolean> {
  const status = await getTransactionStatus(txId, network);
  return status === 'pending';
}
