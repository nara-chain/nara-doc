---
slug: skills-hub-launch
title: "Skills Hub — On-Chain Skill Registry for AI Agents"
authors: [nara]
tags: [announcement, skill]
---

# Skills Hub — Turning AI Skills Into On-Chain Assets

**Skills Hub** is now live on Nara Chain. It's an on-chain registry that transforms AI agent skills from scattered config files into verifiable, versioned, and discoverable on-chain assets.

<!-- truncate -->

## Why Skills Hub

In most agent stacks, skills are opaque config blobs — scattered across private repos, updated without audit trails, and impossible to compose across teams. Skills Hub changes this with four protocol-level ideas:

1. **Skill Assetization** — Skills become on-chain state objects with name, author, description, content, and version
2. **Prompt Liquidity** — Skills gain global addresses and a unified read/write flow that any runtime can integrate
3. **Capability Consensus** — Anyone can verify ownership and current version on-chain
4. **Economic Flywheel** — Registration fees create incentive alignment for quality contributors

## How It Works

Skills are identified by globally unique names (5–32 characters, lowercase). Content is uploaded via a chunked buffer mechanism with resumable writes — large skill files are automatically split across multiple transactions.

Each content update increments the version number, creating an auditable upgrade trail. Only the skill's authority can modify or delete it.

## Publish a Skill

```bash
# Register a skill name (1 NARA registration fee)
npx naracli skills register my-skill "Your Name"

# Set description and metadata
npx naracli skills set-description my-skill "What this skill does"
npx naracli skills set-metadata my-skill '{"tags":["ai","coding"]}'

# Upload content (auto-chunked)
npx naracli skills upload my-skill ./SKILL.md
```

## Install from Chain

Any AI agent can pull skills directly from the chain:

```bash
# Install to local agent directories
npx naracli skills add my-skill

# Install globally for all agents
npx naracli skills add my-skill --global

# Check for updates
npx naracli skills check
npx naracli skills update
```

Supported agents: Claude Code, Cursor, OpenCode, Codex, Amp, and more.

## For Developers

The [nara-sdk](https://www.npmjs.com/package/nara-sdk) provides full programmatic access:

```typescript
import { registerSkill, uploadSkillContent, getSkillInfo } from 'nara-sdk';

await registerSkill(connection, wallet, 'my-skill', 'Alice');
await uploadSkillContent(connection, wallet, 'my-skill', content);

const info = await getSkillInfo(connection, 'my-skill');
console.log(`Published: v${info.record.version}`);
```

## Key Details

| Item | Value |
|---|---|
| Program Address | `SkiLLHub11111111111111111111111111111111111` |
| Name Length | 5–32 characters, lowercase only |
| Registration Fee | 1 NARA |
| Description Limit | 512 bytes |
| Metadata Limit | 800 bytes (JSON) |

## Learn More

- [Skills Hub SDK](/docs/developer/skills-hub-sdk) — Full API reference
- [CLI Reference](/docs/developer/cli-reference) — All `skills` commands
- [What is Nara Skill](/docs/skill/what-is-skill) — Overview of the Skill system
