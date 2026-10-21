---
id: "2026-10-21-ruyipage-doc"
title: ruyipage 文档
sidebar_label: 📚Ruyipage 文档
description: ruyipage 文档发布
---
# Ruyipage 技能文档（Agent Skill）

> 基于 Firefox + WebDriver BiDi 的 Python 浏览器自动化库。本文件汇总核心 API 与用法，供 Agent 直接查阅调用。

---

## 0. 速查索引

| 能力 | 入口 |
|---|---|
| 启动 | `launch()` / `FirefoxPage(FirefoxOptions())` |
| 导航 | `page.get/back/forward/refresh/save` |
| 元素查找 | `page.ele()` / `page.eles()` |
| 元素交互 | `click_self/input/clear/select/hover/double_click/right_click` |
| 等待 | `page.wait.*` |
| 动作链 | `page.actions.*` |
| 截图 | `page.screenshot()` |
| JS 执行 | `page.run_js()` |
| Cookie | `get/set/delete_cookies` |
| 标签页 | `new_tab/get_tab/close_other_tabs` |
| 滚动 | `page.scroll.*` |
| 网络拦截 | `page.intercept.*` |
| 控制台 | `page.console.*` |
| iframe | `get_frame` / `with_frame` |
| Shadow DOM | `with_shadow` |
| 窗口 | `page.window.*` / `page.rect` |
| 用户提示框 | `set_prompt_handler` / `prompt_login` |
| PDF | `save_pdf` / `pdf` |
| 高级输入 | `combo/press/human/touch/input(files)` |
| 环境模拟 | `page.emulation.*` |
| 上下文 | `browser_tools` / `contexts` |
| 事件 | `page.events` / `navigation` / `realms` |
| 数据采集 | `network` / `capture` / `listen` |
| 扩展 | `page.extensions.*` |
| 下载 | `page.downloads.*` |
| 代理 | `set_proxy` / `set_fpfile` / `set_per_tab_proxies` |
| 接管浏览器 | `auto_attach_exist_browser_by_process` |
| XPath Picker | `xpath_picker=True` |
| 动作可视化 | `action_visual=True` |
| 拟人行为 | `human_move/click/type` |
| 智能指纹 | `opts.smart_fingerprint()` |
| 调试诊断 | `page.trace` / FailureSnapshot |
| JS 调试 | `page.debugger.*` |

---

## 1. 安装与启动

```bash
pip install ruyipage
python -m ruyipage install   # 可选：安装自带 runtime Firefox
```

```python
# 方式一：极简
from ruyipage import launch
page = launch(headless=False)

# 方式二：精细配置
from ruyipage import FirefoxOptions, FirefoxPage
opts = FirefoxOptions()
opts.headless(False)
page = FirefoxPage(opts)
```

**规则**：无论哪种方式，结束前必须 `page.quit()`（建议放在 `finally` 中）。

---

## 2. 页面导航

```python
page.get("https://www.example.com")
page.title          # 标题
page.url            # 当前 URL
len(page.html)      # HTML 长度

page.back()
page.forward()
page.refresh()

page.save(path="./save", name="page", as_pdf=False)  # 存 HTML
page.save(path="./save", name="page", as_pdf=True)   # 存 PDF
```

---

## 3. 元素查找

`page.ele()` 返回单个元素（找不到返回空元素，不报错）；`page.eles()` 返回列表。

```python
page.ele("#main-title")                    # ID
page.ele(".test-class")                    # class
page.eles(".test-class")                   # 所有匹配
page.ele('xpath://a[@id="test-link"]')     # XPath
page.ele("text:点击我")                     # 文本
page.ele('[data-test="value"]')            # 属性
page.ele("#form-section").ele('input[type="text"]')  # 组合/子元素

# 元素属性
el.text / el.tag / el.link / el.attrs / el.src
el.size / el.location
el.is_enabled / el.is_displayed / el.is_checked
el.states.is_in_viewport
```

---

## 4. 元素交互

```python
btn.click_self()

text_input.input("Hello")
text_input.clear()
text_input.value

checkbox.is_checked
checkbox.click_self()

# 下拉选择（原生优先，失败回退兼容）
ok = select.select.by_value("opt2", mode="native_only")
if not ok:
    select.select.by_value("opt2", mode="compat")
select.value
select.select.selected_option

dbl_btn.double_click()
right_btn.right_click()
hover_target.hover()
submit_btn.click_self()
```

---

## 5. 等待条件

```python
page.wait.ele("#main-title", timeout=5)
page.wait.ele_displayed("#click-btn", timeout=5)
page.wait.ele_hidden("#dynamic-content", timeout=3)
page.wait.ele_deleted("#dynamic-content", timeout=3)
page.wait.title_contains("RuyiPage", timeout=2)
page.wait.doc_loaded(timeout=5)
page.wait(2)    # 简单暂停
```

---

## 6. 动作链（物理级 isTrusted=true）

```python
from ruyipage import Keys

page.actions.move_to(btn).click().perform()
page.actions.move_to(btn).db_click().perform()
page.actions.move_to(btn).r_click().perform()

page.actions.type("文本").perform()
page.actions.key_down(Keys.CONTROL).type("a").key_up(Keys.CONTROL).perform()

page.actions.scroll(0, 500).perform()     # 下滚 500px
page.actions.scroll(0, -300).perform()    # 上滚 300px

# 拖拽
page.actions.move_to(src).hold().wait(0.15)
for _ in range(20):
    page.actions.move(10, 5, duration=40)
page.actions.wait(0.1).release().perform()

# 连续动作
page.actions.move_to(btn).click().wait(0.3).click().perform()
```

---

## 7. 截图

```python
page.screenshot("full.png")
page.ele("#main-title").screenshot("title.png")
base64_data = page.screenshot(as_base64=True)
bytes_data  = page.screenshot(as_bytes=True)

page.scroll.to_see(btn)
page.scroll.to_bottom()
```

---

## 8. JavaScript 执行

```python
page.run_js("return 1 + 2")                 # 3
page.run_js("return document.title")
page.run_js("return arguments[0] + arguments[1]", 10, 20)

page.run_js('document.getElementById("main-title").textContent = "改"')

btn.run_js("function() { return this.textContent; }")

page.run_js("""
    (() => {
        const els = document.querySelectorAll('.test-class');
        return Array.from(els).map(el => el.textContent);
    })()
""")

page.run_js("...", as_expr=False, sandbox="example")

pid = page.add_preload_script("() => { window.__pre = 'ready'; }")
page.remove_preload_script(pid)
```

---

## 9. Cookie 管理

```python
cookies = page.get_cookies(all_info=True)
page.set_cookies({"name": "user_id", "value": "12345",
                  "domain": "127.0.0.1", "path": "/",
                  "expiry": int(time.time()) + 3600, "httpOnly": True})
page.set.cookies({...})                    # setter 风格
page.get_cookies_filtered(name="user_id", all_info=True)
page.cookies                               # 简写
page.browser.cookies(all_info=False)

page.delete_cookies(name="api_cookie")
page.delete_cookies()                      # 清空全部
```

---

## 10. 标签页管理

```python
page.tabs_count
page.tab_id
page.tab_ids

tab2 = page.new_tab(url)
bg_tab = page.new_tab(url, background=True)

page.get_tab(1)
page.get_tab(title="Example")
page.get_tabs()

page.browser.activate_tab(bg_tab)

tab2.close()
page.close_other_tabs(first_tab)
```

---

## 11. 滚动操作

```python
page.scroll.to_bottom()
page.scroll.to_top()
page.scroll.to_see(elem)

container.scroll.to_bottom()
container.scroll.to_see(target)

page.actions.scroll(0, 500).perform()
page.run_js("return {x: window.scrollX, y: window.scrollY}")
elem.states.is_in_viewport
```

---

## 12. 网络拦截与抓包

```python
# 1) Mock 响应
def handler(req):
    if "/api/data" in req.url:
        req.mock('{"status":"ok"}', status_code=200,
                 headers={"content-type": "application/json",
                          "access-control-allow-origin": "*"})
    else:
        req.continue_request()          # 必须显式放行

page.intercept.start(handler, phases=["beforeRequestSent"])
page.intercept.stop()

# 2) 阻止
req.fail()

# 3) 改请求头
req.continue_request(headers={"X-Ruyi": "yes"})

# 4) 队列模式
page.intercept.start(handler=None, phases=["beforeRequestSent"])
req = page.intercept.wait(timeout=5)
req.continue_request()

# 5) 响应阶段
def resp_handler(req):
    if "/api/data" in req.url:
        req.continue_response(status_code=299, reason_phrase="Modified")
    else:
        req.continue_response()
page.intercept.start_responses(resp_handler)

# 6) 读取体
req.body / req.request_id / req.response_status / req.response_headers

# 7) collect_response=True 一步读响应体
page.intercept.start(handler=None, phases=["beforeRequestSent"], collect_response=True)
req = page.intercept.wait(timeout=8)
req.continue_request()
resp_body = req.response_body
```

**关键规则**：未处理的请求必须显式 `continue_request()` / `continue_response()`，否则挂起；Mock 跨域要带 `access-control-allow-origin`。

---

## 13. 控制台监听

```python
page.console.start()
logs = page.console.get()
for log in logs:
    print(f"[{log.level}] {log.text}")

page.console.get(level="error")
page.console.wait(level="error", text="wait-target-message", timeout=5)
page.console.clear()
page.console.stop()
```

---

## 14. iframe 操作

```python
iframe = page.get_frame("#test-iframe")
iframe = page.get_frame(index=0)
iframe = page.get_frame(context_id=tid)

iframe.ele("tag:h1")
iframe.ele("#iframe-btn").click_self()
iframe.run_js("return document.body.innerHTML")
iframe.is_cross_origin

# 推荐：上下文管理器（退出自动回主页面）
with page.with_frame("#test-iframe") as f:
    text = f.ele("tag:h1").text
```

---

## 15. Shadow DOM

```python
with page.ele("#host-open-shadow").with_shadow("open") as root:
    text = root.ele("#host-open-text").text

# closed shadow（Firefox privileged 通道）
with page.ele("#host-closed-shadow").with_shadow("closed") as root:
    text = root.ele("#host-closed-text").text

# 嵌套：iframe + shadow
with page.with_frame("#outer-iframe") as frame:
    with frame.ele("#inner-open-host").with_shadow("open") as root:
        text = root.ele("#inner-open-text").text
```

---

## 16. 窗口管理

```python
page.rect.window_size
page.rect.viewport_size
page.rect.window_location
page.rect.page_size
page.rect.scroll_position

page.window.maximize()
page.window.minimize()
page.window.fullscreen()
page.window.normal()

page.window.set_size(1200, 820)
page.window.set_position(40, 40)
page.window.center()
```

---

## 17. 用户提示框

```python
# 启动时配置
opts.set_user_prompt_handler({"alert": "accept", "confirm": "accept",
                              "prompt": "ignore", "default": "accept"})

# 运行时配置
page.set_prompt_handler(alert="accept", confirm="accept",
                        prompt="ignore", default="accept", prompt_text="张三")

# 步骤式登录
page.prompt_login("#login-prompt-btn", "alice", "s3cr3t",
                  trigger="mouse", timeout=2)

page.clear_prompt_handler()
```

---

## 18. PDF 打印

```python
page.save_pdf("out.pdf")
page.save_pdf("out.pdf", page={"width": 21.0, "height": 29.7}, background=True)
page.save_pdf("out.pdf", orientation="landscape", scale=0.9,
              margin={"top": 1.2, "bottom": 1.2, "left": 1.0, "right": 1.0})
page.save_pdf("out.pdf", page_ranges=["1-2"], shrink_to_fit=True)
pdf_bytes = page.pdf(page_ranges=["1"])
```

---

## 19. 高级输入

```python
page.actions.combo(Keys.CTRL, "a").perform()
page.actions.combo(Keys.CTRL, "c").perform()
page.actions.combo(Keys.CTRL, "v").perform()
page.actions.press(Keys.END).perform()

page.actions.double_click(btn).perform()
page.actions.right_click(btn).perform()
page.actions.middle_click(btn).perform()

page.actions.drag(start, end, duration=720, steps=20).perform()
page.actions.drag_to(start, end, duration=800, steps=25).perform()
element.drag_to(drop_zone, duration=0.8)

page.actions.key_down(Keys.SHIFT).click(btn).key_up(Keys.SHIFT).perform()
page.actions.release_all()
page.actions.move(50, 30).perform()
page.actions.curr_x / page.actions.curr_y

# 拟人
page.actions.human_move(btn).human_click().perform()
page.actions.human_type("拟人输入").perform()
page.actions.type("带间隔", interval=50).perform()

# 元素级
element.double_click() / element.right_click() / element.hover()
element.click.left()

# 触摸
page.touch.tap(btn).perform()
page.touch.long_press(target, duration=600).perform()

# 文件上传（绝对路径）
page.ele("#file-input").input(r"/abs/path/file.txt")
page.ele("#multiple-files").input([str(f1), str(f2)])

# isTrusted 验证
page.is_trusted('click')
page.is_trusted('keydown')
page.is_trusted('mouseenter')
```

**别名**：`db_click()` = `double_click()`；`r_click()` = `right_click()`。

---

## 20. 环境模拟

```python
page.emulation.set_user_agent(ua)
page.emulation.set_geolocation(39.9042, 116.4074, accuracy=100)
page.emulation.set_timezone("America/New_York")
page.emulation.set_locale("ja-JP")
page.emulation.set_screen_orientation("landscape-primary", angle=90)
page.emulation.set_screen_size(1920, 1080, device_pixel_ratio=2.0)
page.emulation.set_network_offline(True)
page.emulation.set_touch_enabled(True, max_touch_points=5, scope="context")
page.emulation.set_javascript_enabled(True)
page.emulation.set_scrollbar_type("overlay")
page.emulation.set_forced_colors_mode("dark")
page.emulation.set_bypass_csp(True)

page.emulation.apply_mobile_preset(
    iphone_ua, width=390, height=844, device_pixel_ratio=3.0,
    orientation_type="portrait-primary", angle=0,
    locale="en-US", timezone_id="America/Los_Angeles", touch=False,
)
```

> 部分命令依赖 Firefox 版本，返回 `False` 表示不支持。

---

## 21. 浏览器上下文与用户上下文

```python
# 用户上下文：隔离 Cookie / 会话
before = page.browser_tools.get_user_contexts()
ctx = page.browser_tools.create_user_context()
new_tab = page.browser_tools.create_tab(user_context=ctx)
page.browser_tools.remove_user_context(ctx)

# 典型：多个隔离登录态
for _ in range(3):
    ctx = page.browser_tools.create_user_context()
    page.browser_tools.create_tab(user_context=ctx)

# BrowsingContext
page.contexts.get_tree()
page.contexts.create_tab()
page.contexts.create_window()
page.contexts.close(tab_id)
page.contexts.reload(ignore_cache=True)
page.contexts.set_viewport(800, 600)
page.contexts.set_bypass_csp(True)

# 客户端窗口状态
wins = page.browser_tools.get_client_windows()
page.browser_tools.set_window_state(wins[0].get("clientWindow"), state="maximized")
```

---

## 22. 事件系统

```python
page.events.start([
    "network.beforeRequestSent",
    "network.responseStarted",
    "network.responseCompleted",
    "network.fetchError",
    "network.authRequired",
], contexts=[page.tab_id])
page.events.clear()
evt = page.events.wait("network.beforeRequestSent", timeout=5)
page.events.stop()

# 专用订阅器
page.navigation.start([...])
page.navigation.wait("browsingContext.domContentLoaded", timeout=3)
page.navigation.wait_for_load(timeout=3)
page.navigation.wait_for_fragment("a", timeout=3)

page.realms.start()
page.realms.list()
page.realms.stop()

page.console.start()
page.console.wait(timeout=3)
page.console.entries
```

**常见事件名**：
- 导航：`navigationStarted`、`fragmentNavigated`、`historyUpdated`、`domContentLoaded`、`load`、`navigationCommitted`、`navigationFailed`、`navigationAborted`
- 网络：`beforeRequestSent`、`responseStarted`、`responseCompleted`、`fetchError`、`authRequired`
- 脚本：`realmCreated`、`realmDestroyed`、`message`
- 上下文：`contextCreated`、`contextDestroyed`、`userPromptOpened`、`userPromptClosed`
- 下载：`downloadWillBegin`、`downloadEnd`
- 输入：`fileDialogOpened`
- 日志：`log.entryAdded`

---

## 23. 网络数据采集

```python
# 方式一：DataCollector + listen
from ruyipage import DataCollector
collector = page.network.add_data_collector(data_types=["response"])
page.network.set_extra_headers({"X-Test-Collector": "yes"})
page.network.set_cache_behavior("bypass")

page.intercept.start_requests()
page.listen.start("/api/collector")
req = page.intercept.wait(timeout=8)
req.continue_request()
packet = page.listen.wait(timeout=8)
data = collector.get(req.request_id, data_type="response")
data.has_data / data.bytes
collector.disown(req.request_id, data_type="response")
collector.remove()

# 方式二：被动抓包（先 start 再开页，无法补抓历史）
page.capture.start("bing.com", method="GET", collect_bodies=True)
page.get(search_url)
result = page.capture.wait(timeout=15, count=5)
packet.request_headers / packet.request_body
packet.response_status / packet.response_headers / packet.response_body
packet.is_failed
page.capture.steps
page.capture.stop()

# 方式三：collect_response=True 一步到位
page.intercept.start(handler=None, phases=["beforeRequestSent"], collect_response=True)
req = page.intercept.wait(timeout=8)
req.continue_request()
resp_body = req.response_body
```

---

## 24. 扩展与下载

```python
# WebExtension
ext_id = page.extensions.install(ext_dir)
page.extensions.uninstall(ext_id)
ext_id = page.extensions.install_archive(xpi_path)
page.extensions.uninstall_all()

# 下载
page.downloads.set_behavior("allow", path=download_path)
page.downloads.start()
begin, end = page.downloads.wait_chain(filename="test.txt", timeout=5)
begin.suggested_filename
end.status
page.downloads.wait_file(text_path, timeout=3)

page.downloads.set_behavior("deny")
page.downloads.clear()
page.downloads.stop()
```

---

## 25. 代理配置

```python
# HTTP 代理（fpfile 认证）
opts = FirefoxOptions()
opts.set_browser_path(BROWSER_PATH)
opts.set_proxy("http://host:port")
opts.set_fpfile(FPFILE_PATH)
page = FirefoxPage(opts)
```

fpfile（HTTP）：
```
httpauth.host:gate.example.com
httpauth.port:1288
httpauth.username:<user>
httpauth.password:<pass>
```

```python
# SOCKS5 密码代理
page = launch(browser_path=..., user_dir=profile_dir, fpfile=fpfile_path)
```

fpfile（SOCKS5，`=` 格式）：
```
socksauth.host=host
socksauth.port=1000
socksauth.username=<user>
socksauth.password=<pass>
```

```python
# 按标签页分配代理（需 ruyi 定制内核）
opts.set_per_tab_proxies(proxies, exhausted="wrap")
page = FirefoxPage(opts)
tabs = page.new_container_tabs(count=len(proxies), url=TARGET_URL)
```

---

## 26. 接管已有浏览器

前提：手工启动 Firefox / 指纹浏览器并加 `--remote-debugging-port=9222`。

```python
from ruyipage import auto_attach_exist_browser_by_process
page = auto_attach_exist_browser_by_process(
    timeout=0.2, max_workers=16, latest_tab=True,
)
print(page.browser.address)
print(page.title)
```

---

## 27. 隐私模式与 user_dir

```python
opts.set_user_dir(USER_DIR)    # 复用登录态
opts.private_mode(True)
page = FirefoxPage(opts)

# 或
page = launch(headless=False, user_dir=USER_DIR, private=True)
```

---

## 28. XPath Picker

```python
page = launch(headless=False, xpath_picker=True, window_size=(1600, 1100))

items = page.eles("xpath://section[1]/ul[1]/li", timeout=2)
for item in items:
    print(item.text)
page.ele(NEXT_PAGE_XPATH, timeout=5).click_self()
```

---

## 29. 动作可视化

```python
page = launch(action_visual=True, headless=False,
              port=9334, window_size=(1400, 900))
page.actions.move_to((200, 200)).perform()
page.actions.human_move((800, 200)).perform()
```

---

## 30. 拟人化行为

```python
opts.enable_action_visual(True)
opts.set_human_algorithm("bezier")   # 或 windmouse
opts.set_window_size(1440, 980)
page = FirefoxPage(opts)

page.actions.human_move(page.ele("#target-a"),
                        algorithm="bezier", style="line_then_arc").human_click().perform()
page.actions.human_move(page.ele("#target-b"),
                        algorithm="windmouse").human_click().perform()
page.actions.human_move(input_el).human_click().human_type("demo").perform()
```

---

## 31. 智能指纹

```python
opts = FirefoxOptions()
opts.set_browser_path(BROWSER_PATH)
opts.set_port(9222)

ctx = opts.smart_fingerprint(
    proxy_host="127.0.0.1", proxy_port=7890,
    proxy_user=None, proxy_pwd=None,
    require_country=None, logger=print,
)
print(ctx.summary())
page = FirefoxPage(opts)
ctx.apply_emulation(page, logger=print)
page.get("https://www.google.com")
```

异常：`CountryMismatchError`、`GeoError`。

---

## 32. 调试与诊断

```python
# 启用（三选一）
page = launch(trace=True, failure_snapshot=True, snapshot_dir="./diag")
# 或
opts.enable_trace(True); opts.enable_failure_snapshot(); opts.set_snapshot_dir("./diag")
# 或
Settings.trace_enabled = True
Settings.trace_max_entries = 2000
Settings.failure_snapshot_enabled = True
Settings.raise_when_ele_not_found = True

page.trace.enabled
page.trace.latest(5)
page.trace.recent_requests(10)
page.trace.summary(10)
page.trace.dump_json()
page.trace.clear()

# 失败快照
try:
    page.ele("#nonexistent", timeout=2)
except ElementNotFoundError as e:
    snap = e.diagnostics
    snap.error_type / snap.url / snap.screenshot_path / snap.dom_path
    snap.summary()
```

敏感字段（password/cookie/authorization）自动脱敏。

---

## 33. JS 调试器

```python
opts.enable_debugger()
page = FirefoxPage(opts)
page.get(PAGE)
dbg = page.debugger.start(auto_resume_after=90)

dbg.sources(url_contains=SOURCE)
dbg.source_text(SOURCE)
dbg.breakable_lines(SOURCE)

bp = dbg.set_breakpoint(SOURCE, line, condition="i === 0")
dbg.breakpoints

state = dbg.wait_paused(timeout=30)
state.why / state.line
dbg.frames() / dbg.scope()
dbg.step_into() / step_over() / step_out() / restart_frame()

dbg.set_breakpoint(SOURCE, line, log_value="i, sum")
dbg.wait_logs(count=3, timeout=10)

dbg.expand(probe, depth=1, max_items=20)
dbg.get_property(probe, "double")
dbg.entries(map_obj)
dbg.call(fn, args=[21])
dbg.invoke_getter(probe, "computed")
dbg.promise_state(promise)
dbg.global_object()

dbg.watch_property(config, "token", on="set")
dbg.unwatch_property(config)

dbg.pause_on_exceptions(True, ignore_caught=True)
dbg.pause_on_debugger_statement(True)
dbg.available_event_breakpoints()
dbg.set_event_breakpoints(["event.mouse.click"])
dbg.set_xhr_breakpoint("/", "ANY")

dbg.skip_breakpoints(True)
dbg.blackbox(SOURCE)
dbg.include_async_frames(True)
dbg.clear_breakpoints()
dbg.stop()
```

> **关键**：JS 暂停期间，`run_js`、点击、取文本等 BiDi 调用会阻塞到超时。触发断点的调用必须放在**后台线程**执行。

---

## 34. 最佳实践与陷阱

1. **永远在 `finally` 调 `page.quit()`**，避免残留 Firefox 进程。
2. **网络拦截必须显式放行**：未处理的 `beforeRequestSent` 请求要 `continue_request()`；响应阶段同理 `continue_response()`。
3. **Mock 跨域要带 CORS 头**：`access-control-allow-origin`。
4. **下拉选择**：`native_only` 失败回退 `compat`。
5. **JS 断点用后台线程**：暂停期间 BiDi 阻塞。
6. **抓包先 `start` 再开页**：`page.capture` / `listen` 无法补抓历史请求。
7. **需要 `isTrusted=true` 用 `page.actions`**，不要用 JS 触发。
8. **拟人操作**：`human_move` + `human_click` + `human_type` 组合使用更真实；可配合 `action_visual=True` 调试。
9. **多会话隔离**：用 `browser_tools.create_user_context()` 各标签页 Cookie 互不串。
10. **元素找不到**：`ele()` 默认返回空元素不报错；需要抛异常时设 `Settings.raise_when_ele_not_found = True` 以触发失败快照。