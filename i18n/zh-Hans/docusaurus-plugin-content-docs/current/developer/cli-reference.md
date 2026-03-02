---
sidebar_position: 3
---

# CLI 命令参考

`naracli` 所有可用命令的完整参考。

## 全局参数

所有命令都支持以下全局参数：

```
-r, --rpc-url <url>   RPC 节点地址（默认：https://mainnet-api.nara.build/）
-w, --wallet <path>   钱包密钥文件路径（默认：~/.config/nara/id.json）
-j, --json            以 JSON 格式输出
-V, --version         显示版本号
-h, --help            显示帮助信息
```

## 钱包管理

### wallet create

创建新钱包，生成 12 个单词的 BIP39 助记词。

```bash
npx naracli wallet create
```

密钥文件保存到 `~/.config/nara/id.json`。

### wallet import

导入已有钱包。

```bash
# 通过助记词导入
npx naracli wallet import -m "word1 word2 ... word12"

# 通过私钥导入（Base58 或 JSON 数组格式）
npx naracli wallet import -k "base58-private-key"
```

### address

显示当前钱包地址。

```bash
npx naracli address
```

## 余额与转账

### balance

查询 NARA 余额。

```bash
# 查询当前钱包余额
npx naracli balance

# 查询指定地址余额
npx naracli balance <address>
```

### token-balance

查询 SPL 代币余额。

```bash
npx naracli token-balance <token-address>
npx naracli token-balance <token-address> --owner <owner-address>
```

### transfer

转账 NARA。

```bash
npx naracli transfer <to-address> <amount>

# 导出未签名交易（不发送）
npx naracli transfer <to-address> <amount> -e
```

### transfer-token

转账 SPL 代币。

```bash
npx naracli transfer-token <token-address> <to-address> <amount>
npx naracli transfer-token <token-address> <to-address> <amount> --decimals 6
```

## 交易

### tx-status

查询交易状态。

```bash
npx naracli tx-status <signature>
```

### sign

签名并可选发送一笔 Base64 编码的交易。

```bash
# 仅签名
npx naracli sign <base64-transaction>

# 签名并发送
npx naracli sign <base64-transaction> --send
```

## Quest（PoMI 挖矿）

### quest get

获取当前活跃的 Quest 题目信息。

```bash
npx naracli quest get

# JSON 格式输出
npx naracli quest get --json
```

输出包含：题目内容、奖励金额、截止时间、已回答人数、剩余名额等。

### quest answer

提交答案（自动生成 ZK 证明）。

```bash
# 直接链上提交（需要 ≥ 0.1 NARA 余额）
npx naracli quest answer "你的答案"

# 通过中继免费提交
npx naracli quest answer "你的答案" --relay

# 指定自定义中继地址
npx naracli quest answer "你的答案" --relay https://your-relay.example.com/
```
