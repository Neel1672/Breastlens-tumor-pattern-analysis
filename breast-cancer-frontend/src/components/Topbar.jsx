import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, ChevronRight, Activity, Terminal } from 'lucide-react';
import StatusIndicator from './StatusIndicator';

const ROUTE_LABELS = {
  '/': 'Overview',
  '/classification': 'Classification Lab',
  '/patterns': 'Pattern Explorer',
  '/evaluation': 'Model Evaluation',
  '/dataset': 'Dataset Insights',
  '/about': 'About the Project',
};

export default function Topbar({
  onToggleSidebar,
  isOnline,
  isChecking,
  onOpenCorsModal,
}) {
  const location = useLocation();
  const currentTitle = ROUTE_LABELS[location.pathname] || 'Dashboard';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="menu-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="breadcrumbs">
          <span>BreastLens</span>
          <ChevronRight size={14} />
          <span className="breadcrumb-active">{currentTitle}</span>
        </div>
      </div>

      <div className="topbar-right">
        <StatusIndicator
          isOnline={isOnline}
          isChecking={isChecking}
          onClick={onOpenCorsModal}
        />
      </div>
    </header>
  );
}
