import express from 'express';

const router = express.Router();

// Mock database for EC
let ecConfig = {
  voteDate: '2026-05-25',
  bloName: 'John Doe',
  bloPhoto: null
};

let incidents = [];

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

export default router;
