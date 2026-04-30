// If we need server-side Gemini calls, we would use the official SDK here.
// The spec mainly requires frontend to call Gemini directly (via Proxy/direct),
// but we include this to fulfill the structure.

import { GoogleGenAI } from '@google/genai';

export const generateAIContent = async (prompt) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-pro',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error('Gemini Error:', error);
    throw new Error('Failed to generate content');
  }
};
