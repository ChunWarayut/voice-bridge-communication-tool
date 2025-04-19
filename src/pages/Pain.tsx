import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { speak } from '../services/ttsService';
import Layout from '../components/Layout';
import { Frown, Meh, SmilePlus, Smile } from 'lucide-react';
import BouncyButton from '@/components/BouncyButton';

// Define the body parts that can be selected
type BodyPart = 'head' | 'eye' | 'ear' | 'arm' | 'hand' | 'leg' | 'eyebrow' | 'nose' | 'mouth' | 'neck' | 'chest' | 'tongue' | 'feet' | null;

interface PainOption {
  key: BodyPart;
  color: string;
}

const Pain = () => {
  const { t, language, translations } = useLanguage();
  const [selectedPart, setSelectedPart] = useState<BodyPart>(null);
  const [painLevel, setPainLevel] = useState<number | null>(null);
  const [step, setStep] = useState<'bodyMap' | 'painScale'>('bodyMap');


  const pains: PainOption[] = [
    { key: 'head', color: 'text-red-500' },
    { key: 'eye', color: 'text-blue-500' },
    { key: 'ear', color: 'text-yellow-500' },
    { key: 'arm', color: 'text-green-500' },
    { key: 'hand', color: 'text-pink-500' },
    { key: 'leg', color: 'text-purple-500' },
    { key: 'eyebrow', color: 'text-indigo-500' },
    { key: 'nose', color: 'text-cyan-500' },
    { key: 'mouth', color: 'text-cyan-500' },
    { key: 'neck', color: 'text-cyan-500' },
    { key: 'chest', color: 'text-cyan-500' },
    { key: 'tongue', color: 'text-cyan-500' },
    { key: 'feet', color: 'text-cyan-500' }
  ];

  // Handle body part selection
  const handlePartSelect = (part: BodyPart) => {
    setSelectedPart(part);
    setStep('painScale');
    speak(t(part), language, part);

    // speak(translations[part]["th"], language);
  };

  // Handle pain scale selection
  const handlePainLevelSelect = (level: number) => {
    setPainLevel(level);
    
    let painText = '';
    if (level === 0) {
      painText = 'noPain';
    } else if (level >= 1 && level <= 3) {
      painText = 'mildPain';
    } else if (level >= 4 && level <= 6) {
      painText = 'moderatePain';
    } else {
      painText = 'severePain';
    }
    speak(t(painText), language, painText);
    // speak(translations[painText]["th"], language, painText);
    
    setTimeout(() => {
      setStep('bodyMap');
      setSelectedPart(null);
      setPainLevel(null);
    }, 1500);
  };

  return (
    <Layout title={t('pain')}>
      <div className="flex flex-col items-center my-6">
        {step === 'bodyMap' ? (
          <>
            <h2 className="text-2xl font-bold mb-8">{t('whereIsYourPain')}</h2>

            <div className="sv-category-grid my-6">
              {pains.map((pain) => {
                return (
                  <BouncyButton>
                    <button
                      key={pain.key}
                      className="sv-option-button text-left"
                      onClick={() => handlePartSelect(pain.key)}
                    >
                      <div className="flex flex-col items-center w-full">
                        <img src={`pains/${pain.key}.png`} alt={pain.key} /> {/* Changed from Image to img */}
                        <span className="text-2xl font-medium text-center">{t(pain.key)}</span>
                        <span className={`text-2xl font-medium ${language === 'th' ? 'hidden' : 'block'}`}>{translations[pain.key]["th"]}</span>
                      </div>
                    </button>
                  </BouncyButton>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-8">{t('howSevereIsYourPain')}</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-2xl">
              {/* No Pain (0) */}
              <button
                onClick={() => handlePainLevelSelect(0)}
                className="sv-pain-scale-button bg-green-100 border-green-200"
              >
                <Smile size={48} className="text-green-600 mb-2" />
                <span className="text-xl font-bold">0</span>
                <span className="text-2xl">{t('noPain')}</span>
                <span className={`text-2xl font-medium ${language === 'th' ? 'hidden' : 'block'}`}>{translations['noPain']["th"]}</span>
              </button>
              
              {/* Mild Pain (1-3) */}
              <button
                onClick={() => handlePainLevelSelect(2)}
                className="sv-pain-scale-button bg-yellow-100 border-yellow-200"
              >
                <SmilePlus size={48} className="text-yellow-600 mb-2" />
                <span className="text-xl font-bold">1-3</span>
                <span className="text-2xl">{t('mildPain')}</span>
                <span className={`text-2xl font-medium ${language === 'th' ? 'hidden' : 'block'}`}>{translations['mildPain']["th"]}</span>
              </button>
              
              {/* Moderate Pain (4-6) */}
              <button
                onClick={() => handlePainLevelSelect(5)}
                className="sv-pain-scale-button bg-orange-100 border-orange-200"
              >
                <Meh size={48} className="text-orange-600 mb-2" />
                <span className="text-xl font-bold">4-6</span>
                <span className="text-2xl">{t('moderatePain')}</span>
                <span className={`text-2xl font-medium ${language === 'th' ? 'hidden' : 'block'}`}>{translations['moderatePain']["th"]}</span>
              </button>
              
              {/* Severe Pain (7-10) */}
              <button
                onClick={() => handlePainLevelSelect(8)}
                className="sv-pain-scale-button bg-red-100 border-red-200"
              >
                <Frown size={48} className="text-red-600 mb-2" />
                <span className="text-xl font-bold">7-10</span>
                <span className="text-2xl">{t('severePain')}</span>
                <span className={`text-2xl font-medium ${language === 'th' ? 'hidden' : 'block'}`}>{translations['severePain']["th"]}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Pain;
