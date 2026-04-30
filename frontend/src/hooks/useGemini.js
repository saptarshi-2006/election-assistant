import { useState } from 'react';

export function useGemini(systemPrompt) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userMessage) => {
    setLoading(true);
    const newHistory = [
      ...history,
      { role: 'user', content: userMessage }
    ];
    setHistory(newHistory);

    try {
      const geminiContents = newHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            contents: geminiContents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        }
      );
      
      const data = await response.json();
      
      if (data.error) {
         throw new Error(data.error.message);
      }

      const reply = data.candidates[0].content.parts[0].text;
      
      setHistory(prev => [
        ...prev,
        { role: 'assistant', content: reply }
      ]);
      setLoading(false);
      return reply;
    } catch (err) {
      console.error(err);
      setLoading(false);
      return "Sorry, I encountered an error while processing your request with Gemini.";
    }
  };

  return { history, loading, sendMessage, setHistory };
}
