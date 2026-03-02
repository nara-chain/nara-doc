---
sidebar_position: 2
---

# Quest SDK

Quest SDK 提供了与 PoMI 系统编程交互的能力，你可以在代码中实现自动化的答题挖矿流程。

## 核心概念

### 零知识证明（ZK Proof）

Quest 系统使用 **Groth16** 零知识证明协议（基于 BN254 椭圆曲线）。当你提交答案时：

1. 你的答案通过 **Poseidon 哈希** 进行处理
2. ZK 电路验证 `Poseidon(你的答案) == 链上存储的答案哈希`
3. 你的公钥被绑定到证明中，防止重放攻击
4. 链上程序验证证明有效性后发放奖励

整个过程中，**你的答案永远不会被公开**。

## API 参考

### getQuestInfo

获取当前题目信息。

```typescript
import { getQuestInfo, type QuestOptions } from 'naracli';

const options: QuestOptions = {
  rpcUrl: 'https://mainnet-api.nara.build/',
};

const quest = await getQuestInfo(options);
console.log('题目:', quest.question);
console.log('奖励:', quest.rewardAmount);
console.log('剩余时间:', quest.timeRemaining);
```

返回的 `QuestInfo` 包含：

| 字段 | 类型 | 说明 |
|---|---|---|
| `question` | `string` | 题目内容 |
| `rewardAmount` | `number` | 总奖励金额 |
| `rewardPerWinner` | `number` | 每个获胜者的奖励 |
| `rewardCount` | `number` | 奖励名额数量 |
| `winnerCount` | `number` | 已获奖人数 |
| `deadline` | `number` | 截止时间戳 |
| `timeRemaining` | `number` | 剩余秒数 |
| `isActive` | `boolean` | 题目是否有效 |

### hasAnswered

检查当前钱包是否已回答过本轮题目。

```typescript
import { hasAnswered } from 'naracli';

const answered = await hasAnswered(walletPublicKey, options);
if (answered) {
  console.log('本轮已回答，等待下一轮');
}
```

### generateProof

根据答案生成 ZK 证明。

```typescript
import { generateProof } from 'naracli';

const proof = await generateProof(answer, walletPublicKey);
// proof 包含 proofA, proofB, proofC（Groth16 证明组件）
```

### submitAnswer

直接提交答案到链上（需要钱包有足够余额支付 gas）。

```typescript
import { submitAnswer } from 'naracli';

const result = await submitAnswer(answer, keypair, options);
console.log('交易签名:', result.signature);
```

### submitAnswerViaRelay

通过中继服务提交答案（免 gas）。

```typescript
import { submitAnswerViaRelay } from 'naracli';

const result = await submitAnswerViaRelay(answer, keypair, {
  ...options,
  relayUrl: 'https://quest-api.nara.build/',
});
console.log('提交结果:', result);
```

### parseQuestReward

从交易日志中解析奖励信息。

```typescript
import { parseQuestReward } from 'naracli';

const reward = parseQuestReward(transactionLogs);
console.log('获得奖励:', reward);
```

## 完整示例：自动挖矿

```typescript
import {
  getQuestInfo,
  hasAnswered,
  submitAnswer,
  parseQuestReward,
} from 'naracli';
import { Keypair } from '@solana/web3.js';
import fs from 'fs';

// 加载钱包
const keypairData = JSON.parse(
  fs.readFileSync('~/.config/nara/id.json', 'utf-8')
);
const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));

const options = {
  rpcUrl: 'https://mainnet-api.nara.build/',
};

// 获取题目
const quest = await getQuestInfo(options);
if (!quest.isActive) {
  console.log('当前没有活跃题目');
  process.exit(0);
}

// 检查是否已回答
if (await hasAnswered(keypair.publicKey, options)) {
  console.log('本轮已回答');
  process.exit(0);
}

// 计算答案（此处需要你的逻辑）
const answer = solveQuestion(quest.question);

// 提交
const result = await submitAnswer(answer, keypair, options);
console.log('提交成功:', result.signature);
```
