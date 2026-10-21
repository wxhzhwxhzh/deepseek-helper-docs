---
id: "2026-10-deepseek-v4"
title: DeepSeek-V4 系列模型上线
sidebar_label: DeepSeek-V4 系列模型上线
description: DeepSeek-V4 系列模型发布公告
---

2026 年 10 月，DeepSeek-V4 系列模型正式上线，现已可通过 API 访问。

## 新增模型

| 模型 | 定位 | 上下文长度 |
| --- | --- | --- |
| `deepseek-v4-pro` | 复杂推理与 Agent 任务 | 128K |
| `deepseek-flash` | 通用场景，性价比较高 | 128K |

## 兼容性

- 沿用 OpenAI / Anthropic 兼容接口，无需修改既有代码结构。
- 旧模型名 `deepseek-v4-flash`、`deepseek-v4-flash-vision-exp` 已停止服务，请改用 `deepseek-flash`。
- 旧模型名对应的能力由 DeepSeek-V4.1-Flash-1017 提供，按 Flash 价格计费。

## 价格

详见[模型 & 价格](/docs/quickstart/models-pricing)。
