---
id: hermes
title: Hermes
sidebar_label: Hermes
description: 在 Hermes 中接入 DeepSeek API
---

Hermes 支持配置 OpenAI 兼容的服务端点。

## 配置

```toml
[llm]
provider = "openai"
model = "deepseek-flash"
base_url = "https://api.deepseek.com"
api_key_env = "DEEPSEEK_API_KEY"
```

```bash
export DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxx"
```

## 启动

```bash
hermes run
```

## 说明

- 需确认 Hermes 所使用的 OpenAI 兼容层支持 `tools` 参数。
- 流式输出（stream）默认开启，如遇解析异常可尝试关闭。
