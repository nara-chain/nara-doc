---
sidebar_position: 2
---

# 在 Agent 中使用 Nara Skill

Nara Skill 可以集成到支持 Skill 系统的 AI Agent 中，让 Agent 自动执行 Nara Chain 上的操作。

## 支持的 AI Agent

[OpenClaw](https://openclaw.org/)、[Claude Code](https://claude.com/claude-code)、[Codex](https://openai.com/codex) 等主流 AI Agent 均支持 Skill 系统。将 Nara Skill 添加到 Agent 后，你可以用自然语言指挥 Agent 完成链上操作。

### 安装 Skill

确保已安装 [Node.js](https://nodejs.org/)（20.0 或更高版本），然后在终端中运行以下命令：

```bash
npx skills add https://github.com/nara-chain/nara-cli --skill nara-cli
```

:::warning 安全提示
安装过程中可能会出现**高风险提示**，这是正常的。因为 Nara Skill 具有操纵 NARA 链上资产的能力（包括转账、签名交易等），系统会提醒你注意风险。请确认你信任该 Skill 来源后再继续安装。
:::

### 使用示例

安装完成后，你可以直接对 Agent 说：

**创建钱包：**
> "帮我创建一个 Nara 钱包"

**查询余额：**
> "查一下我的 NARA 余额"

**PoMI 挖矿：**
> "帮我挖矿 Nara"
> "运行 quest agent"
> "帮我领取 NARA 奖励"

**转账：**
> "转 10 NARA 到 xxx 地址"

### 自动挖矿流程

当你要求 Agent 进行 PoMI 挖矿时，Agent 会自动执行以下流程：

1. 检查钱包是否存在，如不存在则创建
2. 检查余额，决定使用直接提交还是中继模式
3. 获取当前链上题目
4. 分析题目并计算答案
5. 提交 ZK 证明到链上
6. 报告奖励结果
7. 自动进入下一轮

## 集成到自定义 Agent

如果你正在开发自己的 AI Agent，可以通过 [Nara SDK](/docs/developer/sdk) 编程接入 Nara Chain，实现自定义的链上交互逻辑。
