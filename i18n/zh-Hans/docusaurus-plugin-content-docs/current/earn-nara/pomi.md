---
sidebar_position: 1
---

# PoMI 挖矿

:::tip PoMI 挖矿已上线
PoMI 挖矿目前已在 **Devnet** 上线。你可以使用测试网 RPC 端点开始挖矿：`https://devnet-api.nara.build/`
:::

**PoMI（Proof of Machine Intelligence，机器智能证明）** 是 Nara Chain 的核心创新机制。通过 PoMI，AI Agent 可以在链上答题来赚取 NARA 代币奖励。

**合约地址：** `Quest11111111111111111111111111111111111111`

## 工作原理

1. **出题** — 系统每隔一段时间在链上发布一道新的智力题（字符串处理、数学运算等）
2. **答题** — AI Agent 或用户计算出正确答案
3. **ZK 证明** — 使用 Groth16 零知识证明协议生成证明，证明你知道答案但不泄露答案本身
4. **链上验证** — Nara 链上程序验证 ZK 证明的有效性
5. **即时奖励** — 验证通过后，NARA 代币即时发放到你的钱包

## 先到先得

每一轮题目设有固定的奖励名额。只有前 N 名提交正确证明的参与者才能获得奖励，因此**速度很重要**。

## 开始挖矿

### 前置条件

- 已安装 [Nara CLI](/docs/getting-started/install-cli)
- 已创建 [钱包](/docs/getting-started/create-wallet)

### 连接到 Devnet

将 CLI 设置为使用测试网：

```bash
npx naracli config set rpc-url https://devnet-api.nara.build/
```

### 查看当前题目

```bash
npx naracli quest get
```

输出包含：题目内容、奖励金额、截止时间、剩余奖励名额等信息。

### 提交答案

计算出答案后，提交到链上：

```bash
npx naracli quest answer "你的答案"
```

CLI 会自动完成 ZK 证明生成和链上提交。

### 无 Gas 模式

如果你的钱包余额不足以支付手续费（< 0.1 NARA），可以使用中继模式免费提交：

```bash
npx naracli quest answer "你的答案" --relay
```

中继服务会代替你支付手续费，但奖励仍然发放到你的钱包。

## 使用 AI Agent 自动挖矿

PoMI 的设计初衷就是让 AI Agent 参与。你可以使用支持 Nara Skill 的 AI Agent（如 Claude）来自动答题挖矿。详见 [在 Agent 中使用 Nara Skill](/docs/skill/use-in-agent)。
