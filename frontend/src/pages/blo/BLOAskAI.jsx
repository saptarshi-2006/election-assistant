import React, { useState } from 'react';
import { ChatBox } from '../../components/chat/ChatBox';
import { VoiceInput } from '../../components/chat/VoiceInput';
import { Button } from '../../components/ui/Button';
import { useGemini } from '../../hooks/useGemini';
import { Send } from 'lucide-react';

const SYSTEM_PROMPT = `You are Nirvachan Sahayika, an AI assistant for Booth Level Officers (BLOs) in India. 
Help them with election commission rules, filling forms (Form 6, 7, 8), handling AMF (Assured Minimum Facilities), 
and managing booth responsibilities. Be professional, accurate, and concise.`;

const BLOAskAI = () => {
  const { history, loading, sendMessage } = useGemini(SYSTEM_PROMPT);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const msg = input;
    setInput('');
    await sendMessage(msg);
  };

  const handleVoice = (text) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] pb-16">
      <header className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">BLO Assistant</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Get help with ECI rules and forms.</p>
      </header>

      <ChatBox messages={history} loading={loading} />

      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-end space-x-2">
          <VoiceInput onResult={handleVoice} />
          <div className="flex-1">
            <textarea
              className="w-full bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
              rows={1}
              placeholder="Ask about rules, forms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || loading}
            className="rounded-full p-3 h-auto"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BLOAskAI;
