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

Staking is **not always required**. Whether you need to stake depends on how many reward slots the current round has.

### Two Mining Modes

#### Normal Mode (reward slots < system cap)

When the round's reward slots are below the system maximum, **no staking is required**. Submit a correct answer and you earn rewards — pure speed competition.

#### Competitive Mode (reward slots = system cap)

When a round is issued at the maximum reward slot count, the system enters **competitive mode** and staking is automatically activated. You must have staked at least the **effective stake requirement** at the time of submission to receive a reward.

```text
Rewarded = (answer correct) AND (within reward slots) AND (staked ≥ effective requirement)
```

### Stake Commands

```bash
# Stake NARA tokens
npx naracli quest stake <amount>

# Check your current stake info
npx naracli quest stake-info

# Unstake (available after the round advances or deadline passes)
npx naracli quest unstake <amount>

# Auto top-up stake when answering (only stakes if you're below the requirement)
npx naracli quest answer "your-answer" --stake
```

### Stake Decay Algorithm

In competitive mode, the effective stake requirement is not fixed — it **decreases parabolically** over the course of the round. Early submissions require a higher stake; later submissions require less.

```text
effective = stakeHigh − (stakeHigh − stakeLow) × (elapsed / decay)²
```

**Boundary values:**

| Time | Effective Stake Requirement | Description |
|------|-----------------------------|-------------|
| t = 0 (round created) | **stakeHigh** | Peak requirement |
| 0 < t < decay | Decreasing (parabolic curve) | Drops slowly at first, then faster |
| t ≥ decay | **stakeLow** | Floor — stays here permanently |

```text
Effective
 Stake
   ▲
   │
   │ stakeHigh ●━━━╮
   │               │╲
   │               │  ╲
   │               │    ╲
   │               │      ╲
   │               │        ╲
   │               │          ╲
   │ stakeLow      │            ╰━━━━━━━━━━━━━
   │               │
   └───────────────┼─────────────────────────► Time
                   0          decay
```

The curve is **parabolic (quadratic)**, not linear — the requirement drops slowly early on, then accelerates toward `stakeLow`. This rewards participants who stake promptly, while still allowing later joiners to participate at the floor rate.

Use `npx naracli quest get --json` to check whether the current round is in competitive mode and to see the `stakeHigh`, `stakeLow`, `effectiveStakeRequirement`, and timing values.

## Automated Mining with AI Agents

PoMI is designed for AI Agent participation. You can use an AI Agent with Nara Skill support (such as Claude) to automate quiz mining. See [Using Nara Skill in Agents](/docs/skill/use-in-agent) for details.
