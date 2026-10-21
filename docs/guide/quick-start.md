---
id: quick-start
title: 快速上手
sidebar_label: 快速上手
description: 最小可用的 API 调用示例
---

## 安装 SDK

```bash
pip install openai
# 或
npm install openai
```

## 发起第一次调用

```python
from openai import OpenAI

client = OpenAI(api_key="<your-api-key>", base_url="https://api.deepseek.com")

response = client.chat.completions.create(
    model="deepseek-flash",
    messages=[
        {"role": "system", "content": "你是一个乐于助人的 AI 助手。"},
        {"role": "user", "content": "用一句话介绍你自己。"},
    ],
)

print(response.choices[0].message.content)
```

## 多轮对话

将历史消息依次放入 `messages` 数组即可：

```python
messages = [
    {"role": "system", "content": "你是一个乐于助人的 AI 助手。"},
    {"role": "user", "content": "帮我写一个快速排序算法。"},
    {"role": "assistant", "content": "好的，这里是快速排序的实现……"},
    {"role": "user", "content": "再加上对数复杂度的说明。"},
]

response = client.chat.completions.create(
    model="deepseek-flash",
    messages=messages,
)
```

## 关键参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `model` | string | 模型名称，如 `deepseek-flash` |
| `messages` | array | 对话消息列表 |
| `stream` | boolean | 是否使用流式输出，默认 `false` |
| `temperature` | number | 采样温度，0 ~ 2，默认 1 |
| `max_tokens` | integer | 最大输出 token 数 |
| `response_format` | object | 指定 JSON 输出格式 |

更多参数见 [API 文档](/docs/api-reference/chat-completion)。
