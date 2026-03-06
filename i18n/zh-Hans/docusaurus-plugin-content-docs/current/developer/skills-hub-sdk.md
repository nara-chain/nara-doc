---
sidebar_position: 5
---

# Skills Hub SDK

Skills Hub SDK 提供了与链上技能注册中心的编程交互能力 — 一个用于存储、版本管理和管理 AI 代理技能的链上资产化协议。

## 核心概念

- **技能资产化** — 技能成为链上状态对象，包含名称、作者、描述、内容和版本
- **全局命名空间** — 技能名称全局唯一（5–32 字节，仅小写）
- **分块上传** — 大型内容通过两阶段分块缓冲区机制上传，支持可恢复写入
- **不可变版本面** — 每次内容更新递增版本号，创建可审计的升级轨迹

## API 参考

### registerSkill

注册新技能到链上（收取注册费）。

```typescript
import { registerSkill, Keypair } from 'nara-sdk';
import { Connection } from '@solana/web3.js';

const connection = new Connection('https://mainnet-api.nara.build/', 'confirmed');
const wallet = Keypair.fromSecretKey(/* 你的私钥 */);

// 技能名称：仅小写，5–32 字符
const { skillPubkey } = await registerSkill(connection, wallet, 'my-skill', '作者名');
```

### setDescription / updateMetadata

设置技能描述和元数据。

```typescript
import { setDescription, updateMetadata } from 'nara-sdk';

await setDescription(connection, wallet, 'my-skill', '简要描述。');
await updateMetadata(connection, wallet, 'my-skill', JSON.stringify({ tags: ['ai'] }));
```

### uploadSkillContent

从缓冲区上传技能内容（自动分块，可恢复）。

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

查询技能信息和内容。

```typescript
import { getSkillInfo, getSkillContent } from 'nara-sdk';

const info = await getSkillInfo(connection, 'my-skill');
console.log(info.record.version, info.description, info.metadata);

const bytes = await getSkillContent(connection, 'my-skill');
```

### transferAuthority

将技能所有权转移到新地址。

```typescript
import { transferAuthority } from 'nara-sdk';

await transferAuthority(connection, wallet, 'my-skill', newOwnerPublicKey);
```

### deleteSkill

删除技能并回收所有租金。

```typescript
import { deleteSkill } from 'nara-sdk';

await deleteSkill(connection, wallet, 'my-skill');
```

## 完整示例

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
const wallet = Keypair.fromSecretKey(/* 你的私钥 */);

// 1. 注册
await registerSkill(connection, wallet, 'my-skill', 'Alice');

// 2. 设置描述和元数据
await setDescription(connection, wallet, 'my-skill', '这个技能做什么');
await updateMetadata(connection, wallet, 'my-skill', JSON.stringify({ tags: ['ai'] }));

// 3. 上传内容
const content = readFileSync('SKILL.md');
await uploadSkillContent(connection, wallet, 'my-skill', content);

// 4. 验证
const info = await getSkillInfo(connection, 'my-skill');
console.log(`已发布: v${info.record.version}`);
```
