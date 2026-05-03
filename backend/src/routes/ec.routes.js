import express from 'express';

const router = express.Router();

// Mock database for EC
// Mock database for EC (In a production app, these would be in Firestore)
let ecConfig = {
  voteDate: '2026-05-25',
  bloName: 'John Doe',
  bloPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
};

let incidents = [
  { 
    id: 1, 
    time: '2026-05-02 08:30', 
    location: 'Booth 42', 
    status: 'Pending',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' 
  }
];
let publicComplaints = [];

router.get('/config', (req, res) => {
  res.json({ success: true, config: ecConfig });
});

router.post('/config', (req, res) => {
  ecConfig = { ...ecConfig, ...req.body };
  res.json({ success: true, message: 'Configuration updated' });
});

router.post('/report-incident', (req, res) => {
  const { location, photo } = req.body;
  const incident = {
    id: incidents.length + 1,
    time: new Date().toISOString(),
    location: location || 'Unknown Booth',
    photo: photo || null,
    status: 'Pending'
  };
  incidents.unshift(incident);
  res.json({ success: true, message: 'Incident reported to EC' });
});

router.get('/incidents', (req, res) => {
  res.json({ success: true, incidents });
});

router.post('/complaints', (req, res) => {
  const { type, location, description, photo, isAnonymous } = req.body;
  const complaint = {
    id: publicComplaints.length + 1,
    time: new Date().toISOString(),
    type: type || 'General',
    location: location || 'Unknown',
    description: description || 'No description provided',
    photo: photo || null,
    isAnonymous: isAnonymous !== undefined ? isAnonymous : true,
    status: 'Pending Review'
  };
  publicComplaints.unshift(complaint);
  res.json({ success: true, message: 'Complaint submitted successfully' });
});

router.get('/complaints', (req, res) => {
  res.json({ success: true, complaints: publicComplaints });
});

export default router;
