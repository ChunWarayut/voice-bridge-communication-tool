
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { speak } from '../services/ttsService';
import Layout from '../components/Layout';
import { Thermometer, Snowflake, Moon, X, Droplets, Waves, Coffee, ThumbsUp } from 'lucide-react';

interface FeelingOption {
  key: string;
  icon: React.ElementType;
  color: string;
}

const Feelings = () => {
  const { t, language, translations } = useLanguage();

  const feelings: FeelingOption[] = [
    { key: 'cold', icon: Snowflake, color: 'text-blue-500' },
    { key: 'hot', icon: Thermometer, color: 'text-red-500' },
    { key: 'tired', icon: Moon, color: 'text-purple-500' },
    { key: 'scared', icon: X, color: 'text-gray-500' },
    { key: 'itchy', icon: Droplets, color: 'text-green-500' },
    { key: 'dizzy', icon: Waves, color: 'text-yellow-500' },
    { key: 'nauseous', icon: Coffee, color: 'text-orange-500' },
    { key: 'thankYou', icon: ThumbsUp, color: 'text-sv-blue' },
  ];

  const handleSelect = (feeling: string) => {
    // speak(t(feeling), language);
    speak(translations[feeling]["th"], language);
  };

  return (
    <Layout title={t('feelings')}>
      <div className="sv-category-grid my-6">
        {feelings.map((feeling) => {
          const Icon = feeling.icon;
          return (
            <button
              key={feeling.key}
              className="sv-option-button"
              onClick={() => handleSelect(feeling.key)}
            >
              <img src={`feelings/${feeling.key}.png`} alt={feeling.key} /> {/* Changed from Image to img */}
              <span className="text-lg font-medium">{t(feeling.key)}</span>
            </button>
          );
        })}
      </div>
    </Layout>
  );
};

export default Feelings;
