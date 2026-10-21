import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

/**
 * 站点主导航（第二行）。
 * 位于顶部 Navbar 下方，用于切换「快速开始 / API 指南 / API 文档 / 新闻 / 更新日志」等大栏目。
 */
export type SectionNavItem = {
  label: string;
  /** 该栏目的路径前缀，用于判断激活态 */
  pathPrefix: string;
  to: string;
};

export const SECTION_NAV_ITEMS: SectionNavItem[] = [
  {label: '快速开始', pathPrefix: '/docs/quickstart', to: '/docs/quickstart/first-call'},
  {label: 'API 指南', pathPrefix: '/docs/guide', to: '/docs/guide/overview'},
  {label: 'API 文档', pathPrefix: '/docs/api-reference', to: '/docs/api-reference/overview'},
  {label: '新闻', pathPrefix: '/docs/news', to: '/docs/news/overview'},
  {label: '更新日志', pathPrefix: '/docs/changelog', to: '/docs/changelog/overview'},
];

export default function SectionNav(): JSX.Element {
  const {pathname} = useLocation();
  // 部署到子路径（如 GitHub Pages 项目页 /deepseek-helper-docs/）时，pathname 自带前缀，
  // 高亮判断需同步带上前缀，否则线上不会命中任何标签
  const baseUrl = useBaseUrl('/');

  return (
    <nav className={styles.sectionNav} aria-label="文档栏目">
      <div className={styles.inner}>
        {SECTION_NAV_ITEMS.map((item) => {
          const prefix = baseUrl.replace(/\/+$/, '') + item.pathPrefix;
          const isActive = pathname.startsWith(prefix);
          return (
            <Link
              key={item.pathPrefix}
              to={useBaseUrl(item.to)}
              className={clsx(styles.link, isActive && styles.linkActive)}
              aria-current={isActive ? 'page' : undefined}>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
