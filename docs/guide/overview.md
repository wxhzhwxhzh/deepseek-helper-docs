---
id: overview
title: API 指南
sidebar_label: 概览
description: DeepSeek API 使用指南总览
---

本栏目介绍 DeepSeek API 的核心概念与常用能力，帮助你快速完成对接。

## 内容索引

- [快速上手](/docs/guide/quick-start) —— 最小可用的调用示例
- [流式响应](/docs/guide/streaming) —— SSE 流式输出
- [函数调用](/docs/guide/function-calling) —— 让模型调用你的函数
- [JSON 输出](/docs/guide/json-output) —— 结构化结果返回
- [上下文长度](/docs/guide/context-length) —— 上下文窗口与缓存
- [思考模式](/docs/guide/thinking-mode) —— 推理模型的思维链

## 兼容性说明

DeepSeek API 与 OpenAI / Anthropic 的接口格式兼容，你可以：

- 使用 OpenAI 官方 SDK，只需修改 `base_url` 与 `api_key`。
- 使用 Anthropic 官方 SDK，只需把 `base_url` 改为 `https://api.deepseek.com/anthropic`。
- 使用任何兼容 OpenAI Chat Completions 协议的软件或框架。

## 请求端点

| 端点 | 方法 | 说明 |
| --- | --- | --- |
| `/chat/completions` | POST | 对话补全（支持流式） |
| `/models` | GET | 获取可用模型列表 |
| `/beta` | POST | Beta 特性（实验性） |

完整参数说明请查阅 [API 文档](/docs/api-reference/overview)。
