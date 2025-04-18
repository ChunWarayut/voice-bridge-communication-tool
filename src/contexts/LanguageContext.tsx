import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define our supported languages
export type SupportedLanguage = 'en' | 'th' | 'my';

// Define the structure of our translations
export interface Translations {
  [key: string]: {
    en: string;
    th: string;
    my: string;
  };
}

// Create basic translations
const translations: Translations = {
  appTitle: {
    en: 'Smart Voice',
    th: 'สมาร์ทวอยซ์',
    my: 'စမတ်အသံ',
  },
  selectLanguage: {
    en: 'Select Language',
    th: 'เลือกภาษา',
    my: 'ဘာသာစကားရွေးချယ်ပါ',
  },
  english: {
    en: 'English',
    th: 'อังกฤษ',
    my: 'အင်္ဂလိပ်',
  },
  thai: {
    en: 'Thai',
    th: 'ไทย',
    my: 'ထိုင်း',
  },
  burmese: {
    en: 'Burmese',
    th: 'พม่า',
    my: 'မြန်မာ',
  },
  pain: {
    en: 'Pain',
    th: 'ความเจ็บปวด',
    my: 'နာကျင်မှု',
  },
  feelings: {
    en: 'Feelings',
    th: 'ความรู้สึก',
    my: 'ခံစားချက်များ',
  },
  needs: {
    en: 'Needs',
    th: 'ความต้องการ',
    my: 'လိုအပ်ချက်များ',
  },
  questions: {
    en: 'Questions',
    th: 'คำถาม',
    my: 'မေးခွန်းများ',
  },
  beliefs: {
    en: 'Beliefs',
    th: 'ความเชื่อ',
    my: 'ယုံကြည်ချက်များ',
  },
  home: {
    en: 'Home',
    th: 'หน้าหลัก',
    my: 'ပင်မစာမျက်နှာ',
  },
  back: {
    en: 'Back',
    th: 'กลับ',
    my: 'နောက်သို့',
  },
  whereIsYourPain: {
    en: 'Where is your pain?',
    th: 'คุณเจ็บตรงไหน?',
    my: 'သင့်နာကျင်မှု ဘယ်မှာရှိသလဲ?',
  },
  howSevereIsYourPain: {
    en: 'How severe is your pain?',
    th: 'ความเจ็บปวดของคุณรุนแรงแค่ไหน?',
    my: 'သင့်နာကျင်မှု မည်မျှပြင်းထန်သလဲ?',
  },
  noPain: {
    en: 'No Pain',
    th: 'ไม่เจ็บปวด',
    my: 'နာကျင်မှုမရှိ',
  },
  mildPain: {
    en: 'Mild Pain',
    th: 'เจ็บน้อย',
    my: 'အသင့်အတင့်နာကျင်မှု',
  },
  moderatePain: {
    en: 'Moderate Pain',
    th: 'เจ็บปานกลาง',
    my: 'အလယ်အလတ်နာကျင်မှု',
  },
  severePain: {
    en: 'Severe Pain',
    th: 'เจ็บมาก',
    my: 'ပြင်းထန်နာကျင်မှု',
  },
  // Feelings
  cold: {
    en: 'Cold',
    th: 'หนาว',
    my: 'အေးမြခြင်း',
  },
  hot: {
    en: 'Hot',
    th: 'ร้อน',
    my: 'ပူနွေးခြင်း',
  },
  tired: {
    en: 'Tired',
    th: 'เหนื่อย',
    my: 'ပင်ပန်းခြင်း',
  },
  scared: {
    en: 'Scared',
    th: 'กลัว',
    my: 'ကြောက်ရွံ့ခြင်း',
  },
  itchy: {
    en: 'Itchy',
    th: 'คัน',
    my: 'ယားယံခြင်း',
  },
  dizzy: {
    en: 'Dizzy',
    th: 'วิงเวียน',
    my: 'ဦးခေါင်းမူးခြင်း',
  },
  nauseous: {
    en: 'Nauseous',
    th: 'คลื่นไส้',
    my: 'ပျို့ခြင်း',
  },
  thankYou: {
    en: 'Thank You',
    th: 'ขอบคุณ',
    my: 'ကျေးဇူးတင်ပါတယ်',
  },
  // Needs
  changePosition: {
    en: 'Change Position',
    th: 'เปลี่ยนท่า',
    my: 'အနေအထားပြောင်းပါ',
  },
  blanket: {
    en: 'Blanket',
    th: 'ผ้าห่ม',
    my: 'စောင်',
  },
  seeRelatives: {
    en: 'See Relatives',
    th: 'พบญาติ',
    my: 'ဆွေမျိုးများကိုတွေ့လိုသည်',
  },
  drinkWater: {
    en: 'Drink Water',
    th: 'ดื่มน้ำ',
    my: 'ရေသောက်ချင်သည်',
  },
  eat: {
    en: 'Eat',
    th: 'กิน',
    my: 'စားချင်သည်',
  },
  seeDoctor: {
    en: 'See Doctor',
    th: 'พบแพทย์',
    my: 'ဆရာဝန်ကိုတွေ့လိုသည်',
  },
  turnLights: {
    en: 'Turn Lights On/Off',
    th: 'เปิด/ปิดไฟ',
    my: 'မီးဖွင့်/ပိတ်ပါ',
  },
  goHome: {
    en: 'Go Home',
    th: 'กลับบ้าน',
    my: 'အိမ်ပြန်ချင်သည်',
  },
  changeClothes: {
    en: 'Change Clothes',
    th: 'เปลี่ยนเสื้อผ้า',
    my: 'အဝတ်အစားလဲချင်သည်',
  },
  adjustBed: {
    en: 'Adjust Bed',
    th: 'ปรับเตียง',
    my: 'အိပ်ရာညှိပါ',
  },
  suction: {
    en: 'Suction',
    th: 'ดูดเสมหะ',
    my: 'စုပ်ထုတ်ပါ',
  },
  urinate: {
    en: 'Urinate',
    th: 'ปัสสาวะ',
    my: 'ဆီးသွားချင်သည်',
  },
  defecate: {
    en: 'Defecate',
    th: 'อุจจาระ',
    my: 'အညစ်အကြေးသွားချင်သည်',
  },
  untieHands: {
    en: 'Untie Hands',
    th: 'แก้มัดมือ',
    my: 'လက်ဖြေပါ',
  },
  removeBreathingTube: {
    en: 'Remove Breathing Tube',
    th: 'ถอดท่อช่วยหายใจ',
    my: 'အသက်ရှူပြွန်ဖြုတ်ပါ',
  },
  // Questions
  whatsWrong: {
    en: "What's wrong with me?",
    th: 'ฉันเป็นอะไร?',
    my: 'ကျွန်ုပ်ဘာဖြစ်နေသလဲ?',
  },
  whatDay: {
    en: 'What day is it today?',
    th: 'วันนี้วันอะไร?',
    my: 'ဒီနေ့ဘာနေ့လဲ?',
  },
  howLong: {
    en: 'How long will I be treated?',
    th: 'ฉันจะได้รับการรักษานานแค่ไหน?',
    my: 'ကျွန်ုပ်ကိုဘယ်လောက်ကြာကုသမလဲ?',
  },
  whenHome: {
    en: 'When can I go home?',
    th: 'เมื่อไหร่ฉันจะได้กลับบ้าน?',
    my: 'ကျွန်ုပ်ဘယ်တော့အိမ်ပြန်နိုင်မလဲ?',
  },
  willRecover: {
    en: 'Will I recover?',
    th: 'ฉันจะหายไหม?',
    my: 'ကျွန်ုပ်ပြန်ကောင်းလာမှာလား?',
  },
  whereAmI: {
    en: 'Where am I?',
    th: 'ฉันอยู่ที่ไหน?',
    my: 'ကျွန်ုပ်ဘယ်မှာလဲ?',
  },
  whoAreYou: {
    en: 'Who are you?',
    th: 'คุณคือใคร?',
    my: 'သင်ဘယ်သူလဲ?',
  },
  isFamily: {
    en: 'Is my family outside?',
    th: 'ครอบครัวฉันอยู่ข้างนอกไหม?',
    my: 'ကျွန်ုပ်မိသားစုအပြင်မှာရှိသလား?',
  },
  // Beliefs
  wantToChant: {
    en: 'I want to chant',
    th: 'ฉันต้องการสวดมนต์',
    my: 'ကျွန်ုပ်ရွတ်ဖတ်လိုသည်',
  },
  listenToDhamma: {
    en: 'Listen to Dhamma',
    th: 'ฟังธรรม',
    my: 'တရားနာလိုသည်',
  },
  trustMedicalTeam: {
    en: 'I trust the medical team',
    th: 'ฉันเชื่อมั่นในทีมแพทย์',
    my: 'ကျွန်ုပ်ဆေးဝါးကုသမှုအဖွဲ့ကိုယုံကြည်ပါသည်',
  },
  religiousRitual: {
    en: 'I want to perform a religious ritual',
    th: 'ฉันต้องการประกอบพิธีทางศาสนา',
    my: 'ကျွန်ုပ်ဘာသာရေးဝတ်ပြုလိုသည်',
  },
  // Body parts translations
  head: {
    en: 'Head',
    th: 'ศีรษะ',
    my: 'ခေါင်း',
  },
  eye: {
    en: 'Eye',
    th: 'ตา',
    my: 'မျက်လုံး',
  },
  ear: {
    en: 'Ear',
    th: 'หู',
    my: 'နား',
  },
  arm: {
    en: 'Arm',
    th: 'แขน',
    my: 'လက်မောင်း',
  },
  hand: {
    en: 'Hand',
    th: 'มือ',
    my: 'လက်',
  },
  leg: {
    en: 'Leg',
    th: 'ขา',
    my: 'ခြေထောက်',
  },
  eyebrow: {
    en: 'Eyebrow',
    th: 'คิ้ว',
    my: 'မျက်ခုံးမွေး',
  },
  nose: {
    en: 'Nose',
    th: 'จมูก',
    my: 'နှာခေါင်း',
  },
  mouth: {
    en: 'Mouth',
    th: 'ปาก',
    my: 'ပါးစပ်',
  },
  neck: {
    en: 'Neck',
    th: 'คอ',
    my: 'လည်ပင်း',
  },
  chest: {
    en: 'Chest',
    th: 'หน้าอก',
    my: 'ရင်ဘတ်',
  },
  tongue: {
    en: 'tongue',
    th: 'ลิ้น',
    my: 'လျှာ',
  },
  feet: {
    en: 'Feet',
    th: 'เท้า',
    my: 'ခြေထောက်',
  }
};

// Define the shape of our context
interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  translations: Translations;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  translations,
});

// Create a provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // Load the saved language preference on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('smartVoiceLanguage') as SupportedLanguage;
    if (savedLanguage && ['en', 'th', 'my'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference whenever it changes
  useEffect(() => {
    localStorage.setItem('smartVoiceLanguage', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key].en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
