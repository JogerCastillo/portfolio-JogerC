import { useState } from 'react';
import { Link } from 'react-scroll';
import { HiOutlineSun, HiOutlineMoon, HiOutlineTranslate } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

const Navbar = () => {
  const { dark, toggleTheme } = useTheme();
  const { lang, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'about', label: t('nav.about') },
    { key: 'projects', label: t('nav.projects') },
    { key: 'skills', label: t('nav.skills') },
    { key: 'contact', label: t('nav.contact') },
  ];

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-800 dark:text-white">JC</span>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map(item => (
            <Link
              key={item.key}
              to={item.key}
              smooth
              spy
              offset={-70}
              duration={500}
              className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {dark ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </button>
          <button onClick={toggleLanguage} className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-semibold transition-colors">
            <HiOutlineTranslate size={18} />
            <span className="text-xs">{lang.toUpperCase()}</span>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {dark ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </button>
          <button onClick={toggleLanguage} className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-semibold transition-colors">
            <HiOutlineTranslate size={18} />
            <span className="text-xs">{lang.toUpperCase()}</span>
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-inner">
          <div className="flex flex-col px-6 pb-4 gap-3">
            {navItems.map(item => (
              <Link
                key={item.key}
                to={item.key}
                smooth
                offset={-70}
                duration={500}
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;