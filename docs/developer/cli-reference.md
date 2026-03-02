---
sidebar_position: 3
---

# CLI Reference

Complete reference for all available `naracli` commands.

## Global Options

All commands support the following global options:

```
-r, --rpc-url <url>   RPC endpoint URL (default: https://mainnet-api.nara.build/)
-w, --wallet <path>   Wallet keypair file path (default: ~/.config/nara/id.json)
-j, --json            Output in JSON format
-V, --version         Show version number
-h, --help            Show help information
```

## Wallet Management

### wallet create

Create a new wallet with a 12-word BIP39 mnemonic phrase.

```bash
npx naracli wallet create
```

The keypair file is saved to `~/.config/nara/id.json`.

### wallet import

Import an existing wallet.

```bash
# Import via mnemonic
npx naracli wallet import -m "word1 word2 ... word12"

# Import via private key (Base58 or JSON array format)
npx naracli wallet import -k "base58-private-key"
```

### address

Display the current wallet address.

```bash
npx naracli address
```

## Balance & Transfers

### balance

Check NARA balance.

```bash
# Check current wallet balance
npx naracli balance

# Check balance of a specific address
npx naracli balance <address>
```

### token-balance

Check SPL token balance.

```bash
npx naracli token-balance <token-address>
npx naracli token-balance <token-address> --owner <owner-address>
```

### transfer

Transfer NARA tokens.

```bash
npx naracli transfer <to-address> <amount>

# Export unsigned transaction (without sending)
npx naracli transfer <to-address> <amount> -e
```

### transfer-token

Transfer SPL tokens.

```bash
npx naracli transfer-token <token-address> <to-address> <amount>
npx naracli transfer-token <token-address> <to-address> <amount> --decimals 6
```

## Transactions

### tx-status

Check transaction status.

```bash
npx naracli tx-status <signature>
```

### sign

Sign and optionally send a Base64-encoded transaction.

```bash
# Sign only
npx naracli sign <base64-transaction>

# Sign and send
npx naracli sign <base64-transaction> --send
```

## Quest (PoMI Mining)

### quest get

Fetch the current active Quest question.

```bash
npx naracli quest get

# JSON format output
npx naracli quest get --json
```

Output includes: question text, reward amount, deadline, number of answers submitted, remaining slots, and more.

### quest answer

Submit an answer (automatically generates a ZK proof).

```bash
# Direct on-chain submission (requires >= 0.1 NARA balance)
npx naracli quest answer "your-answer"

# Gasless submission via relay
npx naracli quest answer "your-answer" --relay

# Specify a custom relay URL
npx naracli quest answer "your-answer" --relay https://your-relay.example.com/
```
