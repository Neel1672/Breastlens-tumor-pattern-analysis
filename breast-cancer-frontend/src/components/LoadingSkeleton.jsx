import React from 'react';
import GlassCard from './GlassCard';

export default function LoadingSkeleton({ lines = 3, height = 24, className = '' }) {
  return (
    <GlassCard className={`fade-in ${className}`} style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            style={{
              height: `${height}px`,
              borderRadius: '6px',
              background: 'linear-gradient(90deg, rgba(226, 232, 240, 0.6) 25%, rgba(241, 245, 249, 0.9) 50%, rgba(226, 232, 240, 0.6) 75%)',
              backgroundSize: '200% 100%',
              animation: 'pulseGlow 1.5s infinite ease-in-out',
              width: i === 0 ? '60%' : i === lines - 1 ? '40%' : '100%',
            }}
          />
        ))}
      </div>
    </GlassCard>
  );
}
