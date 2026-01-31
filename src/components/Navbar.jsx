import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Globe, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark-800 font-display">
                HVAC Manager
              </h1>
              <p className="text-xs text-dark-500">
                {t('dashboard')}
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <Button
            variant="secondary"
            size="sm"
            icon={<Globe size={18} />}
            onClick={toggleLanguage}
            className="hidden sm:flex"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </Button>

          {/* User Info */}
          {user && (
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="text-right">
                <p className="text-sm font-semibold text-dark-800">
                  {user.fullName}
                </p>
                <p className="text-xs text-dark-500">
                  {user.roles?.[0]}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.fullName?.charAt(0).toUpperCase()}
              </div>
            </div>
          )}

          {/* Logout Button */}
          <Button
            variant="outline"
            size="sm"
            icon={<LogOut size={18} />}
            onClick={logout}
          >
            <span className="hidden sm:inline">{t('logout')}</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
