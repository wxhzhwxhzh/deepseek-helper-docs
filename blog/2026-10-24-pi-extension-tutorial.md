---
slug: pi-extension-tutorial
title: Pi Agent 插件（Extension）开发入门教程
authors: [Deepseek-AI]
tags: [技术, Pi, 插件开发, TypeScript]
date: "2026-10-24"
---

> 适用版本：pi 1.4.0
> 平台示例：Windows（命令在 macOS / Linux 下同样适用，路径换成 `~/.pi/agent`）
> 文档基线：`<pi安装目录>/docs/extensions.md`、`docs/tui.md`

本文从最小可运行插件讲起，覆盖加载机制、命令/工具/事件三种形态、TUI 自定义组件、状态持久化、调试排错与常见坑，最后给出一个完整可跑的示例。适合想给 Pi Agent 扩展能力但还没写过插件的同学。

{/* truncate */}

---

## 目录

1. [插件是什么](#1-插件是什么)
2. [最小可运行插件](#2-最小可运行插件)
3. [加载方式与目录约定](#3-加载方式与目录约定)
4. [三种最常见的插件形态](#4-三种最常见的插件形态)
   - [4.1 加一个斜杠命令](#41-加一个斜杠命令)
   - [4.2 加一个模型可调用的工具](#42-加一个模型可调用的工具)
   - [4.3 监听生命周期事件](#43-监听生命周期事件)
5. [UI 交互](#5-ui-交互)
6. [自定义终端界面（TUI 组件）](#6-自定义终端界面tui-组件)
7. [状态与持久化](#7-状态与持久化)
8. [调试与排错](#8-调试与排错)
9. [常见坑](#9-常见坑)
10. [进阶方向](#10-进阶方向)
11. [速查表](#11-速查表)

---

## 1. 插件是什么

Pi 的插件叫 **Extension**，是一个 TypeScript 模块。它默认导出一个工厂函数，接收 `ExtensionAPI`，在里面注册能力：

```typescript
export default function (pi: ExtensionAPI) {
  // 在这里注册命令、工具、事件监听……
}
```

插件能做的事：

| 能力 | 方法 |
|---|---|
| 增加 `/` 斜杠命令 | `pi.registerCommand()` |
| 增加模型可调用的工具 | `pi.registerTool()` |
| 增加快捷键 / CLI 参数 | `pi.registerShortcut()` / `pi.registerFlag()` |
| 监听 / 干预生命周期 | `pi.on()` |
| 读写会话、改变当前模型 | `pi` 上的会话控制方法 |
| 增加终端界面 | `ctx.ui` + 自定义组件 |
| 增加模型供应商 | `pi.registerProvider()` |

> ⚠️ **安全提示**：插件在 Pi 进程内运行，拥有和你相同的操作系统权限。它能读你的文件、看你的对话历史和凭证。**只加载你信任来源的插件。**

---

## 2. 最小可运行插件

创建文件 `<agent目录>/extensions/hello.ts`：

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("hello", {
    description: "打个招呼",
    handler: async (name, ctx) => {
      ctx.ui.notify(`Hello, ${name || "world"}!`, "info");
    },
  });
}
```

Windows 下的实际路径：

```
C:\Users\<你的用户名>\.pi\agent\extensions\hello.ts
```

保存后启动 Pi，输入 `/hello` 即可看到效果。带参数则输入 `/hello 张三`。

**不需要编译**——Pi 内部用 `jiti` 直接加载 TypeScript。

---

## 3. 加载方式与目录约定

### 3.1 三个加载位置

| 位置 | 作用范围 | 说明 |
|---|---|---|
| `~/.pi/agent/extensions/` | 个人，所有项目 | 最常用 |
| `<项目>/.pi/extensions/` | 当前项目 | 需要 **项目信任（project trust）** 后才加载 |
| `--extension <路径>` | 仅本次运行 | 开发调试最方便 |

### 3.2 文件还是目录

- **单文件**：`extensions/hello.ts` —— 适合小插件
- **目录**：`extensions/my-plugin/index.ts` —— 适合多文件实现
- 依赖放在旁边的 `package.json` 里

### 3.3 开发时热加载

```bash
pi --extension ./my-plugin.ts
```

修改后，在 Pi 里执行 `/reload` 重新加载（键位、扩展、技能、模板、主题、上下文文件都会重载）。

> `/reload` 会**替换整个扩展运行时**，所以 `await ctx.reload()` 之后的代码属于旧运行时，不要再使用旧的状态。

---

## 4. 三种最常见的插件形态

### 4.1 加一个斜杠命令

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("greet", {
    description: "向指定的人问好",

    // 可选：参数自动补全
    getArgumentCompletions: (prefix) => {
      const names = ["alice", "bob", "carol"];
      const hits = names.filter((n) => n.startsWith(prefix));
      return hits.length ? hits.map((n) => ({ value: n, label: n })) : null;
    },

    handler: async (args, ctx) => {
      const who = args.trim();
      if (!who) {
        ctx.ui.notify("用法: /greet <名字>", "warning");
        return;
      }
      ctx.ui.notify(`你好，${who}！`, "info");
    },
  });
}
```

**要点**

- `handler` 签名固定为 `(args: string, ctx: ExtensionCommandContext) => Promise<void>`
- `args` 是命令名之后的原始字符串，**没有经过分词**，需要自己 `trim()` / `split()`
- `ctx.ui.notify(message, "info" | "warning" | "error")`

### 4.2 加一个模型可调用的工具

工具和命令不同：命令由**你**触发，工具由**模型**决定何时调用。

```typescript
import { Type } from "@earendil-works/pi-ai";
import { defineTool, type ExtensionAPI } from "@earendil-works/pi-coding-agent";

const wordCount = defineTool({
  name: "word_count",
  label: "Word Count",
  description: "统计一段文本的单词数量",   // 模型靠这句话判断何时用
  parameters: Type.Object({
    text: Type.String({ description: "要统计的文本" }),
  }),

  async execute(_toolCallId, params, _signal, _onUpdate, _ctx) {
    const words = params.text.trim().split(/\s+/).filter(Boolean);
    return {
      content: [{ type: "text" as const, text: `单词数: ${words.length}` }],
      details: { count: words.length },   // 结构化数据，可为 undefined
    };
  },
});

export default function (pi: ExtensionAPI) {
  pi.registerTool(wordCount);
}
```

**execute 的五个参数**

```typescript
async execute(toolCallId, params, signal, onUpdate, ctx) { ... }
```

| 参数 | 用途 |
|---|---|
| `toolCallId` | 本次调用 id |
| `params` | 经过 schema 校验的参数 |
| `signal` | `AbortSignal`，长任务要响应取消 |
| `onUpdate` | 汇报中间进度 |
| `ctx` | `ExtensionToolContext`，可 `ctx.executeTool()` 调用其他工具 |

**必须返回的结构**

```typescript
{
  content: [{ type: "text", text: "..." }],  // 模型看到的内容
  details: any,                              // 给 UI / 状态重建用
}
```

**要点**

- `description` 决定模型会不会用这个工具，写得具体些
- 用 `Type.Object()` 声明参数（TypeBox），**不要手写 JSON Schema**
- 抛异常 = 工具失败；返回对象 = 成功（想返回"带数据的错误"用 `isError: true`）
- 文件读写类工具要用 `withFileMutationQueue()` 包住整个"读-改-写"
- 结果很大时要截断，并告诉模型完整内容在哪

验证是否生效：让模型用一下，例如

```
用 word_count 工具统计 'hello world foo'，只报数字
```

### 4.3 监听生命周期事件

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  // agent_settled：Pi 真正空闲下来（不会再有重试/压缩/后续）
  pi.on("agent_settled", async (_event, ctx) => {
    ctx.ui.setStatus("my-plugin", "就绪");
  });

  // tool_call：可以拦截工具调用
  pi.on("tool_call", async (event, ctx) => {
    if (event.toolName === "bash" && String(event.input.command).includes("rm -rf")) {
      if (!(await ctx.ui.confirm("危险操作", event.input.command))) {
        return { block: true, reason: "用户拒绝执行" };
      }
    }
  });

  // session_start：会话启动时初始化
  pi.on("session_start", async (_event, ctx) => {
    ctx.ui.notify("插件已加载", "info");
  });
}
```

**常用事件选择**

| 目的 | 事件 |
|---|---|
| 检查 / 改写 / 拦截用户输入 | `input` |
| 每次运行前改提示词或工具集 | `before_agent_start` |
| 观察一次 agent 运行 | `agent_start` / `agent_end` |
| 模型回完一轮 | `turn_end` |
| 过滤发给模型的对话 | `context` |
| 授权 / 修改工具调用 | `tool_call` |
| 脱敏 / 改写工具结果 | `tool_result` |
| Pi 彻底空闲（通知类） | `agent_settled` |
| 初始化 / 释放资源 | `session_start` / `session_shutdown` |

> **注意**：`agent_end` 不是"最终空闲"信号——之后可能还有重试、恢复、压缩或排队的后续消息。要做通知请用 `agent_settled`。

---

## 5. UI 交互

`ctx.ui` 提供现成的对话框，优先用它们，不要自己造轮子：

```typescript
// 选择
const choice = await ctx.ui.select("选择环境", ["dev", "staging", "prod"]);

// 确认
const ok = await ctx.ui.confirm("确认删除？", "此操作不可撤销");

// 输入
const name = await ctx.ui.input("项目名", "例如 my-app");

// 通知
ctx.ui.notify("完成", "info");

// 状态栏文字（传 undefined 清除）
ctx.ui.setStatus("build", "构建中…");

// 编辑器内容
const text = ctx.ui.getEditorText();
ctx.ui.setEditorText("预填充内容");

// 替换编辑器 / 页眉 / 页脚
ctx.ui.setEditorComponent((tui, theme, keybindings) => new MyEditor(...));
```

**必须先判断模式**：插件也会在 RPC / JSON / print 模式下加载，这些模式没有完整 UI。

```typescript
if (ctx.mode !== "tui") {
  ctx.ui.notify("此功能需要交互模式", "error");
  return;
}
```

也可以用 `ctx.hasUI` 判断（覆盖交互模式 + RPC）。

---

## 6. 自定义终端界面（TUI 组件）

内置对话框不够用时，用 `ctx.ui.custom()` 接管一块区域。

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { truncateToWidth } from "@earendil-works/pi-tui";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("pick", {
    description: "自建选择器",
    handler: async (_args, ctx) => {
      if (ctx.mode !== "tui") return;

      const choices = ["red", "green", "blue"];
      const picked = await ctx.ui.custom<string | undefined>(
        (tui, theme, keybindings, done) => {
          let index = 0;
          let cachedWidth: number | undefined;
          let cachedLines: string[] | undefined;

          const invalidate = () => {
            cachedWidth = undefined;
            cachedLines = undefined;
          };

          return {
            render(width: number): string[] {
              if (cachedLines && cachedWidth === width) return cachedLines;

              cachedWidth = width;
              cachedLines = [
                theme.fg("accent", "选择颜色"),
                ...choices.map((c, i) =>
                  i === index ? theme.fg("accent", `❯ ${c}`) : `  ${c}`,
                ),
                theme.fg("dim", "↑/↓ 移动 · Enter 确认 · Esc 取消"),
              ].map((line) => truncateToWidth(line, width));  // 必须按宽度截断

              return cachedLines;
            },

            handleInput(data: string): void {
              if (keybindings.matches(data, "tui.select.up")) {
                index = (index - 1 + choices.length) % choices.length;
              } else if (keybindings.matches(data, "tui.select.down")) {
                index = (index + 1) % choices.length;
              } else if (keybindings.matches(data, "tui.select.confirm")) {
                done(choices[index]);
                return;
              } else if (keybindings.matches(data, "tui.select.cancel")) {
                done(undefined);
                return;
              } else {
                return;
              }
              invalidate();
              tui.requestRender();
            },

            invalidate,
          };
        },
        { overlay: true },   // overlay: 浮在现有内容上
      );

      if (picked) ctx.ui.notify(`选择了 ${picked}`, "info");
    },
  });
}
```

**四条硬规则**

1. **每行都不能超过传入的 `width`** —— 用 `truncateToWidth()` / `visibleWidth()`，不要用 `String.length`（中文、emoji、ANSI 转义都会算错）
2. **状态变了要 `invalidate()` 并 `tui.requestRender()`**
3. **用 `keybindings.matches(data, "动作ID")`** 判断按键，不要硬编码 `\x1b[A`
4. **每次交互都新建组件实例**，不要复用

**主题色用法**

```typescript
theme.fg("accent", "文字")              // 前景色
theme.bg("selectedBg", "背景")          // 背景色
theme.style("文字", { fg: "accent", bold: true })  // 组合样式
theme.appearance                        // "dark" | "light"
```

不要缓存带颜色转义字符串（除非 `invalidate()` 会重建）——主题切换后旧转义会残留。

**想改 Pi 的主编辑器？** 继承 `CustomEditor`，这样应用快捷键和 agent 控制都保留。

---

## 7. 状态与持久化

按状态的性质选存储方式：

| 状态类型 | 存储方式 |
|---|---|
| 跟随当前分支的工具状态 | 工具结果的 `details` 字段 |
| 长期保存但**不**发给模型 | `pi.appendEntry()` |
| 要存**并**发给模型的自定义内容 | `pi.sendMessage()` |
| 跨会话数据 | 自己写文件 |

分支敏感的状态要在 `session_start` 时从 `ctx.sessionManager.getBranch()` 重建——不要遍历所有文件条目重建，因为被放弃的分支代表"另一条历史"。

```typescript
pi.on("session_start", async (_event, ctx) => {
  const branch = ctx.sessionManager.getBranch();
  // 从 branch 中恢复你的插件状态
});
```

**清理资源**：在 `session_shutdown` 里释放，并且要**幂等**——取消、重载、切换会话、进程退出都可能走到同一条清理路径。

```typescript
pi.on("session_shutdown", async () => {
  clearInterval(myTimer);
});
```

> 不要在工厂函数里启动进程、socket、watcher 或定时器——有些调用不会启动会话。长生命周期资源从 `session_start` 或用到它的命令里启动。

---

## 8. 调试与排错

### 8.1 开发循环

```bash
pi --extension ./my-plugin.ts
```

改代码 → Pi 里 `/reload` → 再测。

### 8.2 查看扩展报错

Pi 会报告插件错误并尽量继续运行。命令模式下：

```bash
pi --mode rpc
```

会输出 `{"type":"extension_error", ...}` 事件。

### 8.3 排查渲染问题

```bash
PI_TUI_WRITE_LOG=/tmp/tui.log pi
```

抓取原始 ANSI 输出流。

### 8.4 类型检查

在 Pi 包目录下做检查，让 `node_modules` 能正确解析：

```bash
cd "$(npm root -g)/@earendil-works/pi-coding-agent"
# 把你的插件临时复制进来再检查
npx tsc --noEmit --target es2022 --module esnext \
  --moduleResolution bundler --skipLibCheck ./your-plugin.ts
```

### 8.5 确认命令是否注册成功

用 RPC 模式发一条 prompt：

```bash
echo '{"id":"1","type":"prompt","message":"/your-command"}' | pi --mode rpc --extension ./p.ts
```

看到 `"disposition":"handled"` 说明扩展命令被处理了。

---

## 9. 常见坑

| 现象 | 原因 / 解决 |
|---|---|
| 插件不加载 | 路径不对；项目插件需要先 `/trust`；文件名必须是 `.ts`/`.js` 或目录含 `index.ts` |
| 改了代码没生效 | 执行 `/reload` |
| `ctx.ui.select` 返回 `undefined` | 处于 print/JSON 模式；先判断 `ctx.mode === "tui"` |
| 命令参数拿不到 | `args` 是原始字符串，需要自己 `trim()` / `split()` |
| 工具不被模型调用 | `description` 太模糊；说清楚"什么时候该用" |
| 渲染错位 / 乱码 | 没按 `width` 截断；用 `truncateToWidth()` |
| 主题切换后颜色错乱 | 缓存了带 ANSI 转义的字符串；在 `invalidate()` 里重建 |
| `/reload` 后报错 | 在 `ctx.reload()` 之后还使用了旧运行时状态 |
| 资源泄漏 | 忘了在 `session_shutdown` 清理，或清理不幂等 |

---

## 10. 进阶方向

| 目标 | 参考示例（Pi 包内 `examples/extensions/`） |
|---|---|
| 确认/拦截工具调用 | `permission-gate.ts` |
| 改提示词片段 | `prompt-customizer.ts` |
| 分支感知的工具状态 | `todo.ts` |
| 运行时动态注册工具 | `dynamic-tools.ts` |
| 命令里跑嵌套模型调用 | `qna.ts` |
| 替换主编辑器 | `modal-editor.ts` |
| 退出时做收尾 | `auto-commit-on-exit.ts` |
| 完整 TUI overlay 测试 | `overlay-qa-tests.ts` |
| 加模型供应商 | `custom-provider-gitlab-duo/` |

示例目录：

```
<pi安装目录>/examples/extensions/
```

Windows：

```
C:\Users\<用户名>\AppData\Roaming\npm\node_modules\@earendil-works\pi-coding-agent\examples\extensions\
```

**分发插件**：用 Pi 包（Pi packages），可以带上依赖、命令、技能、主题一起发布。见 `docs/packages.md`。

---

## 11. 速查表

### 工厂函数

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) { /* ... */ }
```

### 注册

```typescript
pi.registerCommand(name, { description, handler, getArgumentCompletions? })
pi.registerTool(defineTool({ name, label, description, parameters, execute }))
pi.registerShortcut("ctrl+shift+x", { description, handler })
pi.registerFlag("my-flag", { description, type: "boolean", default: false })
pi.on(event, handler)      // 返回取消订阅函数
```

### 命令 handler

```typescript
async (args: string, ctx: ExtensionCommandContext) => { ... }
```

### 工具 execute

```typescript
async execute(toolCallId, params, signal, onUpdate, ctx) {
  return { content: [{ type: "text", text: "..." }], details: {...} };
}
```

### 常用 ctx

| 属性 / 方法 | 说明 |
|---|---|
| `ctx.mode` | `"tui"` / `"rpc"` / `"json"` / `"print"` |
| `ctx.hasUI` | 是否有可用 UI |
| `ctx.cwd` | 工作目录 |
| `ctx.signal` | 当前回合的 AbortSignal |
| `ctx.sessionManager` | 会话读写 |
| `ctx.ui.*` | 对话框、通知、状态 |
| `ctx.reload()` | 重载运行时（仅命令上下文） |

### 官方文档

| 文档 | 内容 |
|---|---|
| `docs/extensions.md` | 插件开发主文档 |
| `docs/tui.md` | 终端 UI 组件 |
| `docs/themes.md` | 主题机制 |
| `docs/settings.md` | 设置项 |
| `docs/packages.md` | 打包分发 |
| `docs/cli.md` | 命令行参数 |

---

## 附：一个完整可跑的例子

把下面内容存为 `~/.pi/agent/extensions/demo.ts`，重启 Pi（或 `/reload`）：

```typescript
import { Type } from "@earendil-works/pi-ai";
import { defineTool, type ExtensionAPI } from "@earendil-works/pi-coding-agent";

// 1) 一个模型可调用的工具
const wordCount = defineTool({
  name: "word_count",
  label: "Word Count",
  description: "统计一段文本的单词数量",
  parameters: Type.Object({
    text: Type.String({ description: "要统计的文本" }),
  }),
  async execute(_id, params) {
    const n = params.text.trim().split(/\s+/).filter(Boolean).length;
    return {
      content: [{ type: "text" as const, text: `单词数: ${n}` }],
      details: { count: n },
    };
  },
});

// 2) 一个斜杠命令
// 3) 一个生命周期监听
export default function (pi: ExtensionAPI) {
  pi.registerTool(wordCount);

  pi.registerCommand("demo", {
    description: "插件演示命令",
    handler: async (args, ctx) => {
      ctx.ui.notify(`demo 收到参数: ${args.trim() || "(空)"}`, "info");
    },
  });

  pi.on("session_start", async () => {
    // 会话启动时的初始化，这里什么都不做
  });
}
```

验证：

```
/demo hello
```

以及让模型调用工具：

```
用 word_count 工具统计 'hello world foo'，只报数字
```

预期输出 `3`。

---

*教程结束。以你安装的 Pi 版本内 `docs/` 目录为准，API 可能有版本差异。*
