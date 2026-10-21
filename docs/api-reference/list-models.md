---
id: list-models
title: 模型列表
sidebar_label: 模型列表
description: GET /models 接口参考
---

列出当前可用的模型。

`GET https://api.deepseek.com/models`

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page` | integer | 否 | 页码，默认 1 |
| `limit` | integer | 否 | 每页数量，默认 20 |

## 请求示例

```bash
curl https://api.deepseek.com/models \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY"
```

## 响应示例

```json
{
  "object": "list",
  "data": [
    {
      "id": "deepseek-flash",
      "object": "model",
      "created": 1764000000,
      "owned_by": "deepseek"
    },
    {
      "id": "deepseek-v4-pro",
      "object": "model",
      "created": 1764000000,
      "owned_by": "deepseek"
    }
  ]
}
```

## 字段说明

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 模型名称，用于请求中的 `model` 字段 |
| `object` | string | 固定为 `model` |
| `created` | integer | 模型创建时间戳 |
| `owned_by` | string | 归属方 |
