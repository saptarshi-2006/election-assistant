import { db } from '../config/firebase.config.js';

export const saveChat = async (req, res, next) => {
  try {
    const { messages, role, sessionId } = req.body;
    const { uid } = req.user;

    await db.collection('chat_history').doc(uid).collection('sessions').doc(sessionId).set({
      role,
      messages,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    // Also set the createdAt field only on first creation
    const sessionDoc = await db.collection('chat_history').doc(uid).collection('sessions').doc(sessionId).get();
    if (!sessionDoc.exists || !sessionDoc.data().createdAt) {
      await db.collection('chat_history').doc(uid).collection('sessions').doc(sessionId).set({
        createdAt: new Date().toISOString()
      }, { merge: true });
    }

    res.status(200).json({ success: true, message: 'Chat saved successfully' });
  } catch (error) {
    next(error);
  }
};

export const getChatHistory = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { uid } = req.user;

    const sessionDoc = await db.collection('chat_history').doc(uid).collection('sessions').doc(sessionId).get();

    if (!sessionDoc.exists) {
      return res.status(200).json({ success: true, messages: [] });
    }

    res.status(200).json({ success: true, messages: sessionDoc.data().messages });
  } catch (error) {
    next(error);
  }
};
