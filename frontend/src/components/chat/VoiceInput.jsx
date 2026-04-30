import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { useAppContext } from '../../context/AppContext';

export const VoiceInput = ({ onResult }) => {
  const { language } = useAppContext();
  const { listening, toggle } = useVoiceInput(language, onResult);

  return (
    <button
      type="button"
      onClick={toggle}
      className={`p-3 rounded-full flex items-center justify-center transition-colors ${
        listening 
          ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:hover:bg-red-900/80' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
      }`}
    >
      {listening ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
    </button>
  );
};
