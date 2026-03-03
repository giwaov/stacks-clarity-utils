/**
 * Transaction utilities
 */

import {
  makeSTXTokenTransfer,
  broadcastTransaction,
  AnchorMode,
  estimateTransfer,
  getNonce,
  makeContractCall,
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

/**
 * Send STX tokens
 */
export async function sendSTX(params: STXTransferParams) {
  const { recipient, amount, senderKey, network, memo, fee } = params;

  const txOptions: any = {
    recipient,
    amount,
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
  };

  if (memo) {
    txOptions.memo = memo;
  }

  if (fee) {
    txOptions.fee = fee;
  }

  const transaction = await makeSTXTokenTransfer(txOptions);
  const broadcastResponse = await broadcastTransaction(transaction, network);

  return {
    txId: broadcastResponse.txid,
    transaction,
  };
}

/**
 * Estimate transaction fee for STX transfer
 */
export async function estimateSTXTransferFee(
  network: StacksNetwork,
  amount: number
): Promise<number> {
  const estimation = await estimateTransfer({} as any);
  return Number(estimation);
}

/**
 * Get account nonce
 */
export async function getAccountNonce(
  address: string,
  network: StacksNetwork
): Promise<number> {
  const nonce = await getNonce(address, network);
  return Number(nonce);
}

/**
 * Wait for transaction confirmation
 */
export async function waitForTransaction(
  txId: string,
  network: StacksNetwork,
  maxAttempts: number = 30,
  intervalMs: number = 10000
): Promise<any> {
  const apiUrl = network.coreApiUrl;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(`${apiUrl}/extended/v1/tx/${txId}`);
      const data = await response.json();

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
  const apiUrl = network.coreApiUrl;
  const response = await fetch(`${apiUrl}/extended/v1/tx/${txId}`);
  const data = await response.json();
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
