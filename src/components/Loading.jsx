import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Loading = ({ fullScreen = false }) => {
  const { t } = useLanguage();
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-dark-600 font-medium">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p className="text-dark-600 font-medium">{t('loading')}</p>
      </div>
    </div>
  );
};

export default Loading;
