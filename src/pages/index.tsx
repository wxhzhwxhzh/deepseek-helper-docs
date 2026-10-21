import React from 'react';
import {Redirect} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * 首页。
 * 项目未生成独立的根路由，访问 / 会命中 * 兜底路由导致 404，
 * 因此这里提供一个立即跳转到「API 指南」（/docs/guide/overview）的首页。
 * 跳转目标用 useBaseUrl 包裹，确保部署到子路径（GitHub Pages 项目页）时带上前缀。
 */
export default function Home(): JSX.Element {
  return <Redirect to={useBaseUrl('/docs/guide/overview')} />;
}
