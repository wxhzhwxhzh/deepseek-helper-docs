---
slug: pi-hotkeys-and-slash-commands
title: Pi Agent 常用热键与斜杠命令速查
authors: [Deepseek-AI]
tags: [技术, Pi, 效率, 速查]
date: "2026-10-25"
---

Pi Agent 的交互几乎全靠两样东西：**热键**和**斜杠命令**。前者管输入、编辑、导航和显示，后者管会话、模型和配置。很多人只用过 `/model` 和 `Ctrl+C`，其实内置命令有 24 个、可绑定动作有上百个。

本文按「日常最常用 → 场景专用」的顺序整理，全部基于 pi 1.4.0 的实际命令注册表和默认键位。所有默认热键都能改，方式见文末。

{/* truncate */}

## 一、最该先记住的 7 个热键

如果只记七个，记这些：

| 热键 | 作用 | 说明 |
|---|---|---|
| `Ctrl+C` | 清空输入框 / 再按退出 | 第一次清空编辑器内容，编辑器已空时再按就退出 |
| `Esc` | 中断当前操作 | 取消运行、关闭选择器 |
| `Ctrl+D` | 退出 | 仅在编辑器为空时生效 |
| `Shift+Tab` | 循环思考等级 | off → minimal → low → medium → high → xhigh → max |
| `Ctrl+L` | 打开模型选择器 | 比输入 `/model` 更快 |
| `Ctrl+P` | 切换到下一个模型 | 快速对比不同模型输出 |
| `Ctrl+O` | 折叠 / 展开工具输出 | 输出太长时先收起来 |

记住这七个别小看：日常交互 80% 的操作都在里面。

---

## 二、输入与编辑

Pi 的编辑器是类 Emacs 的键位，习惯之后手不用离开主键区。

### 2.1 提交与换行

| 热键 | 作用 |
|---|---|
| `Enter` | 提交输入 |
| `Shift+Enter` 或 `Ctrl+J` | 插入换行（多行输入） |
| `Tab` | 补全 / 切换焦点 |

多行输入是新手最容易卡住的点：直接按 `Enter` 就发出去了，长提示词要拆成好几轮。**用 `Shift+Enter`**。

### 2.2 光标移动

| 热键 | 作用 |
|---|---|
| `←` / `→` | 左右移动一个字符 |
| `Ctrl+B` / `Ctrl+F` | 同上（Emacs 风格） |
| `Alt+←` / `Alt+B` | 向左移动一个单词 |
| `Alt+→` / `Alt+F` | 向右移动一个单词 |
| `Home` / `Ctrl+A` | 移到行首 |
| `End` / `Ctrl+E` | 移到行尾 |
| `Ctrl+]` | 向前跳转到指定字符 |
| `Ctrl+Alt+]` | 向后跳转到指定字符 |

`Alt+←` / `Alt+→` 按单词跳，改长句子时效率远高于按住方向键。

### 2.3 删除与撤销

| 热键 | 作用 |
|---|---|
| `Backspace` | 删除前一个字符 |
| `Delete` / `Ctrl+D` | 删除后一个字符 |
| `Ctrl+W` / `Alt+Backspace` | 向前删一个单词 |
| `Alt+D` / `Alt+Delete` | 向后删一个单词 |
| `Ctrl+U` | 删到行首 |
| `Ctrl+K` | 删到行尾 |
| `Ctrl+Y` | 粘贴刚删掉的内容 |
| `Alt+Y` | 在 `Ctrl+Y` 之后循环切换更早的删除内容 |
| `Ctrl+-` | 撤销（Windows 为 `Ctrl+Z`，WSL 为 `Alt+Z`） |

`Ctrl+U` + `Ctrl+Y` 是很实用的组合：**整行删掉但留住**，改一半又想还原时不用重打。

`Ctrl+W` 按单词删除，比连按 `Backspace` 快得多，而且配合 `Ctrl+U` 能快速重写半句话。

### 2.4 历史与翻页

| 热键 | 作用 |
|---|---|
| `↑` / `↓` | 光标上下移动，在边界处浏览历史输入 |
| `PageUp` / `PageDown` | 按页滚动 |

想专门翻历史而不是移动光标，可以绑定 `tui.editor.historyPrevious` / `historyNext`，默认没有绑定。

### 2.5 剪贴板

| 热键 | 作用 |
|---|---|
| `Ctrl+V` | 从剪贴板粘贴图片、文件或文本（Windows / WSL 为 `Alt+V`） |
| `Ctrl+C` | 复制选中内容 |
| `Ctrl+G` | 用外部编辑器打开当前输入 |

`Ctrl+G` 值得单独说：长提示词或要粘贴大段代码时，调出 `$EDITOR`（Windows 下是记事本），写完保存关闭就回填到编辑器。比在小框里滚动舒服得多。

---

## 三、会话与显示

| 热键 | 作用 |
|---|---|
| `Ctrl+T` | 折叠 / 展开思考块 |
| `Ctrl+O` | 折叠 / 展开工具输出 |
| `Ctrl+X` | 复制消息；OAuth 登录页可复制登录链接 |
| `Alt+Enter` | 排队发送后续消息（Windows / WSL 为 `Ctrl+Q`） |
| `Alt+↑` | 把排队中的消息取回编辑器（Windows / WSL 为 `Alt+Q`） |
| `Ctrl+Z` | 挂起到后台（Windows 无默认键位） |

**消息排队**是个被低估的功能。模型还在跑的时候按 `Alt+Enter` 发下一条，它不会打断当前运行，而是在结束后自动接着处理。相当于"提前把话说完"。

---

## 四、全屏模式专用

开启全屏后，这些键接管转录区滚动，优先级高于编辑器同键动作：

| 热键 | 作用 |
|---|---|
| `PageUp` / `PageDown` | 转录区上下翻页 |
| `Ctrl+↑` / `Ctrl+↓` | 跳到上一条 / 下一条标记消息 |
| `Ctrl+Shift+F` | 搜索转录内容（Windows / WSL 为 `Ctrl+F`） |
| `Ctrl+Home` / `Ctrl+End` | 跳到开头 / 结尾并跟随新输出 |

长会话里找回前面某句话，用 `Ctrl+Shift+F` 搜索比手动滚动快一个数量级。

---

## 五、24 个内置斜杠命令

### 5.1 模型与思考

| 命令 | 作用 |
|---|---|
| `/model [provider/model]` | 选择模型，打开选择器 |
| `/thinking <level>` | 设置思考等级 |
| `/scoped-models` | 控制 `Ctrl+P` 循环范围内包含哪些模型 |

`/scoped-models` 配合 `Ctrl+P` 是高频组合：先在 `/scoped-models` 里勾选几个常比的模型（比如一个强的一个快的），之后 `Ctrl+P` 就只在这几个之间循环，不会跳到一堆用不上的模型上。

### 5.2 会话管理

| 命令 | 作用 |
|---|---|
| `/new` | 开始新会话 |
| `/resume` | 恢复另一个会话 |
| `/tree` | 浏览会话树，切换分支 |
| `/fork` | 从某条历史消息创建分叉 |
| `/clone` | 在当前节点复制整个会话 |
| `/compact` | 手动压缩上下文 |
| `/import` | 从 JSONL 文件导入并恢复会话 |
| `/export` | 导出会话（默认 HTML，可指定 `.html` / `.jsonl`） |
| `/share` | 通过 Radius artifact 或 GitHub gist 分享会话 |
| `/name` | 设置会话显示名 |
| `/session` | 查看会话信息与统计 |

**`/fork` 和 `/clone` 的区别**很实用：`/fork` 从**某条历史消息**处分叉（回到那个点重新走），`/clone` 从**当前位置**复制（保留到现在的全部内容再往下走）。前者用于"换个思路重来"，后者用于"基于现状试另一条路"，都不破坏原会话。

**`/compact`** 在上下文快满时手动触发压缩，不用等自动压缩。

`/export` 的 `.jsonl` 格式和 `/import` 配对，可以在机器之间搬运会话。

### 5.3 配置与环境

| 命令 | 作用 |
|---|---|
| `/settings` | 打开设置菜单 |
| `/login <provider>` | 配置供应商认证 |
| `/logout` | 移除供应商认证 |
| `/trust` | 保存项目信任决定，供后续会话使用 |
| `/reload` | 重载键位、扩展、技能、提示词模板、主题和上下文文件 |

`/reload` 是**开发插件和改配置时的必备命令**。改了 `keybindings.json`、装了新扩展、改了主题，都要 `/reload` 才生效。

`/trust` 记住项目信任后，项目级 `.pi/` 下的配置和扩展才会被加载。

### 5.4 辅助

| 命令 | 作用 |
|---|---|
| `/hotkeys` | 显示当前生效的全部快捷键 |
| `/copy` | 复制最后一条模型回复 |
| `/changelog` | 查看更新日志 |
| `/bug <描述>` | 向 Pi 开发者报告问题 |
| `/quit` | 退出 |

`/hotkeys` 是最该知道的命令：**它会列出你当前实际生效的键位**。改了 `keybindings.json` 之后想确认有没有冲突、有没有生效，直接 `/hotkeys` 看，比翻文档可靠。

---

## 六、几个高频工作流

### 6.1 换模型试效果

```
Ctrl+P  →  看输出  →  Ctrl+P  →  看输出
```

想看得更细用 `/model` 打开选择器，里面能搜索。选定后：

- 在 `/model` 里按 `Ctrl+S` 保存为新会话默认模型
- 在 `/thinking` 里按 `Ctrl+S` 保存启动时的思考等级

### 6.2 回到某个历史节点重来

```
/tree  →  选中目标节点  →  /fork
```

原会话完好，新分支独立展开。

### 6.3 写长提示词

```
Ctrl+G  →  编辑器里写  →  保存关闭  →  自动回填  →  Enter
```

### 6.4 上下文快满了

```
/compact
```

压缩后继续，或者 `/export` 存档再用 `/new` 开新会话。

---

## 七、自定义热键

默认键位都能改。创建 `<agent目录>/keybindings.json`（Windows 下是 `C:\Users\<用户名>\.pi\agent\keybindings.json`）：

```json
{
  "$schema": "https://pi.dev/schemas/keybindings.schema.json",
  "app.session.new": "ctrl+shift+n",
  "app.session.tree": ["ctrl+shift+t", "alt+shift+t"]
}
```

要点：

- 键位写成 `修饰键+键`，修饰键有 `ctrl`、`shift`、`alt`、`super`
- 一个动作可以绑多个键（数组），也会覆盖该动作的默认键位
- 想**禁用**某个动作的热键，给空数组：`{ "tui.altScreen.pageUp": [] }`
- 改完执行 `/reload` 生效（当前会话），或重启 Pi

`super` 需要终端支持 Kitty keyboard protocol 才会生效，普通终端下可能无效。

### 部分可绑定但默认没绑的动作

这些动作默认无键位，需要自己配：

| 动作 ID | 用途 |
|---|---|
| `app.session.new` | 新建会话（等同 `/new`） |
| `app.session.tree` | 打开会话树（等同 `/tree`） |
| `app.session.fork` | 分叉会话（等同 `/fork`） |
| `app.session.resume` | 恢复会话（等同 `/resume`） |
| `tui.editor.historyPrevious` | 上一条历史输入 |
| `tui.editor.historyNext` | 下一条历史输入 |
| `tui.altScreen.halfPageUp` | 转录区上翻半页 |
| `tui.altScreen.halfPageDown` | 转录区下翻半页 |
| `tui.altScreen.lineUp` | 转录区上滚一行 |
| `tui.altScreen.lineDown` | 转录区下滚一行 |

把 `/new`、`/tree` 绑定到顺手的热键，能省下大量敲命令的时间。

---

## 八、平台差异注意

Windows 和 WSL 下部分默认键位不同，容易踩坑：

| 功能 | macOS / Linux | Windows / WSL |
|---|---|---|
| 撤销 | `Ctrl+-` | `Ctrl+Z`（WSL 为 `Alt+Z`） |
| 粘贴图片 | `Ctrl+V` | `Alt+V` |
| 排队后续消息 | `Alt+Enter` | `Ctrl+Q` |
| 取回排队消息 | `Alt+↑` | `Alt+Q` |
| 搜索转录 | `Ctrl+Shift+F` | `Ctrl+F` |
| 上一 / 下一标记消息 | `Ctrl+Shift+↑` / `↓` | `Ctrl+↑` / `↓` |
| 挂起 | `Ctrl+Z` | 无默认（Windows 终端不支持 Unix job control） |

另外 `Ctrl+P` 在**会话列表**里是切换「路径显示」，在**主界面**才是模型循环——同一个键在不同上下文含义不同，具体看当前在哪个界面。

---

## 九、速查表

### 热键

```
Enter              提交          Shift+Enter    换行
Esc                中断          Ctrl+C         清空/退出
Ctrl+D             退出          Ctrl+G         外部编辑器
Ctrl+O             折叠工具输出  Ctrl+T         折叠思考块
Ctrl+L             选模型        Ctrl+P         下一个模型
Shift+Tab          循环思考等级  Ctrl+X         复制消息
Alt+Enter          排队消息      Alt+↑          取回排队
Ctrl+W             删单词前      Alt+D          删单词后
Ctrl+U             删到行首      Ctrl+K         删到行尾
Ctrl+Y             粘回删除      Ctrl+-         撤销
Ctrl+A / Ctrl+E    行首 / 行尾   Alt+← / Alt+→  按单词跳
```

### 斜杠命令

```
/model  /thinking  /scoped-models
/new  /resume  /tree  /fork  /clone  /compact  /import  /export  /share  /name  /session
/settings  /login  /logout  /trust  /reload
/hotkeys  /copy  /changelog  /bug  /quit
```

### 一句话总结

日常靠 `Ctrl+C` / `Esc` / `Shift+Tab` / `Ctrl+P` / `Ctrl+O` 五个键；会话管理靠 `/tree`、`/fork`、`/compact`；配置改动靠 `/reload`；忘了键位就 `/hotkeys`。

---

*本文基于 pi 1.4.0。键位和命令列表会随版本变化，以 `/hotkeys` 和实际版本为准。*
