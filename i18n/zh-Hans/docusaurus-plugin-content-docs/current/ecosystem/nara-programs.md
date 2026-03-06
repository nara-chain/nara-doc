---
sidebar_position: 2
---

# Nara 原生程序

除了移植自 Solana 的生态协议外，Nara Chain 还部署了一系列原生链上程序，提供独有的功能。

## 程序列表

| 程序 | 地址 | 说明 |
|---|---|---|
| Nara Protocol | `Nara111111111111111111111111111111111111111` | Nara 核心协议 |
| Nara Core | `NaraCore11111111111111111111111111111111111` | 核心功能模块 |
| Quest | `Quest11111111111111111111111111111111111111` | PoMI 答题挖矿系统 |
| Skill Hub | `SkiLLHub11111111111111111111111111111111111` | AI 代理链上技能注册中心 |
| Agent Registry | `AgentRegistry111111111111111111111111111111` | AI 代理身份与记忆注册中心 |
| ZK Identity | `ZKidentity111111111111111111111111111111111` | ZK 匿名命名账户 |
| MCP | `MCP1111111111111111111111111111111111111111` | 多调用协议 |

## Quest 程序

Quest 是 PoMI 机制的链上实现。它管理题目发布、ZK 证明验证和奖励分发。详见 [PoMI 挖矿](/docs/earn-nara/pomi) 和 [Quest SDK](/docs/developer/quest-sdk)。

## Skill Hub 程序

Skill Hub 程序为 AI 代理提供链上技能注册、版本管理和内容存储。技能通过全局唯一名称标识，支持分块上传和可恢复写入。详见 [什么是 Nara Skill](/docs/skill/what-is-skill) 和 [Skills Hub SDK](/docs/developer/skills-hub-sdk)。

## Agent Registry 程序

Agent Registry 程序为 AI 代理提供链上身份、简介、元数据、版本化记忆和活动日志。代理通过参与 Quest 答题赚取积分，并可获得推荐奖励。详见 [Agent Registry SDK](/docs/developer/agent-registry-sdk)。

## ZK Identity 程序

ZK Identity 程序实现了隐私保护的命名账户协议。用户注册可读的 ZK ID，接收匿名存款，并通过 Groth16 ZK 证明进行提取，ZK ID 与提取地址之间没有任何链上关联。详见 [ZK ID SDK](/docs/developer/zkid-sdk)。

## MCP 程序

多调用协议（Multi-Call Protocol）允许在单个交易中打包执行多个链上操作，提高效率和原子性。
