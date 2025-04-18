
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, SupportedLanguage } from '../contexts/LanguageContext';
import Layout from '../components/Layout';

const LanguageSelection = () => {
  const { t, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    navigate('/home');
  };

  return (
    <Layout showBack={false} showHome={false}>
      <div className="flex flex-col items-center justify-center h-[80vh] gap-8">
        <h1 className="text-4xl font-bold text-center mb-8">{t('selectLanguage')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
          <button
            onClick={() => handleLanguageSelect('en')}
            className="sv-button sv-button-primary h-32 shadow-lg"
          >
            <span className="text-5xl mb-2">🇺🇸</span>
            <span className="text-2xl">English</span>
          </button>
          
          <button
            onClick={() => handleLanguageSelect('th')}
            className="sv-button sv-button-primary h-32 shadow-lg"
          >
            <span className="text-5xl mb-2">🇹🇭</span>
            <span className="text-2xl">ไทย</span>
          </button>
          
          <button
            onClick={() => handleLanguageSelect('my')}
            className="sv-button sv-button-primary h-32 shadow-lg"
          >
            <span className="text-5xl mb-2">🇲🇲</span>
            <span className="text-2xl">မြန်မာ</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default LanguageSelection;
