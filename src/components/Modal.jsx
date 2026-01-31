import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  footer = null,
  showCloseButton = true,
}) => {
  const { t, language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-dark-900 bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div 
          className={`inline-block align-bottom bg-white rounded-xl text-${language === 'ar' ? 'right' : 'left'} overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle w-full ${sizes[size]} animate-scale-in`}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-dark-800">
              {title}
            </h3>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-dark-400 hover:text-dark-600 transition-colors"
              >
                <X size={24} />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
