
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
      <div className="flex flex-col items-center justify-center gap-8">
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

        {/* คณะผู้เสนองาน */}
        <div className="mt-12 mb-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">คณะผู้เสนองาน</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <div className="space-y-2">
                <p>1. นางกาญจนา เพียรประสม</p>
                <p>2. นางสาวณัฐชา ผิวดำ</p>
                <p>3. นายณัฐวุฒิ นามมาประดิษฐ์</p>
                <p>4. นายประดิษฐ์ พรผักแว่น</p>
              </div>
              <div className="space-y-2">
                <p>5. นางสาวเพชรรัตน์ กาพย์แก้ว</p>
                <p>6. นางสาวเรวดี คำภู</p>
                <p>7. นางวิมลรัตน์ อินทสอน</p>
                <p>8. นางสาวศิริพร ศรีเมือง</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LanguageSelection;
