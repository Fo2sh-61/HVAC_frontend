import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  className = '', 
  hover = true,
  ...props 
}) => {
  return (
    <div 
      className={`card ${hover ? 'hover:shadow-lg' : ''} ${className}`}
      {...props}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-dark-800 mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-dark-500">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
