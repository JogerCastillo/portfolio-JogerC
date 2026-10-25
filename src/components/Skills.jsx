import { useTranslation } from '../hooks/useTranslation';
import { motion } from 'framer-motion';

const categories = [
  {
    titleKey: 'skills.categories.languages',
    items: [
      { src: '/logos/html5.svg', name: 'HTML5' },
      { src: '/logos/css3.svg', name: 'CSS3' },
      { src: '/logos/javascript.svg', name: 'JavaScript' },
      { src: '/logos/python.svg', name: 'Python' },
    ],
  },
  {
    titleKey: 'skills.categories.frameworks',
    items: [
      { src: '/logos/react.svg', name: 'React' },
      { src: '/logos/tailwindcss.svg', name: 'Tailwind CSS' },
      { src: '/logos/nodedotjs.svg', name: 'Node.js' },
      { src: '/logos/express.svg', name: 'Express' },
      { src: '/logos/nestjs.svg', name: 'NestJS' },
      { src: '/logos/fastapi.svg', name: 'FastAPI' },
    ],
  },
  {
    titleKey: 'skills.categories.databases',
    items: [
      { src: '/logos/mysql.svg', name: 'MySQL' },
      { src: '/logos/mongodb.svg', name: 'MongoDB' },
    ],
  },
  {
    titleKey: 'skills.categories.tools',
    items: [
      { src: '/logos/git.svg', name: 'Git' },
      { src: '/logos/docker.svg', name: 'Docker' },
      { src: '/logos/linux.svg', name: 'Linux' },
      { src: '/logos/apache.svg', name: 'Apache' },
      { src: '/logos/powershell.svg', name: 'PowerShell' },
    ],
  },
];

const defaultLanguages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'B2.2' },
];

const Skills = () => {
  const { t } = useTranslation();

  const soft = t('skills.softSkills', { returnObjects: true }) || [
    'Pensamiento analítico',
    'Proactividad',
  ];

  const languages = t('skills.languagesList', { returnObjects: true }) || defaultLanguages;

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          {t('skills.title')}
        </motion.h2>

        <motion.div
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.titleKey}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border-2 border-gray-200/80 dark:border-slate-600/80 bg-white/40 dark:bg-slate-900/25 backdrop-blur-xl shadow-sm shadow-black/5 dark:shadow-black/20 p-4"
            >
              <h3 className="text-sm font-semibold text-center text-gray-700 dark:text-gray-200 mb-4">
                {t(cat.titleKey)}
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {cat.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center gap-2 rounded-xl hover:bg-white/30 dark:hover:bg-white/10 transition-colors px-2 py-3"
                    aria-label={tech.name}
                  >
                    <img src={tech.src} alt={tech.name} className="h-8 w-8 object-contain" loading="lazy" />
                    <span className="text-[11px] text-center text-gray-600 dark:text-gray-300 leading-tight">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto rounded-2xl border-2 border-gray-200/80 dark:border-slate-600/80 bg-white/40 dark:bg-slate-900/25 backdrop-blur-xl shadow-sm shadow-black/5 dark:shadow-black/20 p-5 sm:p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:divide-x md:divide-gray-200/70 md:dark:divide-slate-600/70">
            <div className="md:pr-8">
              <h4 className="text-sm font-semibold text-center text-gray-700 dark:text-gray-200 mb-4">{t('skills.softTitle')}</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {soft.map((s, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full border border-gray-300/80 dark:border-slate-500/80 bg-white/40 dark:bg-white/5 text-sm text-gray-700 dark:text-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:pl-8">
              <h4 className="text-sm font-semibold text-center text-gray-700 dark:text-gray-200 mb-4">{t('skills.languagesTitle')}</h4>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between rounded-xl border border-gray-300/70 dark:border-slate-500/70 bg-white/40 dark:bg-white/5 px-3 py-3 gap-2"
                  >
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{lang.name}</p>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">{lang.level}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;