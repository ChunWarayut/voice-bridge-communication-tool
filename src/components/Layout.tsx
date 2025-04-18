
import React, { ReactNode } from 'react';
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
  showBack?: boolean;
  showHome?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
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
          
          <h1 className="text-2xl font-bold">{title || t('appTitle')}</h1>
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
    </div>
  );
};

export default Layout;
