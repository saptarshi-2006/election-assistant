import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const styles = {
    info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-200',
    error: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-200',
  };

  return (
    <div className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 flex items-center p-4 mb-4 border rounded-lg shadow-lg z-50 animate-bounce-in ${styles[type]}`} role="alert">
      <div className="text-sm font-medium">
        {message}
      </div>
      <button onClick={onClose} className="ml-4 -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-slate-400 p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-black/5 dark:hover:bg-white/10">
        <span className="sr-only">Close</span>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
