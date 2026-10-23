import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const TITLE = 'DeepSeek API 文档(Sao)';

const config: Config = {
  title: TITLE,
  tagline: 'DeepSeek 开放平台 API 接入指南',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://wxhzhwxhzh.github.io',
  // 本地开发默认 '/'；GitHub Pages 部署时由 Actions 通过 BASE_URL 注入 '/deepseek-helper-docs/'
  baseUrl: process.env.BASE_URL ?? '/',

  organizationName: 'wxhzhwxhzh',
  projectName: 'deepseek-helper-docs',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
    localeConfigs: {
      'zh-Hans': {
        label: '中文（中国）',
        htmlLang: 'zh-CN',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          breadcrumbs: false,
          showLastUpdateTime: false,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        // 中文文档需要指定 zh 语言包才能正确分词
        language: ['zh'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        // 快捷键提示与官网保持一致：ctrl + K
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchBarShortcutKeymap: 'ctrl+k',
        // 搜索框放在导航栏左侧
        searchBarPosition: 'left',
        docsRouteBasePath: ['docs'],
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
      disableSwitch: false,
    },
    navbar: {
      title: TITLE,
      hideOnScroll: false,
      logo: {
        alt: 'DeepSeek Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        width: 30,
        height: 30,
        href: '/docs/quickstart/first-call',
      },
      items: [
        {
          type: 'search',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: '更多资源',
          position: 'right',
          items: [
            {label: '快速开始', to: '/docs/quickstart/first-call'},
            {label: 'API 指南', to: '/docs/guide/overview'},
            {label: 'API 文档', to: '/docs/api-reference/overview'},
            {label: '新闻', to: '/docs/news/overview'},
            {label: '更新日志', to: '/docs/changelog/overview'},
            {label: 'GitHub', href: 'https://github.com/wxhzhwxhzh/deepseek-helper-docs'},
            {label: '开放平台', href: 'https://platform.deepseek.com'},
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://platform.deepseek.com',
          label: '开放平台',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: '快速开始',
          items: [
            {label: '首次调用 API', to: '/docs/quickstart/first-call'},
            {label: '模型 & 价格', to: '/docs/quickstart/models-pricing'},
            {label: 'Token 用量计算', to: '/docs/quickstart/token-usage'},
            {label: '限速与隔离', to: '/docs/quickstart/rate-limit'},
            {label: '错误码', to: '/docs/quickstart/error-codes'},
          ],
        },
        {
          title: '接入 Agent 工具',
          items: [
            {label: 'DeepSeek Harness', href: 'https://github.com/deepseek-ai'},
            {label: 'Claude Code', to: '/docs/agent-tools/claude-code'},
            {label: 'Codex', to: '/docs/agent-tools/codex'},
            {label: 'OpenCode', to: '/docs/agent-tools/opencode'},
            {label: 'OpenClaw', to: '/docs/agent-tools/openclaw'},
            {label: 'Hermes', to: '/docs/agent-tools/hermes'},
            {label: 'Reasonix', to: '/docs/agent-tools/reasonix'},
            {label: 'WorkBuddy/CodeBuddy', to: '/docs/agent-tools/workbuddy'},
            {label: 'Qoder', to: '/docs/agent-tools/qoder'},
          ],
        },
        {
          title: '更多',
          items: [
            {label: '新闻', to: '/docs/news/overview'},
            {label: '更新日志', to: '/docs/changelog/overview'},
            {label: '开放平台', href: 'https://platform.deepseek.com'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DeepSeek. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'bash',
        'python',
        'json',
        'go',
        'yaml',
        'sql',
        'diff',
        'graphql',
        'tsx',
        'jsx',
        'objectivec',
        'scss',
      ],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
