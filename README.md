# @giwaov/stacks-clarity-utils

[![npm version](https://img.shields.io/npm/v/@giwaov/stacks-clarity-utils.svg)](https://www.npmjs.com/package/@giwaov/stacks-clarity-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stacks](https://img.shields.io/badge/Stacks-Mainnet-5546FF)](https://stacks.co)

TypeScript utilities for Stacks blockchain development - contract interactions, Clarity helpers, and transaction builders.

## Installation

```bash
npm install @giwaov/stacks-clarity-utils
```

## Features

- 📝 **Clarity Value Helpers** - Easy conversion between JS types and Clarity values
- 📜 **Contract Utilities** - Deploy and call smart contracts
- 💸 **Transaction Builders** - Send STX, estimate fees, track transactions
- 🌐 **Network Helpers** - Mainnet/Testnet configuration and validation
- 📊 **Constants** - Block times, fee defaults, error codes

## Usage

### Clarity Value Helpers

```typescript
import { toUint, toPrincipal, toAscii, stxToMicroStx } from '@giwaov/stacks-clarity-utils';

// Convert values for contract calls
const amount = toUint(stxToMicroStx(100));  // 100 STX
const recipient = toPrincipal('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
const memo = toAscii('Payment for services');
```

### Contract Calls

```typescript
import { executeContractCall, getNetwork } from '@giwaov/stacks-clarity-utils';

const result = await executeContractCall({
  contractAddress: 'SP3E0DQAHTXJHH5YT9TZCSBW013YXZB25QFDVXXWY',
  contractName: 'lottery',
  functionName: 'buy-ticket',
  functionArgs: [],
  senderKey: 'your-private-key',
  network: getNetwork('mainnet'),
});

console.log('Transaction ID:', result.txId);
```

### STX Transfers

```typescript
import { sendSTX, stxToMicroStx, getNetwork } from '@giwaov/stacks-clarity-utils';

const result = await sendSTX({
  recipient: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
  amount: stxToMicroStx(10), // 10 STX
  senderKey: 'your-private-key',
  network: getNetwork('mainnet'),
  memo: 'Coffee payment',
});
```

### Transaction Tracking

```typescript
import { waitForTransaction, getTransactionStatus, getNetwork } from '@giwaov/stacks-clarity-utils';

// Wait for confirmation
const confirmation = await waitForTransaction(txId, getNetwork('mainnet'));

// Or just check status
const status = await getTransactionStatus(txId, getNetwork('mainnet'));
```

### Network Utilities

```typescript
import { 
  getNetwork, 
  isValidStacksAddress, 
  getExplorerTxUrl 
} from '@giwaov/stacks-clarity-utils';

// Get network instance
const mainnet = getNetwork('mainnet');
const testnet = getNetwork('testnet');

// Validate addresses
isValidStacksAddress('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7'); // true

// Get explorer links
const explorerUrl = getExplorerTxUrl(txId, 'mainnet');
```

### Constants

```typescript
import { 
  MICRO_STX_PER_STX,
  BLOCKS_PER_DAY,
  DEFAULT_FEE,
  ERROR_CODES 
} from '@giwaov/stacks-clarity-utils';

// Use in your contracts
const dayBlocks = BLOCKS_PER_DAY; // 144
const fee = DEFAULT_FEE; // 2000 microSTX
```

## API Reference

### Clarity Helpers
- `toUint(value)` - Create uint Clarity value
- `toInt(value)` - Create int Clarity value
- `toBool(value)` - Create bool Clarity value
- `toPrincipal(address)` - Create principal Clarity value
- `toAscii(string)` - Create string-ascii Clarity value
- `toUtf8(string)` - Create string-utf8 Clarity value
- `toBuffer(hex)` - Create buffer from hex string
- `toList(values)` - Create list Clarity value
- `toTuple(data)` - Create tuple Clarity value
- `toNone()` - Create optional none
- `toSome(value)` - Create optional some
- `stxToMicroStx(stx)` - Convert STX to microSTX
- `microStxToStx(micro)` - Convert microSTX to STX

### Contract Functions
- `executeContractCall(params)` - Call a contract function
- `deployContract(params)` - Deploy a smart contract
- `buildContractId(address, name)` - Build contract identifier
- `parseContractId(id)` - Parse contract identifier

### Transaction Functions
- `sendSTX(params)` - Send STX tokens
- `getAccountNonce(address, network)` - Get account nonce
- `waitForTransaction(txId, network)` - Wait for confirmation
- `getTransactionStatus(txId, network)` - Get tx status

### Network Functions
- `getNetwork(type)` - Get network instance
- `getApiUrl(type)` - Get API URL
- `isValidStacksAddress(address)` - Validate address
- `getExplorerTxUrl(txId, network)` - Get explorer TX URL
- `getExplorerAddressUrl(address, network)` - Get explorer address URL

## License

MIT
