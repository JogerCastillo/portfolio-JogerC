import { useTranslation } from '../hooks/useTranslation';
import { motion, useReducedMotion } from 'framer-motion';

const About = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
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
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
        >
          {t('about.title')}
        </motion.h2>
        <motion.p
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6, delay: 0.15 },
              })}
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify"
        >
          {t('about.description')}
        </motion.p>
      </div>
    </section>
  );
};

export default About;