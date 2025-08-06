import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, Star, Mail, Wheat, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export default function Header({ onSearch, searchQuery }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authState, logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Wheat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">{t('app.title')}</h1>
              <p className="text-xs text-green-600 hidden sm:block">{t('app.subtitle')}</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 pr-4 w-full border-green-200 focus:border-green-400 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector variant="header" />

            {authState.isAuthenticated ? (
              <>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link to="/my-crops">
                        <NavigationMenuLink className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors">
                          <Star className="h-4 w-4" />
                          <span>{t('navigation.myCrops')}</span>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/alerts">
                        <NavigationMenuLink className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors">
                          <Mail className="h-4 w-4" />
                          <span>{t('navigation.alerts')}</span>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-100 text-green-700">
                          {authState.user ? getInitials(authState.user.name) : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{authState.user?.name}</p>
                        <p className="w-48 truncate text-sm text-muted-foreground">
                          {authState.user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>{t('navigation.profile')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="mr-2 h-4 w-4" />
                      <Link to="/my-crops">{t('navigation.myCrops')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <Link to="/alerts">{t('navigation.alerts')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('auth.logOut')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {t('auth.signIn')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    {t('auth.signUp')}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Search & Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 space-y-3 border-t border-green-100">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 pr-4 w-full border-green-200 focus:border-green-400"
              />
            </div>

            {/* Language Selector */}
            <div className="px-3 py-2 border-b border-gray-100">
              <LanguageSelector variant="standalone" showLabel={false} />
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              {authState.isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-gray-900 border-b border-gray-100">
                    {t('header.welcome')}, {authState.user?.name}
                  </div>
                  <Link
                    to="/my-crops"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Star className="h-4 w-4" />
                    <span>{t('navigation.myCrops')}</span>
                  </Link>
                  <Link
                    to="/alerts"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Mail className="h-4 w-4" />
                    <span>{t('navigation.alerts')}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('auth.signOut')}</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('auth.signIn')}
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-sm font-medium bg-green-600 text-white hover:bg-green-700 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('auth.signUp')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
