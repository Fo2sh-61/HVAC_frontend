import React from 'react';

const Badge = ({ children, variant = 'info', className = '' }) => {
  const variants = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    primary: 'bg-primary-100 text-primary-800',
  };

  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  const statusVariants = {
    'Pending': 'warning',
    'Not Started': 'warning',
    'In Progress': 'info',
    'Completed': 'success',
    'Cancelled': 'danger',
  };

  return (
    <Badge variant={statusVariants[status] || 'info'}>
      {status}
    </Badge>
  );
};

export default Badge;
