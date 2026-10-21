---
id: function-calling
title: 函数调用
sidebar_label: 函数调用
description: 让模型调用你定义的工具函数
---

通过 `tools` 参数可以定义可用函数，模型会返回需要调用的函数名与参数。

## 定义工具

```python
from openai import OpenAI
import json

client = OpenAI(api_key="<your-api-key>", base_url="https://api.deepseek.com")

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "查询指定城市的实时天气",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "城市名称，例如 北京"
                    }
                },
                "required": ["city"],
            },
        },
    }
]

messages = [{"role": "user", "content": "北京今天天气怎么样？"}]

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=messages,
    tools=tools,
)

message = response.choices[0].message

if message.tool_calls:
    for tool_call in message.tool_calls:
        args = json.loads(tool_call.function.arguments)
        result = get_weather(args["city"])

        messages.append(message)
        messages.append(
            {
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result, ensure_ascii=False),
            }
        )

    final = client.chat.completions.create(
        model="deepseek-v4-pro",
        messages=messages,
        tools=tools,
    )
    print(final.choices[0].message.content)
```

## 注意事项

- 模型只负责**生成调用意图**，实际执行需由你的代码完成。
- 工具数量建议控制在 20 个以内，过多会降低选择准确率。
- 工具描述写清楚可显著提升调用准确率。
- 工具执行结果需以 `role: "tool"` 消息回传，并携带对应的 `tool_call_id`。
