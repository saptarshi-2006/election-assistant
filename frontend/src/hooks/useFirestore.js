import { useState, useCallback } from 'react';
import { db } from '../services/firebase';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where } from 'firebase/firestore';

export function useFirestore() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDocument = useCallback(async (collectionName, docId) => {
    setLoading(true);
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      setLoading(false);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (err) {
      setError(err);
      setLoading(false);
      return null;
    }
  }, []);

  const queryDocuments = useCallback(async (collectionName, field, operator, value) => {
    setLoading(true);
    try {
      const q = query(collection(db, collectionName), where(field, operator, value));
      const querySnapshot = await getDocs(q);
      const docs = [];
      querySnapshot.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
      setLoading(false);
      return docs;
    } catch (err) {
      setError(err);
      setLoading(false);
      return [];
    }
  }, []);

  return { loading, error, getDocument, queryDocuments };
}
