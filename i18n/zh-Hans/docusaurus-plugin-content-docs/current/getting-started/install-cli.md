---
sidebar_position: 1
---

# 安装 Nara CLI

Nara CLI（`naracli`）是与 Nara Chain 交互的命令行工具和 SDK。通过它你可以管理钱包、转账、参与 PoMI 挖矿等。

## 前置要求

- [Node.js](https://nodejs.org/) 20.0 或更高版本

## 安装

### 通过 npx 直接使用（推荐）

无需全局安装，直接使用 `npx` 运行：

```bash
npx naracli@latest address
```

首次运行时会自动下载最新版本并缓存，后续使用 `npx naracli` 即可。

### 全局安装

如果你希望全局安装：

```bash
npm install -g naracli
```

安装后可以直接使用 `naracli` 命令：

```bash
naracli address
```

## 验证安装

运行以下命令验证安装是否成功：

```bash
npx naracli --version
```

## 全局参数

所有命令都支持以下全局参数：

| 参数 | 说明 | 默认值 |
|---|---|---|
| `-r, --rpc-url <url>` | RPC 节点地址 | `https://mainnet-api.nara.build/` |
| `-w, --wallet <path>` | 钱包密钥文件路径 | `~/.config/nara/id.json` |
| `-j, --json` | 以 JSON 格式输出 | - |

## 下一步

安装完成后，前往 [创建钱包](/docs/getting-started/create-wallet) 生成你的第一个 Nara 钱包。
