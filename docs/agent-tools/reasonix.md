---
id: reasonix
title: Reasonix
sidebar_label: Reasonix
description: 在 Reasonix 中接入 DeepSeek API
---

Reasonix 通过 provider 配置文件接入自定义模型服务。

## 配置

```json
{
  "providers": {
    "deepseek": {
      "type": "openai",
      "baseUrl": "https://api.deepseek.com",
      "apiKey": "${DEEPSEEK_API_KEY}",
      "models": ["deepseek-flash", "deepseek-v4-pro"]
    }
  }
}
```

## 启动

```bash
reasonix --provider deepseek --model deepseek-flash
```

## 说明

- Reasonix 会在启动时读取环境变量，请确保 `DEEPSEEK_API_KEY` 已导出。
- 推理类任务建议使用 `deepseek-v4-pro` 以获得更稳定的多步推理结果。
