---
id: streaming
title: 流式响应
sidebar_label: 流式响应
description: 使用 SSE 流式获取模型输出
---

设置 `stream: true` 即可开启流式输出，模型会逐段返回内容。

## Python

```python
from openai import OpenAI

client = OpenAI(api_key="<your-api-key>", base_url="https://api.deepseek.com")

stream = client.chat.completions.create(
    model="deepseek-flash",
    messages=[{"role": "user", "content": "写一首关于秋天的短诗。"}],
    stream=True,
)

for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

## JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

const stream = await client.chat.completions.create({
  model: "deepseek-flash",
  messages: [{ role: "user", content: "写一首关于秋天的短诗。" }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}
```

## 原始 HTTP

```bash
curl -N https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-flash",
    "messages": [{"role": "user", "content": "你好"}],
    "stream": true
  }'
```

## 事件格式

每个数据块以 `data: ` 前缀开头，解析 `data:` 后的 JSON 即可：

```json
{"id":"chatcmpl-xxx","object":"chat.completion.chunk","choices":[{"delta":{"content":"你"},"index":0}]}
```

流结束时最后一个分片包含 `"finish_reason"`，随后服务端发送 `data: [DONE]`。

:::caution
使用 `curl` 时务必加上 `-N` 参数，否则 curl 会缓冲输出，流式效果将失效。
:::
