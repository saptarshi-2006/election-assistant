import dotenv from 'dotenv';
dotenv.config();

// In-Memory Database to simulate Firebase for local testing without config
const inMemoryDB = {
  users: {
    'mock-user-123': { email: 'demo@example.com', role: 'blo', boothNumber: '142' }
  },
  blo_booths: {
    '142': { boothNumber: '142', totalVoters: 1250, verifiedCount: 850, pendingCount: 400, lastUpdated: new Date().toISOString() }
  },
  voters: {}
};

export const db = {
  collection: (collectionName) => ({
    doc: (docId) => ({
      get: async () => {
        const data = inMemoryDB[collectionName]?.[docId];
        return data ? { exists: true, data: () => data } : { exists: false };
      },
      set: async (data) => {
        if (!inMemoryDB[collectionName]) inMemoryDB[collectionName] = {};
        inMemoryDB[collectionName][docId] = data;
        return true;
      },
      update: async (updates) => {
        if (!inMemoryDB[collectionName]) inMemoryDB[collectionName] = {};
        inMemoryDB[collectionName][docId] = { ...inMemoryDB[collectionName][docId], ...updates };
        return true;
      }
    }),
    where: () => ({
      get: async () => ({ empty: true, forEach: () => {} })
    })
  })
};

export const auth = {
  verifyIdToken: async (token) => {
    return { uid: 'mock-user-123', email: 'demo@example.com' };
  }
};
