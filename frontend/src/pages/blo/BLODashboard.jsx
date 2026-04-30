import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Users, CheckCircle, Clock } from 'lucide-react';
import api from '../../services/api';

const BLODashboard = () => {
  const [data, setData] = useState({
    totalVoters: 0,
    verifiedCount: 0,
    pendingCount: 0,
    boothNumber: "...",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/blo/dashboard');
        if (response.data.success) {
          setData(response.data.dashboard);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center mt-10">Loading dashboard...</div>;
  }

  const progress = data.totalVoters > 0 ? Math.round((data.verifiedCount / data.totalVoters) * 100) : 0;

  return (
    <div className="p-4 space-y-6 pb-20">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">BLO Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Booth {data.boothNumber} Overview</p>
      </header>

      <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
        <h2 className="text-lg font-semibold mb-2">Verification Progress</h2>
        <div className="flex justify-between items-end mb-2">
          <span className="text-3xl font-bold">{progress}%</span>
          <span className="text-sm text-green-100">{data.verifiedCount} / {data.totalVoters}</span>
        </div>
        <ProgressBar progress={progress} className="bg-white/30 [&>div]:bg-white" />
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col items-center justify-center p-4 text-center">
          <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">{data.verifiedCount}</h3>
          <p className="text-xs text-slate-500 mt-1">Verified</p>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 text-center">
          <Clock className="w-8 h-8 text-amber-500 mb-2" />
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">{data.pendingCount}</h3>
          <p className="text-xs text-slate-500 mt-1">Pending</p>
        </Card>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Upcoming Deadlines</h3>
        <Card className="border-red-200 dark:border-red-900/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Form 6 Submission</p>
              <p className="text-sm text-slate-500">Last date for new registrations</p>
            </div>
            <div className="text-right">
              <p className="text-red-500 font-bold">2 Days</p>
              <p className="text-xs text-slate-400">May 15</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BLODashboard;
