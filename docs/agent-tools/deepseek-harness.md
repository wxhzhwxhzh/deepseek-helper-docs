---
id: deepseek-harness
title: DeepSeek Harness
sidebar_label: DeepSeek Harness
description: 使用 DeepSeek Harness 接入 DeepSeek API
---

DeepSeek Harness 是 DeepSeek 官方推出的 Agent 编排工具，可直接对接 DeepSeek API。

## 配置

在 Harness 的 provider 配置中填入：

```yaml
provider: deepseek
base_url: https://api.deepseek.com
api_key: ${DEEPSEEK_API_KEY}
model: deepseek-flash
```

## 环境变量

```bash
export DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxx"
```

## 验证连接

```bash
harness run --model deepseek-flash "列出当前目录下的文件"
```

## 常见问题

- **鉴权失败**：确认环境变量已导出，且当前 shell 会话中可见。
- **模型不存在**：模型名请使用 `deepseek-flash` 或 `deepseek-v4-pro`。
