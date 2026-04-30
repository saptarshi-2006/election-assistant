import { db } from '../config/firebase.config.js';

export const getDocument = async (collection, docId) => {
  const doc = await db.collection(collection).doc(docId).get();
  return doc.exists ? doc.data() : null;
};

export const updateDocument = async (collection, docId, data) => {
  await db.collection(collection).doc(docId).update(data);
};
