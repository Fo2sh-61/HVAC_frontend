import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Select = ({ 
  label, 
  error, 
  options = [],
  required = false,
  className = '',
  containerClassName = '',
  ...props 
}) => {
  const { language } = useLanguage();
  
  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label className={`block text-sm font-medium text-dark-700 mb-2 ${language === 'ar' ? 'text-right' : ''}`}>
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      <select
        className={`input ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''} ${className}`}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className={`mt-1 text-sm text-red-600 ${language === 'ar' ? 'text-right' : ''}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
