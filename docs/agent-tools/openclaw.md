---
id: openclaw
title: OpenClaw
sidebar_label: OpenClaw
description: 在 OpenClaw 中接入 DeepSeek API
---

OpenClaw 通过环境变量或配置文件指定模型服务地址。

## 配置

```bash
export DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxx"
export DEEPSEEK_BASE_URL="https://api.deepseek.com"
export DEEPSEEK_MODEL="deepseek-flash"
```

或在 `~/.openclaw/config.yaml` 中写入：

```yaml
model:
  provider: deepseek
  base_url: https://api.deepseek.com
  model: deepseek-flash
```

## 启动

```bash
openclaw
```

## 说明

- 首次运行会提示输入 API key，可直接粘贴 DeepSeek 平台的 key。
- 若长任务被中断，可提高 `max_tokens` 或改用 `deepseek-v4-pro`。
