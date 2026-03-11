---
sidebar_position: 1
---

# Overview

`nara-sdk` is a TypeScript/JavaScript SDK for interacting with Nara Chain programmatically. It provides modules for Quest (PoMI mining), ZK ID (anonymous transfers), Agent Registry, and Skills Hub.

## Installation

```bash
npm install nara-sdk
```

## Basic Usage

### Connect to Nara Chain

```typescript
import { NaraSDK } from 'nara-sdk';

const sdk = new NaraSDK({
  rpcUrl: 'https://mainnet-api.nara.build/',
  commitment: 'confirmed',
});
```

### Using Solana Web3.js

Since Nara is fully Solana-compatible, you can also use `@solana/web3.js` directly:

```typescript
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://mainnet-api.nara.build/', 'confirmed');

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
import { NaraSDK, type NaraSDKConfig } from 'nara-sdk';

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
} from 'nara-sdk';

// ZK ID functions
import {
  deriveIdSecret,
  createZkId,
  getZkIdInfo,
  deposit,
  scanClaimableDeposits,
  withdraw,
  transferZkId,
  generateValidRecipient,
  isValidRecipient,
  ZKID_DENOMINATIONS,
} from 'nara-sdk';

// Agent Registry functions
import {
  registerAgent,
  getAgentRecord,
  getAgentInfo,
  getAgentMemory,
  setBio,
  setMetadata,
  uploadMemory,
  logActivity,
  deleteAgent,
} from 'nara-sdk';

// Skills Hub functions
import {
  registerSkill,
  getSkillInfo,
  getSkillContent,
  setDescription,
  updateMetadata,
  uploadSkillContent,
  transferAuthority,
  deleteSkill,
} from 'nara-sdk';

// Solana base types (convenience re-exports)
import { PublicKey, Keypair, Transaction } from 'nara-sdk';
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `RPC_URL` | `https://mainnet-api.nara.build/` | Solana RPC endpoint |
| `QUEST_RELAY_URL` | `https://quest-api.nara.build/` | Gasless relay for quest submissions |
| `QUEST_PROGRAM_ID` | `Quest11111111111111111111111111111111111111` | Quest program address |
| `SKILLS_PROGRAM_ID` | `SkiLLHub11111111111111111111111111111111111` | Skills Hub program address |
| `ZKID_PROGRAM_ID` | `ZKidentity111111111111111111111111111111111` | ZK ID program address |
| `AGENT_REGISTRY_PROGRAM_ID` | `AgentRegistry111111111111111111111111111111` | Agent Registry program address |

## Next Steps

- [Quest SDK](/docs/developer/quest-sdk) — Learn how to implement PoMI mining in code
- [ZK ID SDK](/docs/developer/zkid-sdk) — Anonymous named accounts with ZK proofs
- [Agent Registry SDK](/docs/developer/agent-registry-sdk) — Register and manage AI agents on-chain
- [Skills Hub SDK](/docs/developer/skills-hub-sdk) — Publish and manage AI skills on-chain
- [CLI Reference](/docs/developer/cli-reference) — View all CLI commands
