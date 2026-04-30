import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search, MapPin } from 'lucide-react';
import axios from 'axios';

const VoterCheck = () => {
  const [voterId, setVoterId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!voterId) return;
    setLoading(true);
    try {
      // Mocking the API call for demonstration as we might not have seeded data
      // const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/voter/lookup/${voterId}`);
      // setResult(res.data.voter);
      
      setTimeout(() => {
        setResult({
          name: "Rishi Sharma",
          voterId: voterId.toUpperCase(),
          boothNumber: "142",
          boothAddress: "Govt Primary School, Ward 4",
          constituency: "South Assembly"
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Booth Locator</h1>
        <p className="text-slate-500 dark:text-slate-400">Enter your Voter ID (EPIC) to find your booth.</p>
      </header>

      <Card>
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg leading-5 bg-white dark:bg-slate-800 placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-white transition-colors"
              placeholder="e.g. ABC1234567"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
            />
          </div>
          <Button onClick={handleSearch} disabled={loading || !voterId}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="animate-fade-in border-green-200 dark:border-green-900/50">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{result.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">EPIC: {result.voterId}</p>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 border border-slate-100 dark:border-slate-800 space-y-2">
                <div>
                  <p className="text-xs text-slate-500">Booth Number</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{result.boothNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Booth Address</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{result.boothAddress}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Constituency</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{result.constituency}</p>
                </div>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                View on Map
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VoterCheck;
