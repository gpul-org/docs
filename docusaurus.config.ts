import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'GPUL',
  tagline: 'Grupo de Programadores e Usuarios de Linux',
  favicon: 'img/favicon.ico',

  url: 'https://gpul.org',
  baseUrl: '/',

  organizationName: 'gpul-org',
  projectName: 'web',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'gl',
    locales: ['gl'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/gpul-org/web',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/gpul-org/web',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/gpul-social-card.png',
    navbar: {
      title: 'GPUL',
      logo: {
        alt: 'GPUL Logo',
        src: 'img/logo-small.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'sidebar',
          position: 'left',
          label: 'Wiki',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          href: 'https://github.com/gpul-org/web',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Redes',
          items: [
            {
              label: 'Bluesky',
              href: 'https://bsky.app/profile/gpul.org',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/gpul_',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/gpul',
            },
            {
              label: 'X',
              href: 'https://x.com/gpul_',
            },
          ],
        },
        {
          title: 'Os nosos fregados',
          items: [
            {
              label: 'Eventos',
              to: '/eventos',
            },
            {
              label: 'HackUDC',
              href: 'https://hackudc.gpul.org',
            },
            {
              label: 'AtlanticaConf',
              href: 'https://atlanticaconf.com',
            },
            {
              label: 'GPUL Schools',
              href: 'https://school.gpul.org',
            },
          ],
        },
        {
          title: 'Contacto',
          items: [
            {
              label: 'Dirección',
              href: 'https://www.openstreetmap.org/way/880574043',
            },
            {
              label: '+34 881 01 1369',
              href: 'tel:+34881011369',
            },
            {
              label: 'info@gpul.org',
              href: 'mailto:info@gpul.org',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/+PrK44xhqJ9eP9ZUf',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Grupo de Programadores e Usuarios de Linux.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
