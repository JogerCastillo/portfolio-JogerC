import nodemailer from 'nodemailer';

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map();
const TURNSTILE_API = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const normalizeText = (value) => String(value ?? '').trim();

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= MAX_EMAIL_LENGTH;

/**
 * Strips CR/LF and other control characters from a string to prevent
 * email header injection (CWE-93). Also trims and caps length.
 */
function sanitizeHeaderValue(value, maxLength = 200) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\r\n\t\0]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

const getClientIp = (event) => {
  const forwardedFor = event.headers['x-forwarded-for'];
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return (
    event.headers['client-ip'] ||
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['true-client-ip'] ||
    'unknown'
  );
};

const isAllowedOrigin = (event) => {
  const isLocalDev =
    process.env.NODE_ENV === 'development' || process.env.CONTEXT === 'dev';

  if (isLocalDev) {
    return true;
  }

  const origin = event.headers.origin || event.headers.referer;
  if (!origin) {
    return false;
  }

  const allowedOrigins = new Set(
    [process.env.SITE_URL, process.env.URL, 'http://localhost:5173', 'http://127.0.0.1:5173']
      .filter(Boolean)
      .map((value) => {
        try {
          return new URL(value).origin;
        } catch {
          return null;
        }
      })
      .filter(Boolean),
  );

  try {
    const requestOrigin = new URL(origin).origin;
    return allowedOrigins.has(requestOrigin);
  } catch {
    return false;
  }
};

const isRateLimited = (ip) => {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
};

const jsonResponse = (statusCode, payload) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(payload),
});

const verifyTurnstile = async (token) => {
  if (!token || !process.env.TURNSTILE_SECRET_KEY) {
    return false;
  }

  try {
    const response = await fetch(TURNSTILE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success && !data['error-codes']?.length;
  } catch (error) {
    console.error('Error verifying Turnstile:', error);
    return false;
  }
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Método no permitido' });
  }

  if (!isAllowedOrigin(event)) {
    return jsonResponse(403, { error: 'Origen no permitido' });
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const name = normalizeText(payload.name);
    const email = normalizeText(payload.email).toLowerCase();
    const message = normalizeText(payload.message);
    const website = normalizeText(payload.website);
    const turnstileToken = normalizeText(payload.turnstileToken);
    const clientIp = getClientIp(event);

    const isTurnstileValid = await verifyTurnstile(turnstileToken);
    if (!isTurnstileValid) {
      return jsonResponse(400, { error: 'Verificación CAPTCHA fallida' });
    }

    if (isRateLimited(clientIp)) {
      return jsonResponse(429, { error: 'Demasiadas solicitudes. Intenta más tarde.' });
    }

    if (website) {
      return jsonResponse(400, { error: 'Solicitud inválida' });
    }

    if (!name || !email || !message) {
      return jsonResponse(400, { error: 'Faltan campos obligatorios' });
    }

    if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH || !isValidEmail(email)) {
      return jsonResponse(400, { error: 'Datos inválidos' });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const headerName = sanitizeHeaderValue(name);
    const headerEmail = sanitizeHeaderValue(email, MAX_EMAIL_LENGTH);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      replyTo: `"${headerName}" <${headerEmail}>`,
      to: process.env.GMAIL_USER,
      subject: `Mensaje de portafolio de ${headerName}`,
      text: `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`,
      html: `
        <h3>Nuevo mensaje desde tu portafolio</h3>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Correo:</strong> ${safeEmail}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${safeMessage}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return jsonResponse(200, { success: true });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return jsonResponse(500, { error: 'Error interno del servidor' });
  }
};