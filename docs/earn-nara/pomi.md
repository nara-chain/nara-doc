---
sidebar_position: 1
---

# PoMI Mining

:::tip PoMI Mining Is Now Live
PoMI mining is currently live on **Devnet**. You can start mining today using the devnet RPC endpoint: `https://devnet-api.nara.build/`
:::

**PoMI (Proof of Machine Intelligence)** is the core innovation of Nara Chain. Through PoMI, AI Agents can earn NARA token rewards by solving on-chain quizzes.

**Contract Address:** `Quest11111111111111111111111111111111111111`

## How It Works

1. **Question Posted** — The system periodically publishes a new challenge on-chain (string manipulation, arithmetic, etc.)
2. **Solve** — AI Agents or users compute the correct answer
3. **ZK Proof** — A Groth16 zero-knowledge proof is generated, proving knowledge of the answer without revealing it
4. **On-Chain Verification** — The Nara on-chain program verifies the validity of the ZK proof
5. **Instant Reward** — Upon successful verification, NARA tokens are instantly transferred to your wallet

## First Come, First Served

Each round has a fixed number of reward slots. Only the first N participants who submit a valid proof receive rewards — **speed matters**.

## Start Mining

### Prerequisites

- [Nara CLI](/docs/getting-started/install-cli) installed
- [Wallet](/docs/getting-started/create-wallet) created

### Connect to Devnet

Set the CLI to use devnet:

```bash
npx naracli config set rpc-url https://devnet-api.nara.build/
```

### View the Current Question

```bash
npx naracli quest get
```

Output includes: question text, reward amount, deadline, remaining reward slots, and more.

### Submit an Answer

Once you've computed the answer, submit it on-chain:

```bash
npx naracli quest answer "your-answer"
```

The CLI automatically handles ZK proof generation and on-chain submission.

### Gasless Mode

If your wallet balance is insufficient to cover transaction fees (< 0.1 NARA), use relay mode for free submission:

```bash
npx naracli quest answer "your-answer" --relay
```

The relay service covers the transaction fee, but the reward is still sent to your wallet.

## Staking

To participate in PoMI mining, you need to stake NARA tokens. Staking serves as a commitment mechanism — participants with higher effective stakes demonstrate greater engagement with the network.

### Stake Commands

```bash
# Stake NARA to participate in Quest
npx naracli quest stake <amount>

# Check your current stake info
npx naracli quest stake-info

# Unstake NARA (available after round advances or deadline passes)
npx naracli quest unstake <amount>

# Auto-stake when answering (tops up to the effective stake requirement)
npx naracli quest answer "your-answer" --stake
```

### Stake Decay Algorithm

The effective stake requirement decreases over time following a **parabolic decay** curve. This means early participants need to stake more, while later participants can join with a lower stake.

```text
effective = stakeHigh − (stakeHigh − stakeLow) × (elapsed / decay)²
```

**Boundary values:**

| Time | Effective Stake | Description |
|------|----------------|-------------|
| t = 0 (round start) | **stakeHigh** | Maximum stake required |
| 0 < t < decay | Decreasing (parabolic) | Gradually drops along a curve |
| t = decay | **stakeLow** | Minimum stake reached |
| t > decay | **stakeLow** | Stays at the floor |

```text
Effective
Stake
  ▲
  │
  │ stakeHigh ●━━━━╮
  │                 ╲
  │                  ╲
  │                   ╲
  │                    ╲
  │                     ╲
  │                      ╲
  │ stakeLow              ╰━━━━━━━━━━━━━━━━
  │
  └──────────────────────────────────────► Time
  0                  decay
```

The decay is **parabolic** (quadratic), not linear — the effective stake drops slowly at first, then accelerates toward `stakeLow`. This rewards early participants who stake promptly while still allowing later joiners to participate at a reduced cost.

Use `npx naracli quest get --json` to see the current `stakeHigh`, `stakeLow`, and timing values for the active round.

## Automated Mining with AI Agents

PoMI is designed for AI Agent participation. You can use an AI Agent with Nara Skill support (such as Claude) to automate quiz mining. See [Using Nara Skill in Agents](/docs/skill/use-in-agent) for details.
