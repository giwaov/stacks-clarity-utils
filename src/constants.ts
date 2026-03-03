/**
 * Common constants for Stacks development
 */

// STX conversion
export const MICRO_STX_PER_STX = 1_000_000;

// Block time (approximately 10 minutes on mainnet)
export const AVERAGE_BLOCK_TIME_SECONDS = 600;
export const BLOCKS_PER_HOUR = 6;
export const BLOCKS_PER_DAY = 144;
export const BLOCKS_PER_WEEK = 1008;
export const BLOCKS_PER_MONTH = 4320; // Approximate

// Transaction fees (in microSTX)
export const DEFAULT_FEE = 2000;
export const MIN_FEE = 1;
export const RECOMMENDED_FEE_MULTIPLIER = 1.5;

// Contract limits
export const MAX_CONTRACT_NAME_LENGTH = 128;
export const MAX_FUNCTION_NAME_LENGTH = 128;
export const MAX_STRING_ASCII_LENGTH = 128;
export const MAX_STRING_UTF8_LENGTH = 256;

// Clarity types
export const CLARITY_TYPES = {
  UINT: 'uint',
  INT: 'int',
  BOOL: 'bool',
  PRINCIPAL: 'principal',
  BUFF: 'buff',
  STRING_ASCII: 'string-ascii',
  STRING_UTF8: 'string-utf8',
  LIST: 'list',
  TUPLE: 'tuple',
  OPTIONAL: 'optional',
  RESPONSE: 'response',
} as const;

// Common error codes
export const ERROR_CODES = {
  UNAUTHORIZED: 100,
  NOT_FOUND: 101,
  INVALID_AMOUNT: 102,
  ALREADY_EXISTS: 103,
  INSUFFICIENT_BALANCE: 104,
  EXPIRED: 105,
  INVALID_STATE: 106,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  MAINNET: 'https://stacks-node-api.mainnet.stacks.co',
  TESTNET: 'https://stacks-node-api.testnet.stacks.co',
  DEVNET: 'http://localhost:3999',
} as const;

// Explorer URLs
export const EXPLORER_URLS = {
  MAINNET: 'https://explorer.stacks.co',
  TESTNET: 'https://explorer.stacks.co/?chain=testnet',
} as const;
