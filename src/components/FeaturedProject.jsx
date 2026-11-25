import { useTranslation } from '../hooks/useTranslation';
import { motion, useReducedMotion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFileText, FiCheckCircle, FiShield, FiTerminal } from 'react-icons/fi';

const stack = ['Node 20', 'Express', 'JWT', 'Zod', 'Vanilla JS', 'Tailwind'];

const metrics = [
  { key: 'metricTests', value: '25', Icon: FiTerminal, color: 'text-blue-600 dark:text-blue-400' },
  { key: 'metricCI', value: '100%', Icon: FiCheckCircle, color: 'text-green-600 dark:text-green-400' },
  { key: 'metricSecurity', value: 'Helmet', Icon: FiShield, color: 'text-purple-600 dark:text-purple-400' },
];

const decisions = [1, 2, 3];

const FeaturedProject = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const reveal = (axis, offset, delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, [axis]: offset },
          whileInView: { opacity: 1, [axis]: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay },
        };

  return (
    <section id="featured" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
            {t('featured.eyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t('featured.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('featured.tagline')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          <motion.div
            {...reveal('x', -20)}
            className="rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            <img
              src="/projects/helpdesk-dashboard.jpg"
              alt={t('featured.imageAlt')}
              width="1600"
              height="900"
              loading="lazy"
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            {...reveal('x', 20)}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('featured.problemHeading')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('featured.problem')}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://mesa-ayuda-web.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                <FiExternalLink aria-hidden="true" />
                {t('featured.ctaDemo')}
              </a>
              <a
                href="https://github.com/JogerCastillo/mesa-ayuda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium transition"
              >
                <FiGithub aria-hidden="true" />
                {t('featured.ctaRepo')}
              </a>
              <a
                href="https://github.com/JogerCastillo/mesa-ayuda#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition"
              >
                <FiFileText aria-hidden="true" />
                {t('featured.ctaCaseStudy')}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...reveal('y', 20, 0.2)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {metrics.map(({ key, value, Icon, color }) => (
            <div
              key={key}
              className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
            >
              <Icon className={`w-8 h-8 mx-auto mb-3 ${color}`} aria-hidden="true" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t(`featured.${key}`)}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...reveal('y', 20, 0.3)}
          className="mt-12 p-6 md:p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {t('featured.decisionsHeading')}
          </h3>
          <ul className="space-y-4">
            {decisions.map((n) => (
              <li key={n} className="flex gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5" aria-hidden="true">→</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{t(`featured.decision${n}Title`)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t(`featured.decision${n}Body`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProject;
