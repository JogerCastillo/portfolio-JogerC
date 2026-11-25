import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { motion, useReducedMotion } from 'framer-motion';
import ContactFormField from './ContactFormField';
import ContactFormFeedback from './ContactFormFeedback';

const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT || '/.netlify/functions/send-email';

const Contact = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '', turnstileToken: '' });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const turnstileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!form.turnstileToken) {
      setStatus('error');
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
        const response = await fetch(CONTACT_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        if (response.ok) {
            setStatus('success');
            setForm({ name: '', email: '', message: '', website: '', turnstileToken: '' });
            if (window.turnstile) {
              window.turnstile.reset(turnstileRef.current);
            }
        } else {
            setStatus('error');
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openUrl = (url) => window.open(url, '_blank', 'noopener,noreferrer');

  useEffect(() => {
    const handleTurnstileCallback = (token) => {
      setForm(prev => ({ ...prev, turnstileToken: token }));
    };
    window.handleTurnstileCallback = handleTurnstileCallback;
  }, []);

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: -20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.5 },
              })}
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          {t('contact.title')}
        </motion.h2>

        <div className="flex justify-center">
          <motion.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.6 },
                })}
            className="flex flex-col md:flex-row items-center gap-0"
          >
            <form onSubmit={handleSubmit} className="space-y-5 max-w-md w-full" aria-busy={isSubmitting}>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={e => setForm({ ...form, website: e.target.value })}
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <ContactFormField
                type="text"
                id="name"
                name="name"
                label={t('contact.nameLabel')}
                placeholder={t('contact.form.name')}
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                disabled={isSubmitting}
              />
              <ContactFormField
                type="email"
                id="email"
                name="email"
                label={t('contact.emailLabel')}
                placeholder={t('contact.form.email')}
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                disabled={isSubmitting}
              />
              <ContactFormField
                as="textarea"
                rows="5"
                id="message"
                name="message"
                label={t('contact.messageLabel')}
                placeholder={t('contact.form.message')}
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                disabled={isSubmitting}
              />
              <div
                ref={turnstileRef}
                className="cf-turnstile"
                data-sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                data-callback="handleTurnstileCallback"
                data-theme="light"
              />
              <ContactFormFeedback
                status={status}
                isSubmitting={isSubmitting}
                sendLabel={t('contact.form.send')}
                sendingLabel={t('contact.form.sending')}
                successLabel={t('contact.form.success')}
                errorLabel={t('contact.form.error')}
              />
            </form>

            <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-fit py-4 md:py-0 md:ml-5 md:self-start">
              <button
                onClick={() => openUrl(t('contact.linkedinUrl'))}
                aria-label="LinkedIn"
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <img src="/logos/linkedin.svg" alt="" className="h-6 w-6" />
              </button>

              <button
                onClick={() => openUrl(t('contact.githubUrl'))}
                aria-label="GitHub"
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <img src="/logos/github.svg" alt="" className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;