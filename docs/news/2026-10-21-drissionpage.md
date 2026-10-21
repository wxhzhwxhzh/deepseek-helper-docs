---
id: "2026-10-21-drissionpage"
title: DrissionPage AI CLI 上线
sidebar_label: DrissionPage AI CLI 上线
description: DrissionPage AI CLI 发布公告，自然语言驱动浏览器自动化
---

# 🤖 drissionpage-ai

> ⚠️ 本项目基于 DrissionPage（作者 g1879）二次开发，在原版基础上新增 AI 能力。版权归原作者所有，本项目遵循原版 LICENSE：**仅限个人学习与非盈利用途，商用需提前获得 g1879 授权**。

`drissionpage-ai` 在 DrissionPage 之上，提供**自然语言驱动的浏览器自动化**能力，不用手写复杂选择器，靠文字描述就能操控网页。

## ✨ 核心能力
- `aiLocate(target)` — 自然语言描述定位元素（视觉模型 + 截图识别）
- `aiTap(target)` / `aiInput(target, text)` / `aiTapAt(bbox)` — AI 定位后直接执行操作，支持模型原生坐标点击
- `aiQuery(prompt)` / `aiAsk(prompt)` — 自然语言从页面提取结构化数据
- `aiAct(prompt, options={'max_turns': 20})` — ReAct 智能体循环，自主截图观察、点击、输入，自动完成多步复杂任务

## 📦 安装
```bash
pip install drissionpage-ai
```
本包属于 DrissionPage AI 插件，会自动安装官方 DrissionPage（`>=4.1.1`）作为依赖，两者可共存。

导入 `drissionpage_ai` 之后：
- 所有页面对象（`ChromiumTab` 等）自动挂载 `agent` 属性和全部 `ai*` 系列方法
- `Chromium`、`ChromiumOptions` 等常用类直接从本包导出，一行导入即可使用

## ⚙️ AI 模型配置
支持所有兼容 OpenAI 协议的接口：OpenAI、DashScope、火山 ARK、Kimi 等，通过环境变量配置：
```bash
export OPENAI_API_KEY="sk-..."
export OPENAI_BASE_URL="[https://api.openai.com/v1](https://api.openai.com/v1)"
# 可选，只要是 OpenAI 兼容格式接口均可接入，火山 Agent Plan、Kimi、阿里 Token Plan 均已测试可用
```

### 可选调优环境变量
- `DP_AI_TIMEOUT`：AI 请求超时时间，默认 `90`
- `DP_AI_TEMPERATURE`：模型温度，默认 `0`（偏向稳定、确定性输出）
- `DP_AI_MAX_TOKENS`：模型最大输出 token，默认 `1200`
- `DP_AI_DEBUG_DIR`：调试截图、日志输出目录；未配置时默认输出到脚本同级 `debug_log/`，找不到脚本则回退到系统临时目录

> 💡 提示：开启调试后，请将 `debug_log/` 加入 `.gitignore`，避免截图、请求日志被误提交。

### 🛡️ 动作预览确认模式
`aiAct` 支持安全预览模式：传入 `options={'preview_actions': True}`
开启后，`tap_at` / `wheel_at` / `drag` 这类坐标操作**不会立刻执行**：
1. 先在截图上标记预期操作位置，交给模型核验
2. 核验通过，调用 `confirm_action` 才真实执行
3. 坐标识别错误可自动修正重试，默认最多预览调整 4 次，可通过 `max_action_previews` 修改上限

非常适合支付、表单提交这类不可逆高危场景；代价是每一步动作会多一轮模型请求。

## 🚀 快速上手
```python
from drissionpage_ai import Chromium
# 一次导入，同时加载 DrissionPage 并启用全部 AI 方法

tab = Chromium().latest_tab
tab.get('[https://example.com](https://example.com)')

# 一句话完成多步操作：AI 看图理解并执行
tab.aiAct('点击"登录"按钮，在账号输入框输入 demo_user')

# 也可以拆分，分步控制
tab.aiInput('账号输入框', 'demo_user')
```

## 🧪 运行 Demo
仓库 `demos/` 目录内置真实场景示例：B站登录、DeepSeek 登录等。
配置统一通过 `.env` 文件管理：
```bash
cp .env.example .env
python demos/bilibili_login.py
```
Demo 内 `prepare_*_env()` 会借助 `demo_env.py` 加载 `.env` 环境变量。
`.env` 默认已加入 gitignore，不会提交；` .env.example` 为空白模板。

## 📚 官方文档参考
DrissionPage 原生基础用法请查阅官网：[https://drissionpage.cn](https://drissionpage.cn)

> 📌 版本提示：官方自 4.1 版本起推荐 `Chromium().latest_tab` 写法，`ChromiumPage` / `WebPage` 会在 5.0 版本移除；本插件已适配新版写法。
```

