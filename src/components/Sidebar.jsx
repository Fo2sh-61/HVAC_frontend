import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wrench, 
  FileText, 
  Users, 
  ClipboardList,
  Star,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, isAdmin, isCustomer, isEngineer } = useAuth();
  const { t, language } = useLanguage();

  const getNavItems = () => {
    if (isAdmin) {
      return [
        { to: '/admin', icon: LayoutDashboard, label: t('dashboard') },
        { to: '/admin/services', icon: Wrench, label: t('services') },
        { to: '/admin/requests', icon: FileText, label: t('requests') },
        { to: '/admin/engineers', icon: Users, label: t('engineers') },
      ];
    }
    
    if (isCustomer) {
      return [
        { to: '/customer', icon: LayoutDashboard, label: t('dashboard') },
        { to: '/customer/services', icon: Wrench, label: t('services') },
        { to: '/customer/requests', icon: ClipboardList, label: t('myRequests') },
        { to: '/customer/reviews', icon: Star, label: t('reviews') },
      ];
    }
    
    if (isEngineer) {
      return [
        { to: '/engineer', icon: LayoutDashboard, label: t('dashboard') },
        { to: '/engineer/requests', icon: FileText, label: t('assignedToMe') },
      ];
    }
    
    return [];
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-dark-900 bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-[73px] ${language === 'ar' ? 'right-0' : 'left-0'} bottom-0 w-64 bg-white border-${language === 'ar' ? 'l' : 'r'} border-gray-200 z-30
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-semibold shadow-sm'
                    : 'text-dark-600 hover:bg-gray-50'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    size={20} 
                    className={isActive ? 'text-primary-600' : 'text-dark-400'}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
