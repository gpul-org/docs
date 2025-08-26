import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'GPUL Docs',
  tagline: 'Documentación do Grupo de Programadores e Usuarios de Linux',
  favicon: 'img/favicon.ico',

  url: 'https://docs.gpul.org',
  baseUrl: '/',

  organizationName: 'gpul-org',
  projectName: 'docs',

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
          editUrl: 'https://github.com/gpul-org/web',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/gpul-social-card.png',
    metadata: [
      {
        name: 'keywords',
        content: 'open source, linux, gpul, documentacion, udc, coruna, fic',
      },
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    navbar: {
      title: 'GPUL Docs',
      logo: {
        alt: 'GPUL Logo',
        src: 'img/logo-small.svg',
      },
      items: [
        {
          href: 'https://gpul.org',
          label: 'Web',
          position: 'right',
        },
        {
          href: 'https://github.com/gpul-org/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Grupo de Programadores e Usuarios de Linux`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://docs.gpul.org',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Grupo de Programadores e Usuarios de Linux (GPUL)',
        alternateName: 'GPUL',
        url: 'https://docs.gpul.org/',
        logo: 'https://docs.gpul.org/img/logo.svg',
        foundingDate: '1998',
        description:
          'Organización sen ánimo de lucro promovendo o software libre, o hardware libre e o coñecemento aberto desde 1998.',
        sameAs: [
          'https://bsky.app/profile/gpul.org',
          'https://x.com/gpul_',
          'https://github.com/gpul-org',
          'https://www.linkedin.com/company/gpul',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Información xeral',
          email: 'info@gpul.org',
        },
        location: {
          '@type': 'Place',
          name: 'Universidade da Coruña',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'A Coruña',
            addressRegion: 'Galicia',
            addressCountry: 'ES',
          },
        },
      }),
    },
  ],
};

export default config;
