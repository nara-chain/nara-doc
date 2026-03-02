---
slug: nara-skill-launch
title: "Nara Skill Is Now Live"
authors: [nara]
tags: [announcement, skill]
---

# Nara Skill — Let AI Agents Operate On-Chain

**Nara Skill** is now available — a capability system that lets AI Agents interact directly with the Nara Chain. Install it with a single command and your Agent can create wallets, check balances, transfer tokens, and mine PoMI — all through natural language.

<!-- truncate -->

## What Is Nara Skill

Nara Skill bridges the gap between AI Agents and blockchain. Instead of learning CLI commands or writing code, you simply tell your AI Agent what you want — and it handles the rest.

> "Create a Nara wallet for me"
>
> "What's my NARA balance?"
>
> "Run the quest agent to mine PoMI"

The Agent automatically loads the Skill definition, executes on-chain operations, and reports back — all within your existing workflow.

## Supported AI Agents

Nara Skill works with any Agent that supports the Skills protocol:

- **Claude Code** — Anthropic's coding agent
- **OpenClaw** — Open-source AI agent
- **Codex** — OpenAI's coding agent

More agents will be supported as the Skills ecosystem grows.

## Installation

One command is all it takes:

```bash
npx skills add https://github.com/nara-chain/nara-cli --skill nara-cli
```

**Prerequisites:** Node.js 20+ must be installed on your system.

:::warning Security Note
Always review Skill source code before installation. Only install Skills from trusted sources. Nara Skill's source code is fully open at [github.com/nara-chain/nara-cli](https://github.com/nara-chain/nara-cli).
:::

## What Skill Can Do

| Feature | Description |
|---|---|
| **Create Wallet** | Generate a new Nara wallet with BIP39 mnemonic |
| **Check Balance** | View NARA and SPL token balances |
| **Transfer** | Send NARA or SPL tokens to any address |
| **PoMI Mining** | Fetch questions, compute answers, generate ZK proofs, and submit on-chain |
| **Transaction Queries** | Check transaction status and history |

## How It Works Under the Hood

Nara Skill uses a `SKILL.md` definition file that tells the Agent:

1. **When to activate** — Trigger keywords like "Nara", "wallet", "balance", "quest", "mining"
2. **What tools are available** — CLI commands the Agent can execute
3. **How to execute** — Step-by-step workflows for each operation

The Agent reads this definition, understands the available capabilities, and autonomously decides which tools to use based on your request.

## Key Advantages

- **Zero Barrier** — No CLI knowledge needed; natural language is all it takes
- **AI Native** — Designed for autonomous Agent execution, not human operation
- **Safe and Controlled** — All operations require user confirmation; private keys stay local
- **Open Source** — Full source code available for review

## Get Started

Install the Skill and try it out:

```bash
npx skills add https://github.com/nara-chain/nara-cli --skill nara-cli
```

Then ask your Agent: *"Create a Nara wallet for me"*

Learn more: [What is Nara Skill](/docs/skill/what-is-skill) | [Using Skill in AI Agents](/docs/skill/use-in-agent)
