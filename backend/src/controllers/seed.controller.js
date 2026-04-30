import { db, auth } from '../config/firebase.config.js';

export const seedDatabase = async (req, res, next) => {
  try {
    const { email, password, boothNumber } = req.body;
    
    // Bypass auth and just write to Firestore
    const mockUid = 'mock-uid-123';

    // Set the user in Firestore users collection
    await db.collection('users').doc(mockUid).set({
      email,
      role: 'blo',
      boothNumber,
      createdAt: new Date().toISOString()
    });

    // Create the booth
    await db.collection('blo_booths').doc(boothNumber).set({
      boothNumber,
      totalVoters: 1250,
      verifiedCount: 850,
      pendingCount: 400,
      location: 'Government High School, Room 1',
      lastUpdated: new Date().toISOString()
    });

    res.status(200).json({ success: true, message: 'Seeded test BLO and Booth', uid: userRecord.uid });
  } catch (error) {
    next(error);
  }
};
