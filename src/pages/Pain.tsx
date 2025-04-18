
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { speak } from '../services/ttsService';
import Layout from '../components/Layout';
import { Frown, Meh, SmilePlus, Smile } from 'lucide-react';

// Define the body parts that can be selected
type BodyPart = 'head' | 'chest' | 'abdomen' | 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg' | 'back' | null;

const Pain = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState<BodyPart>(null);
  const [painLevel, setPainLevel] = useState<number | null>(null);
  const [step, setStep] = useState<'bodyMap' | 'painScale'>('bodyMap');

  // Handle body part selection
  const handlePartSelect = (part: BodyPart) => {
    setSelectedPart(part);
    setStep('painScale');
    
    // Speak the selected part
    let partText = '';
    switch(part) {
      case 'head': partText = 'Head'; break;
      case 'chest': partText = 'Chest'; break;
      case 'abdomen': partText = 'Abdomen'; break;
      case 'leftArm': partText = 'Left Arm'; break;
      case 'rightArm': partText = 'Right Arm'; break;
      case 'leftLeg': partText = 'Left Leg'; break;
      case 'rightLeg': partText = 'Right Leg'; break;
      case 'back': partText = 'Back'; break;
    }
    speak(partText, language);
  };

  // Handle pain scale selection
  const handlePainLevelSelect = (level: number) => {
    setPainLevel(level);
    
    // Speak the pain level
    let painText = '';
    if (level === 0) {
      painText = t('noPain');
    } else if (level >= 1 && level <= 3) {
      painText = t('mildPain');
    } else if (level >= 4 && level <= 6) {
      painText = t('moderatePain');
    } else {
      painText = t('severePain');
    }
    speak(painText, language);
    
    // Reset after a delay to allow selecting another part
    setTimeout(() => {
      setStep('bodyMap');
      setSelectedPart(null);
      setPainLevel(null);
    }, 3000);
  };

  // Get class for body part based on selection
  const getPartClass = (part: BodyPart) => {
    return `sv-body-map-part ${selectedPart === part ? 'fill-sv-red' : ''}`;
  };

  return (
    <Layout title={t('pain')}>
      <div className="flex flex-col items-center my-6">
        {step === 'bodyMap' ? (
          <>
            <h2 className="text-2xl font-bold mb-8">{t('whereIsYourPain')}</h2>
            
            <div className="w-full max-w-md">
              <svg viewBox="0 0 200 400" className="w-full h-auto">
                {/* Simple human body outline */}
                <circle cx="100" cy="50" r="30" className={getPartClass('head')} onClick={() => handlePartSelect('head')} />
                <rect x="70" y="80" width="60" height="80" className={getPartClass('chest')} onClick={() => handlePartSelect('chest')} />
                <rect x="70" y="160" width="60" height="60" className={getPartClass('abdomen')} onClick={() => handlePartSelect('abdomen')} />
                <rect x="40" y="80" width="30" height="100" className={getPartClass('leftArm')} onClick={() => handlePartSelect('leftArm')} />
                <rect x="130" y="80" width="30" height="100" className={getPartClass('rightArm')} onClick={() => handlePartSelect('rightArm')} />
                <rect x="70" y="220" width="30" height="120" className={getPartClass('leftLeg')} onClick={() => handlePartSelect('leftLeg')} />
                <rect x="100" y="220" width="30" height="120" className={getPartClass('rightLeg')} onClick={() => handlePartSelect('rightLeg')} />
                <rect x="40" y="340" width="120" height="40" rx="5" className={getPartClass('back')} onClick={() => handlePartSelect('back')} />
                <text x="100" y="360" textAnchor="middle" className="fill-current text-white font-semibold">Back</text>
              </svg>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-8">{t('howSevereIsYourPain')}</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
              {/* No Pain (0) */}
              <button
                onClick={() => handlePainLevelSelect(0)}
                className="sv-pain-scale-button bg-green-100 border-green-200"
              >
                <Smile size={48} className="text-green-600 mb-2" />
                <span className="text-xl font-bold">0</span>
                <span className="text-sm">{t('noPain')}</span>
              </button>
              
              {/* Mild Pain (1-3) */}
              <button
                onClick={() => handlePainLevelSelect(2)}
                className="sv-pain-scale-button bg-yellow-100 border-yellow-200"
              >
                <SmilePlus size={48} className="text-yellow-600 mb-2" />
                <span className="text-xl font-bold">1-3</span>
                <span className="text-sm">{t('mildPain')}</span>
              </button>
              
              {/* Moderate Pain (4-6) */}
              <button
                onClick={() => handlePainLevelSelect(5)}
                className="sv-pain-scale-button bg-orange-100 border-orange-200"
              >
                <Meh size={48} className="text-orange-600 mb-2" />
                <span className="text-xl font-bold">4-6</span>
                <span className="text-sm">{t('moderatePain')}</span>
              </button>
              
              {/* Severe Pain (7-10) */}
              <button
                onClick={() => handlePainLevelSelect(8)}
                className="sv-pain-scale-button bg-red-100 border-red-200"
              >
                <Frown size={48} className="text-red-600 mb-2" />
                <span className="text-xl font-bold">7-10</span>
                <span className="text-sm">{t('severePain')}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Pain;
