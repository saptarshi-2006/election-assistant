import { translateService } from '../services/translate.service.js';

export const translateText = async (req, res, next) => {
  try {
    const { text, targetLang } = req.body;
    
    if (!text || !targetLang) {
      return res.status(400).json({ success: false, message: 'text and targetLang are required' });
    }

    const translatedText = await translateService(text, targetLang);
    res.status(200).json({ success: true, translatedText });
  } catch (error) {
    next(error);
  }
};
