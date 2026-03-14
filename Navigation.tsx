import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, GraduationCap, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/App';

interface NavigationProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export default function Navigation({ onLoginClick, onSignupClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const auth = useAuth();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = auth?.isLoggedIn ? [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Chat', href: '/chat' },
    { name: 'Tools', href: '/notes' },
    { name: 'Planner', href: '/planner' },
  ] : [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '#tools' },
    { name: 'Subjects', href: '#subjects' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('#')) return false;
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-900">StudyAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive(link.href)
                    ? 'text-green-600 bg-green-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {auth?.isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">Hi, {auth.user?.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={auth.logout}
                  className="rounded-full"
                >
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLoginClick}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Log in
                </Button>
                <Button
                  size="sm"
                  onClick={onSignupClick}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full px-5"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/60">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive(link.href)
                      ? 'text-green-600 bg-green-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="mt-4 pt-4 border-t border-slate-200/60 flex flex-col gap-2">
                {auth?.isLoggedIn ? (
                  <Button
                    variant="outline"
                    onClick={auth.logout}
                    className="w-full rounded-full"
                  >
                    Log out
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onLoginClick();
                      }}
                      className="w-full rounded-full"
                    >
                      Log in
                    </Button>
                    <Button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onSignupClick();
                      }}
                      className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
