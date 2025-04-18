import { SupportedLanguage } from '../contexts/LanguageContext';

// Speech synthesis voices for each language
const languageVoices: Record<SupportedLanguage, string[]> = {
  en: ['th-TH'], // Use Thai voices for English UI
  th: ['th-TH'],
  my: ['th-TH'], // Use Thai voices for Burmese UI
};

// Helper to get the best available voice for a language
const getBestVoiceForLanguage = (lang: SupportedLanguage): SpeechSynthesisVoice | null => {
  if (!window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // Always try to find a Thai voice first
  const thaiVoice = voices.find(voice => voice.lang.startsWith('th-TH'));
  if (thaiVoice) return thaiVoice;
  
  // If no Thai voice found, fallback to original language mapping logic
  for (const langCode of languageVoices[lang]) {
    const matchedVoice = voices.find(voice => voice.lang.startsWith(langCode));
    if (matchedVoice) return matchedVoice;
  }

  // Last resort: use any available voice
  return voices[0];
};

// Main speak function
export const speak = (textOrKey: string, language: SupportedLanguage, isTranslationKey: boolean = false): void => {
  if (!window.speechSynthesis) {
    console.error('Speech synthesis not supported in this browser');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // If it's a translation key, we'll use the translation from the context
  const text = isTranslationKey 
    ? (window as any).__languageContext?.t(textOrKey) || textOrKey 
    : textOrKey;

  // Create a new utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Always use Thai voice
  let voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    // If voices aren't loaded yet, wait for them and try again
    window.speechSynthesis.onvoiceschanged = () => {
      utterance.voice = getBestVoiceForLanguage('th');
      window.speechSynthesis.speak(utterance);
    };
    return;
  }

  // Set the voice to Thai and speak
  utterance.voice = getBestVoiceForLanguage('th');
  
  // Adjust settings for clarity
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;
  
  window.speechSynthesis.speak(utterance);
};

// Initialize voices as early as possible
export const initTTS = (): void => {
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
  }
};
