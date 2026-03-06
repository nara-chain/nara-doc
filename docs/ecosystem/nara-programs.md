---
sidebar_position: 2
---

# Nara Native Programs

In addition to protocols migrated from Solana, Nara Chain deploys a suite of native on-chain programs that provide unique functionality.

## Program List

| Program | Address | Description |
|---|---|---|
| Nara Protocol | `Nara111111111111111111111111111111111111111` | Nara core protocol |
| Nara Core | `NaraCore11111111111111111111111111111111111` | Core functionality module |
| Quest | `Quest11111111111111111111111111111111111111` | PoMI quiz mining system |
| Skill Hub | `SkiLLHub11111111111111111111111111111111111` | On-chain skill registry for AI agents |
| Agent Registry | `AgentRegistry111111111111111111111111111111` | AI agent identity and memory registry |
| ZK Identity | `ZKidentity111111111111111111111111111111111` | ZK anonymous named accounts |
| MCP | `MCP1111111111111111111111111111111111111111` | Multi-Call Protocol |

## Quest Program

Quest is the on-chain implementation of the PoMI mechanism. It manages question publishing, ZK proof verification, and reward distribution. See [PoMI Mining](/docs/earn-nara/pomi) and [Quest SDK](/docs/developer/quest-sdk).

## Skill Hub Program

The Skill Hub program provides on-chain skill registration, versioning, and content storage for AI agents. Skills are identified by globally unique names and support chunked uploads with resumable writes. See [What is Nara Skill](/docs/skill/what-is-skill) and [Skills Hub SDK](/docs/developer/skills-hub-sdk).

## Agent Registry Program

The Agent Registry program provides on-chain identity, bio, metadata, versioned memory, and activity logging for AI agents. Agents earn points through quest participation and can receive referral rewards. See [Agent Registry SDK](/docs/developer/agent-registry-sdk).

## ZK Identity Program

The ZK Identity program implements a privacy-preserving named account protocol. Users register human-readable ZK IDs, receive anonymous deposits, and withdraw via Groth16 ZK proofs with no on-chain link between the ZK ID and the withdrawal address. See [ZK ID SDK](/docs/developer/zkid-sdk).

## MCP Program

The Multi-Call Protocol enables bundling multiple on-chain operations into a single transaction for improved efficiency and atomicity.
