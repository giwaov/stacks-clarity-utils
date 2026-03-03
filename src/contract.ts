/**
 * Contract interaction utilities
 */

import {
  makeContractCall,
  makeContractDeploy,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  ContractCallOptions,
} from '@stacks/transactions';
import { StacksNetwork } from '@stacks/network';

export interface ContractCallParams {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: any[];
  senderKey: string;
  network: StacksNetwork;
  postConditions?: any[];
  fee?: number;
}

export interface ContractDeployParams {
  contractName: string;
  codeBody: string;
  senderKey: string;
  network: StacksNetwork;
  fee?: number;
}

/**
 * Execute a contract call
 */
export async function executeContractCall(params: ContractCallParams) {
  const {
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    senderKey,
    network,
    postConditions = [],
    fee,
  } = params;

  const txOptions: ContractCallOptions = {
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    senderKey,
    network,
    postConditions,
    postConditionMode: PostConditionMode.Deny,
    anchorMode: AnchorMode.Any,
  };

  if (fee) {
    txOptions.fee = fee;
  }

  const transaction = await makeContractCall(txOptions);
  const broadcastResponse = await broadcastTransaction(transaction, network);

  return {
    txId: broadcastResponse.txid,
    transaction,
  };
}

/**
 * Deploy a smart contract
 */
export async function deployContract(params: ContractDeployParams) {
  const { contractName, codeBody, senderKey, network, fee } = params;

  const txOptions: any = {
    contractName,
    codeBody,
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
  };

  if (fee) {
    txOptions.fee = fee;
  }

  const transaction = await makeContractDeploy(txOptions);
  const broadcastResponse = await broadcastTransaction(transaction, network);

  return {
    txId: broadcastResponse.txid,
    transaction,
  };
}

/**
 * Build contract identifier string
 */
export function buildContractId(address: string, name: string): string {
  return `${address}.${name}`;
}

/**
 * Parse contract identifier
 */
export function parseContractId(contractId: string): { address: string; name: string } {
  const [address, name] = contractId.split('.');
  return { address, name };
}
