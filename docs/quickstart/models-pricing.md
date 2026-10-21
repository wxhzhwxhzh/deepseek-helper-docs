---
id: models-pricing
title: 模型 & 价格
sidebar_label: 模型 & 价格
description: DeepSeek API 可用模型列表与计费价格
---

## 模型列表

| 模型名称 | 上下文长度 | 最大输出 | 能力 |
| --- | --- | --- | --- |
| `deepseek-flash` | 128K | 8K | 通用对话、代码、推理 |
| `deepseek-v4-pro` | 128K | 8K | 复杂推理、Agent 任务 |

模型名请统一使用 `deepseek-flash` 与 `deepseek-v4-pro`。旧版本模型名已停止服务。

## 价格

价格单位为每百万 token（1M tokens），按 **输入** 与 **输出** 分别计费。

| 模型 | 输入（缓存命中） | 输入（缓存未命中） | 输出 |
| --- | --- | --- | --- |
| `deepseek-flash` | ¥0.2 | ¥2 | ¥8 |
| `deepseek-v4-pro` | ¥0.5 | ¥4 | ¥16 |

:::tip 缓存计费说明
命中上下文缓存的输入 token 按更低的「缓存命中」价格计费。开启 prefix caching 后，长 system prompt 与多轮对话的重复前缀可显著降低成本。
:::

## 如何选择模型

- **日常对话、代码补全、文档处理** —— 使用 `deepseek-flash`，性价比最高。
- **复杂推理、多步规划、长链路 Agent 任务** —— 使用 `deepseek-v4-pro`。

## 获取可用模型列表

```bash
curl https://api.deepseek.com/models \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY"
```

返回示例：

```json
{
  "object": "list",
  "data": [
    {"id": "deepseek-flash", "object": "model", "owned_by": "deepseek"},
    {"id": "deepseek-v4-pro", "object": "model", "owned_by": "deepseek"}
  ]
}
```
