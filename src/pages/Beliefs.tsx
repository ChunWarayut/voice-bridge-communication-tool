
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { speak } from '../services/ttsService';
import Layout from '../components/Layout';
import { 
  Church, Music, Heart, Landmark
} from 'lucide-react';

interface BeliefOption {
  key: string;
  icon: React.ElementType;
  color: string;
}

const Beliefs = () => {
  const { t, language } = useLanguage();

  const beliefs: BeliefOption[] = [
    { key: 'wantToChant', icon: Church, color: 'text-purple-500' },
    { key: 'listenToDhamma', icon: Music, color: 'text-orange-500' },
    { key: 'trustMedicalTeam', icon: Heart, color: 'text-red-500' },
    { key: 'religiousRitual', icon: Landmark, color: 'text-blue-500' }
  ];

  const handleSelect = (belief: string) => {
    speak(t(belief), language);
  };

  return (
    <Layout title={t('beliefs')}>
      <div className="sv-category-grid my-6">
        {beliefs.map((belief) => {
          const Icon = belief.icon;
          return (
            <button 
              key={belief.key}
              className="sv-option-button min-h-[150px]"
              onClick={() => handleSelect(belief.key)}
            >
              <Icon size={48} className={`${belief.color} mb-3`} />
              <span className="text-lg font-medium">{t(belief.key)}</span>
            </button>
          );
        })}
      </div>
    </Layout>
  );
};

export default Beliefs;
