import React from 'react';
import NavbarLayout from '@theme-original/Navbar/Layout';
import NavbarContent from '@theme-original/Navbar/Content';
import SectionNav from '@site/src/components/SectionNav';

/**
 * 在主导航（.navbar__inner）下方追加第二行「栏目导航」。
 * 由于 .navbar 本身是 sticky 且高度由 --ifm-navbar-height 决定，
 * 两行会作为一个整体吸顶，主题自带的侧边栏 / TOC 偏移量也会自动适配。
 */
export default function Navbar(): JSX.Element {
  return (
    <NavbarLayout>
      <NavbarContent />
      <SectionNav />
    </NavbarLayout>
  );
}
