import { db } from '../config/firebase.config.js';

export const verifyToken = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (userDoc.exists) {
      const userData = userDoc.data();
      return res.status(200).json({ success: true, user: { uid, ...userData } });
    } else {
      return res.status(200).json({ success: true, user: { uid, isNew: true } });
    }
  } catch (error) {
    next(error);
  }
};

export const setRole = async (req, res, next) => {
  try {
    const { role, language } = req.body;
    const { uid } = req.user;

    const userData = {
      role,
      language,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    if (role === 'blo') {
      const demoBoothNumber = '123-A';
      userData.boothNumber = demoBoothNumber;

      // Seed booth data if it doesn't exist
      const boothRef = db.collection('blo_booths').doc(demoBoothNumber);
      const boothDoc = await boothRef.get();
      
      if (!boothDoc.exists) {
        await boothRef.set({
          boothNumber: demoBoothNumber,
          totalVoters: 450,
          verifiedCount: 100,
          pendingCount: 350,
          checklistProgress: {
            evm_check: false,
            voter_list: true,
            security: false
          },
          lastUpdated: new Date().toISOString()
        });
      }
    }

    await db.collection('users').doc(uid).set(userData, { merge: true });
    
    res.status(200).json({ success: true, user: { uid, ...userData } });
  } catch (error) {
    next(error);
  }
};
