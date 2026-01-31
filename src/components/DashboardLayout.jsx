import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main 
        className={`
          pt-[73px] min-h-screen transition-all duration-300
          ${language === 'ar' ? 'lg:pr-64' : 'lg:pl-64'}
        `}
      >
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
