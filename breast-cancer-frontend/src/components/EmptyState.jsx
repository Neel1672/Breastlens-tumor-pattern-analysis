import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';
import GlassCard from './GlassCard';

export default function EmptyState({
  icon: Icon = AlertCircle,
  title = 'No Data Available',
  description = 'There is no information to display for this view yet.',
  action,
  className = '',
}) {
  return (
    <GlassCard
      className={`fade-in ${className}`}
      style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'rgba(2, 132, 199, 0.1)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={28} />
      </div>
      <div style={{ maxWidth: '460px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
      {action && <div style={{ marginTop: '0.5rem' }}>{action}</div>}
    </GlassCard>
  );
}
