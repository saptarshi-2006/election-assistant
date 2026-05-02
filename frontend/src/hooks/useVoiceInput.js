import { useState, useEffect, useRef } from 'react';

export function useVoiceInput(lang, onResult) {
  const [listening, setListening] = useState(false);
  const recognition = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    
    recognition.current = new SpeechRecognition();
    recognition.current.lang = 'en-IN';
      
    recognition.current.onresult = (e) => {
      onResult(e.results[0][0].transcript);
      setListening(false);
    };

    recognition.current.onerror = (e) => {
      console.error("Speech recognition error", e);
      setListening(false);
    }
    
    recognition.current.onend = () => {
      setListening(false);
    }

  }, [lang, onResult]);

  const toggle = () => {
    if (!recognition.current) {
        alert("Speech recognition is not supported in this browser.");
        return;
    }
    if (listening) {
      recognition.current.stop();
      setListening(false);
    } else {
      recognition.current.start();
      setListening(true);
    }
  };

  return { listening, toggle };
}
