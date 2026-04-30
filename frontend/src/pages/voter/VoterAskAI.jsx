import React, { useState } from 'react';
import { ChatBox } from '../../components/chat/ChatBox';
import { VoiceInput } from '../../components/chat/VoiceInput';
import { Button } from '../../components/ui/Button';
import { useGemini } from '../../hooks/useGemini';
import { Send } from 'lucide-react';

const SYSTEM_PROMPT = `You are Nirvachan Sahayika, an AI assistant helping voters in India. 
Provide concise, accurate, and helpful answers regarding voter registration, polling booths, ID requirements, and election procedures. 
Be polite and objective. Reply in the language the user speaks.`;

const VoterAskAI = () => {
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
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ask AI Assistant</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Get instant answers to your election queries.</p>
      </header>

      <ChatBox messages={history} loading={loading} />

      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-end space-x-2">
          <VoiceInput onResult={handleVoice} />
          <div className="flex-1">
            <textarea
              className="w-full bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
              rows={1}
              placeholder="Ask a question..."
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

export default VoterAskAI;
