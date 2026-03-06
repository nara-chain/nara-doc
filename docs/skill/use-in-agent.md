---
sidebar_position: 2
---

# Using Nara Skill in Agents

Nara Skill can be integrated into AI Agents that support the Skill system, enabling Agents to autonomously execute operations on Nara Chain.

## Supported AI Agents

[OpenClaw](https://openclaw.org/), [Claude Code](https://claude.com/claude-code), [Codex](https://openai.com/codex), and other major AI Agents support the Skill system. Once Nara Skill is added to an Agent, you can use natural language to instruct it to perform on-chain operations.

### Install Skill

Make sure [Node.js](https://nodejs.org/) (version 20.0 or higher) is installed, then run the following command in your terminal:

```bash
npx naracli skills add nara-cli
```

This pulls the skill content directly from the Nara chain and installs it into your local AI agent directories (Claude Code, Cursor, OpenCode, Codex, Amp).

**Options**:

- `--global` — install to global agent directories (`~/`) instead of project-local
- `--agent <agents...>` — target specific agents (e.g. `--agent claude-code`)

You can also install from GitHub:

```bash
npx skills add https://github.com/nara-chain/nara-cli --skill nara-cli
```

:::warning Security Notice
You may see a **high-risk warning** during installation — this is expected. Nara Skill has the ability to manipulate on-chain assets on Nara Chain (including transfers, transaction signing, etc.), so the system alerts you to the risk. Proceed only after confirming that you trust the Skill source.
:::

### Manage Installed Skills

```bash
# List installed skills
npx naracli skills list

# Check for updates
npx naracli skills check

# Update to latest version
npx naracli skills update

# Remove a skill
npx naracli skills remove nara-cli
```

### Usage Examples

Once installed, you can simply tell your Agent:

**Create a wallet:**
> "Create a Nara wallet for me"

**Check balance:**
> "Check my NARA balance"

**PoMI mining:**
> "Mine Nara for me"
> "Run the quest agent"
> "Claim my NARA rewards"

**Transfer:**
> "Send 10 NARA to address xxx"

### Automated Mining Workflow

When you ask the Agent to perform PoMI mining, it automatically executes the following workflow:

1. Check if a wallet exists; create one if not
2. Check balance to determine whether to use direct submission or relay mode
3. Fetch the current on-chain question
4. Analyze the question and compute the answer
5. Submit the ZK proof on-chain
6. Report the reward result
7. Automatically proceed to the next round

## Publish Skills On-Chain

You can publish your own skills to the Nara chain for others to install:

```bash
# Register a skill name
npx naracli skills register my-skill "Your Name"

# Set description
npx naracli skills set-description my-skill "What this skill does"

# Upload skill content
npx naracli skills upload my-skill ./SKILL.md
```

See [Skills Hub SDK](/docs/developer/skills-hub-sdk) for programmatic usage.

## Integrate into Custom Agents

If you're building your own AI Agent, you can programmatically interact with Nara Chain through the [Nara SDK](/docs/developer/sdk) to implement custom on-chain interaction logic.
