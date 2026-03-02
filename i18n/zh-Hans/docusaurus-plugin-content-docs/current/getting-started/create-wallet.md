---
sidebar_position: 2
---

# 创建钱包

在使用 Nara Chain 之前，你需要创建一个钱包。Nara 使用与 Solana 相同的钱包标准（BIP39 助记词 + Ed25519 密钥派生），因此你也可以导入已有的 Solana 钱包。

## 创建新钱包

```bash
npx naracli wallet create
```

执行后会生成一组 12 个单词的助记词，请务必安全备份。密钥文件默认保存在 `~/.config/nara/id.json`。

:::danger 重要
请妥善保管你的助记词！助记词是恢复钱包的唯一方式，一旦丢失将无法找回资产。
:::

## 导入已有钱包

### 通过助记词导入

```bash
npx naracli wallet import -m "your twelve word mnemonic phrase here ..."
```

### 通过私钥导入

支持 Base58 格式或 JSON 数组格式：

```bash
npx naracli wallet import -k "your-base58-private-key"
```

## 查看钱包地址

```bash
npx naracli address
```

## 查询余额

```bash
npx naracli balance
```

查询指定地址的余额：

```bash
npx naracli balance <地址>
```

## 下一步

钱包创建完成后，查看 [网络信息](/docs/getting-started/network-info) 了解 Nara 网络的基本配置，或直接前往 [PoMI 挖矿](/docs/earn-nara/pomi) 开始赚取 NARA。
