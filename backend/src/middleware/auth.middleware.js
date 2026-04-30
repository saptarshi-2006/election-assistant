import { auth } from '../config/firebase.config.js';

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Bypass verification for local development testing
    if (token === 'mock-token-123') {
      req.user = { uid: 'mock-user-123', email: 'demo@example.com' };
      return next();
    }

    const decodedToken = await auth.verifyIdToken(token);
    
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};
