---
sidebar_position: 2
---

# Quest SDK

The Quest SDK provides programmatic access to the PoMI system, allowing you to build automated quiz mining workflows in code.

## Core Concepts

### Zero-Knowledge Proofs (ZK Proofs)

The Quest system uses the **Groth16** zero-knowledge proof protocol (on the BN254 elliptic curve). When you submit an answer:

1. Your answer is processed through a **Poseidon hash**
2. The ZK circuit verifies that `Poseidon(your_answer) == on-chain_answer_hash`
3. Your public key is bound into the proof to prevent replay attacks
4. The on-chain program verifies the proof and distributes the reward

Throughout this process, **your answer is never revealed**.

## API Reference

### getQuestInfo

Fetch the current question information.

```typescript
import { getQuestInfo, type QuestOptions } from 'naracli';

const options: QuestOptions = {
  rpcUrl: 'https://mainnet-api.nara.build/',
};

const quest = await getQuestInfo(options);
console.log('Question:', quest.question);
console.log('Reward:', quest.rewardAmount);
console.log('Time remaining:', quest.timeRemaining);
```

The returned `QuestInfo` contains:

| Field | Type | Description |
|---|---|---|
| `question` | `string` | Question text |
| `rewardAmount` | `number` | Total reward amount |
| `rewardPerWinner` | `number` | Reward per winner |
| `rewardCount` | `number` | Number of reward slots |
| `winnerCount` | `number` | Current number of winners |
| `deadline` | `number` | Deadline timestamp |
| `timeRemaining` | `number` | Seconds remaining |
| `isActive` | `boolean` | Whether the question is active |

### hasAnswered

Check if the current wallet has already answered the current round.

```typescript
import { hasAnswered } from 'naracli';

const answered = await hasAnswered(walletPublicKey, options);
if (answered) {
  console.log('Already answered this round, waiting for the next one');
}
```

### generateProof

Generate a ZK proof from an answer.

```typescript
import { generateProof } from 'naracli';

const proof = await generateProof(answer, walletPublicKey);
// proof contains proofA, proofB, proofC (Groth16 proof components)
```

### submitAnswer

Submit an answer directly on-chain (requires sufficient wallet balance for gas).

```typescript
import { submitAnswer } from 'naracli';

const result = await submitAnswer(answer, keypair, options);
console.log('Transaction signature:', result.signature);
```

### submitAnswerViaRelay

Submit an answer through the relay service (gasless).

```typescript
import { submitAnswerViaRelay } from 'naracli';

const result = await submitAnswerViaRelay(answer, keypair, {
  ...options,
  relayUrl: 'https://quest-api.nara.build/',
});
console.log('Submission result:', result);
```

### parseQuestReward

Parse reward information from transaction logs.

```typescript
import { parseQuestReward } from 'naracli';

const reward = parseQuestReward(transactionLogs);
console.log('Reward received:', reward);
```

## Full Example: Automated Mining

```typescript
import {
  getQuestInfo,
  hasAnswered,
  submitAnswer,
  parseQuestReward,
} from 'naracli';
import { Keypair } from '@solana/web3.js';
import fs from 'fs';

// Load wallet
const keypairData = JSON.parse(
  fs.readFileSync('~/.config/nara/id.json', 'utf-8')
);
const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));

const options = {
  rpcUrl: 'https://mainnet-api.nara.build/',
};

// Fetch question
const quest = await getQuestInfo(options);
if (!quest.isActive) {
  console.log('No active question');
  process.exit(0);
}

// Check if already answered
if (await hasAnswered(keypair.publicKey, options)) {
  console.log('Already answered this round');
  process.exit(0);
}

// Compute answer (your logic here)
const answer = solveQuestion(quest.question);

// Submit
const result = await submitAnswer(answer, keypair, options);
console.log('Submitted successfully:', result.signature);
```
