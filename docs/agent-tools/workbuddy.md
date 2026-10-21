---
id: workbuddy
title: WorkBuddy/CodeBuddy
sidebar_label: WorkBuddy/CodeBuddy
description: 在 WorkBuddy / CodeBuddy 中接入 DeepSeek API
---

WorkBuddy 与 CodeBuddy 支持配置自定义模型服务地址。

## 配置

在设置中切换到自定义模型（Custom Provider），填入：

| 配置项 | 值 |
| --- | --- |
| 服务地址 | `https://api.deepseek.com` |
| API Key | 你的 DeepSeek API key |
| 模型 | `deepseek-flash` 或 `deepseek-v4-pro` |

命令行方式：

```bash
export DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxx"
export DEEPSEEK_BASE_URL="https://api.deepseek.com"
```

## 验证

在对话窗口发送一条消息，若正常返回内容即表示接入成功。

## 说明

- 部分版本仅支持 OpenAI 兼容协议，请勿填写 Anthropic 端点。
- 若提示模型不支持工具调用，请改用 `deepseek-v4-pro`。
