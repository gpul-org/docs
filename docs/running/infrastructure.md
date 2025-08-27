# Infraestrutura

Esta sección cobre a infraestrutura técnica que soporta as operacións de GPUL.

## Servidor principal

Toda a infraestrutura está aloxada nun servidor dedicado chamado **gpulux** en Hetzner, co proxy Caddy xestionando o acceso aos diferentes servizos.

## Servizos

### Autenticación e identidade
- **[Keycloak](./infrastructure/keycloak)** - Sistema de Single Sign-On (SSO)

### Comunicación
- **[Correo electrónico](./infrastructure/email)** - Sistema de correo con Mailcow e AWS SES para correos transaccionais
- **[Nextcloud](./infrastructure/nextcloud)** - Ficheiros e reunións

### Xestión
- **[Vaultwarden](./infrastructure/vaultwarden)** - Xestor de contrasinais da asociación
- **[FacturaScripts](./infrastructure/facturascripts)** - Sistema de facturación para Verifactu 2026

### Operacións
- **[ActivePieces](./infrastructure/activepieces)** - Automatización de procesos
- **[NocoDB](./infrastructure/nocodb)** - Base de datos e operacións
- **[Listmonk](./infrastructure/listmonk)** - Xestión de listas de correo