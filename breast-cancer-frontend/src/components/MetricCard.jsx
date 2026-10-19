import React from 'react';
import GlassCard from './GlassCard';

export default function MetricCard({
  label,
  value,
  context,
  icon: Icon,
  variant = 'default', // 'default' | 'accent' | 'benign' | 'malignant'
  className = '',
}) {
  return (
    <GlassCard variant="interactive" className={`metric-card ${className}`}>
      <div className="metric-card-top">
        <span className="metric-label">{label}</span>
        {Icon && (
          <div className={`metric-icon-box ${variant}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="metric-value-row">
        <span className="metric-value">{value}</span>
      </div>
      {context && <p className="metric-context">{context}</p>}
    </GlassCard>
  );
}
