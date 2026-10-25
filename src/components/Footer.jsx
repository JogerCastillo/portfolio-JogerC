import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        {t('footer')}
      </div>
    </footer>
  );
};

export default Footer;