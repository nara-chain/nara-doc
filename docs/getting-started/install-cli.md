---
sidebar_position: 1
---

# Install Nara CLI

Nara CLI (`naracli`) is the command-line tool and SDK for interacting with Nara Chain. Use it to manage wallets, transfer tokens, participate in PoMI mining, and more.

## Prerequisites

- [Node.js](https://nodejs.org/) version 20.0 or higher

## Installation

### Use via npx (Recommended)

No global installation needed — run directly with `npx`:

```bash
npx naracli@latest address
```

The latest version is automatically downloaded and cached on first run. After that, simply use `npx naracli`.

### Global Installation

If you prefer a global install:

```bash
npm install -g naracli
```

Then use the `naracli` command directly:

```bash
naracli address
```

## Verify Installation

Run the following command to verify the installation:

```bash
npx naracli --version
```

## Global Options

All commands support the following global options:

| Option | Description | Default |
|---|---|---|
| `-r, --rpc-url <url>` | RPC endpoint URL | `https://mainnet-api.nara.build/` |
| `-w, --wallet <path>` | Wallet keypair file path | `~/.config/nara/id.json` |
| `-j, --json` | Output in JSON format | - |

## Next Steps

Once installed, head to [Create a Wallet](/docs/getting-started/create-wallet) to generate your first Nara wallet.
