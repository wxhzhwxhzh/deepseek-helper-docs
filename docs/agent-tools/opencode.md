---
id: opencode
title: OpenCode
sidebar_label: OpenCode
description: 在 OpenCode 中接入 DeepSeek API
---

OpenCode 支持通过 provider 配置接入 OpenAI 兼容端点。

## 配置

在 `opencode.json` 中添加：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "deepseek": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "DeepSeek",
      "options": {
        "baseURL": "https://api.deepseek.com",
        "apiKey": "{env:DEEPSEEK_API_KEY}"
      },
      "models": {
        "deepseek-flash": {
          "name": "DeepSeek Flash"
        }
      }
    }
  }
}
```

```bash
export DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxx"
```

## 使用

```bash
opencode --model deepseek/deepseek-flash
```

## 说明

- 使用 OpenAI 兼容端点 `https://api.deepseek.com`。
- 如需工具调用（tool call）能力，建议选择 `deepseek-v4-pro`。
