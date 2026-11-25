import { Link } from 'react-scroll';
import { useTranslation } from '../hooks/useTranslation';
import { motion, useReducedMotion } from 'framer-motion';

const Hero = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center px-4">
        <motion.p
          {...fadeUp(0)}
          className="text-lg text-gray-600 dark:text-gray-400 mb-2"
        >
          {t('hero.greeting')}
        </motion.p>
        <motion.h1
          {...fadeUp(0.15)}
          className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4"
        >
          {t('hero.name')}
        </motion.h1>
        <motion.p
          {...fadeUp(0.3)}
          className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 font-light mb-8"
        >
          {t('hero.title')}
        </motion.p>
        <motion.div {...fadeUp(0.45)}>
          <Link to="contact" smooth={!reduceMotion} offset={-70} duration={500}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all cursor-pointer">
            {t('hero.cta')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;