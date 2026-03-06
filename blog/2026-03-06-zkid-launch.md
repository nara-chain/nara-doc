---
slug: zkid-launch
title: "ZK ID — Anonymous Named Accounts on Nara Chain"
authors: [nara]
tags: [announcement, zkid]
---

# ZK ID — Privacy-Preserving Named Accounts

**ZK ID** is now live on Nara Chain — a protocol that lets you register human-readable names (like `"alice"`) as private, reusable receiving addresses. Anyone can deposit NARA knowing only the name, and only the owner can withdraw anonymously. No on-chain link between the ZK ID and the withdrawal address is ever created.

<!-- truncate -->

## How It Works

ZK ID combines Groth16 zero-knowledge proofs with a 64-level Merkle tree to achieve full sender-receiver unlinkability:

1. **Register** — Derive a cryptographic secret (`idSecret`) from your wallet, compute a commitment, and register the ZK ID on-chain. Your wallet address never appears in the registration transaction
2. **Deposit** — Anyone who knows the name can deposit NARA. Fixed denominations (1 / 10 / 100 / 1,000 / 10,000 / 100,000 NARA) prevent amount-based correlation
3. **Withdraw** — Generate a Groth16 proof off-chain and send it to any recipient address. The proof convinces the on-chain program that you know the secret — without revealing it
4. **Transfer** — Hand over ownership to a new identity via ZK proof, without exposing any wallet address

## Privacy Guarantees

| Operation | Visible On-Chain | Hidden |
|---|---|---|
| Register | Payer address, name hash, commitment | Owner's wallet, plaintext name |
| Deposit | Depositor address, name hash, amount | Owner's wallet, plaintext name |
| Withdraw | Payer address, recipient, nullifier | ZK ID identity, secret |
| Transfer | Payer address, name hash, new commitment | Owner's wallet, secret |

The protocol supports **delegated registration** — a relayer can submit the registration transaction so the owner's wallet never appears on-chain at all.

## Quick Start

```bash
# Register a ZK ID
npx naracli zkid create alice

# Deposit 10 NARA (anyone can do this knowing the name)
npx naracli zkid deposit alice 10

# Scan for claimable deposits
npx naracli zkid scan alice

# Withdraw anonymously
npx naracli zkid withdraw alice
```

## For Developers

The [nara-sdk](https://www.npmjs.com/package/nara-sdk) provides full programmatic access:

```typescript
import {
  deriveIdSecret, createZkId, deposit,
  scanClaimableDeposits, withdraw,
  generateValidRecipient, ZKID_DENOMINATIONS,
} from 'nara-sdk';

const idSecret = await deriveIdSecret(wallet, 'alice');
await createZkId(connection, wallet, 'alice', idSecret);
await deposit(connection, wallet, 'alice', ZKID_DENOMINATIONS.SOL_1);

const deposits = await scanClaimableDeposits(connection, 'alice', idSecret);
const recipient = generateValidRecipient();
await withdraw(connection, wallet, 'alice', idSecret, deposits[0]!, recipient.publicKey);
```

## Cryptographic Design

- **Proof system**: Groth16 on BN254 elliptic curve
- **Hash function**: Poseidon (ZK-circuit-friendly, on-chain via `solana-poseidon` syscall)
- **Merkle tree**: 64 levels, supports 2^64 leaves, 30-root history buffer
- **idSecret derivation**: `Ed25519_sign → SHA-256 → mod BN254_PRIME` (deterministic, no extra storage needed)
- **Double-spend prevention**: Nullifier PDAs — each deposit can be withdrawn exactly once

## Key Details

| Item | Value |
|---|---|
| Program Address | `ZKidentity111111111111111111111111111111111` |
| Denominations | 1 / 10 / 100 / 1,000 / 10,000 / 100,000 NARA |
| Merkle Depth | 64 levels |
| Root History | 30 most recent roots |

## Learn More

- [ZK ID SDK](/docs/developer/zkid-sdk) — Full API reference
- [CLI Reference](/docs/developer/cli-reference) — All `zkid` commands
