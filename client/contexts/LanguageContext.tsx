import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, LanguageContextType, SUPPORTED_LANGUAGES } from '@shared/languages';
import { en } from '@/locales/en';
import { hi } from '@/locales/hi';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Translation objects
const translations = {
  en,
  hi,
  // For other languages, we'll use English as fallback for now
  ta: en, // Tamil
  te: en, // Telugu  
  mr: en, // Marathi
  gu: en, // Gujarati
  bn: en, // Bengali
  kn: en, // Kannada
  pa: en, // Punjabi
  ml: en, // Malayalam
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('smartfarmer_language') as LanguageCode;
    if (savedLanguage && SUPPORTED_LANGUAGES.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.toLowerCase();
      const supportedLang = SUPPORTED_LANGUAGES.find(lang => 
        browserLang.startsWith(lang.code) || browserLang.includes(lang.code)
      );
      if (supportedLang) {
        setCurrentLanguage(supportedLang.code);
      }
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem('smartfarmer_language', lang);
    
    // Update document language and direction
    document.documentElement.lang = lang;
    const language = SUPPORTED_LANGUAGES.find(l => l.code === lang);
    if (language) {
      document.documentElement.dir = language.direction;
    }
  };

  const getNestedTranslation = (obj: any, path: string): string => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] ? current[key] : null;
    }, obj);
  };

  const t = (key: string): string => {
    const translation = getNestedTranslation(translations[currentLanguage], key);
    
    if (translation) {
      return translation;
    }
    
    // Fallback to English if translation not found
    const englishTranslation = getNestedTranslation(translations.en, key);
    if (englishTranslation) {
      return englishTranslation;
    }
    
    // Return the key if no translation found
    console.warn(`Translation not found for key: ${key}`);
    return key;
  };

  const getLanguageName = (code: LanguageCode): string => {
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === code);
    return language ? language.nativeName : code;
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    getLanguageName,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
