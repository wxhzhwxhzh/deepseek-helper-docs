---
id: codex
title: Codex
sidebar_label: Codex
description: 在 Codex 中接入 DeepSeek API
---

Codex CLI 通过 `config.toml` 中的 provider 配置接入自定义模型服务。

## 配置

```toml
[model_providers.deepseek]
name = "DeepSeek"
base_url = "https://api.deepseek.com"
env_key = "DEEPSEEK_API_KEY"
wire_api = "responses"

[profiles.deepseek]
model_provider = "deepseek"
model = "deepseek-flash"
```

```bash
export DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxx"
```

## 启动

```bash
codex --profile deepseek
```

## 说明

- `wire_api` 需与 DeepSeek 支持的协议保持一致。
- 若出现协议不兼容错误，请在 `wire_api` 中尝试 `chat` 与 `responses` 两种取值。
