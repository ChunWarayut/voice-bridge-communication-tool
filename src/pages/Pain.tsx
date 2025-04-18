import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { speak } from '../services/ttsService';
import Layout from '../components/Layout';
import { Frown, Meh, SmilePlus, Smile } from 'lucide-react';

// Define the body parts that can be selected
type BodyPart = 'head' | 'eye' | 'ear' | 'arm' | 'hand' | 'leg' | 'hair' | 'nose' | 'mouth' | 'neck' | 'chest' | 'stomach' | 'feet' | null;

const Pain = () => {
  const { t, language } = useLanguage();
  const [selectedPart, setSelectedPart] = useState<BodyPart>(null);
  const [painLevel, setPainLevel] = useState<number | null>(null);
  const [step, setStep] = useState<'bodyMap' | 'painScale'>('bodyMap');

  // Handle body part selection
  const handlePartSelect = (part: BodyPart) => {
    setSelectedPart(part);
    setStep('painScale');
    speak(t(part), language);
  };

  // Handle pain scale selection
  const handlePainLevelSelect = (level: number) => {
    setPainLevel(level);
    
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
    
    setTimeout(() => {
      setStep('bodyMap');
      setSelectedPart(null);
      setPainLevel(null);
    }, 3000);
  };

  return (
    <Layout title={t('pain')}>
      <div className="flex flex-col items-center my-6">
        {step === 'bodyMap' ? (
          <>
            <h2 className="text-2xl font-bold mb-8">{t('whereIsYourPain')}</h2>
            
            <div className="w-full max-w-md relative">
              <img 
                src="/lovable-uploads/65f01617-6996-435e-beb0-c30080a4f251.png" 
                alt="Body map" 
                className="w-full h-auto"
              />
              
              {/* Interactive regions for each body part */}
              <div className="absolute inset-0">
                {/* Head region */}
                <button 
                  onClick={() => handlePartSelect('head')}
                  className="absolute top-[5%] left-[45%] w-[10%] h-[10%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
                
                {/* Hair region */}
                <button 
                  onClick={() => handlePartSelect('hair')}
                  className="absolute top-[2%] left-[42%] w-[16%] h-[8%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
                
                {/* Eye region */}
                <button
                  onClick={() => handlePartSelect('eye')}
                  className="absolute top-[8%] left-[38%] w-[8%] h-[8%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
                
                {/* Ear region */}
                <button
                  onClick={() => handlePartSelect('ear')}
                  className="absolute top-[15%] left-[35%] w-[8%] h-[8%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
                
                {/* Nose region */}
                <button
                  onClick={() => handlePartSelect('nose')}
                  className="absolute top-[15%] right-[42%] w-[8%] h-[8%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
                
                {/* Mouth region */}
                <button
                  onClick={() => handlePartSelect('mouth')}
                  className="absolute top-[22%] right-[40%] w-[10%] h-[8%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
                
                {/* Neck region */}
                <button
                  onClick={() => handlePartSelect('neck')}
                  className="absolute top-[30%] right-[42%] w-[12%] h-[8%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
                
                {/* Chest region */}
                <button
                  onClick={() => handlePartSelect('chest')}
                  className="absolute top-[35%] right-[42%] w-[15%] h-[12%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
                
                {/* Stomach region */}
                <button
                  onClick={() => handlePartSelect('stomach')}
                  className="absolute top-[48%] right-[42%] w-[15%] h-[12%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
                
                {/* Left arm region */}
                <button
                  onClick={() => handlePartSelect('arm')}
                  className="absolute top-[35%] left-[30%] w-[10%] h-[20%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
                
                {/* Left hand region */}
                <button
                  onClick={() => handlePartSelect('hand')}
                  className="absolute top-[40%] left-[25%] w-[10%] h-[10%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
                
                {/* Legs region */}
                <button
                  onClick={() => handlePartSelect('leg')}
                  className="absolute bottom-[15%] left-[45%] w-[12%] h-[25%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
                
                {/* Feet region */}
                <button
                  onClick={() => handlePartSelect('feet')}
                  className="absolute bottom-[5%] left-[45%] w-[12%] h-[10%] hover:bg-red-200 rounded-full opacity-50 hover:opacity-75"
                />
              </div>
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
