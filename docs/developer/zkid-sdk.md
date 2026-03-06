---
sidebar_position: 3
---

# ZK ID SDK

The ZK ID SDK provides programmatic access to the ZK Identity protocol — a privacy-preserving named account system built on Groth16 ZK proofs.

## Core Concepts

### What is a ZK ID?

A **ZK ID** is a human-readable name (e.g. `"alice"`) that acts as a private, reusable receiving address:

| Property | Behaviour |
|---|---|
| **Named** | Anyone who knows the name can deposit NARA to it — no wallet address needed |
| **Private** | No on-chain link ever connects the name to the owner's wallet address |
| **Ownable** | Ownership is proven by knowledge of a cryptographic secret (`idSecret`), not by a signing key |
| **Transferable** | Ownership can be transferred to a new secret via a ZK proof — without revealing either secret |

### How It Works

1. **Register** — Derive `idSecret` locally, compute `idCommitment = Poseidon(idSecret)`, register the ZK ID on-chain
2. **Deposit** — Anyone can deposit NARA knowing only the name (fixed denominations: 1 / 10 / 100 / 1,000 / 10,000 / 100,000 NARA)
3. **Withdraw** — Generate a Groth16 proof and withdraw anonymously to any recipient address
4. **Transfer** — Hand over ownership by submitting an ownership ZK proof

### Cryptographic Design

- **idSecret derivation**: `Ed25519_sign("nara-zk:idsecret:v1:{name}") → SHA-256 → mod BN254_PRIME`
- **Identity commitment**: `idCommitment = Poseidon(idSecret)`
- **Deposit leaf**: `leaf = Poseidon(idCommitment, depositIndex)` — inserted into a 64-level Merkle tree
- **Nullifier**: `nullifierHash = Poseidon(idSecret, depositIndex)` — prevents double-spending
- **Withdrawal proof**: Groth16 proof that you know `idSecret` matching a leaf in the Merkle tree

## API Reference

### deriveIdSecret

Derive the `idSecret` for a given name from your wallet.

```typescript
import { deriveIdSecret, Keypair } from 'nara-sdk';

const wallet = Keypair.fromSecretKey(/* your secret key */);

// idSecret is derived deterministically — keep it private, never send on-chain
const idSecret = await deriveIdSecret(wallet, 'alice');
```

### createZkId

Register a new ZK ID on-chain (pays a registration fee).

```typescript
import { createZkId } from 'nara-sdk';
import { Connection } from '@solana/web3.js';

const connection = new Connection('https://mainnet-api.nara.build/', 'confirmed');
await createZkId(connection, wallet, 'alice', idSecret);
```

### deposit

Deposit NARA into a ZK ID. Anyone can deposit knowing only the name.

```typescript
import { deposit, ZKID_DENOMINATIONS } from 'nara-sdk';

// Available denominations: SOL_1, SOL_10, SOL_100, SOL_1000, SOL_10000, SOL_100000
await deposit(connection, wallet, 'alice', ZKID_DENOMINATIONS.SOL_1);
```

### scanClaimableDeposits

Scan for unspent deposits claimable by the ZK ID owner.

```typescript
import { scanClaimableDeposits } from 'nara-sdk';

const deposits = await scanClaimableDeposits(connection, 'alice', idSecret);
console.log(`${deposits.length} claimable deposit(s)`);
```

### withdraw

Anonymously withdraw a deposit. The payer and recipient have no on-chain link to the ZK ID.

```typescript
import { withdraw, generateValidRecipient } from 'nara-sdk';

// Recipient must be a valid BN254 field element
const recipient = generateValidRecipient();
const sig = await withdraw(
  connection, wallet, 'alice', idSecret, deposits[0]!, recipient.publicKey
);
console.log('Withdrawn:', sig);
```

### transferZkId

Transfer ZK ID ownership to a new identity via ZK proof.

```typescript
import { transferZkId } from 'nara-sdk';

const newWallet = Keypair.generate();
const newIdSecret = await deriveIdSecret(newWallet, 'alice');
await transferZkId(connection, wallet, 'alice', idSecret, newIdSecret);
```

### getZkIdInfo

Query ZK ID account info.

```typescript
import { getZkIdInfo } from 'nara-sdk';

const info = await getZkIdInfo(connection, 'alice');
console.log(info?.depositCount, info?.commitmentStartIndex);
```

### isValidRecipient

Check if a public key can be used as a withdrawal recipient (must be a valid BN254 field element).

```typescript
import { isValidRecipient } from 'nara-sdk';

console.log(isValidRecipient(somePublicKey)); // true or false
```

## Full Example

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
const wallet = Keypair.fromSecretKey(/* your secret key */);

// 1. Derive idSecret
const idSecret = await deriveIdSecret(wallet, 'alice');

// 2. Register a new ZK ID
await createZkId(connection, wallet, 'alice', idSecret);

// 3. Deposit 1 NARA
await deposit(connection, wallet, 'alice', ZKID_DENOMINATIONS.SOL_1);

// 4. Scan for claimable deposits
const deposits = await scanClaimableDeposits(connection, 'alice', idSecret);

// 5. Withdraw anonymously
const recipient = generateValidRecipient();
await withdraw(connection, wallet, 'alice', idSecret, deposits[0]!, recipient.publicKey);
```
