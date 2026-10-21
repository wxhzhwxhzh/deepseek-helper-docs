---
title: API 文档
sidebar_label: 概览
description: DeepSeek API 接口参考总览
---

本栏目提供 DeepSeek API 的完整接口参考。

## 基础信息

| 项目 | 值 |
| --- | --- |
| Base URL (OpenAI) | `https://api.deepseek.com` |
| Base URL (Anthropic) | `https://api.deepseek.com/anthropic` |
| 鉴权方式 | `Authorization: Bearer <api_key>` |
| 内容类型 | `application/json` |

## 接口列表

| 接口 | 路径 | 方法 |
| --- | --- | --- |
| 对话补全 | `/chat/completions` | POST |
| 模型列表 | `/models` | GET |
| Beta 接口 | `/beta` | POST |

## 鉴权

所有请求都需要在请求头中携带 API key：

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{"model":"deepseek-flash","messages":[{"role":"user","content":"hi"}]}'
```

API key 在[开放平台](https://platform.deepseek.com/api_keys)申请获取。

## 速率与错误

接口不设硬性速率限制。错误码详见[错误码](/docs/quickstart/error-codes)。
