---
sidebar_position: 1
---

# Nara SDK

`naracli` is not only a command-line tool but also a TypeScript/JavaScript SDK. You can import it directly into your code to interact with Nara Chain programmatically.

## Installation

```bash
npm install naracli
```

## Basic Usage

### Connect to Nara Chain

```typescript
import { NaraSDK } from 'naracli';

const sdk = new NaraSDK({
  rpcUrl: 'https://mainnet-api.nara.build/',
});

const connection = sdk.getConnection();
const slot = await connection.getSlot();
console.log('Current Slot:', slot);
```

### Using Solana Web3.js

Since Nara is fully Solana-compatible, you can also use `@solana/web3.js` directly:

```typescript
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://mainnet-api.nara.build/');

// Check balance
const balance = await connection.getBalance(
  new PublicKey('your-address')
);
console.log('Balance:', balance / 1e9, 'NARA');
```

## Exported Modules

The SDK exports the following main modules:

```typescript
// SDK core
import { NaraSDK, type NaraSDKConfig } from 'naracli';

// Constants
import { DEFAULT_RPC_URL, DEFAULT_QUEST_PROGRAM_ID } from 'naracli';

// Quest (PoMI) functions
import {
  getQuestInfo,
  hasAnswered,
  generateProof,
  submitAnswer,
  submitAnswerViaRelay,
  parseQuestReward,
  type QuestInfo,
  type ZkProof,
  type SubmitAnswerResult,
  type SubmitRelayResult,
  type QuestOptions,
} from 'naracli';

// Solana base types (convenience re-exports)
import { PublicKey, Keypair, Transaction } from 'naracli';
import BN from 'naracli';
```

## Constants

| Constant | Value | Description |
|---|---|---|
| `DEFAULT_RPC_URL` | `https://mainnet-api.nara.build/` | Mainnet RPC URL |
| `DEFAULT_QUEST_PROGRAM_ID` | Quest11111111111111111111111111111111111111 | PoMI program ID |

## Next Steps

- [Quest SDK](/docs/developer/quest-sdk) — Learn how to implement PoMI mining in code
- [CLI Reference](/docs/developer/cli-reference) — View all CLI commands
