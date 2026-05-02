import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Calendar, User, Upload, AlertTriangle, CheckCircle, X, ShieldAlert, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';

const ECDashboard = () => {
  const [voteDate, setVoteDate] = useState('2026-05-25');
  const [bloName, setBloName] = useState('John Doe');
  const [isSaved, setIsSaved] = useState(false);
  
  const [bloPhoto, setBloPhoto] = useState(null);
  const fileInputRef = useRef(null);
  
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [publicComplaints, setPublicComplaints] = useState([]);
  
  // Mock incidents
  const [incidents, setIncidents] = useState([
    { 
      id: 1, 
      time: '2026-05-02 08:30', 
      location: 'Booth 42', 
      status: 'Pending',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      id: 2, 
      time: '2026-05-01 14:15', 
      location: 'Booth 12', 
      status: 'Verified',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
    }
  ]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await api.get('/ec/config');
        if (response.data.success) {
          const { voteDate, bloName, bloPhoto } = response.data.config;
          setVoteDate(voteDate);
          setBloName(bloName);
          setBloPhoto(bloPhoto);
        }
        
        // Fetch complaints
        const complaintsRes = await api.get('/ec/complaints');
        if (complaintsRes.data.success) {
          setPublicComplaints(complaintsRes.data.complaints);
        }
      } catch (err) {
        console.error("Failed to fetch EC data", err);
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async () => {
    try {
      await api.post('/ec/config', { voteDate, bloName, bloPhoto });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save config", err);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBloPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Election Commission</h1>
        <p className="text-slate-500 dark:text-slate-400">Control Center & Oversight</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Setup Section */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" /> Election Configuration
          </h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Set Vote Date</label>
              <input 
                type="date" 
                value={voteDate}
                onChange={(e) => setVoteDate(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border-0 rounded-lg p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">BLO Name</label>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={bloName}
                  onChange={(e) => setBloName(e.target.value)}
                  placeholder="Enter BLO Name"
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border-0 rounded-lg p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Upload BLO Reference Photo</label>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />
              <div 
                onClick={() => fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer overflow-hidden ${
                  bloPhoto ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-slate-700 hover:border-blue-500'
                }`}
              >
                {bloPhoto ? (
                  <div className="relative group">
                    <img src={bloPhoto} alt="BLO Preview" className="h-32 mx-auto rounded-lg object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <p className="text-white text-xs font-bold">Change Photo</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">Click or drop BLO picture here</p>
                  </>
                )}
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              {isSaved ? <CheckCircle className="w-5 h-5 mr-2" /> : null}
              {isSaved ? 'Configuration Saved' : 'Save Configuration'}
            </Button>
          </div>
        </Card>

        {/* Alerts Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" /> Security Alerts
          </h2>
          
          <div className="space-y-4">
            {incidents.map(incident => (
              <div key={incident.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-200 dark:bg-red-900/40 rounded-full flex items-center justify-center text-red-600">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Face Auth Failed</p>
                    <p className="text-[10px] text-slate-500">{incident.time} • {incident.location}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-8"
                  onClick={() => setSelectedIncident(incident)}
                >
                  View Photo
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Public Complaints Section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold flex items-center mb-4">
          <ShieldAlert className="w-5 h-5 mr-2 text-amber-500" /> Public Complaints
        </h2>
        
        <div className="space-y-4">
          {publicComplaints.length === 0 ? (
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 text-sm">No public complaints reported.</p>
            </div>
          ) : (
            publicComplaints.map(complaint => (
              <div key={complaint.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900/30 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 mt-1 bg-amber-200 dark:bg-amber-900/40 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{complaint.type}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 max-w-2xl">{complaint.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-[10px] px-2 py-0.5 bg-amber-200/50 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200 rounded-full">
                        {complaint.location}
                      </span>
                      <span className="text-[10px] text-slate-500">{new Date(complaint.time).toLocaleString()}</span>
                      {complaint.photo && (
                        <span className="text-[10px] flex items-center text-blue-500">
                          <ImageIcon className="w-3 h-3 mr-1" /> Evidence Attached
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="whitespace-nowrap flex-shrink-0"
                  onClick={() => setSelectedComplaint(complaint)}
                >
                  Review Case
                </Button>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Photo Modal for Incidents */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-sm overflow-hidden border-0 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Intruder Snapshot</h3>
                <p className="text-[10px] text-slate-500">{selectedIncident.time} • {selectedIncident.location}</p>
              </div>
              <button 
                onClick={() => setSelectedIncident(null)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-square bg-slate-200 dark:bg-slate-800">
              <img 
                src={selectedIncident.photo} 
                alt="Security Alert" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 flex space-x-3">
              <Button className="flex-1" onClick={() => setSelectedIncident(null)}>Mark as Verified</Button>
              <Button variant="outline" className="flex-1 text-red-500 hover:text-red-600" onClick={() => setSelectedIncident(null)}>Escalate</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Complaint Review Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <Card className="w-full max-w-lg overflow-hidden border-0 shadow-2xl animate-in zoom-in-95 duration-200 my-8">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-amber-50 dark:bg-amber-900/20">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">Review Complaint</h3>
              </div>
              <button 
                onClick={() => setSelectedComplaint(null)}
                className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Issue Type</h4>
                <p className="font-medium text-slate-900 dark:text-slate-100">{selectedComplaint.type}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Location</h4>
                  <p className="text-sm text-slate-800 dark:text-slate-200">{selectedComplaint.location}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Reported At</h4>
                  <p className="text-sm text-slate-800 dark:text-slate-200">{new Date(selectedComplaint.time).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</h4>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                  <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{selectedComplaint.description}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Evidence</h4>
                {selectedComplaint.photo ? (
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-black/5">
                    <img 
                      src={selectedComplaint.photo} 
                      alt="Complaint Evidence" 
                      className="w-full h-auto object-contain max-h-64"
                    />
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 text-center">
                    <p className="text-xs text-slate-500">No photographic evidence provided.</p>
                  </div>
                )}
              </div>
              
              <div>
                 <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Reporter Status</h4>
                 <p className="text-sm text-slate-800 dark:text-slate-200">
                   {selectedComplaint.isAnonymous ? 'Anonymous Submission' : 'Verified Voter'}
                 </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex space-x-3">
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => setSelectedComplaint(null)}>Acknowledge & Resolve</Button>
              <Button variant="outline" className="flex-1 text-amber-600 hover:text-amber-700 border-amber-200" onClick={() => setSelectedComplaint(null)}>Forward to RO</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ECDashboard;
