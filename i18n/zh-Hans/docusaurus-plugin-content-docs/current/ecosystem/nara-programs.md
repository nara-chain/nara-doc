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
| Domain | `Domain1111111111111111111111111111111111111` | 域名系统 |
| Skill | `SkiLL11111111111111111111111111111111111111` | Skill 能力系统 |
| MCP | `MCP1111111111111111111111111111111111111111` | 多调用协议 |

## Quest 程序

Quest 是 PoMI 机制的链上实现。它管理题目发布、ZK 证明验证和奖励分发。详见 [PoMI 挖矿](/docs/earn-nara/pomi) 和 [Quest SDK](/docs/developer/quest-sdk)。

## Skill 程序

Skill 程序为 AI Agent 提供链上能力注册和调用机制。通过 Skill，Agent 可以在 Nara 链上执行各种操作。详见 [什么是 Nara Skill](/docs/skill/what-is-skill)。

## Domain 程序

Nara 域名系统允许用户注册人类可读的链上域名，替代复杂的公钥地址。

## MCP 程序

多调用协议（Multi-Call Protocol）允许在单个交易中打包执行多个链上操作，提高效率和原子性。
