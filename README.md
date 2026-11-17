# Portfolio — Joger Castillo

Portafolio personal desarrollado con React + Vite + Tailwind CSS.

- Autor: Joger Castillo — Full Stack Developer
- Sitio: https://portfolio-jogerc.netlify.app

Incluye función serverless en Netlify para el formulario de contacto con protección Turnstile, rate limiting y sanitización de entradas.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Desarrollo local con el formulario de contacto

El formulario de contacto usa una función serverless de Netlify. `npm run dev`
por sí solo **no la sirve** (Vite no ejecuta funciones de Netlify). Para probar
el envío en local usa la CLI de Netlify:

```bash
npm install -g netlify-cli
netlify dev
```

Esto arranca Vite en el puerto 8888 (o similar) y hace proxy de
`/.netlify/functions/send-email` hacia la función local. Requiere las
variables de entorno de `.env.example` en un archivo `.env` local
**(nunca lo subas al repo)**.

Si despliegas el backend en otro host, define `VITE_CONTACT_ENDPOINT` con la
URL de tu endpoint para que el formulario apunte allí.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `GMAIL_USER` | Correo Gmail para enviar mensajes |
| `GMAIL_APP_PASSWORD` | Contraseña de aplicación de Gmail |
| `SITE_URL` | URL de despliegue en Netlify |
| `TURNSTILE_SECRET_KEY` | Clave secreta de Cloudflare Turnstile |
| `VITE_TURNSTILE_SITE_KEY` | Clave pública de Cloudflare Turnstile |
| `VITE_CONTACT_ENDPOINT` | *(Opcional)* URL del endpoint del formulario. Por defecto `/.netlify/functions/send-email` |
