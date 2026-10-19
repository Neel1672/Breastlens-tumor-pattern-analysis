import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Database,
  Binary,
  ShieldCheck,
  AlertTriangle,
  GitBranch,
  Cpu,
  BarChart2,
  PieChart as PieIcon,
  Layers,
  ChevronRight,
  Network,
  CheckCircle2,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import GlassCard from '../components/GlassCard';
import MetricCard from '../components/MetricCard';
import BreastCancerRibbon from '../components/BreastCancerRibbon';
import analysisData from '../data/analysisData.json';

const { dataset_info } = analysisData;

const DIAGNOSIS_DISTRIBUTION = [
  { name: 'Benign', value: dataset_info.benign_count, color: '#059669', percent: '62.74%' },
  { name: 'Malignant', value: dataset_info.malignant_count, color: '#ec4899', percent: '37.26%' },
];

const ALGORITHM_CARDS = [
  {
    name: 'Logistic Regression',
    type: 'Supervised Classifier',
    status: 'Active API Model',
    activeModel: true,
    description:
      'Standardized linear model with sigmoid link function. Demonstrates optimal generalization (98.25% test accuracy) and calibrated probabilities.',
    strengths: 'Highly interpretable, fast inference, smooth probability outputs',
  },
  {
    name: 'Decision Tree',
    type: 'Supervised Classifier',
    status: 'Evaluated in Research',
    activeModel: false,
    description:
      'Recursive partitioning tree based on Gini impurity. Offers intuitive rule-based splits across nucleus morphology dimensions.',
    strengths: 'Transparent decision boundaries, non-linear partitioning',
  },
  {
    name: 'Random Forest',
    type: 'Ensemble Classifier',
    status: 'Evaluated in Research',
    activeModel: false,
    description:
      'Ensemble of 100 bagged decision trees with random feature subspacing. Achieved 95.61% accuracy and 0.993 ROC-AUC on holdout data.',
    strengths: 'Reduces overfitting, high non-linear feature interaction capacity',
  },
  {
    name: 'K-Means Clustering',
    type: 'Unsupervised Mining',
    status: 'Exploratory (k=2)',
    activeModel: false,
    description:
      'Partitioning algorithm grouping tumors into natural geometric centroids purely from geometric features without ground-truth labels.',
    strengths: 'Reveals intrinsic grouping; 90.4% alignment with benign diagnoses',
  },
  {
    name: 'Principal Component Analysis (PCA)',
    type: 'Dimensionality Reduction',
    status: 'Visualization (2D)',
    activeModel: false,
    description:
      'Projects 30 continuous dimensional features onto two orthogonal eigenvectors, capturing 63.24% of cumulative variance.',
    strengths: 'Compresses high-dimensional feature space for intuitive 2D maps',
  },
];

const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'Biopsy Feature Extraction',
    desc: '569 digitized fine needle aspirate (FNA) records with 30 computed nuclear morphometry metrics.',
  },
  {
    number: '02',
    title: 'Exploratory Data Analysis',
    desc: 'Distribution analysis, data integrity audit (zero missing values), and Pearson correlation ranking.',
  },
  {
    number: '03',
    title: 'Supervised Model Training',
    desc: 'Benchmarking Logistic Regression, Decision Tree, and Random Forest pipelines under an 80/20 stratified split.',
  },
  {
    number: '04',
    title: 'Unsupervised Cluster Discovery',
    desc: 'K-Means clustering (k=2) evaluated with Silhouette Coefficient (0.343) against actual labels.',
  },
  {
    number: '05',
    title: 'Inference & Pattern Explorer',
    desc: '2D PCA manifold projection and live interactive inference served via FastAPI backend.',
  },
];

export default function Overview() {
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <GlassCard
        variant="highlight"
        style={{
          padding: '2.75rem 2.5rem',
          marginBottom: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid rgba(244, 215, 238, 0.85)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 242, 248, 0.85) 60%, rgba(245, 243, 255, 0.75) 100%)',
        }}
      >
        <div
          style={{
            maxWidth: '780px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Awareness & Research Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span className="badge badge-primary">
              <BreastCancerRibbon size={14} />
              Oncology Pattern Intelligence
            </span>
            <span className="badge badge-accent">
              <CheckCircle2 size={13} />
              Wisconsin Diagnostic Dataset (WDBC)
            </span>
          </div>

          <h1
            style={{
              fontSize: '2.6rem',
              fontWeight: 800,
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              letterSpacing: '-0.03em',
            }}
          >
            Explore the patterns <span style={{ color: 'var(--color-primary)' }}>behind the data.</span>
          </h1>

          <p
            style={{
              fontSize: '1.08rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '1.75rem',
            }}
          >
            An interactive machine learning platform exploring classification, cellular morphometry relationships,
            and unsupervised clustering in breast tumor biopsy data.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/classification')}
            >
              <Cpu size={18} />
              Explore Classification
              <ArrowRight size={16} />
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => navigate('/patterns')}
            >
              <Network size={18} />
              Explore Patterns
            </button>
          </div>
        </div>

        {/* Ambient background glows */}
        <div
          style={{
            position: 'absolute',
            right: '-50px',
            bottom: '-50px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.16) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </GlassCard>

      {/* Dataset Summary Cards */}
      <div style={{ marginBottom: '0.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Dataset Profile
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Verified baseline metrics from digitized breast cancer cell nucleus biopsies.
        </p>
      </div>

      <div className="metrics-grid">
        <MetricCard
          label="Total Biopsies"
          value={dataset_info.total_records.toLocaleString()}
          context="Verified cell nucleus samples"
          icon={Database}
          variant="default"
        />
        <MetricCard
          label="Computed Features"
          value={dataset_info.feature_count}
          context="10 mean, 10 SE, 10 worst"
          icon={Binary}
          variant="accent"
        />
        <MetricCard
          label="Benign Cases"
          value={dataset_info.benign_count}
          context={`${dataset_info.benign_percentage}% of total cases`}
          icon={ShieldCheck}
          variant="benign"
        />
        <MetricCard
          label="Malignant Cases"
          value={dataset_info.malignant_count}
          context={`${dataset_info.malignant_percentage}% of total cases`}
          icon={AlertTriangle}
          variant="malignant"
        />
      </div>

      {/* Distribution Chart and Workflow */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        {/* Diagnosis Distribution Doughnut */}
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Dataset Distribution</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Target class balance across 569 instances
              </p>
            </div>
            <span className="badge badge-subtle">Ground Truth</span>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DIAGNOSIS_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {DIAGNOSIS_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name, item) => [
                    `${val} cases (${item.payload.percent})`,
                    name,
                  ]}
                  contentStyle={{
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  formatter={(val, entry) => (
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 500 }}>
                      {val}: {entry.payload.value} records ({entry.payload.percent})
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(243, 232, 248, 0.8)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
            }}
          >
            <div>
              <span style={{ color: '#059669', fontWeight: 700 }}>● Benign:</span> 357 (62.7%)
            </div>
            <div>
              <span style={{ color: '#ec4899', fontWeight: 700 }}>● Malignant:</span> 212 (37.3%)
            </div>
          </div>
        </GlassCard>

        {/* Analytical Workflow Pipeline */}
        <GlassCard>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Analytical Workflow Pipeline</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              End-to-end data processing and machine learning pipeline
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {WORKFLOW_STEPS.map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.65)',
                  border: '1px solid rgba(243, 232, 248, 0.8)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--color-primary-dark)',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.2rem 0.45rem',
                    background: 'var(--color-primary-light)',
                    borderRadius: '6px',
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '0.15rem' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Algorithm Overview Section */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
              Evaluated Machine Learning Models
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Supervised classification, unsupervised clustering, and dimensionality reduction models investigated in research.
            </p>
          </div>
          <span className="badge badge-primary">
            Saved API Model: Logistic Regression
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {ALGORITHM_CARDS.map((algo, index) => (
          <GlassCard
            key={index}
            variant={algo.activeModel ? 'highlight' : 'interactive'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.75rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  {algo.type}
                </span>
                <span
                  className={`badge ${
                    algo.activeModel ? 'badge-primary' : 'badge-subtle'
                  }`}
                >
                  {algo.status}
                </span>
              </div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {algo.name}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {algo.description}
              </p>
            </div>

            <div
              style={{
                paddingTop: '0.65rem',
                borderTop: '1px solid rgba(243, 232, 248, 0.8)',
                fontSize: '0.78rem',
                color: 'var(--color-primary-dark)',
              }}
            >
              <strong>Key strength:</strong> {algo.strengths}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
