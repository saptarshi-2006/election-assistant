import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { BottomTabBar } from './components/layout/BottomTabBar';
import { OfflineBanner } from './components/layout/OfflineBanner';

// Pages
import Login from './pages/Login';
import VoterHome from './pages/voter/VoterHome';
import VoterTimeline from './pages/voter/VoterTimeline';
import VoterAskAI from './pages/voter/VoterAskAI';
import VoterCheck from './pages/voter/VoterCheck';
import BLODashboard from './pages/blo/BLODashboard';
import BLOChecklist from './pages/blo/BLOChecklist';
import BLOFormGuide from './pages/blo/BLOFormGuide';
import BLOAskAI from './pages/blo/BLOAskAI';
import ECDashboard from './pages/ec/ECDashboard';
import BLOFaceAuth from './pages/blo/BLOFaceAuth';

const ProtectedRoute = ({ allowedRole }) => {
  const { userRole, currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />
      <OfflineBanner />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          {/* Voter Routes */}
          <Route element={<ProtectedRoute allowedRole="voter" />}>
            <Route path="voter/home" element={<VoterHome />} />
            <Route path="voter/timeline" element={<VoterTimeline />} />
            <Route path="voter/ask" element={<VoterAskAI />} />
            <Route path="voter/check" element={<VoterCheck />} />
          </Route>

          {/* BLO Routes */}
          <Route element={<ProtectedRoute allowedRole="blo" />}>
            <Route path="blo/dashboard" element={<BLODashboard />} />
            <Route path="blo/checklist" element={<BLOChecklist />} />
            <Route path="blo/forms" element={<BLOFormGuide />} />
            <Route path="blo/ask" element={<BLOAskAI />} />
            <Route path="blo/auth" element={<BLOFaceAuth />} />
          </Route>

          {/* EC Routes */}
          <Route element={<ProtectedRoute allowedRole="ec" />}>
            <Route path="ec/dashboard" element={<ECDashboard />} />
          </Route>
        </Routes>
      </main>
      <BottomTabBar />
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;
