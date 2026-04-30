import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, MessageSquare, MapPin, CheckSquare, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const BottomTabBar = () => {
  const location = useLocation();
  const { userRole } = useAuth();
  
  const voterTabs = [
    { path: '/voter/home', label: 'Home', icon: Home },
    { path: '/voter/timeline', label: 'Steps', icon: Clock },
    { path: '/voter/ask', label: 'Ask AI', icon: MessageSquare },
    { path: '/voter/check', label: 'Booth', icon: MapPin },
  ];

  const bloTabs = [
    { path: '/blo/dashboard', label: 'Dash', icon: Home },
    { path: '/blo/checklist', label: 'Tasks', icon: CheckSquare },
    { path: '/blo/forms', label: 'Forms', icon: FileText },
    { path: '/blo/ask', label: 'Ask AI', icon: MessageSquare },
  ];

  const tabs = userRole === 'blo' ? bloTabs : voterTabs;

  return (
    <div className="fixed bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname.startsWith(tab.path);
          return (
            <Link 
              key={tab.path} 
              to={tab.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
