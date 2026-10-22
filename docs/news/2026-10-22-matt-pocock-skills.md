---
id: "2026-10-22-matt-pocock-skills"
title: Matt Pocock Skills：25 个工程技能工作流
sidebar_label: Matt Pocock Skills 全览
description: Matt Pocock（Total TypeScript 作者）开源技能集全览：6 大类 25 个核心技能，覆盖需求访谈到上线的完整工程流程
---

Matt Pocock（TypeScript / Total TypeScript 作者）维护的开源 **Matt Pocock Skills**，是他每天用于真实工程实践（而非"vibe coding"）的可组合技能集。它由一组小而易改、可自由组合的技能构成，支持与任何模型协同。

技能共分 **6 大类、25 个核心技能**，覆盖从需求访谈、规格撰写、工单拆解、TDD 开发、架构优化到团队协作的完整工程流程。

## 六大类总览

| 类别 | 技能 | 作用 |
| --- | --- | --- |
| 入门启动 | `/setup-matt-pocock-skills` | 项目一次性初始化：issue-tracker、triage-labels、domain 文档位置 |
| 入门启动 | `/ask-matt` | 万能路由器，按描述推荐最合适技能 |
| 主工作流 | `/grill-with-docs` | 深度需求访谈，自动更新术语（CONTEXT.md）与 ADR |
| 主工作流 | `/to-spec` | 对话转正式规格（Spec），发布到 issue tracker |
| 主工作流 | `/to-tickets` | Spec 拆成可独立开发的工单，创建 Issue 或本地 .md |
| 主工作流 | `/implement` | 按 Spec 实现代码，测试优先，产出源码 + 测试 + commit |
| 主工作流 | `/code-review` | 对照 Spec 与 Fowler 坏味道基线审查 diff |
| 探索塑形 | `/wayfinder` | 大型模糊任务拆成决策地图（decision tickets） |
| 探索塑形 | `/prototype` | 用代码快速验证设计问题，产出可分享 HTML |
| 探索塑形 | `/research` | 基于一手资料调研，生成带引用的 Markdown |
| 维护运维 | `/improve-codebase-architecture` | 扫描可重构模块，生成可视化报告 |
| 维护运维 | `/diagnosing-bugs` | 从可复现失败定位根因 |
| 维护运维 | `/resolving-merge-conflicts` | 逐 hunk 解决 merge / rebase 冲突 |
| 维护运维 | `/triage` | 整理零散 issue，分类分级 |
| 维护运维 | `/wizard` | 生成引导脚本（bash wizard），完成环境配置 |
| 效率技能 | `/grill-me` | 拷问方案，对齐思路 |
| 效率技能 | `/handoff` | 会话总结成文档，跨会话交接 |
| 效率技能 | `/to-questionnaire` | 开放问题转结构化问卷 |
| 效率技能 | `/teach` | 技术主题拆成多节课程 |
| 效率技能 | `/wait-what` | 用大白话重说上一句 |
| 效率技能 | `/writing-for-agents` | 写给 AI agent 看的技术文档 |
| 参考基准 | `/codebase-design` | 统一架构词汇，设计深模块 |
| 参考基准 | `/domain-modeling` | 统一术语，沉淀领域模型 |
| 参考基准 | `/grilling` | 通用压力测试方法，grill 底层逻辑 |
| 参考基准 | `/tdd` | 测试驱动开发规则集（红—绿—重构） |

## v1.3 新增工程技能

- `/implement-spec` — 一次性并发实现整份 spec，自动合并到 integration 分支
- `/pr` — 生成 PR 正文模板（Summary / Evidence / Merge Danger）
- `/retro` — 对本轮会话做工程复盘，生成 deterministic checks
- `/wait-what`（增强版）— 简化语言 + 使用 GLOSSARY.md 术语重述
- `/chief-of-staff`（实验性）— 长期目标统筹，管理子 agent 与上下文

## 主工作流：从想法到上线

`/grill-with-docs` → `/to-spec` → `/to-tickets` → `/implement` → `/code-review`

## 实战场景技能链路

| 场景 | 推荐技能链路 |
| --- | --- |
| 新功能开发 | grill-with-docs → to-spec → to-tickets → implement → code-review |
| 数值 / 算法类 | grill-with-docs → to-spec → tdd |
| 原型验证 | grill-with-docs → prototype |
| 疑难 bug | diagnosing-bugs → tdd |
| 大型需求拆解 | wayfinder → to-spec → to-tickets |
| 团队协作 | triage + handoff |
| 架构优化 | improve-codebase-architecture |

**核心价值**：把工程基本功浓缩为可重复的实践——先对齐、再规格、拆工单、TDD 落地、代码审查，配合架构勘察与领域建模防止代码腐化。建议新仓库先运行一次 `/setup-matt-pocock-skills` 完成初始化，再按场景选择链路。

> 详细说明见[完整版飞书文档](https://my.feishu.cn/docx/RrYJd73Oeo7aT2xs5DFcFk0Dnjg)。
