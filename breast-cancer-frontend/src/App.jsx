import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import CorsHelperModal from './components/CorsHelperModal';
import Overview from './pages/Overview';
import ClassificationLab from './pages/ClassificationLab';
import PatternExplorer from './pages/PatternExplorer';
import ModelEvaluation from './pages/ModelEvaluation';
import DatasetInsights from './pages/DatasetInsights';
import AboutProject from './pages/AboutProject';
import { checkBackendHealth } from './services/api';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCorsModalOpen, setIsCorsModalOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState({
    checked: false,
    online: false,
    data: null,
    error: null,
  });
  const [isChecking, setIsChecking] = useState(false);

  // Health check on mount and provide refresh function
  const refreshBackendStatus = async () => {
    setIsChecking(true);
    const result = await checkBackendHealth();
    setBackendStatus({
      checked: true,
      online: result.online,
      data: result.data || null,
      error: result.error || null,
    });
    setIsChecking(false);
  };

  useEffect(() => {
    refreshBackendStatus();
  }, []);

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        <Topbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          isOnline={backendStatus.online}
          isChecking={isChecking}
          onOpenCorsModal={() => setIsCorsModalOpen(true)}
        />

        <main className="content-container">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route
              path="/classification"
              element={
                <ClassificationLab
                  onOpenCorsModal={() => setIsCorsModalOpen(true)}
                />
              }
            />
            <Route path="/patterns" element={<PatternExplorer />} />
            <Route path="/evaluation" element={<ModelEvaluation />} />
            <Route path="/dataset" element={<DatasetInsights />} />
            <Route
              path="/about"
              element={
                <AboutProject
                  onOpenCorsModal={() => setIsCorsModalOpen(true)}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Backend & CORS Guidance Modal */}
      <CorsHelperModal
        isOpen={isCorsModalOpen}
        onClose={() => setIsCorsModalOpen(false)}
        isOnline={backendStatus.online}
        backendInfo={backendStatus.data}
      />
    </div>
  );
}
