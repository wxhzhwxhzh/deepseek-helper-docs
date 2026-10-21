---
id: claude-code
title: Claude Code
sidebar_label: Claude Code
description: 在 Claude Code 中接入 DeepSeek API
---

Claude Code 支持通过 `ANTHROPIC_BASE_URL` 与 `ANTHROPIC_AUTH_TOKEN` 指向兼容的第三方 API 服务。

## 配置

```bash
export ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
export ANTHROPIC_AUTH_TOKEN="sk-xxxxxxxxxxxxxxxx"
export ANTHROPIC_MODEL="deepseek-flash"
export API_TIMEOUT_MS=600000
```

将以上变量写入 shell 配置文件（`~/.bashrc` 或 `~/.zshrc`）即可长期生效。

## 启动

```bash
claude
```

## 说明

- 需使用 Anthropic 兼容端点 `https://api.deepseek.com/anthropic`，而非 OpenAI 兼容端点。
- 上下文长度受 DeepSeek 模型限制，超长会话可能被截断。
- 工具调用（Tool Use）能力随模型版本变化，建议使用 `deepseek-v4-pro`。
