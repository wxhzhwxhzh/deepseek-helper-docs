import React from 'react';
import {Redirect} from '@docusaurus/router';

/**
 * 首页。
 * 项目未生成独立的根路由，访问 / 会命中 * 兜底路由导致 404，
 * 因此这里提供一个立即跳转到「API 指南」（/docs/guide/overview）的首页。
 */
export default function Home(): JSX.Element {
  return <Redirect to="/docs/guide/overview" />;
}
