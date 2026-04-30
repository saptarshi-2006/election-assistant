import { db } from '../config/firebase.config.js';

export const lookupVoter = async (req, res, next) => {
  try {
    const { voterId } = req.params;
    const voterDoc = await db.collection('voters').doc(voterId).get();

    if (!voterDoc.exists) {
      return res.status(404).json({ success: false, message: 'Voter not found' });
    }

    res.status(200).json({ success: true, voter: voterDoc.data() });
  } catch (error) {
    next(error);
  }
};

export const getBoothLocation = async (req, res, next) => {
  try {
    const { boothNumber } = req.params;
    const boothDoc = await db.collection('booths').doc(boothNumber).get();

    if (!boothDoc.exists) {
      return res.status(404).json({ success: false, message: 'Booth not found' });
    }

    res.status(200).json({ success: true, booth: boothDoc.data() });
  } catch (error) {
    next(error);
  }
};

export const registerInterest = async (req, res, next) => {
  try {
    const { voterId, language } = req.body;
    
    await db.collection('interests').add({
      voterId,
      language,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({ success: true, message: 'Interest registered successfully' });
  } catch (error) {
    next(error);
  }
};
