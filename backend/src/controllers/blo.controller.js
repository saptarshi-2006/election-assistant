import { db } from '../config/firebase.config.js';

export const getDashboard = async (req, res, next) => {
  try {
    const { uid } = req.user;
    
    // First, get the BLO's user document to find their boothNumber
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) return res.status(404).json({ success: false, message: 'BLO user not found' });
    
    const { boothNumber } = userDoc.data();
    if (!boothNumber) return res.status(400).json({ success: false, message: 'No booth assigned to this BLO' });

    const boothDoc = await db.collection('blo_booths').doc(boothNumber).get();
    
    if (!boothDoc.exists) {
      return res.status(404).json({ success: false, message: 'Booth details not found' });
    }

    res.status(200).json({ success: true, dashboard: boothDoc.data() });
  } catch (error) {
    next(error);
  }
};

export const updateChecklist = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { done } = req.body;
    const { uid } = req.user;

    const userDoc = await db.collection('users').doc(uid).get();
    const { boothNumber } = userDoc.data();

    await db.collection('blo_booths').doc(boothNumber).update({
      [`checklistProgress.${itemId}`]: done,
      lastUpdated: new Date().toISOString()
    });

    res.status(200).json({ success: true, message: 'Checklist updated' });
  } catch (error) {
    next(error);
  }
};

export const getVoterList = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const userDoc = await db.collection('users').doc(uid).get();
    const { boothNumber } = userDoc.data();

    const snapshot = await db.collection('voters').where('boothNumber', '==', boothNumber).get();
    const voters = [];
    snapshot.forEach(doc => {
      voters.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ success: true, voters });
  } catch (error) {
    next(error);
  }
};

export const verifyVoter = async (req, res, next) => {
  try {
    const { voterId } = req.params;
    const { verified } = req.body;
    const { uid } = req.user;

    await db.collection('voters').doc(voterId).update({
      verified,
      verifiedAt: new Date().toISOString(),
      verifiedBy: uid
    });

    res.status(200).json({ success: true, message: 'Voter verification updated' });
  } catch (error) {
    next(error);
  }
};
