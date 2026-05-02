import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AlertTriangle, Upload, CheckCircle, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';

const VoterComplaint = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'Code of Conduct Violation',
    location: '',
    description: '',
    photo: null,
    isAnonymous: true
  });

  const complaintTypes = [
    'Code of Conduct Violation',
    'EVM Malfunction',
    'Voter Intimidation',
    'Bribery / Cash Distribution',
    'Fake Voting',
    'Other'
  ];

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/ec/complaints', formData);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Failed to submit complaint", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-4 space-y-6 pb-20 flex flex-col items-center justify-center min-h-[80vh] text-center animate-in fade-in zoom-in">
        <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Complaint Submitted</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
          Your complaint has been securely sent to the Election Commission for review. Thank you for your vigilance.
        </p>
        <Button onClick={() => navigate('/voter/home')} className="w-full max-w-xs">
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-20">
      <header className="flex items-center space-x-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">File a Complaint</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Report an election issue</p>
        </div>
      </header>

      <Card className="p-5 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-500/50">
        <div className="flex space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
            All reports are strictly monitored by the Election Commission. Submitting false reports may lead to legal action. You may choose to remain anonymous.
          </p>
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Issue Type</label>
            <select 
              className="w-full bg-slate-100 dark:bg-slate-800 border-0 rounded-lg p-3 text-slate-900 dark:text-slate-100"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            >
              {complaintTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location / Booth Number</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Booth 42, Main St School"
              className="w-full bg-slate-100 dark:bg-slate-800 border-0 rounded-lg p-3 text-slate-900 dark:text-slate-100"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea 
              required
              rows={4}
              placeholder="Describe the incident in detail..."
              className="w-full bg-slate-100 dark:bg-slate-800 border-0 rounded-lg p-3 text-slate-900 dark:text-slate-100 resize-none"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Upload Evidence (Photo)</label>
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
                formData.photo ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-slate-700 hover:border-blue-500'
              }`}
            >
              {formData.photo ? (
                <div className="relative group">
                  <img src={formData.photo} alt="Evidence Preview" className="h-32 mx-auto rounded-lg object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <p className="text-white text-xs font-bold">Change Photo</p>
                  </div>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Tap to upload a photo</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input 
              type="checkbox" 
              id="anonymous" 
              checked={formData.isAnonymous}
              onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="anonymous" className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              Submit Anonymously
            </label>
          </div>
        </Card>

        <Button 
          type="submit" 
          disabled={isSubmitting || !formData.location || !formData.description} 
          className="w-full py-4 text-lg rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Complaint to EC'}
        </Button>
      </form>
    </div>
  );
};

export default VoterComplaint;
