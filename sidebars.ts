import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * 侧边栏按「大栏目」划分，与顶部第二行导航一一对应。
 * 栏目内的条目平铺展示（与 DeepSeek 官网一致），分组标题用 html 项实现。
 */
const sidebars: SidebarsConfig = {
  quickstart: [
    'quickstart/first-call',
    'quickstart/models-pricing',
    'quickstart/token-usage',
    'quickstart/rate-limit',
    'quickstart/error-codes',
    {
      type: 'html',
      value: '<div class="sidebar-group-title">接入 Agent 工具</div>',
    },
    {
      type: 'link',
      href: 'https://github.com/deepseek-ai',
      label: 'DeepSeek Harness',
    },
    'agent-tools/claude-code',
    'agent-tools/codex',
    'agent-tools/opencode',
    'agent-tools/openclaw',
    'agent-tools/hermes',
    'agent-tools/reasonix',
    'agent-tools/workbuddy',
    'agent-tools/qoder',
    {
      type: 'html',
      value:
        '<a class="sidebar-external-link" href="https://github.com/deepseek-ai" target="_blank" rel="noopener noreferrer">贡献你的 Agent 接入 <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>',
    },
  ],

  guide: [
    'guide/overview',
    'guide/quick-start',
    'guide/streaming',
    'guide/function-calling',
    'guide/json-output',
    'guide/context-length',
    'guide/thinking-mode',
  ],

  apiReference: [
    'api-reference/overview',
    'api-reference/chat-completion',
    'api-reference/list-models',
    'api-reference/beta',
  ],

  news: ['news/overview', 'news/2026-10-deepseek-v4'],

  changelog: ['changelog/overview', 'changelog/2026-10-21'],
};

export default sidebars;
