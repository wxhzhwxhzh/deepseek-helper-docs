---
id: token-usage
title: Token 用量计算
sidebar_label: Token 用量计算
description: 如何统计与预估请求消耗的 token 数量
---

## 返回用量信息

每次请求的响应中都会包含 `usage` 字段：

```json
{
  "usage": {
    "prompt_tokens": 31,
    "completion_tokens": 217,
    "total_tokens": 248,
    "prompt_cache_hit_tokens": 0,
    "prompt_cache_miss_tokens": 31
  }
}
```

| 字段 | 含义 |
| --- | --- |
| `prompt_tokens` | 输入 token 总数 |
| `completion_tokens` | 输出 token 总数 |
| `total_tokens` | 输入与输出之和 |
| `prompt_cache_hit_tokens` | 命中上下文缓存的输入 token 数 |
| `prompt_cache_miss_tokens` | 未命中缓存、需要完整计算的输入 token 数 |

## 计费口径

费用按下式计算：

```
总费用 = (缓存命中输入 × 缓存命中单价 + 缓存未命中输入 × 输入单价 + 输出 × 输出单价) / 1,000,000
```

## 用量统计脚本

在 OpenAI SDK 中可直接读取：

```python
response = client.chat.completions.create(
    model="deepseek-flash",
    messages=messages,
)

usage = response.usage
print(f"输入: {usage.prompt_tokens} tokens")
print(f"输出: {usage.completion_tokens} tokens")
print(f"总计: {usage.total_tokens} tokens")
```

## 预估请求量

在请求前预估 token 数量，可以避免不必要的调用开销。常用的经验值：

- 中文：1 个汉字约等于 0.6 ~ 1 个 token。
- 英文：1 个单词约等于 1.3 个 token。
- 代码：语法结构越密集，token 消耗通常越高。

使用 `tiktoken` 进行精确预估：

```python
import tiktoken

encoding = tiktoken.get_encoding("cl100k_base")
tokens = encoding.encode("你好，世界")
print(len(tokens))
```

:::note
不同模型的分词器（tokenizer）存在细微差异，预估结果仅作参考，实际消耗以响应中的 `usage` 字段为准。
:::
