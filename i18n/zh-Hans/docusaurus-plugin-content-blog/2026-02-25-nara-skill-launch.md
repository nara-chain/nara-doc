---
slug: nara-skill-launch
title: "Nara Skill 正式上线"
authors: [nara]
tags: [announcement, skill]
---

# Nara Skill — 让 AI Agent 操作链上资产

**Nara Skill** 现已上线 — 一套让 AI Agent 直接与 Nara Chain 交互的能力系统。一行命令安装，你的 Agent 就能创建钱包、查询余额、转账代币、参与 PoMI 挖矿 — 全部通过自然语言完成。

<!-- truncate -->

## 什么是 Nara Skill

Nara Skill 是连接 AI Agent 与区块链的桥梁。无需学习 CLI 命令或编写代码，你只需告诉 AI Agent 你想做什么，它会自动完成操作。

> "帮我创建一个 Nara 钱包"
>
> "我的 NARA 余额是多少？"
>
> "帮我运行 quest 挖矿"

Agent 会自动加载 Skill 定义、执行链上操作、并向你汇报结果 — 一切都在你现有的工作流中完成。

## 支持的 AI Agent

Nara Skill 支持所有兼容 Skills 协议的 Agent：

- **Claude Code** — Anthropic 的编程 Agent
- **OpenClaw** — 开源 AI Agent
- **Codex** — OpenAI 的编程 Agent

随着 Skills 生态的发展，将支持更多 Agent。

## 安装

一行命令即可：

```bash
npx skills add https://github.com/nara-chain/nara-cli --skill nara-cli
```

**前置条件：** 系统需安装 Node.js 20+。

:::warning 安全提示
安装前请务必审查 Skill 源码。仅从可信来源安装 Skill。Nara Skill 源码完全开源：[github.com/nara-chain/nara-cli](https://github.com/nara-chain/nara-cli)。
:::

## Skill 的功能

| 功能 | 说明 |
|---|---|
| **创建钱包** | 生成新的 Nara 钱包（BIP39 助记词） |
| **查询余额** | 查看 NARA 和 SPL 代币余额 |
| **转账** | 向指定地址发送 NARA 或 SPL 代币 |
| **PoMI 挖矿** | 获取题目、计算答案、生成零知识证明并提交上链 |
| **交易查询** | 查看交易状态和历史记录 |

## 工作原理

Nara Skill 使用 `SKILL.md` 定义文件告诉 Agent：

1. **何时激活** — 触发关键词如 "Nara"、"钱包"、"余额"、"Quest"、"挖矿"
2. **有哪些工具** — Agent 可执行的 CLI 命令
3. **如何执行** — 每个操作的步骤流程

Agent 读取定义后，理解可用能力，并根据你的请求自主决定使用哪些工具。

## 核心优势

- **零门槛** — 不需要学习 CLI 命令，自然语言即可操作区块链
- **AI 原生** — 专为 Agent 自主执行设计，而非人工操作
- **安全可控** — 所有操作需用户确认，私钥存储在本地
- **开源透明** — 完整源码可供审查

## 开始使用

安装 Skill 并试一试：

```bash
npx skills add https://github.com/nara-chain/nara-cli --skill nara-cli
```

然后对你的 Agent 说：*"帮我创建一个 Nara 钱包"*

了解更多：[什么是 Nara Skill](/docs/skill/what-is-skill) | [在 AI Agent 中使用](/docs/skill/use-in-agent)
