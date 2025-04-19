
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { speak } from '../services/ttsService';
import Layout from '../components/Layout';
import {
  Church, Music, Heart, Landmark
} from 'lucide-react';
import BouncyButton from '@/components/BouncyButton';

interface BeliefOption {
  key: string;
  icon: React.ElementType;
  color: string;
}

const Beliefs = () => {
  const { t, language, translations } = useLanguage();
  const [screenName, setScreenName] = useState<string>();

  const beliefs: BeliefOption[] = [
    { key: 'wantToChant', icon: Church, color: 'text-purple-500' },
    { key: 'listenToDhamma', icon: Music, color: 'text-orange-500' },
    { key: 'trustMedicalTeam', icon: Heart, color: 'text-red-500' },
    { key: 'religiousRitual', icon: Landmark, color: 'text-blue-500' }
  ];

  const handleSelect = (belief: string) => {
    setScreenName(`${t(belief)}`)
    speak(t(belief), language, belief);
    // speak(translations[belief]["th"], language);
  };

  return (
    <Layout title={t('beliefs')} screenName={screenName}>
      <div className="sv-category-grid my-6">
        {beliefs.map((belief) => {
          const Icon = belief.icon;
          return (
            <BouncyButton>
              <button
                key={belief.key}
                className="sv-option-button min-h-[150px]"
                onClick={() => handleSelect(belief.key)}
              >
                <img src={`beliefs/${belief.key}.png`} alt={belief.key} /> {/* Changed from Image to img */}
                <span className="text-2xl font-medium">{t(belief.key)}</span>
                <span className={`text-2xl font-medium ${language === 'th' ? 'hidden' : 'block'}`}>{translations[belief.key]["th"]}</span>
              </button>
            </BouncyButton>
          );
        })}
      </div>
    </Layout>
  );
};

export default Beliefs;
