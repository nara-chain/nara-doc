---
sidebar_position: 3
---

# ZK ID SDK

ZK ID SDK 提供了与 ZK Identity 协议的编程交互能力 — 一个基于 Groth16 ZK 证明的隐私保护命名账户系统。

## 核心概念

### 什么是 ZK ID？

**ZK ID** 是一个人类可读的名称（如 `"alice"`），它作为一个隐私的、可重复使用的收款地址：

| 特性 | 行为 |
|---|---|
| **命名的** | 任何人只要知道名称就能向其存入 NARA — 无需知道钱包地址 |
| **隐私的** | 没有任何链上记录将名称与所有者的钱包地址关联 |
| **可拥有的** | 所有权通过密码学密钥（`idSecret`）而非签名密钥来证明 |
| **可转让的** | 所有权可以通过 ZK 证明转移到新的密钥 — 无需暴露任何一方的密钥 |

### 工作原理

1. **注册** — 本地派生 `idSecret`，计算 `idCommitment = Poseidon(idSecret)`，在链上注册 ZK ID
2. **存款** — 任何人知道名称即可存入 NARA（固定面额：1 / 10 / 100 / 1,000 / 10,000 / 100,000 NARA）
3. **提取** — 生成 Groth16 证明，匿名提取到任意接收地址
4. **转让** — 通过提交所有权 ZK 证明来转移所有权

### 密码学设计

- **idSecret 派生**：`Ed25519_sign("nara-zk:idsecret:v1:{name}") → SHA-256 → mod BN254_PRIME`
- **身份承诺**：`idCommitment = Poseidon(idSecret)`
- **存款叶子**：`leaf = Poseidon(idCommitment, depositIndex)` — 插入 64 层 Merkle 树
- **无效化器**：`nullifierHash = Poseidon(idSecret, depositIndex)` — 防止双重花费
- **提取证明**：Groth16 证明你知道与 Merkle 树中某个叶子匹配的 `idSecret`

## API 参考

### deriveIdSecret

从你的钱包派生指定名称的 `idSecret`。

```typescript
import { deriveIdSecret, Keypair } from 'nara-sdk';

const wallet = Keypair.fromSecretKey(/* 你的私钥 */);

// idSecret 是确定性派生的 — 保密，永远不要发送到链上
const idSecret = await deriveIdSecret(wallet, 'alice');
```

### createZkId

在链上注册新的 ZK ID（支付注册费用）。

```typescript
import { createZkId } from 'nara-sdk';
import { Connection } from '@solana/web3.js';

const connection = new Connection('https://mainnet-api.nara.build/', 'confirmed');
await createZkId(connection, wallet, 'alice', idSecret);
```

### deposit

向 ZK ID 存入 NARA。任何人知道名称即可存款。

```typescript
import { deposit, ZKID_DENOMINATIONS } from 'nara-sdk';

// 可用面额：SOL_1, SOL_10, SOL_100, SOL_1000, SOL_10000, SOL_100000
await deposit(connection, wallet, 'alice', ZKID_DENOMINATIONS.SOL_1);
```

### scanClaimableDeposits

扫描 ZK ID 所有者可领取的未花费存款。

```typescript
import { scanClaimableDeposits } from 'nara-sdk';

const deposits = await scanClaimableDeposits(connection, 'alice', idSecret);
console.log(`${deposits.length} 笔可领取的存款`);
```

### withdraw

匿名提取存款。支付者和接收者与 ZK ID 之间没有链上关联。

```typescript
import { withdraw, generateValidRecipient } from 'nara-sdk';

// 接收者必须是有效的 BN254 域元素
const recipient = generateValidRecipient();
const sig = await withdraw(
  connection, wallet, 'alice', idSecret, deposits[0]!, recipient.publicKey
);
console.log('已提取:', sig);
```

### transferZkId

通过 ZK 证明将 ZK ID 所有权转移到新的身份。

```typescript
import { transferZkId } from 'nara-sdk';

const newWallet = Keypair.generate();
const newIdSecret = await deriveIdSecret(newWallet, 'alice');
await transferZkId(connection, wallet, 'alice', idSecret, newIdSecret);
```

### getZkIdInfo

查询 ZK ID 账户信息。

```typescript
import { getZkIdInfo } from 'nara-sdk';

const info = await getZkIdInfo(connection, 'alice');
console.log(info?.depositCount, info?.commitmentStartIndex);
```

### isValidRecipient

检查公钥是否可用作提取接收者（必须是有效的 BN254 域元素）。

```typescript
import { isValidRecipient } from 'nara-sdk';

console.log(isValidRecipient(somePublicKey)); // true 或 false
```

## 完整示例

```typescript
import {
  deriveIdSecret,
  createZkId,
  deposit,
  scanClaimableDeposits,
  withdraw,
  generateValidRecipient,
  ZKID_DENOMINATIONS,
  Keypair,
} from 'nara-sdk';
import { Connection } from '@solana/web3.js';

const connection = new Connection('https://mainnet-api.nara.build/', 'confirmed');
const wallet = Keypair.fromSecretKey(/* 你的私钥 */);

// 1. 派生 idSecret
const idSecret = await deriveIdSecret(wallet, 'alice');

// 2. 注册新的 ZK ID
await createZkId(connection, wallet, 'alice', idSecret);

// 3. 存入 1 NARA
await deposit(connection, wallet, 'alice', ZKID_DENOMINATIONS.SOL_1);

// 4. 扫描可领取的存款
const deposits = await scanClaimableDeposits(connection, 'alice', idSecret);

// 5. 匿名提取
const recipient = generateValidRecipient();
await withdraw(connection, wallet, 'alice', idSecret, deposits[0]!, recipient.publicKey);
```
