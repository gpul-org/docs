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
        {
          type: 'category',
          label: 'Infraestrutura',
          link: {
            type: 'doc',
            id: 'running/infrastructure',
          },
          items: [
            {
              type: 'category',
              label: 'Keycloak',
              link: {
                type: 'doc',
                id: 'running/infrastructure/keycloak/index',
              },
              items: [
                'running/infrastructure/keycloak/user-guide',
                'running/infrastructure/keycloak/admin',
              ],
            },
            {
              type: 'category',
              label: 'Correo electrónico',
              link: {
                type: 'doc',
                id: 'running/infrastructure/email/index',
              },
              items: [
                'running/infrastructure/email/setup',
                'running/infrastructure/email/shared-mailboxes',
                'running/infrastructure/email/admin',
              ],
            },
            {
              type: 'category',
              label: 'Nextcloud',
              link: {
                type: 'doc',
                id: 'running/infrastructure/nextcloud/index',
              },
              items: [
                'running/infrastructure/nextcloud/user-guide',
                'running/infrastructure/nextcloud/admin',
              ],
            },
            {
              type: 'category',
              label: 'Vaultwarden',
              link: {
                type: 'doc',
                id: 'running/infrastructure/vaultwarden/index',
              },
              items: [
                'running/infrastructure/vaultwarden/user-guide',
                'running/infrastructure/vaultwarden/admin',
              ],
            },
            {
              type: 'category',
              label: 'FacturaScripts',
              link: {
                type: 'doc',
                id: 'running/infrastructure/facturascripts/index',
              },
              items: [
                'running/infrastructure/facturascripts/user-guide',
                'running/infrastructure/facturascripts/verifactu',
                'running/infrastructure/facturascripts/admin',
              ],
            },
            {
              type: 'category',
              label: 'ActivePieces',
              link: {
                type: 'doc',
                id: 'running/infrastructure/activepieces/index',
              },
              items: [
                'running/infrastructure/activepieces/user-guide',
                'running/infrastructure/activepieces/admin',
              ],
            },
            {
              type: 'category',
              label: 'NocoDB',
              link: {
                type: 'doc',
                id: 'running/infrastructure/nocodb/index',
              },
              items: [
                'running/infrastructure/nocodb/user-guide',
                'running/infrastructure/nocodb/admin',
              ],
            },
            {
              type: 'category',
              label: 'Listmonk',
              link: {
                type: 'doc',
                id: 'running/infrastructure/listmonk/index',
              },
              items: [
                'running/infrastructure/listmonk/user-guide',
                'running/infrastructure/listmonk/admin',
              ],
            },
          ],
        },
        'running/finance',
      ],
    },
  ],
};

export default sidebars;
