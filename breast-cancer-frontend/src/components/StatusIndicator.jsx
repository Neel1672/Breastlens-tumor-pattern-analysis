import React from 'react';
import { ShieldAlert } from 'lucide-react';
import BreastCancerRibbon from './BreastCancerRibbon';

export default function StatusIndicator({
  isOnline = false,
  isChecking = false,
  onClick,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      {/* Awareness Ribbon + Research Demo Pill */}
      <div
        className="badge badge-subtle"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          fontSize: '0.75rem',
          padding: '0.3rem 0.75rem',
          background: 'rgba(253, 242, 248, 0.95)',
          border: '1px solid rgba(244, 215, 238, 0.9)',
          color: 'var(--color-primary-dark)',
        }}
        title="Biomedical Machine Learning Demonstration — Not a clinical diagnostic tool"
      >
        <BreastCancerRibbon size={15} />
        <span style={{ fontWeight: 600 }}>Research Platform</span>
      </div>

      {/* Backend Connection Status */}
      <button
        onClick={onClick}
        className="badge"
        style={{
          backgroundColor: isOnline ? 'var(--color-benign-light)' : 'rgba(254, 226, 226, 0.85)',
          color: isOnline ? '#065f46' : '#991b1b',
          border: `1px solid ${isOnline ? 'var(--color-benign-border)' : 'rgba(239, 68, 68, 0.3)'}`,
          cursor: 'pointer',
          padding: '0.3rem 0.65rem',
          fontSize: '0.75rem',
          transition: 'all 0.2s',
        }}
        title="Click to check FastAPI backend connectivity and CORS settings"
      >
        <span
          className={isOnline ? 'pulse-dot' : ''}
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: isOnline ? '#10b981' : '#ef4444',
            display: 'inline-block',
          }}
        />
        <span>
          {isChecking ? 'Checking API...' : isOnline ? 'API Connected' : 'API Offline'}
        </span>
      </button>
    </div>
  );
}
