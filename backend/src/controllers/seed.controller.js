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

    // Seed EC Config
    await db.collection('ec_config').doc('global').set({
      voteDate: '2026-05-25',
      bloName: 'John Doe',
      bloPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      updatedAt: new Date().toISOString()
    });

    // Seed some mock incidents
    const incidentRef = db.collection('incidents');
    await incidentRef.add({
      time: new Date().toISOString(),
      location: 'Booth 42',
      status: 'Pending',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
    });

    res.status(200).json({ success: true, message: 'Seeded test BLO, Booth, and EC data', uid: mockUid });
  } catch (error) {
    next(error);
  }
};
