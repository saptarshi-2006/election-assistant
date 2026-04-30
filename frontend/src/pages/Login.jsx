import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import api from '../services/api';
import { Languages, User, ShieldCheck } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { loginAnonymously, currentUser, setUserRole } = useAuth();
  const { language, setLanguage } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Auto-login anonymously if not logged in
    if (!currentUser) {
      loginAnonymously().catch(console.error);
    }
  }, [currentUser, loginAnonymously]);

  const handleSelectRole = async (role) => {
    setLoading(true);
    try {
      await api.post('/auth/set-role', { role, language });
      
      setUserRole(role);
      navigate(role === 'voter' ? '/voter/home' : '/blo/dashboard');
      
    } catch (error) {
      console.error("Error setting role", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">Nirvachan Sahayika</h1>
          <p className="text-slate-500 dark:text-slate-400">Your Personal Election Guide</p>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              <Languages className="w-4 h-4 mr-2" /> Select Language
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['en', 'hi', 'bn'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                    language === lang
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'বাংলা'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              <User className="w-4 h-4 mr-2" /> Select Your Role
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card 
                onClick={() => !loading && handleSelectRole('voter')}
                className="flex flex-col items-center justify-center py-8 border-2 border-transparent hover:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              >
                <User className="w-10 h-10 text-blue-500 mb-3" />
                <span className="font-semibold text-slate-800 dark:text-slate-100">I am a Voter</span>
              </Card>

              <Card 
                onClick={() => !loading && handleSelectRole('blo')}
                className="flex flex-col items-center justify-center py-8 border-2 border-transparent hover:border-green-500 bg-green-50 dark:bg-green-900/20"
              >
                <ShieldCheck className="w-10 h-10 text-green-500 mb-3" />
                <span className="font-semibold text-slate-800 dark:text-slate-100">I am a BLO</span>
              </Card>
            </div>
          </div>
          
          {loading && (
             <div className="mt-4 text-center text-sm text-slate-500 animate-pulse">Setting up your profile...</div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Login;
