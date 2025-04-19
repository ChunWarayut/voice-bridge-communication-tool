import { SupportedLanguage } from '../contexts/LanguageContext';

// Speech synthesis voices for each language
const languageVoices: Record<SupportedLanguage, string[]> = {
  en: ['en-US', 'en-GB', 'en-AU'],
  th: ['th-TH'],
  my: ['my', 'my-MM'],
};

// Helper to get the best available voice for a language
const getBestVoiceForLanguage = (lang: SupportedLanguage): SpeechSynthesisVoice | null => {
  if (!window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // Try to find a voice matching our preferred language codes
  for (const langCode of languageVoices[lang]) {
    const matchedVoice = voices.find(voice => voice.lang.startsWith(langCode));
    if (matchedVoice) return matchedVoice;
  }

  // Fallback options
  if (lang === 'my') {
    // If no Burmese voice, try to use Thai as a fallback
    for (const langCode of languageVoices.th) {
      const fallbackVoice = voices.find(voice => voice.lang.startsWith(langCode));
      if (fallbackVoice) return fallbackVoice;
    }
  }

  // Last resort: use any English voice
  return voices.find(voice => voice.lang.startsWith('en')) || voices[0];
};

// Main speak function
export const speak = (text: string, language: SupportedLanguage, key: string): void => {

  if (language === 'my' || language === 'th') {
    const audio = new Audio(`/audio/${language}/${key}.mp3`);
    audio.play();
    return;
  }

  if (!window.speechSynthesis) {
    console.error('Speech synthesis not supported in this browser');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Create a new utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Load voices if not already loaded
  let voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    // If voices aren't loaded yet, wait for them and try again
    window.speechSynthesis.onvoiceschanged = () => {
      utterance.voice = getBestVoiceForLanguage(language);
      window.speechSynthesis.speak(utterance);
    };
    return;
  }

  // Set the voice and speak
  utterance.voice = getBestVoiceForLanguage(language);
  
  // Adjust settings for clarity
  utterance.rate = 0.9; // Slightly slower for better comprehension
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
