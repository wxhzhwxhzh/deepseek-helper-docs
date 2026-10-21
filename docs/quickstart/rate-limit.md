---
id: rate-limit
title: 限速与隔离
sidebar_label: 限速与隔离
description: 请求速率限制、并发上限与生产环境隔离建议
---

## 限速说明

DeepSeek API 不对用户施加速率限制（Rate Limit），但会依据资源使用情况动态调整服务容量。高峰期可能出现响应延迟升高的情况。

## 并发与容量

| 项目 | 说明 |
| --- | --- |
| 单账号并发 | 不设硬性上限，按实际资源调度 |
| 排队策略 | 超出容量时请求进入队列等待 |
| 建议并发 | 依据自身业务峰值与实测延迟设定 |

:::tip
流式响应（streaming）会保持连接时长，请勿将并发数设置得高于下游服务的承载能力。
:::

## 错误重试

遇到 `429`（Too Many Requests）或 `5xx` 错误时，建议采用指数退避重试：

```python
import time
import random
from openai import OpenAI

client = OpenAI(api_key="<your-api-key>", base_url="https://api.deepseek.com")

def chat_with_retry(messages, max_retries=5):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(
                model="deepseek-flash",
                messages=messages,
            )
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            backoff = (2 ** attempt) + random.random()
            time.sleep(backoff)
```

## 生产环境隔离建议

- **区分环境**：开发、测试、生产使用不同的 API key，便于用量核算与权限回收。
- **按团队分配 key**：为每个服务或团队单独申请 key，泄漏时可精准吊销。
- **设置用量告警**：在控制台配置余额与用量阈值告警，避免超额调用。
- **不要在前端暴露 key**：所有请求应由服务端代理转发。

```python
# 服务端代理转发示例
from fastapi import FastAPI
from openai import OpenAI

app = FastAPI()
client = OpenAI(api_key=os.environ["DEEPSEEK_API_KEY"], base_url="https://api.deepseek.com")

@app.post("/chat")
async def chat(payload: dict):
    return client.chat.completions.create(
        model="deepseek-flash",
        messages=payload["messages"],
    )
```
