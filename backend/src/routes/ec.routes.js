import express from 'express';

const router = express.Router();

// Mock database for EC
let ecConfig = {
  voteDate: '2026-05-25',
  bloName: 'John Doe',
  bloPhoto: null
};

let incidents = [];
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
