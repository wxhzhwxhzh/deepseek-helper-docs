---
id: chat-completion
title: 对话补全
sidebar_label: 对话补全
description: POST /chat/completions 接口参考
---

创建聊天补全。

`POST https://api.deepseek.com/chat/completions`

## 请求体参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 模型名称，如 `deepseek-flash` |
| `messages` | array | 是 | 对话消息列表 |
| `stream` | boolean | 否 | 是否流式输出，默认 `false` |
| `temperature` | number | 否 | 采样温度，0 ~ 2，默认 1 |
| `top_p` | number | 否 | 核采样，默认 1 |
| `max_tokens` | integer | 否 | 最大输出 token 数 |
| `stop` | string \| array | 否 | 停止序列 |
| `tools` | array | 否 | 可用工具定义 |
| `tool_choice` | string \| object | 否 | 工具调用策略 |
| `response_format` | object | 否 | 输出格式，如 `{"type":"json_object"}` |
| `seed` | integer | 否 | 随机种子，用于复现结果 |
| `user` | string | 否 | 终端用户标识，用于统计 |

## messages 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `role` | string | `system` / `user` / `assistant` / `tool` |
| `content` | string \| array | 消息内容，推理模型可能返回 `reasoning_content` |
| `name` | string | 参与者名称（`user` 角色） |
| `tool_call_id` | string | 对应的工具调用 ID（`tool` 角色必填） |

## 响应字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 请求 ID |
| `object` | string | 固定为 `chat.completion` |
| `created` | integer | 创建时间戳 |
| `model` | string | 实际使用的模型 |
| `choices` | array | 候选结果列表 |
| `usage` | object | token 用量统计 |

## 请求示例

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-flash",
    "messages": [
      {"role": "system", "content": "你是一个有帮助的助手。"},
      {"role": "user", "content": "介绍一下你自己。"}
    ],
    "stream": false,
    "max_tokens": 1024
  }'
```

## 响应示例

```json
{
  "id": "chatcmpl-5f4a",
  "object": "chat.completion",
  "created": 1764000000,
  "model": "deepseek-flash",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "你好，我是 DeepSeek……"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 31,
    "completion_tokens": 217,
    "total_tokens": 248,
    "prompt_cache_hit_tokens": 0,
    "prompt_cache_miss_tokens": 31
  }
}
```

## finish_reason

| 值 | 说明 |
| --- | --- |
| `stop` | 正常结束 |
| `length` | 达到 `max_tokens` 上限 |
| `content_filter` | 内容被安全策略拦截 |
| `tool_calls` | 模型请求调用工具 |
