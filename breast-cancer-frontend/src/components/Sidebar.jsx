import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Microscope,
  Network,
  BarChart3,
  Database,
  Info,
  Shield,
} from 'lucide-react';
import BreastCancerRibbon from './BreastCancerRibbon';

const NAV_ITEMS = [
  {
    path: '/',
    label: 'Overview',
    icon: LayoutDashboard,
    badge: 'Hub',
  },
  {
    path: '/classification',
    label: 'Classification Lab',
    icon: Microscope,
    badge: 'Live ML',
  },
  {
    path: '/patterns',
    label: 'Pattern Explorer',
    icon: Network,
    badge: 'PCA & K-Means',
  },
  {
    path: '/evaluation',
    label: 'Model Evaluation',
    icon: BarChart3,
    badge: '3 Models',
  },
  {
    path: '/dataset',
    label: 'Dataset Insights',
    icon: Database,
    badge: '569 Cases',
  },
  {
    path: '/about',
    label: 'About the Project',
    icon: Info,
    badge: 'Oncology AI',
  },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header with Pink Awareness Ribbon */}
        <div className="sidebar-header">
          <NavLink to="/" className="brand-container" onClick={onClose}>
            <div className="brand-icon-wrapper" title="Breast Cancer Awareness">
              <BreastCancerRibbon size={24} />
            </div>
            <div className="brand-text-wrapper">
              <span className="brand-title">
                Breast<span>Lens</span>
              </span>
              <span className="brand-subtitle">Oncology Pattern Intelligence</span>
            </div>
          </NavLink>
        </div>

        {/* Navigation Section */}
        <nav className="sidebar-nav">
          <span className="nav-section-title">Navigation</span>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={onClose}
                end={item.path === '/'}
              >
                <Icon className="nav-link-icon" />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(236, 72, 153, 0.1)',
                      color: 'var(--color-primary-dark)',
                      fontWeight: 600,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Scientific Notice Card & Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-academic-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              <Shield size={14} style={{ color: 'var(--color-primary)' }} />
              <span>Research Notice</span>
            </div>
            <div>
              Machine learning research demonstration. Not intended for clinical diagnoses or healthcare decision-making.
            </div>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', textAlign: 'center' }}>
            BreastLens v1.0 • Oncology AI Platform
          </div>
        </div>
      </aside>
    </>
  );
}
