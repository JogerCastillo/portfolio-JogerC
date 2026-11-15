import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiShield } from 'react-icons/fi';

const projectsData = [
  {
    id: 1,
    key: 'project1',
    src: '/projects/helpdesk.jpg',
    alt: 'Mesa de Ayuda — Help Desk',
    demoUrl: 'https://mesa-ayuda-web.netlify.app/',
    repoUrl: 'https://github.com/JogerCastillo/mesa-ayuda',
  },
  {
    id: 2,
    key: 'project2',
    src: '/projects/appointments.jpg',
    alt: 'Sistema de Agenda de Citas',
    demoUrl: 'https://sistema-agenda-citas.netlify.app/',
    repoUrl: 'https://github.com/JogerCastillo/sistema-citas',
  },
  {
    id: 3,
    key: 'project3',
    src: '/projects/inventory.jpg',
    alt: 'Inventario y Ventas',
    demoUrl: 'https://inventario-ventas-web.netlify.app/',
    repoUrl: 'https://github.com/JogerCastillo/inventario-ventas',
  },
  {
    id: 4,
    key: 'project4',
    src: null,
    alt: 'Seguridad Informática',
    demoUrl: null,
    repoUrl: null,
    comingSoon: true,
  },
];

const Projects = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalPages = Math.ceil(projectsData.length / itemsPerPage);

  const prevItemsPerPage = useRef(itemsPerPage);

  useEffect(() => {
    const update = () => {
      const width = containerRef.current?.offsetWidth ?? 1024;
      let newItems;
      if (width >= 1024) newItems = 3;
      else if (width >= 640) newItems = 2;
      else newItems = 1;
      if (newItems !== prevItemsPerPage.current) {
        prevItemsPerPage.current = newItems;
        setCurrentPage(0);
      }
      setItemsPerPage(newItems);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (isPaused || totalPages <= 1) return;
    const timer = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, totalPages]);

  const goTo = useCallback(page => {
    setCurrentPage(page);
  }, []);

  const activeIndex = Math.min(currentPage * itemsPerPage, projectsData.length - 1);
  const activeTitle = t(`projects.${projectsData[activeIndex].key}.title`);

  const handleDragEnd = useCallback((_, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentPage < totalPages - 1) {
      setCurrentPage(p => p + 1);
    } else if (info.offset.x > threshold && currentPage > 0) {
      setCurrentPage(p => p - 1);
    }
  }, [currentPage, totalPages]);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          {t('projects.title')}
        </motion.h2>

        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          role="region"
          aria-label={t('projects.title')}
          aria-roledescription="carousel"
          className="overflow-hidden -mx-3"
        >
          <motion.div
            className="flex"
            animate={{ x: -(currentPage * (100 / itemsPerPage)) + '%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={handleDragEnd}
          >
            {projectsData.map((project) => {
              const title = t(`projects.${project.key}.title`);
              const desc = t(`projects.${project.key}.desc`);
              const tech = t(`projects.${project.key}.tech`, { returnObjects: true }) || [];
              const hasLinks = project.demoUrl && project.repoUrl;
              return (
                <div
                  key={project.id}
                  style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
                  className="px-3"
                >
                  <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      {project.src ? (
                        <img
                          src={project.src}
                          alt={title}
                          width="1200"
                          height="675"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500">
                          <FiShield size={40} />
                          <span className="text-sm font-medium">{t('projects.comingSoon')}</span>
                        </div>
                      )}
                      {project.comingSoon && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-400/90 text-amber-900">
                          {t('projects.comingSoon')}
                        </span>
                      )}
                      {hasLinks && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-white/90 rounded-full text-gray-800 hover:bg-white hover:scale-110 transition-all"
                            aria-label={`${t('projects.viewDemo')}: ${title}`}
                          >
                            <FiExternalLink size={20} />
                          </a>
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-white/90 rounded-full text-gray-800 hover:bg-white hover:scale-110 transition-all"
                            aria-label={`${t('projects.viewRepo')}: ${title}`}
                          >
                            <FiGithub size={20} />
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">{desc}</p>
                      {tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {tech.map(tag => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {t('projects.projectCounter')
            .replace('{current}', String(activeIndex + 1))
            .replace('{total}', String(projectsData.length))
            .replace('{title}', activeTitle)}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentPage
                    ? 'w-8 bg-blue-600 dark:bg-blue-400'
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`${t('projects.goToPage')} ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
