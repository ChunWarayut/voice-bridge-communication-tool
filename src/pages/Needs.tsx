
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { speak } from '../services/ttsService';
import Layout from '../components/Layout';
import {
  MoveHorizontal, Bed, Users, GlassWater, Utensils, Stethoscope,
  Lightbulb, Home, Shirt, Minimize2, Spline, Droplet, Bath, Unlink, Component
} from 'lucide-react';
import BouncyButton from '@/components/BouncyButton';

interface NeedOption {
  key: string;
  icon: React.ElementType;
  color: string;
}

const Needs = () => {
  const { t, language, translations } = useLanguage();
  const [screenName, setScreenName] = useState<string>();

  const needs: NeedOption[] = [
    { key: 'adjustBed', icon: MoveHorizontal, color: 'text-purple-500' },
    { key: 'adjustBedLeft', icon: MoveHorizontal, color: 'text-purple-500' },
    { key: 'adjustBedRight', icon: MoveHorizontal, color: 'text-purple-500' },
    { key: 'adjustBedLow', icon: MoveHorizontal, color: 'text-purple-500' },
    { key: 'adjustBedHeight', icon: MoveHorizontal, color: 'text-purple-500' },
    { key: 'blanket', icon: Bed, color: 'text-blue-300' },
    { key: 'seeRelatives', icon: Users, color: 'text-green-500' },
    { key: 'drinkWater', icon: GlassWater, color: 'text-blue-500' },
    { key: 'eat', icon: Utensils, color: 'text-yellow-500' },
    { key: 'seeDoctor', icon: Stethoscope, color: 'text-red-500' },
    { key: 'turnLights', icon: Lightbulb, color: 'text-yellow-400' },
    { key: 'goHome', icon: Home, color: 'text-green-600' },
    { key: 'changeClothes', icon: Shirt, color: 'text-indigo-500' },
    { key: 'suction', icon: Spline, color: 'text-teal-500' },
    { key: 'urinate', icon: Droplet, color: 'text-yellow-300' },
    { key: 'defecate', icon: Bath, color: 'text-brown-500' },
    { key: 'untieHands', icon: Unlink, color: 'text-orange-500' },
    { key: 'removeBreathingTube', icon: Component, color: 'text-red-600' }
  ];

  const handleSelect = (need: string) => {
    setScreenName(`${t(need)}`)
    speak(t(need), language, need);
    // speak(translations[need]["th"], language, true);
  };

  return (
    <Layout title={t('needs')} screenName={screenName}>
      <div className="sv-category-grid my-6">
        {needs.map((need) => {
          const Icon = need.icon;
          return (
            <BouncyButton>
              <button
                key={need.key}
                className="sv-option-button"
                onClick={() => handleSelect(need.key)}
              >
                <img src={`needs/${need.key}.png`} alt={need.key} /> {/* Changed from Image to img */}
                <span className="text-2xl font-medium">{t(need.key)}</span>
                <span className={`text-2xl font-medium ${language === 'th' ? 'hidden' : 'block'}`}>{translations[need.key]["th"]}</span>
              </button>
            </BouncyButton>
          );
        })}
      </div>
    </Layout>
  );
};

export default Needs;

