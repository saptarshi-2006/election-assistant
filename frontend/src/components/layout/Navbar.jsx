import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Moon, Sun } from 'lucide-react';

export const Navbar = ({ title }) => {
  const { theme, setTheme } = useAppContext();

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center shadow-sm">
      <div className="font-bold text-xl text-blue-600 dark:text-blue-400">
        {title || 'Nirvachan Sahayika'}
      </div>
      <button 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
      </button>
    </nav>
  );
};
