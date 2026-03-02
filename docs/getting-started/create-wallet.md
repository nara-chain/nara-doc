---
sidebar_position: 2
---

# Create a Wallet

Before using Nara Chain, you need to create a wallet. Nara uses the same wallet standard as Solana (BIP39 mnemonic + Ed25519 key derivation), so you can also import an existing Solana wallet.

## Create a New Wallet

```bash
npx naracli wallet create
```

This generates a 12-word mnemonic phrase — make sure to back it up securely. The keypair file is saved to `~/.config/nara/id.json` by default.

:::danger Important
Keep your mnemonic phrase safe! It is the only way to recover your wallet. If lost, your assets cannot be retrieved.
:::

## Import an Existing Wallet

### Import via Mnemonic

```bash
npx naracli wallet import -m "your twelve word mnemonic phrase here ..."
```

### Import via Private Key

Supports Base58 or JSON array format:

```bash
npx naracli wallet import -k "your-base58-private-key"
```

## View Wallet Address

```bash
npx naracli address
```

## Check Balance

```bash
npx naracli balance
```

Check balance of a specific address:

```bash
npx naracli balance <address>
```

## Next Steps

With your wallet ready, check out [Network Info](/docs/getting-started/network-info) for Nara network details, or head straight to [PoMI Mining](/docs/earn-nara/pomi) to start earning NARA.
