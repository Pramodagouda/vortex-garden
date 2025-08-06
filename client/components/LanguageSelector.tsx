import React from 'react';
import { Languages, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@shared/languages';

interface LanguageSelectorProps {
  variant?: 'header' | 'standalone';
  showLabel?: boolean;
}

export default function LanguageSelector({ 
  variant = 'header', 
  showLabel = true 
}: LanguageSelectorProps) {
  const { currentLanguage, setLanguage, t, getLanguageName } = useLanguage();

  const handleLanguageChange = (langCode: LanguageCode) => {
    setLanguage(langCode);
  };

  if (variant === 'standalone') {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg border border-green-100 shadow-sm">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-green-100 p-3 rounded-full">
              <Languages className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('header.selectLanguage')}
          </h3>
          <p className="text-sm text-gray-600">
            Choose your preferred language for better understanding
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {SUPPORTED_LANGUAGES.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`p-3 rounded-lg border text-left transition-all duration-200 hover:shadow-md ${
                currentLanguage === language.code
                  ? 'border-green-400 bg-green-50 ring-2 ring-green-200'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">
                    {language.nativeName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {language.name}
                  </div>
                </div>
                {currentLanguage === language.code && (
                  <Check className="h-4 w-4 text-green-600" />
                )}
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Language preference is saved automatically
          </p>
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 hover:bg-green-50"
        >
          <Languages className="h-4 w-4" />
          {showLabel && (
            <span className="hidden sm:inline">
              {getLanguageName(currentLanguage)}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-medium text-gray-900 border-b border-gray-100">
          {t('header.selectLanguage')}
        </div>
        {SUPPORTED_LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between cursor-pointer py-2"
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-xs text-gray-500">{language.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              {currentLanguage === language.code && (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                    Active
                  </Badge>
                </>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
