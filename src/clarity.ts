/**
 * Clarity value helpers
 */

import {
  uintCV,
  intCV,
  bufferCV,
  stringAsciiCV,
  stringUtf8CV,
  principalCV,
  boolCV,
  listCV,
  tupleCV,
  noneCV,
  someCV,
  ClarityValue,
  cvToJSON,
  cvToString,
} from '@stacks/transactions';

/**
 * Create a Clarity uint value
 */
export function toUint(value: number | bigint): ClarityValue {
  return uintCV(value);
}

/**
 * Create a Clarity int value
 */
export function toInt(value: number | bigint): ClarityValue {
  return intCV(value);
}

/**
 * Create a Clarity bool value
 */
export function toBool(value: boolean): ClarityValue {
  return boolCV(value);
}

/**
 * Create a Clarity principal value
 */
export function toPrincipal(address: string): ClarityValue {
  return principalCV(address);
}

/**
 * Create a Clarity string-ascii value
 */
export function toAscii(value: string): ClarityValue {
  return stringAsciiCV(value);
}

/**
 * Create a Clarity string-utf8 value
 */
export function toUtf8(value: string): ClarityValue {
  return stringUtf8CV(value);
}

/**
 * Create a Clarity buffer value from hex string
 */
export function toBuffer(hexString: string): ClarityValue {
  const buffer = Buffer.from(hexString.replace('0x', ''), 'hex');
  return bufferCV(buffer);
}

/**
 * Create a Clarity list value
 */
export function toList(values: ClarityValue[]): ClarityValue {
  return listCV(values);
}

/**
 * Create a Clarity tuple value
 */
export function toTuple(data: Record<string, ClarityValue>): ClarityValue {
  return tupleCV(data);
}

/**
 * Create a Clarity optional none value
 */
export function toNone(): ClarityValue {
  return noneCV();
}

/**
 * Create a Clarity optional some value
 */
export function toSome(value: ClarityValue): ClarityValue {
  return someCV(value);
}

/**
 * Convert STX to microSTX
 */
export function stxToMicroStx(stx: number): number {
  return Math.floor(stx * 1_000_000);
}

/**
 * Convert microSTX to STX
 */
export function microStxToStx(microStx: number): number {
  return microStx / 1_000_000;
}

/**
 * Convert Clarity value to JSON
 */
export function clarityToJson(cv: ClarityValue): any {
  return cvToJSON(cv);
}

/**
 * Convert Clarity value to string representation
 */
export function clarityToString(cv: ClarityValue): string {
  return cvToString(cv);
}

/**
 * Parse response from contract call
 */
export function parseContractResponse<T = any>(response: ClarityValue): T {
  const json = cvToJSON(response);
  return json.value as T;
}
