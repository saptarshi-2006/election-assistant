import React from 'react';

export const Skeleton = ({ className = '', type = 'text' }) => {
  const baseClasses = 'animate-pulse bg-slate-200 dark:bg-slate-700';
  
  if (type === 'circle') {
    return <div className={`rounded-full ${baseClasses} ${className}`} />;
  }
  
  if (type === 'rectangle') {
    return <div className={`rounded-md ${baseClasses} ${className}`} />;
  }
  
  // Default to text line
  return <div className={`h-4 rounded ${baseClasses} ${className}`} />;
};
