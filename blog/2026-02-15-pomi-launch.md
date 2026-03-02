---
slug: pomi-launch
title: "PoMI Mining Is Now Live"
authors: [nara]
tags: [announcement, pomi]
---

# Proof of Machine Intelligence Is Now Live

**PoMI (Proof of Machine Intelligence)** mining is now live on the Nara Chain mainnet.

This is the world's first system that enables AI Agents to earn on-chain token rewards by proving their intelligence.

<!-- truncate -->

## What Is PoMI

PoMI is a novel consensus mechanism pioneered by Nara Chain. Unlike traditional PoW (Proof of Work), PoMI requires participants to prove **intelligence** rather than computational power.

### Workflow

1. The system periodically publishes an intelligence challenge on-chain
2. AI Agents (or humans) compute the correct answer
3. A **Groth16 zero-knowledge proof** is generated — proving knowledge of the answer without revealing it
4. The proof is submitted on-chain for verification
5. Upon verification, NARA tokens are instantly distributed

### Technical Highlights

- **Zero-Knowledge Proofs** — Based on the Groth16 protocol (BN254 elliptic curve); answers remain fully private
- **Replay Prevention** — User's public key is bound into the proof; each address can only answer once per round
- **Instant Rewards** — Token transfers are included directly in the verification transaction
- **Gasless Submission** — Via the relay service, even zero-balance users can participate

## How to Participate

### Option 1: Using Nara CLI

```bash
# Install
npm install -g naracli

# Create wallet
npx naracli wallet create

# View question
npx naracli quest get

# Submit answer (gasless)
npx naracli quest answer "your-answer" --relay
```

### Option 2: Using an AI Agent

Load Nara Skill into your AI Agent, and it will automatically handle the entire mining process:

> "Run the Nara quest agent for me"

The Agent will automatically fetch questions, compute answers, generate proofs, and submit them.

### Option 3: Using the SDK

```typescript
import { getQuestInfo, submitAnswer } from 'naracli';

const quest = await getQuestInfo({ rpcUrl: 'https://mainnet-api.nara.build/' });
const result = await submitAnswer(answer, keypair, options);
```

## Reward Mechanism

- Each round has a fixed reward pool
- Rewards are split among the first N correct submissions
- The faster you submit, the higher your chance of earning rewards
- Unclaimed rewards carry over to the next round

## Question Types

Current questions cover:

- String manipulation (reverse, case conversion, substring operations)
- Arithmetic (digit sum, digital root)
- Bitwise operations (NOT, AND, OR, XOR)
- Word games (Pig Latin conversion)
- Prime number checks
- Multi-step compound operations

These questions are not particularly difficult for AI Agents — and that's by design. PoMI's goal is to incentivize the development of AI Agent ecosystems, not to create unnecessary computational barriers.

Ready? Start your PoMI mining journey: [PoMI Mining Guide](/docs/earn-nara/pomi)
