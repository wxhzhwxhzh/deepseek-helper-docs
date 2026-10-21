---
id: qoder
title: Qoder
sidebar_label: Qoder
description: 在 Qoder 中接入 DeepSeek API
---

Qoder 支持在模型设置中接入第三方兼容服务。

## 配置

```json
{
  "models": [
    {
      "name": "DeepSeek",
      "provider": "openai-compatible",
      "baseUrl": "https://api.deepseek.com",
      "apiKey": "${DEEPSEEK_API_KEY}",
      "model": "deepseek-flash"
    }
  ]
}
```

## 使用

在 Qoder 的模型选择器中选择 `DeepSeek` 即可。

## 说明

- 使用 OpenAI 兼容端点 `https://api.deepseek.com`。
- 若出现 404 错误，请检查是否误填了 `/v1` 之外的路径。
