---
id: context-length
title: 上下文长度
sidebar_label: 上下文长度
description: 上下文窗口限制与上下文缓存
---

## 上下文窗口

| 模型 | 上下文长度 | 最大输出 |
| --- | --- | --- |
| `deepseek-flash` | 128K | 8K |
| `deepseek-v4-pro` | 128K | 8K |

输入 token 与输出 token 合计受上下文窗口限制。

## 超出限制时

当 `messages` 总长度超出上下文窗口时，API 会返回 `400` 错误，提示上下文长度超限。可采取以下策略：

1. **截断历史**：只保留最近 N 轮对话。
2. **摘要压缩**：将早期对话总结为摘要，作为一条 system 消息保留。
3. **分段处理**：将大文档切分后分批处理，再汇总结果。

```python
def trim_messages(messages, keep_recent=10):
    if len(messages) <= keep_recent:
        return messages
    system = [m for m in messages if m["role"] == "system"]
    recent = messages[-keep_recent:]
    return system + recent
```

## 上下文缓存

开启上下文缓存后，重复出现的 prompt 前缀可命中缓存，命中部分按更低的单价计费。

```python
response = client.chat.completions.create(
    model="deepseek-flash",
    messages=messages,
)

usage = response.usage
print(f"缓存命中: {usage.prompt_cache_hit_tokens} tokens")
print(f"缓存未命中: {usage.prompt_cache_miss_tokens} tokens")
```

缓存生效的关键是**前缀完全一致**：system 消息与多轮对话历史保持稳定，系统会自动缓存未命中的部分。

详见 [Token 用量计算](/docs/quickstart/token-usage)。
