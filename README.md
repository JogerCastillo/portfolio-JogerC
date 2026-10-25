# Portfolio — Francisco López

Portafolio personal desarrollado con React + Vite + Tailwind CSS.

Incluye función serverless en Netlify para el formulario de contacto con protección Turnstile, rate limiting y sanitización de entradas.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `GMAIL_USER` | Correo Gmail para enviar mensajes |
| `GMAIL_APP_PASSWORD` | Contraseña de aplicación de Gmail |
| `SITE_URL` | URL de despliegue en Netlify |
| `TURNSTILE_SECRET_KEY` | Clave secreta de Cloudflare Turnstile |
| `VITE_TURNSTILE_SITE_KEY` | Clave pública de Cloudflare Turnstile |
