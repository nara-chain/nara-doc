---
sidebar_position: 3
---

# Network Info

## Mainnet

| Item | Value |
|---|---|
| RPC Endpoint | `https://mainnet-api.nara.build/` |
| Native Token | NARA |
| Block Time | ~400ms |
| Slots per Epoch | 72,000 |

## Compatibility

Nara Chain is fully compatible with Solana ecosystem tools:

- **Wallets** — Uses standard Solana key format (Ed25519); wallet files are interchangeable with Solana
- **SDKs** — Use `@solana/web3.js` to connect to Nara RPC for development
- **Programs** — Solana BPF programs can be deployed directly to Nara Chain
- **Key Derivation** — Uses the same BIP39 + HD path as Solana: `m/44'/501'/0'/0'`

## Connect with Solana Tools

If you already have the Solana CLI, you can connect to the Nara network by specifying the RPC URL:

```bash
solana --url https://mainnet-api.nara.build/ cluster-version
```

Connect with `@solana/web3.js`:

```typescript
import { Connection } from '@solana/web3.js';

const connection = new Connection('https://mainnet-api.nara.build/');
const slot = await connection.getSlot();
console.log('Current Slot:', slot);
```
