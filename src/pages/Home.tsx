
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { speak } from '../services/ttsService';
import Layout from '../components/Layout';
import { Heart, Smile, Lightbulb, HelpCircle, Church } from 'lucide-react';

const Home = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Navigate to specific category pages
  const navigateToCategory = (category: string) => {
    navigate(`/${category}`);
  };

  // Render a category button with icon
  const CategoryButton = ({ 
    name, 
    color, 
    icon: Icon,
    onClick 
  }: { 
    name: string; 
    color: string; 
    icon: React.ElementType;
    onClick: () => void;
  }) => (
    <button
      className={`sv-button ${color} w-full py-6 min-h-[160px]`}
      onClick={() => {
        speak(t(name.toLowerCase()), language);
        onClick();
      }}
    >
      <Icon size={48} className="mb-3" />
      <span className="text-xl font-semibold">{t(name.toLowerCase())}</span>
    </button>
  );

  useEffect(() => {
    // Welcome message
    const timer = setTimeout(() => {
      speak(t('appTitle'), language);
    }, 500);

    return () => clearTimeout(timer);
  }, [language, t]);

  return (
    <Layout title={t('appTitle')} showBack={false}>
      <div className="flex justify-center my-6">
        <h2 className="text-2xl font-bold">{t('selectLanguage')}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        <CategoryButton 
          name="Pain" 
          color="sv-button-red" 
          icon={Heart} 
          onClick={() => navigateToCategory('pain')} 
        />
        <CategoryButton 
          name="Feelings" 
          color="sv-button-yellow" 
          icon={Smile} 
          onClick={() => navigateToCategory('feelings')} 
        />
        <CategoryButton 
          name="Needs" 
          color="sv-button-green" 
          icon={Lightbulb} 
          onClick={() => navigateToCategory('needs')} 
        />
        <CategoryButton 
          name="Questions" 
          color="sv-button-blue" 
          icon={HelpCircle} 
          onClick={() => navigateToCategory('questions')} 
        />
        <CategoryButton 
          name="Beliefs" 
          color="sv-button-purple" 
          icon={Church} 
          onClick={() => navigateToCategory('beliefs')} 
        />
      </div>
    </Layout>
  );
};

export default Home;
