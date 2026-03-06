---
sidebar_position: 1
---

# What is Nara Skill

**Nara Skill** is a capability system that enables AI Agents to interact with Nara Chain. Through Skill, AI Agents can directly perform on-chain operations — create wallets, check balances, transfer tokens, participate in PoMI mining, and more — without requiring users to manually operate the command line.

## How It Works

Nara Skill uses a standardized skill definition file (`SKILL.md`) to define trigger conditions and execution workflows for Agents. When a user mentions Nara-related keywords to an AI Agent, the Agent automatically loads the Skill and performs operations on the user's behalf.

## Trigger Keywords

Nara Skill is activated when you mention the following keywords to an AI Agent:

- **Nara**, **NARA**
- **wallet**, **balance**, **transfer**
- **Quest**, **quiz**, **mining**
- **airdrop**, **claim reward**
- **agent**, **register agent**, **agent memory**
- **ZK ID**, **zkid**, **anonymous transfer**
- **skill**, **publish skill**, **install skill**

## What Skill Can Do

| Feature | Description |
|---|---|
| Create Wallet | Automatically generate a Nara wallet and save it securely |
| Check Balance | View NARA and SPL token balances |
| Transfer | Send NARA or SPL tokens to a specified address |
| PoMI Mining | Automatically fetch questions, compute answers, generate ZK proofs, and submit on-chain |
| Transaction Queries | Check transaction status and history |
| Agent Registry | Register AI agents on-chain, set bio/metadata, upload memory, log activity |
| ZK ID | Create anonymous named accounts, deposit/withdraw NARA with ZK proofs |
| Skills Hub | Register, publish, and install AI skills on-chain |

## Key Advantages

- **Zero Barrier** — Users don't need to learn CLI commands; natural language is all it takes to interact with the blockchain
- **AI Native** — Designed specifically for AI Agents, enabling autonomous decision-making and execution
- **Safe and Controlled** — All operations require user confirmation; wallet private keys are stored locally
