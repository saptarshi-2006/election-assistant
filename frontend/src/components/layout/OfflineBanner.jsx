import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOffline } from '../../hooks/useOffline';

export const OfflineBanner = () => {
  const isOffline = useOffline();

  if (!isOffline) return null;

  return (
    <div className="bg-amber-100 dark:bg-amber-900 border-b border-amber-200 dark:border-amber-800 px-4 py-2 flex items-center justify-center">
      <WifiOff className="w-4 h-4 text-amber-600 dark:text-amber-400 mr-2" />
      <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
        You are currently offline. Some features may be unavailable.
      </span>
    </div>
  );
};
