---
id: json-output
title: JSON 输出
sidebar_label: JSON 输出
description: 让模型返回严格的 JSON 结构
---

设置 `response_format` 为 `{"type": "json_object"}` 可强制模型输出 JSON。

## 基础用法

```python
from openai import OpenAI
import json

client = OpenAI(api_key="<your-api-key>", base_url="https://api.deepseek.com")

response = client.chat.completions.create(
    model="deepseek-flash",
    response_format={"type": "json_object"},
    messages=[
        {
            "role": "system",
            "content": "请以 JSON 格式返回，字段为 title 和 tags（数组）。",
        },
        {"role": "user", "content": "写一篇关于分布式系统的短文。"},
    ],
)

data = json.loads(response.choices[0].message.content)
print(data["title"])
print(data["tags"])
```

## 注意事项

- 使用 JSON 模式时，`messages` 中**必须**包含 `json` 字样（system 提示或用户消息均可），否则可能返回空结果。
- 模型可能返回带 markdown 代码块的 JSON，建议先剥离 ``` 包裹再解析。
- 结构复杂的场景，建议在 system 提示中给出明确的字段说明与示例。

## 健壮解析

```python
import json, re

def parse_json(content: str) -> dict:
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", content.strip())
    return json.loads(cleaned)
```

:::tip
对格式要求极严格的场景，推荐使用 [函数调用](/docs/guide/function-calling)，通过 `parameters` 定义 schema，效果更稳定。
:::
