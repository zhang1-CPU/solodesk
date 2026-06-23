import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from '@/pages/DashboardPage';
import { ClientsPage } from '@/pages/ClientsPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { TimeTrackerPage } from '@/pages/TimeTrackerPage';
import { IncomePage } from '@/pages/IncomePage';
import { InvoicesPage } from '@/pages/InvoicesPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { LandingPage } from '@/pages/LandingPage';
import { db } from '@/lib/db';

function AppContent() {
  const [initialized, setInitialized] = useState(false);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      await db.open();
      
      const clientCount = await db.clients.count();
      setHasData(clientCount > 0);
      
      setInitialized(true);
    };
    
    initApp();
  }, []);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={hasData ? <Navigate to="/dashboard" /> : <LandingPage />}
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/time-tracker" element={<TimeTrackerPage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return <AppContent />;
}
