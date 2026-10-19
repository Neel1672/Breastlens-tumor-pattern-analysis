import React, { useState } from 'react';
import {
  Network,
  GitFork,
  BarChart2,
  PieChart as PieIcon,
  Filter,
  Layers,
  Info,
  Maximize2,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  Legend,
} from 'recharts';
import GlassCard from '../components/GlassCard';
import PageHeader from '../components/PageHeader';
import BreastCancerRibbon from '../components/BreastCancerRibbon';
import analysisData from '../data/analysisData.json';

const {
  dataset_info,
  features_summary,
  feature_rankings,
  correlation_matrix,
  clustering,
  pca,
} = analysisData;

// Features to compare
const CORE_COMPARE_FEATURES = [
  'mean radius',
  'mean perimeter',
  'mean area',
  'mean smoothness',
  'mean concavity',
  'mean concave points',
];

const featureComparisonData = CORE_COMPARE_FEATURES.map((featName) => {
  const match = features_summary.find((f) => f.name === featName);
  return {
    feature: featName.replace('mean ', ''),
    fullName: featName,
    benign: match ? match.benign_mean : 0,
    malignant: match ? match.malignant_mean : 0,
    unitDifference: match
      ? (((match.malignant_mean - match.benign_mean) / match.benign_mean) * 100).toFixed(1)
      : '0',
  };
});

export default function PatternExplorer() {
  const [selectedFeature, setSelectedFeature] = useState(CORE_COMPARE_FEATURES[0]);
  const [pcaColorMode, setPcaColorMode] = useState('diagnosis'); // 'diagnosis' | 'cluster'

  const activeFeatureSummary = features_summary.find((f) => f.name === selectedFeature);

  return (
    <div className="fade-in">
      <PageHeader
        badge={
          <span className="badge badge-accent">
            <BreastCancerRibbon size={14} />
            Manifold & Cluster Discovery
          </span>
        }
        title="Pattern Explorer"
        description="Investigate the mathematical patterns discovered during exploratory analysis: feature separations between benign and malignant tumors, correlation structures, K-Means clustering partitions, and 2D Principal Component projections."
      />

      {/* Section 1: Feature Comparisons & Correlation Ranking */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '1.75rem',
          marginBottom: '2rem',
        }}
      >
        {/* Feature Comparison Chart */}
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem' }}>
                Mean Value Disparity (Benign vs Malignant)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Comparing average values of key nuclear morphometry attributes
              </p>
            </div>
            <span className="badge badge-subtle">Normalized Units</span>
          </div>

          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureComparisonData}
                margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1e6f7" vertical={false} />
                <XAxis
                  dataKey="feature"
                  tick={{ fill: '#4a4058', fontSize: 11 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis tick={{ fill: '#4a4058', fontSize: 11 }} />
                <Tooltip
                  formatter={(val, name) => [
                    `${val}`,
                    name === 'benign' ? 'Benign Mean' : 'Malignant Mean',
                  ]}
                  contentStyle={{
                    borderRadius: '10px',
                    border: '1px solid #d8b4e2',
                    background: 'rgba(255,255,255,0.96)',
                    boxShadow: 'var(--shadow-md)',
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: '10px' }}
                />
                <Bar dataKey="benign" name="Benign" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="malignant" name="Malignant" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(253, 242, 248, 0.7)',
              border: '1px solid rgba(244, 215, 238, 0.8)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              marginTop: '0.75rem',
            }}
          >
            <strong>Observation:</strong> Malignant nuclei exhibit consistently higher mean area
            (978.4 vs 462.8), concave points (0.088 vs 0.026), and radius (17.46 vs 12.15).
          </div>
        </GlassCard>

        {/* Top Feature Correlations with Diagnosis */}
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem' }}>
                Top Predictive Features (Correlation)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Absolute Pearson correlation coefficients with target diagnosis
              </p>
            </div>
            <span className="badge badge-primary">Ranked</span>
          </div>

          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={feature_rankings.slice(0, 6)}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 90, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1e6f7" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 1]}
                  tick={{ fill: '#4a4058', fontSize: 11 }}
                />
                <YAxis
                  dataKey="feature"
                  type="category"
                  tick={{ fill: '#1e152d', fontSize: 11, fontWeight: 500 }}
                />
                <Tooltip
                  formatter={(val) => [`|r| = ${val}`, 'Absolute Correlation']}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #d8b4e2',
                    background: 'rgba(255,255,255,0.96)',
                  }}
                />
                <Bar
                  dataKey="abs_correlation"
                  name="Absolute Correlation"
                  fill="#8b5cf6"
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(245, 243, 255, 0.7)',
              border: '1px solid rgba(221, 214, 254, 0.8)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              marginTop: '0.75rem',
            }}
          >
            <strong>Insight:</strong> <code>worst concave points</code> (|r| = 0.794) and{' '}
            <code>worst perimeter</code> (|r| = 0.783) are the strongest linear indicators.
          </div>
        </GlassCard>
      </div>

      {/* Section 2: Correlation Matrix Heatmap */}
      <GlassCard style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem' }}>
              Feature Correlation Matrix
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Pairwise correlations across core cellular morphometry dimensions and target diagnosis
            </p>
          </div>
          <span className="badge badge-subtle">Pearson r</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.8rem',
              textAlign: 'center',
            }}
          >
            <thead>
              <tr style={{ background: 'rgba(248, 240, 252, 0.8)' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>
                  Feature
                </th>
                {correlation_matrix.map((row) => (
                  <th
                    key={row.feature}
                    style={{
                      padding: '0.75rem 0.5rem',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.feature.replace('mean ', 'm_')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {correlation_matrix.map((row) => (
                <tr key={row.feature} style={{ borderBottom: '1px solid #f8f4fb' }}>
                  <td
                    style={{
                      padding: '0.75rem',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.feature}
                  </td>
                  {correlation_matrix.map((col) => {
                    const val = row[col.feature];
                    const isDiag = row.feature === col.feature;
                    const isPositive = val > 0;
                    const alpha = Math.abs(val) * 0.45;
                    const bg = isDiag
                      ? 'rgba(236, 72, 153, 0.18)'
                      : isPositive
                      ? `rgba(236, 72, 153, ${alpha})`
                      : `rgba(139, 92, 246, ${alpha})`;

                    return (
                      <td
                        key={col.feature}
                        style={{
                          padding: '0.65rem 0.5rem',
                          backgroundColor: bg,
                          fontFamily: 'var(--font-mono)',
                          fontWeight: isDiag ? 700 : 500,
                          color: Math.abs(val) > 0.6 ? '#1e152d' : '#4a4058',
                        }}
                      >
                        {val.toFixed(2)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Section 3: PCA & K-Means Clustering */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)',
          gap: '1.75rem',
          alignItems: 'start',
        }}
      >
        {/* PCA 2D Scatter Plot */}
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem' }}>
                Principal Component Analysis (PCA)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Projection of 30 features onto 2 Principal Components ({pca.total_variance_explained}% total variance)
              </p>
            </div>

            {/* Toggle Color Mode */}
            <div
              style={{
                display: 'flex',
                background: 'rgba(248, 240, 252, 0.9)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.2rem',
                border: '1px solid #d8b4e2',
              }}
            >
              <button
                type="button"
                onClick={() => setPcaColorMode('diagnosis')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: pcaColorMode === 'diagnosis' ? '#ffffff' : 'transparent',
                  color: pcaColorMode === 'diagnosis' ? 'var(--color-primary-dark)' : 'var(--text-secondary)',
                  boxShadow: pcaColorMode === 'diagnosis' ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                By Diagnosis (Ground Truth)
              </button>
              <button
                type="button"
                onClick={() => setPcaColorMode('cluster')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: pcaColorMode === 'cluster' ? '#ffffff' : 'transparent',
                  color: pcaColorMode === 'cluster' ? 'var(--color-accent-dark)' : 'var(--text-secondary)',
                  boxShadow: pcaColorMode === 'cluster' ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                By K-Means Cluster
              </button>
            </div>
          </div>

          <div style={{ width: '100%', height: '360px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1e6f7" />
                <XAxis
                  type="number"
                  dataKey="pc1"
                  name="Principal Component 1"
                  tick={{ fill: '#4a4058', fontSize: 11 }}
                  label={{
                    value: `Principal Component 1 (${pca.pc1_variance}%)`,
                    position: 'bottom',
                    offset: 0,
                    fill: '#4a4058',
                    fontSize: 12,
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="pc2"
                  name="Principal Component 2"
                  tick={{ fill: '#4a4058', fontSize: 11 }}
                  label={{
                    value: `Principal Component 2 (${pca.pc2_variance}%)`,
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#4a4058',
                    fontSize: 12,
                  }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div
                          style={{
                            background: 'rgba(255, 255, 255, 0.96)',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '8px',
                            border: '1px solid #d8b4e2',
                            boxShadow: 'var(--shadow-md)',
                            fontSize: '0.8rem',
                          }}
                        >
                          <div><strong>Record ID:</strong> #{data.id}</div>
                          <div><strong>PC1:</strong> {data.pc1} | <strong>PC2:</strong> {data.pc2}</div>
                          <div>
                            <strong>Diagnosis:</strong>{' '}
                            <span style={{ color: data.diagnosis === 'Benign' ? '#059669' : '#ec4899', fontWeight: 700 }}>
                              {data.diagnosis}
                            </span>
                          </div>
                          <div><strong>K-Means Cluster:</strong> Cluster {data.cluster}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Biopsy Samples" data={pca.sample_points}>
                  {pca.sample_points.map((entry, index) => {
                    let fill = '#8b5cf6';
                    if (pcaColorMode === 'diagnosis') {
                      fill = entry.diagnosis === 'Benign' ? '#059669' : '#ec4899';
                    } else {
                      fill = entry.cluster === 0 ? '#8b5cf6' : '#ec4899';
                    }
                    return <Cell key={`cell-${index}`} fill={fill} fillOpacity={0.8} />;
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: '0.5rem',
              fontSize: '0.8rem',
            }}
          >
            {pcaColorMode === 'diagnosis' ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#059669' }} />
                  <span style={{ fontWeight: 600, color: '#047857' }}>Benign Samples</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ec4899' }} />
                  <span style={{ fontWeight: 600, color: '#be185d' }}>Malignant Samples</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#8b5cf6' }} />
                  <span style={{ fontWeight: 600, color: '#7c3aed' }}>Cluster 0 (375 records)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ec4899' }} />
                  <span style={{ fontWeight: 600, color: '#be185d' }}>Cluster 1 (194 records)</span>
                </div>
              </>
            )}
          </div>
        </GlassCard>

        {/* K-Means Clustering Detail Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <GlassCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem' }}>K-Means Clustering</h3>
              <span className="badge badge-accent">k = 2</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
              K-Means was executed on standardized 30-feature vectors without using diagnosis labels.
              The resulting clusters demonstrate significant natural alignment with ground truth classes.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                border: '1px solid rgba(236, 72, 153, 0.2)',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Silhouette Coefficient
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                  {clustering.silhouette_score}
                </div>
              </div>
              <span className="badge badge-subtle">Cluster Cohesion</span>
            </div>

            {/* Clusters Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {clustering.clusters.map((c) => (
                <div
                  key={c.id}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.75)',
                    border: '1px solid #f1e6f7',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                      Cluster {c.id}
                    </span>
                    <span className="badge badge-subtle">{c.total} records</span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span style={{ color: '#047857' }}>● Benign cases:</span>
                      <strong>{c.benign} ({c.benign_percent}%)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#be185d' }}>● Malignant cases:</span>
                      <strong>{c.malignant} ({c.malignant_percent}%)</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard style={{ padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', fontWeight: 600, fontSize: '0.82rem' }}>
              <Info size={14} style={{ color: 'var(--color-primary)' }} />
              <span>Pattern Distinction</span>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              These clusters represent unsupervised geometric density groupings. They are distinct from the
              supervised decision boundary parameterized by Logistic Regression.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
