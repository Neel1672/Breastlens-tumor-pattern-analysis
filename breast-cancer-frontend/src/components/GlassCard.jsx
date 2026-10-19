import React from 'react';

export default function GlassCard({
  children,
  className = '',
  variant = 'default', // 'default' | 'interactive' | 'highlight' | 'benign' | 'malignant'
  style = {},
  ...props
}) {
  const variantClass = variant !== 'default' ? `glass-card--${variant}` : '';
  return (
    <div
      className={`glass-card ${variantClass} ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
