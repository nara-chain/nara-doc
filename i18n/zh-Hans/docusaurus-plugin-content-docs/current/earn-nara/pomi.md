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

## 质押

参与 PoMI 挖矿需要质押 NARA 代币。质押是一种承诺机制 — 有效质押量越高的参与者，表明对网络的参与度越高。

### 质押命令

```bash
# 质押 NARA 以参与 Quest
npx naracli quest stake <amount>

# 查询当前质押信息
npx naracli quest stake-info

# 取消质押（轮次推进或截止时间过后可用）
npx naracli quest unstake <amount>

# 答题时自动质押（补齐到有效质押要求）
npx naracli quest answer "你的答案" --stake
```

### 质押衰减算法

有效质押要求随时间推移按**抛物线衰减**曲线递减。这意味着早期参与者需要更多质押，而后来的参与者可以用更低的质押加入。

```text
effective = stakeHigh − (stakeHigh − stakeLow) × (elapsed / decay)²
```

**边界值：**

| 时间 | 有效质押量 | 说明 |
|------|-----------|------|
| t = 0（轮次开始） | **stakeHigh** | 最大质押要求 |
| 0 < t < decay | 递减（抛物线） | 沿曲线逐步下降 |
| t = decay | **stakeLow** | 达到最低质押 |
| t > decay | **stakeLow** | 保持在最低值 |

```text
有效
质押量
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
  └──────────────────────────────────────► 时间
  0                  decay
```

衰减是**抛物线**（二次方）而非线性的 — 有效质押量起初下降缓慢，然后加速趋向 `stakeLow`。这种设计奖励尽早质押的参与者，同时仍允许后来者以较低的成本参与。

使用 `npx naracli quest get --json` 可以查看当前轮次的 `stakeHigh`、`stakeLow` 和时间参数。

## 使用 AI Agent 自动挖矿

PoMI 的设计初衷就是让 AI Agent 参与。你可以使用支持 Nara Skill 的 AI Agent（如 Claude）来自动答题挖矿。详见 [在 Agent 中使用 Nara Skill](/docs/skill/use-in-agent)。
