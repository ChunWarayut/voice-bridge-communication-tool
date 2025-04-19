
import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Globe, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage, SupportedLanguage } from '../contexts/LanguageContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  screenName?: string;
  showBack?: boolean;
  showHome?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  screenName,
  showBack = true,
  showHome = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  
  const isRootPath = location.pathname === '/';
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleHome = () => {
    navigate('/');
  };
  
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
  };

  return (
    <div className="sv-page pb-20">
      <header className="sv-header sticky top-0 z-10 bg-white border-b pb-2">


        <Helmet>
          <title>{title || ''} {screenName ? '-' : ''} {screenName || ''} - EasyTalk - Communication App for Intubated Patients</title>
          <meta name="description" content="EasyTalk is a multilingual communication app that helps intubated patients express pain, needs, and feelings using TTS and visual buttons." />
          <meta name="keywords" content="intubated patient communication app, ICU app, hospital communication tool, multilingual TTS app, EasyTalk" />
          <meta property="og:title" content="EasyTalk - Communication for Patients" />
          <meta property="og:description" content="Help patients speak with ease using EasyTalk. Available in Thai, Burmese, and English." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/image.png" />
        </Helmet>


        <div className="flex items-center gap-2">
          {showBack && !isRootPath && (
            <button 
              onClick={handleBack}
              className="sv-back-button"
              aria-label={t('back')}
            >
              <ArrowLeft size={28} />
            </button>
          )}

          <img src="/logo.png" alt="Logo" className="h-20" /> {/* Adjust height as needed */}
          {title} {screenName ? '-' : ''} {screenName}

        </div>
        
        <div className="flex items-center gap-2">
          {showHome && !isRootPath && (
            <button 
              onClick={handleHome}
              className="sv-back-button"
              aria-label={t('home')}
            >
              <Home size={28} />
            </button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sv-blue">
                <Globe size={28} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-white">
              <DropdownMenuItem 
                className={`${language === 'en' ? 'bg-sv-blue text-white' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                <span className="px-1">🇺🇸</span> {t('english')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`${language === 'th' ? 'bg-sv-blue text-white' : ''}`}
                onClick={() => handleLanguageChange('th')}
              >
                <span className="px-1">🇹🇭</span> {t('thai')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`${language === 'my' ? 'bg-sv-blue text-white' : ''}`}
                onClick={() => handleLanguageChange('my')}
              >
                <span className="px-1">🇲🇲</span> {t('burmese')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      <footer className="text-center text-sm text-gray-400 py-2">
        © 2025 Developed by ChunWarayut (Warayut Taekrathok)
      </footer>
    </div>
  );
};

export default Layout;
