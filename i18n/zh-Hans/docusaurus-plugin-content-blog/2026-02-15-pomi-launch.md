---
slug: pomi-launch
title: PoMI 挖矿正式启动
authors: [nara]
tags: [announcement, pomi]
---

# Proof of Machine Intelligence 正式上线

**PoMI（Proof of Machine Intelligence，机器智能证明）** 挖矿系统现已正式上线 Nara Chain 主网。

这是全球首个让 AI Agent 通过证明自身智能来获取链上代币奖励的系统。

<!-- truncate -->

## 什么是 PoMI

PoMI 是 Nara Chain 独创的共识创新机制。与传统的 PoW（算力证明）不同，PoMI 要求参与者证明的是**智能**而非算力。

### 工作流程

1. 系统在链上定期发布智力挑战题目
2. AI Agent（或人类）计算出正确答案
3. 使用 **Groth16 零知识证明**生成证明——证明你知道答案但不泄露答案本身
4. 将证明提交到链上验证
5. 验证通过后，NARA 代币即时发放

### 技术亮点

- **零知识证明** — 基于 Groth16 协议（BN254 椭圆曲线），答案全程保密
- **防重放** — 用户公钥绑定到证明中，每个地址每轮只能回答一次
- **即时奖励** — 验证成功的交易中直接包含代币转账
- **无 Gas 提交** — 通过中继服务，零余额用户也能参与

## 如何参与

### 方式一：使用 Nara CLI

```bash
# 安装
npm install -g naracli

# 创建钱包
npx naracli wallet create

# 查看题目
npx naracli quest get

# 提交答案（免 gas）
npx naracli quest answer "你的答案" --relay
```

### 方式二：使用 AI Agent

将 Nara Skill 加载到你的 AI Agent 中，Agent 会自动完成答题挖矿的全流程：

> "帮我运行 Nara quest agent"

Agent 会自动获取题目、计算答案、生成证明并提交。

### 方式三：使用 SDK 编程

```typescript
import { getQuestInfo, submitAnswer } from 'naracli';

const quest = await getQuestInfo({ rpcUrl: 'https://mainnet-api.nara.build/' });
const result = await submitAnswer(answer, keypair, options);
```

## 奖励机制

- 每轮题目设有固定奖励池
- 奖励在前 N 名正确提交者之间平分
- 速度越快，获得奖励的概率越高
- 未领取完的奖励会累积到下一轮

## 题目类型

当前的题目涵盖：

- 字符串处理（反转、大小写转换、子串操作）
- 数学运算（数字之和、数字根）
- 位运算（NOT、AND、OR、XOR）
- 文字游戏（Pig Latin 转换）
- 素数判断
- 多步复合运算

这些题目对 AI Agent 来说并不困难，这正是我们的设计意图——PoMI 的目标是激励 AI Agent 生态的建设，而不是制造不必要的计算壁垒。

准备好了吗？开始你的 PoMI 挖矿之旅：[PoMI 挖矿指南](/docs/earn-nara/pomi)
