import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// sidebars.js
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Sobre GPUL',
      items: [
        'about/intro',
        'about/history',
        'about/estatutos',
        'about/becoming-a-member',
      ],
    },
    {
      type: 'category',
      label: 'Eventos',
      items: [
        {
          type: 'category',
          label: 'HackUDC',
          items: ['events/hackudc/overview', 'events/hackudc/organizing'],
        },
        {
          type: 'category',
          label: 'GPUL Schools',
          items: [
            'events/gpul-schools/overview',
            'events/gpul-schools/organizing',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Xestionar GPUL',
      items: [
        'running/how-we-work',
        'running/infrastructure',
        'running/finance',
      ],
    },
  ],
};

export default sidebars;
