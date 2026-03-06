---
sidebar_position: 3
---

# 网络信息

## 主网

| 项目 | 值 |
|---|---|
| RPC 端点 | `https://mainnet-api.nara.build/` |
| 原生代币 | NARA |
| 出块时间 | ~400ms |
| 每个 Epoch 出块数 | 72,000 |

## 测试网（Devnet）

| 项目 | 值 |
|---|---|
| RPC 端点 | `https://devnet-api.nara.build/` |
| 原生代币 | NARA（测试代币） |

测试网用于开发和测试，测试网上的代币没有实际价值。

## 兼容性

Nara Chain 完全兼容 Solana 生态工具：

- **钱包** — 使用标准 Solana 密钥格式（Ed25519），钱包文件与 Solana 互通
- **SDK** — 可以使用 `@solana/web3.js` 连接 Nara RPC 进行开发
- **程序** — Solana BPF 程序可以直接部署到 Nara Chain
- **密钥派生** — 使用与 Solana 相同的 BIP39 + HD 路径 `m/44'/501'/0'/0'`

## 使用 Solana 工具连接

如果你已有 Solana CLI，可以通过指定 RPC 地址连接 Nara 网络：

```bash
solana --url https://mainnet-api.nara.build/ cluster-version
```

使用 `@solana/web3.js` 连接：

```typescript
import { Connection } from '@solana/web3.js';

const connection = new Connection('https://mainnet-api.nara.build/');
const slot = await connection.getSlot();
console.log('当前 Slot:', slot);
```
