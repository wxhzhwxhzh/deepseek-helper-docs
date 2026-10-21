---
id: first-call
title: 首次调用 API
sidebar_label: 首次调用 API
description: 使用 OpenAI / Anthropic 兼容的 SDK 快速调用 DeepSeek API
---

DeepSeek API 使用与 OpenAI/Anthropic 兼容的 API 格式，通过修改配置，您可以使用 OpenAI/Anthropic SDK 访问 DeepSeek API，或使用与 OpenAI/Anthropic API 兼容的软件。

| PARAM | VALUE |
| --- | --- |
| base_url (OpenAI) | `https://api.deepseek.com` |
| base_url (Anthropic) | `https://api.deepseek.com/anthropic` |
| api_key | [申请一个 API key](https://platform.deepseek.com/api_keys) |
| model | `deepseek-flash` (1) / `deepseek-v4-pro` |

(1) 模型名请使用 `deepseek-flash`。该模型现已升级为 DeepSeek-V4.1-Flash-1017，调用方式保持不变。旧模型名 `deepseek-v4-flash` 、`deepseek-v4-flash-vision-exp` 仍可调用，但对应模型已下线，请由 DeepSeek-V4.1-Flash-1017 模型提供服务，并按 Flash 价格计费。

## 接入 Agent 工具

在配置好 API key 之后，DeepSeek 可直接接入下列 Agent 工具。点击对应条目查看详细的配置步骤。

- [DeepSeek Harness](/docs/agent-tools/deepseek-harness)
- [Claude Code](/docs/agent-tools/claude-code)
- [Codex](/docs/agent-tools/codex)
- [OpenCode](/docs/agent-tools/opencode)
- [OpenClaw](/docs/agent-tools/openclaw)
- [Hermes](/docs/agent-tools/hermes)
- [Reasonix](/docs/agent-tools/reasonix)
- [WorkBuddy/CodeBuddy](/docs/agent-tools/workbuddy)
- [Qoder](/docs/agent-tools/qoder)

## 第一个 API 调用

使用 OpenAI SDK 调用 DeepSeek API：

```python
from openai import OpenAI

client = OpenAI(api_key="<your-api-key>", base_url="https://api.deepseek.com")

response = client.chat.completions.create(
    model="deepseek-flash",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手。"},
        {"role": "user", "content": "你好"},
    ],
    stream=False,
)

print(response.choices[0].message.content)
```

使用 Anthropic SDK 调用 DeepSeek API：

```python
from anthropic import Anthropic

client = Anthropic(api_key="<your-api-key>", base_url="https://api.deepseek.com/anthropic")

response = client.messages.create(
    model="deepseek-flash",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "你好"},
    ],
)

print(response.content[0].text)
```

也可以直接使用 `curl` 调用：

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-flash",
    "messages": [
      {"role": "system", "content": "你是一个有帮助的助手。"},
      {"role": "user", "content": "你好"}
    ],
    "stream": false
  }'
```

## 下一步

- 了解 [模型与价格](/docs/quickstart/models-pricing)
- 学习 [Token 用量计算](/docs/quickstart/token-usage)
- 查阅 [错误码](/docs/quickstart/error-codes)
