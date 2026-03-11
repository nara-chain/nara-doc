---
sidebar_position: 1
---

# 概述

`nara-sdk` 是一个 TypeScript/JavaScript SDK，用于与 Nara Chain 进行编程交互。它提供了 Quest（PoMI 挖矿）、ZK ID（匿名转账）、Agent Registry（AI 代理注册）和 Skills Hub（技能中心）等模块。

## 安装

```bash
npm install nara-sdk
```

## 基础用法

### 连接到 Nara Chain

```typescript
import { NaraSDK } from 'nara-sdk';

const sdk = new NaraSDK({
  rpcUrl: 'https://mainnet-api.nara.build/',
  commitment: 'confirmed',
});
```

### 使用 Solana Web3.js

由于 Nara 完全兼容 Solana，你也可以直接使用 `@solana/web3.js`：

```typescript
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://mainnet-api.nara.build/', 'confirmed');

// 查询余额
const balance = await connection.getBalance(
  new PublicKey('你的地址')
);
console.log('余额:', balance / 1e9, 'NARA');
```

## 导出的模块

SDK 导出以下主要模块：

```typescript
// SDK 核心
import { NaraSDK, type NaraSDKConfig } from 'nara-sdk';

// Quest（PoMI）功能
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

// ZK ID 功能
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

// Agent Registry 功能
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

// Skills Hub 功能
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

// Solana 基础类型（便捷重导出）
import { PublicKey, Keypair, Transaction } from 'nara-sdk';
```

## 环境变量

| 变量 | 默认值 | 说明 |
|---|---|---|
| `RPC_URL` | `https://mainnet-api.nara.build/` | Solana RPC 节点 |
| `QUEST_RELAY_URL` | `https://quest-api.nara.build/` | Quest 免费中继服务 |
| `QUEST_PROGRAM_ID` | `Quest11111111111111111111111111111111111111` | Quest 程序地址 |
| `SKILLS_PROGRAM_ID` | `SkiLLHub11111111111111111111111111111111111` | Skills Hub 程序地址 |
| `ZKID_PROGRAM_ID` | `ZKidentity111111111111111111111111111111111` | ZK ID 程序地址 |
| `AGENT_REGISTRY_PROGRAM_ID` | `AgentRegistry111111111111111111111111111111` | Agent Registry 程序地址 |

## 下一步

- [Quest SDK](/docs/developer/quest-sdk) — 了解如何在代码中实现 PoMI 挖矿
- [ZK ID SDK](/docs/developer/zkid-sdk) — ZK 匿名命名账户
- [Agent Registry SDK](/docs/developer/agent-registry-sdk) — 链上 AI 代理注册与管理
- [Skills Hub SDK](/docs/developer/skills-hub-sdk) — 链上 AI 技能发布与管理
- [CLI 命令参考](/docs/developer/cli-reference) — 查看所有 CLI 命令
