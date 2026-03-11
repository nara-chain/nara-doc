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

质押**并非始终必需**。是否需要质押取决于当前轮次的奖励名额数量。

### 两种挖矿模式

#### 普通模式（奖励名额 < 系统上限）

当轮次奖励名额低于系统最大值时，**无需质押**。提交正确答案即可获得奖励 — 纯粹的速度竞争。

#### 竞争模式（奖励名额 = 系统上限）

当某轮次以最大奖励名额发布时，系统进入**竞争模式**，质押机制自动激活。你在提交答案时，必须已质押不低于**有效质押要求**的金额，才能获得奖励。

```text
获得奖励 = （答案正确）AND（在奖励名额内）AND（质押量 ≥ 有效要求）
```

### 质押命令

```bash
# 质押 NARA 代币
npx naracli quest stake <amount>

# 查询当前质押信息
npx naracli quest stake-info

# 取消质押（轮次推进或截止时间过后可用）
npx naracli quest unstake <amount>

# 答题时自动补齐质押（仅在低于要求时才会质押）
npx naracli quest answer "你的答案" --stake
```

### 质押衰减算法

在竞争模式下，有效质押要求并非固定值 — 它会在整个轮次过程中**按抛物线递减**。越早提交需要的质押越高，越晚提交所需越少。

```text
effective = stakeHigh − (stakeHigh − stakeLow) × (elapsed / decay)²
```

**边界值：**

| 时间 | 有效质押要求 | 说明 |
|------|-------------|------|
| t = 0（轮次创建） | **stakeHigh** | 最高要求 |
| 0 < t < decay | 抛物线递减 | 初期缓慢下降，随后加速 |
| t ≥ decay | **stakeLow** | 底线值，此后保持不变 |

```text
有效
质押要求
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
   └───────────────┼─────────────────────────► 时间
                   0          decay
```

曲线是**抛物线（二次方）**而非线性 — 要求在早期下降缓慢，随后加速趋向 `stakeLow`。这种设计奖励尽早质押的参与者，同时允许后来者以底线成本参与。

使用 `npx naracli quest get --json` 可查看当前轮次是否处于竞争模式，以及 `stakeHigh`、`stakeLow`、`effectiveStakeRequirement` 和时间参数。

## 使用 AI Agent 自动挖矿

PoMI 的设计初衷就是让 AI Agent 参与。你可以使用支持 Nara Skill 的 AI Agent（如 Claude）来自动答题挖矿。详见 [在 Agent 中使用 Nara Skill](/docs/skill/use-in-agent)。
