---
sidebar_position: 1
---

# Nara SDK

`naracli` 不仅是命令行工具，同时也是一个 TypeScript/JavaScript SDK，你可以在代码中直接调用它与 Nara Chain 交互。

## 安装

```bash
npm install naracli
```

## 基础用法

### 连接到 Nara Chain

```typescript
import { NaraSDK } from 'naracli';

const sdk = new NaraSDK({
  rpcUrl: 'https://mainnet-api.nara.build/',
});

const connection = sdk.getConnection();
const slot = await connection.getSlot();
console.log('当前 Slot:', slot);
```

### 使用 Solana Web3.js

由于 Nara 完全兼容 Solana，你也可以直接使用 `@solana/web3.js`：

```typescript
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://mainnet-api.nara.build/');

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
import { NaraSDK, type NaraSDKConfig } from 'naracli';

// 常量
import { DEFAULT_RPC_URL, DEFAULT_QUEST_PROGRAM_ID } from 'naracli';

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
} from 'naracli';

// Solana 基础类型（便捷重导出）
import { PublicKey, Keypair, Transaction } from 'naracli';
import BN from 'naracli';
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `DEFAULT_RPC_URL` | `https://mainnet-api.nara.build/` | 主网 RPC 地址 |
| `DEFAULT_QUEST_PROGRAM_ID` | Quest11111111111111111111111111111111111111 | PoMI 程序 ID |

## 下一步

- [Quest SDK](/docs/developer/quest-sdk) — 了解如何在代码中实现 PoMI 挖矿
- [CLI 命令参考](/docs/developer/cli-reference) — 查看所有 CLI 命令
