import { HashRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardPage } from '@/pages/DashboardPage';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
      <p className="text-slate-500 dark:text-slate-400 mt-2">Coming in the next update.</p>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppShell />}>
          <Route path="/app/dashboard" element={<DashboardPage />} />
          <Route path="/app/clients" element={<PlaceholderPage title="Clients" />} />
          <Route path="/app/projects" element={<PlaceholderPage title="Projects" />} />
          <Route path="/app/time-tracker" element={<PlaceholderPage title="Time Tracker" />} />
          <Route path="/app/income" element={<PlaceholderPage title="Income" />} />
          <Route path="/app/invoices" element={<PlaceholderPage title="Invoices" />} />
          <Route path="/app/settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
