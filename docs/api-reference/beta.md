---
id: beta
title: Beta 接口
sidebar_label: Beta 接口
description: POST /beta 实验性接口
---

用于测试尚未正式发布的能力。该接口的请求格式与返回结构可能发生变化。

`POST https://api.deepseek.com/beta`

:::caution
Beta 接口不保证向后兼容，正式上线前请勿用于生产环境。
:::

## 请求示例

```bash
curl https://api.deepseek.com/beta \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-flash",
    "messages": [
      {"role": "user", "content": "写一个快排"}
    ]
  }'
```

## 说明

- Beta 能力可能随时下线或变更。
- 若需长期稳定使用，请参考[对话补全](/docs/api-reference/chat-completion)。
