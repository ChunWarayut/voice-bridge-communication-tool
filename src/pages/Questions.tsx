
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { speak } from '../services/ttsService';
import Layout from '../components/Layout';
import {
  HelpCircle, Calendar, Clock, Home, Heart, MapPin, User, Users
} from 'lucide-react';
import BouncyButton from '@/components/BouncyButton';

interface QuestionOption {
  key: string;
  icon: React.ElementType;
  color: string;
}

const Questions = () => {
  const { t, language, translations } = useLanguage();

  const questions: QuestionOption[] = [
    { key: 'whatsWrong', icon: HelpCircle, color: 'text-red-500' },
    { key: 'whatDay', icon: Calendar, color: 'text-blue-500' },
    { key: 'howLong', icon: Clock, color: 'text-yellow-500' },
    { key: 'whenHome', icon: Home, color: 'text-green-500' },
    { key: 'willRecover', icon: Heart, color: 'text-pink-500' },
    { key: 'whereAmI', icon: MapPin, color: 'text-purple-500' },
    { key: 'whoAreYou', icon: User, color: 'text-indigo-500' },
    { key: 'isFamily', icon: Users, color: 'text-cyan-500' }
  ];

  const handleSelect = (question: string) => {
    speak(t(question), language, question);
    // speak(translations[question]["th"], language);
  };

  return (
    <Layout title={t('questions')}>
      <div className="sv-category-grid my-6">
        {questions.map((question) => {
          const Icon = question.icon;
          return (
            <BouncyButton>
              <button
                key={question.key}
                className="sv-option-button text-left"
                onClick={() => handleSelect(question.key)}
              >
                <div className="flex flex-col items-center w-full">
                  <img src={`questions/${question.key}.png`} alt={question.key} /> {/* Changed from Image to img */}
                  <span className="text-2xl font-medium text-center">{t(question.key)}</span>
                  <span className={`text-2xl font-medium ${language === 'th' ? 'hidden' : 'block'}`}>{translations[question.key]["th"]}</span>
                </div>
              </button>
            </BouncyButton>
          );
        })}
      </div>
    </Layout>
  );
};

export default Questions;
