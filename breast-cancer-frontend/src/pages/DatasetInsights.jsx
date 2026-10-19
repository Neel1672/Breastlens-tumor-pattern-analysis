import React, { useState } from 'react';
import {
  Database,
  Search,
  CheckCircle2,
  FileText,
  Filter,
  Layers,
  Sparkles,
  Info,
  ShieldCheck,
  BarChart2,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MetricCard from '../components/MetricCard';
import PageHeader from '../components/PageHeader';
import BreastCancerRibbon from '../components/BreastCancerRibbon';
import analysisData from '../data/analysisData.json';

const { dataset_info, features_summary } = analysisData;

export default function DatasetInsights() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'mean' | 'error' | 'worst'

  const filteredFeatures = features_summary.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (categoryFilter === 'all') return matchesSearch;
    if (categoryFilter === 'mean') return matchesSearch && f.name.startsWith('mean ');
    if (categoryFilter === 'error') return matchesSearch && f.name.endsWith(' error');
    if (categoryFilter === 'worst') return matchesSearch && f.name.startsWith('worst ');
    return matchesSearch;
  });

  return (
    <div className="fade-in">
      <PageHeader
        badge={
          <span className="badge badge-accent">
            <BreastCancerRibbon size={14} />
            Biopsy Repository
          </span>
        }
        title="Dataset Insights"
        description="Detailed specification and statistical profile of the Wisconsin Diagnostic Breast Cancer (WDBC) dataset. 569 instances digitized from fine needle aspirate biopsies, verified with zero missing values and zero duplicates."
      />

      {/* Dataset Summary Metrics */}
      <div className="metrics-grid">
        <MetricCard
          label="Total Instances"
          value="569"
          context="Biopsy cell nuclei cases"
          icon={Database}
          variant="default"
        />
        <MetricCard
          label="Continuous Attributes"
          value="30"
          context="Float64 geometric features"
          icon={Layers}
          variant="accent"
        />
        <MetricCard
          label="Data Quality (Missing)"
          value="0"
          context="100% complete records"
          icon={CheckCircle2}
          variant="benign"
        />
        <MetricCard
          label="Duplicate Instances"
          value="0"
          context="Zero duplicate rows detected"
          icon={ShieldCheck}
          variant="benign"
        />
      </div>

      {/* Data Cleaning & Collection Summary */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <GlassCard>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} style={{ color: 'var(--color-primary)' }} />
            Data Cleaning & Integrity Audit
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
            During the data validation and preprocessing stage, rigorous audits were executed on the raw dataset:
          </p>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <li><strong>Missing Value Scan:</strong> Evaluated <code>df.isnull().sum()</code> across all 31 columns. Zero missing values were present, eliminating imputation artifacts.</li>
            <li><strong>Deduplication Audit:</strong> Executed <code>df.duplicated().sum()</code>. Zero duplicate records were detected.</li>
            <li><strong>Dimensionality:</strong> 569 rows by 30 continuous features, plus 1 binary target integer (0 = Malignant, 1 = Benign).</li>
            <li><strong>Stratified Split:</strong> 455 training cases (80%) and 114 testing cases (20%) preserving target proportions.</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} style={{ color: 'var(--color-accent)' }} />
            Feature Construction Methodology
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            Ten fundamental physical characteristics are extracted from each digitized cell nucleus:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
            {['Radius', 'Texture', 'Perimeter', 'Area', 'Smoothness', 'Compactness', 'Concavity', 'Concave Points', 'Symmetry', 'Fractal Dimension'].map((item) => (
              <span key={item} className="badge badge-subtle" style={{ fontSize: '0.75rem' }}>
                {item}
              </span>
            ))}
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Each of the 10 characteristics is recorded across 3 statistical aggregates: <strong>Mean</strong> (center), <strong>Standard Error</strong> (uncertainty), and <strong>Worst</strong> (mean of top 3 extreme values), yielding exactly 30 numeric dimensions.
          </p>
        </GlassCard>
      </div>

      {/* 30 Features Statistical Reference Table */}
      <GlassCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>
              Full 30-Feature Statistical Reference
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Computed parameters from exploratory analysis on verified biopsy contours
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.65rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Search feature..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '0.45rem 0.75rem 0.45rem 2rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #d8b4e2',
                  background: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '0.85rem',
                  width: '180px',
                }}
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #d8b4e2',
                background: 'rgba(255, 255, 255, 0.95)',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
              }}
            >
              <option value="all">All Features (30)</option>
              <option value="mean">Mean Features (10)</option>
              <option value="error">Standard Error (10)</option>
              <option value="worst">Worst Features (10)</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.82rem',
            }}
          >
            <thead>
              <tr style={{ background: 'rgba(248, 240, 252, 0.85)', borderBottom: '1px solid #d8b4e2' }}>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>
                  Feature Name
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Dataset Mean (μ)
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Std Dev (σ)
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Min
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Max
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: '#047857', fontWeight: 700 }}>
                  Benign Mean
                </th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#be185d', fontWeight: 700 }}>
                  Malignant Mean
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFeatures.map((row, idx) => (
                <tr
                  key={row.name}
                  style={{
                    borderBottom: '1px solid #f8f4fb',
                    backgroundColor: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {row.name}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    {row.mean}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {row.std}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    {row.min}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    {row.max}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#047857', fontWeight: 600 }}>
                    {row.benign_mean}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#be185d', fontWeight: 600 }}>
                    {row.malignant_mean}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFeatures.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            No features matched "{searchTerm}".
          </div>
        )}
      </GlassCard>
    </div>
  );
}
