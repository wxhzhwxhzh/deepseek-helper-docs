---
id: error-codes
title: 错误码
sidebar_label: 错误码
description: API 返回的错误码含义与处理方式
---

请求失败时，API 会返回标准 HTTP 状态码与 JSON 格式的错误信息。

## 错误响应格式

```json
{
  "error": {
    "message": "Authentication Fails, Your api key is invalid",
    "type": "authentication_error",
    "param": null,
    "code": "invalid_request_error"
  }
}
```

## 错误码列表

### 400 - Bad Request

请求格式错误或参数不合法。

| 触发场景 | 说明 |
| --- | --- |
| `invalid_request_error` | 缺少必填字段，或字段类型不正确 |
| 模型不存在 | 传入的 `model` 名称无效 |

**处理方式**：检查请求体 JSON 结构与 `model` 名称。

### 401 - Unauthorized

API key 无效、缺失或已过期。

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{"model":"deepseek-flash","messages":[{"role":"user","content":"hi"}]}'
```

**处理方式**：确认 `Authorization` 头格式为 `Bearer <api_key>`，且 key 未被撤销。

### 402 - Insufficient Balance

账户余额不足。

**处理方式**：前往[开放平台](https://platform.deepseek.com)充值。

### 403 - Forbidden

当前 key 无权访问该资源。

### 429 - Too Many Requests

请求过于频繁。

**处理方式**：采用指数退避重试，参见[限速与隔离](/docs/quickstart/rate-limit)。

### 500 - Internal Server Error

服务端内部错误。

**处理方式**：重试；若持续出现，请携带请求 ID 联系支持。

### 503 - Service Unavailable

服务暂时不可用，通常是维护或过载。

**处理方式**：稍后重试。

## 排查建议

1. 记录完整的响应体与 HTTP 状态码。
2. 确认请求路径为 `https://api.deepseek.com/chat/completions`。
3. 确认 `messages` 数组中每条消息都包含 `role` 与 `content`。
4. 使用 `curl` 复现，排除 SDK 层面的封装问题。
