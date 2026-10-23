import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreatePlanPage } from './pages/CreatePlanPage';
import { CareCircleHub } from './pages/CareCircle/CareCircleHub';
import { ExplainMessagePage } from './pages/ExplainMessagePage';
import { SavedPlansPage } from './pages/SavedPlansPage';
import { AIChatPage } from './pages/AIChatPage';
import { AIToolsCenterPage } from './pages/AIToolsCenterPage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthEntryPage } from './pages/AuthEntryPage';

const AppContent: React.FC = () => {
  const { page, largeText, highContrast } = useApp();

  const renderCurrentView = () => {
    switch (page) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <AuthEntryPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'tools':
        return <AIToolsCenterPage />;
      case 'chat':
      case 'assistant':
        return <AIChatPage />;
      case 'carecircle':
        return <CareCircleHub />;
      case 'create':
        return <CreatePlanPage />;
      case 'explain':
        return <ExplainMessagePage />;
      case 'saved':
        return <SavedPlansPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900 transition-all ${
        largeText ? 'text-base' : 'text-sm'
      } ${highContrast ? 'contrast-125' : ''}`}
    >
      <Navbar />
      <main className="flex-1">{renderCurrentView()}</main>
      {page !== 'carecircle' && <Footer />}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
