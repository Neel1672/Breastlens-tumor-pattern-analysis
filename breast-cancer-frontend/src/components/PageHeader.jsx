import React from 'react';

export default function PageHeader({
  badge,
  title,
  description,
  actions,
  className = '',
}) {
  return (
    <header className={`page-header fade-in ${className}`}>
      <div className="page-header-row">
        <div>
          {badge && <div style={{ marginBottom: '0.5rem' }}>{badge}</div>}
          <h1 className="page-title">{title}</h1>
        </div>
        {actions && <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>{actions}</div>}
      </div>
      {description && <p className="page-description">{description}</p>}
    </header>
  );
}
