import axios from 'axios';

// Since the spec uses Google Cloud Translation API v2
export const translateService = async (text, targetLang) => {
  try {
    const apiKey = process.env.GOOGLE_TRANSLATE_KEY;
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await axios.post(url, {
      q: text,
      target: targetLang
    });

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to translate text');
  }
};
