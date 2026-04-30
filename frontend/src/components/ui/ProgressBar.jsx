import React from 'react';

export const ProgressBar = ({ progress = 0, className = '' }) => {
  return (
    <div className={`w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700 ${className}`}>
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      ></div>
    </div>
  );
};
