---
sidebar_position: 5
---

# Skills Hub

The Skills Hub SDK provides programmatic access to the on-chain skill registry — a protocol for storing, versioning, and managing AI agent skills as on-chain assets.

## Core Concepts

- **Skill Assetization** — Skills become on-chain state objects with name, author, description, content, and version
- **Global Namespace** — Skill names are globally unique (5–32 bytes, lowercase only)
- **Chunked Upload** — Large content is uploaded via a two-phase chunked buffer mechanism with resumable writes
- **Immutable Version Surface** — Each content update increments the version, creating an auditable upgrade trail

## API Reference

### registerSkill

Register a new skill on-chain (charges a registration fee).

```typescript
import { registerSkill, Keypair } from 'nara-sdk';
import { Connection } from '@solana/web3.js';

const connection = new Connection('https://mainnet-api.nara.build/', 'confirmed');
const wallet = Keypair.fromSecretKey(/* your secret key */);

// Skill names: lowercase only, 5–32 characters
const { skillPubkey } = await registerSkill(connection, wallet, 'my-skill', 'Author Name');
```

### setDescription / updateMetadata

Set skill description and metadata.

```typescript
import { setDescription, updateMetadata } from 'nara-sdk';

await setDescription(connection, wallet, 'my-skill', 'A brief description.');
await updateMetadata(connection, wallet, 'my-skill', JSON.stringify({ tags: ['ai'] }));
```

### uploadSkillContent

Upload skill content from a buffer (auto-chunked, resumable).

```typescript
import { uploadSkillContent } from 'nara-sdk';
import { readFileSync } from 'fs';

const content = readFileSync('skill.md');
const finalizeSig = await uploadSkillContent(connection, wallet, 'my-skill', content, {
  onProgress(chunkIndex, totalChunks, sig) {
    console.log(`[${chunkIndex}/${totalChunks}] tx: ${sig}`);
  },
});
```

### getSkillInfo / getSkillContent

Query skill info and content.

```typescript
import { getSkillInfo, getSkillContent } from 'nara-sdk';

const info = await getSkillInfo(connection, 'my-skill');
console.log(info.record.version, info.description, info.metadata);

const bytes = await getSkillContent(connection, 'my-skill');
```

### transferAuthority

Transfer skill ownership to a new address.

```typescript
import { transferAuthority } from 'nara-sdk';

await transferAuthority(connection, wallet, 'my-skill', newOwnerPublicKey);
```

### deleteSkill

Delete a skill and reclaim all rent.

```typescript
import { deleteSkill } from 'nara-sdk';

await deleteSkill(connection, wallet, 'my-skill');
```

## Full Example

```typescript
import {
  registerSkill,
  setDescription,
  updateMetadata,
  uploadSkillContent,
  getSkillInfo,
  Keypair,
} from 'nara-sdk';
import { Connection } from '@solana/web3.js';
import { readFileSync } from 'fs';

const connection = new Connection('https://mainnet-api.nara.build/', 'confirmed');
const wallet = Keypair.fromSecretKey(/* your secret key */);

// 1. Register
await registerSkill(connection, wallet, 'my-skill', 'Alice');

// 2. Set description and metadata
await setDescription(connection, wallet, 'my-skill', 'What this skill does');
await updateMetadata(connection, wallet, 'my-skill', JSON.stringify({ tags: ['ai'] }));

// 3. Upload content
const content = readFileSync('SKILL.md');
await uploadSkillContent(connection, wallet, 'my-skill', content);

// 4. Verify
const info = await getSkillInfo(connection, 'my-skill');
console.log(`Published: v${info.record.version}`);
```
