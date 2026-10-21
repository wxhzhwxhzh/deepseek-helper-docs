---
id: thinking-mode
title: 思考模式
sidebar_label: 思考模式
description: 推理模型的思维链输出
---

推理模型在给出答案前会先生成思维链（reasoning content），可用于复杂任务。

## 开启

推理模型默认开启思考模式，无需额外参数。

```python
from openai import OpenAI

client = OpenAI(api_key="<your-api-key>", base_url="https://api.deepseek.com")

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "证明根号 2 是无理数。"}],
)

message = response.choices[0].message

reasoning = getattr(message, "reasoning_content", None)
if reasoning:
    print("=== 思考过程 ===")
    print(reasoning)

print("=== 最终回答 ===")
print(message.content)
```

## 流式模式下的思维链

流式响应中，思维链内容同样以增量形式返回：

```python
stream = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "求 17 的阶乘模 1000。"}],
    stream=True,
)

for chunk in stream:
    delta = chunk.choices[0].delta
    if getattr(delta, "reasoning_content", None):
        print(delta.reasoning_content, end="", flush=True)
    elif delta.content:
        print(delta.content, end="", flush=True)
```

## 使用建议

- 简单任务使用 `deepseek-flash` 即可，延迟更低、成本更省。
- 复杂推理、数学证明、代码调试建议使用 `deepseek-v4-pro`。
- 思维链会额外消耗 token 并计入输出计费。
- 不要把思维链直接展示给终端用户，除非产品明确需要展示推理过程。
