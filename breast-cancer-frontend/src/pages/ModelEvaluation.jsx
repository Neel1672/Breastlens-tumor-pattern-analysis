import React, { useState } from 'react';
import {
  BarChart3,
  Award,
  CheckCircle2,
  Crosshair,
  TrendingUp,
  Percent,
  Layers,
  HelpCircle,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import GlassCard from '../components/GlassCard';
import MetricCard from '../components/MetricCard';
import PageHeader from '../components/PageHeader';
import BreastCancerRibbon from '../components/BreastCancerRibbon';
import analysisData from '../data/analysisData.json';

const { model_evaluations } = analysisData;

const METRIC_DEFINITIONS = [
  {
    name: 'Accuracy',
    desc: 'Overall percentage of correct predictions (both benign and malignant) out of all holdout test cases (n = 114).',
    formula: '(TP + TN) / (TP + TN + FP + FN)',
  },
  {
    name: 'Malignant Precision',
    desc: 'Fraction of instances identified as malignant that were genuinely malignant. High precision minimizes false alarms.',
    formula: 'TP / (TP + FP)',
  },
  {
    name: 'Malignant Recall (Sensitivity)',
    desc: 'Fraction of actual malignant biopsies successfully captured by the classifier. Critical in oncology to minimize missed malignant cases.',
    formula: 'TP / (TP + FN)',
  },
  {
    name: 'Malignant F1-Score',
    desc: 'Harmonic mean of precision and recall, balancing false alarms against missed diagnoses.',
    formula: '2 × (Precision × Recall) / (Precision + Recall)',
  },
  {
    name: 'Malignant ROC-AUC',
    desc: 'Area Under Receiver Operating Characteristic Curve. Measures discrimination capability across all classification probability thresholds.',
    formula: 'Integral of True Positive Rate vs False Positive Rate',
  },
];

const COMPARATIVE_CHART_DATA = [
  {
    metric: 'Accuracy',
    'Logistic Regression': (model_evaluations['Logistic Regression'].accuracy * 100).toFixed(2),
    'Decision Tree': (model_evaluations['Decision Tree'].accuracy * 100).toFixed(2),
    'Random Forest': (model_evaluations['Random Forest'].accuracy * 100).toFixed(2),
  },
  {
    metric: 'Precision',
    'Logistic Regression': (model_evaluations['Logistic Regression'].malignant_precision * 100).toFixed(2),
    'Decision Tree': (model_evaluations['Decision Tree'].malignant_precision * 100).toFixed(2),
    'Random Forest': (model_evaluations['Random Forest'].malignant_precision * 100).toFixed(2),
  },
  {
    metric: 'Recall',
    'Logistic Regression': (model_evaluations['Logistic Regression'].malignant_recall * 100).toFixed(2),
    'Decision Tree': (model_evaluations['Decision Tree'].malignant_recall * 100).toFixed(2),
    'Random Forest': (model_evaluations['Random Forest'].malignant_recall * 100).toFixed(2),
  },
  {
    metric: 'F1-Score',
    'Logistic Regression': (model_evaluations['Logistic Regression'].malignant_f1 * 100).toFixed(2),
    'Decision Tree': (model_evaluations['Decision Tree'].malignant_f1 * 100).toFixed(2),
    'Random Forest': (model_evaluations['Random Forest'].malignant_f1 * 100).toFixed(2),
  },
  {
    metric: 'ROC-AUC',
    'Logistic Regression': (model_evaluations['Logistic Regression'].malignant_roc_auc * 100).toFixed(2),
    'Decision Tree': (model_evaluations['Decision Tree'].malignant_roc_auc * 100).toFixed(2),
    'Random Forest': (model_evaluations['Random Forest'].malignant_roc_auc * 100).toFixed(2),
  },
];

export default function ModelEvaluation() {
  const [selectedModel, setSelectedModel] = useState('Logistic Regression');

  const activeModelStats = model_evaluations[selectedModel];
  const cm = activeModelStats.confusion_matrix;

  return (
    <div className="fade-in">
      <PageHeader
        badge={
          <span className="badge badge-primary">
            <BreastCancerRibbon size={14} />
            Supervised Classifier Benchmark
          </span>
        }
        title="Model Evaluation"
        description="Empirical holdout validation results (20% stratified test split, n=114) comparing Logistic Regression, Decision Tree, and Random Forest pipelines trained on breast tumor biopsy data."
      />

      {/* Model Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
        {Object.keys(model_evaluations).map((modelName) => {
          const isSelected = selectedModel === modelName;
          const isDeployed = modelName === 'Logistic Regression';
          return (
            <button
              key={modelName}
              type="button"
              onClick={() => setSelectedModel(modelName)}
              className="glass-card"
              style={{
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--color-primary)' : 'var(--border-card)',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(253,242,248,0.9))'
                  : 'var(--bg-glass-card)',
                boxShadow: isSelected ? 'var(--shadow-md), var(--shadow-glow-pink)' : 'var(--shadow-sm)',
                transition: 'all 0.2s',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: isSelected ? 'var(--color-primary-dark)' : 'var(--text-primary)' }}>
                    {modelName}
                  </span>
                  {isDeployed && <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>Active API</span>}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'left' }}>
                  Test Acc: {(model_evaluations[modelName].accuracy * 100).toFixed(2)}%
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Model Metric Cards */}
      <div className="metrics-grid">
        <MetricCard
          label="Holdout Accuracy"
          value={`${(activeModelStats.accuracy * 100).toFixed(2)}%`}
          context="114 stratified test cases"
          icon={CheckCircle2}
          variant="default"
        />
        <MetricCard
          label="Malignant Precision"
          value={`${(activeModelStats.malignant_precision * 100).toFixed(2)}%`}
          context="Positive predictive value"
          icon={Crosshair}
          variant="accent"
        />
        <MetricCard
          label="Malignant Recall"
          value={`${(activeModelStats.malignant_recall * 100).toFixed(2)}%`}
          context="Sensitivity (41 of 42 caught)"
          icon={ShieldCheck}
          variant="benign"
        />
        <MetricCard
          label="Malignant ROC-AUC"
          value={`${(activeModelStats.malignant_roc_auc * 100).toFixed(2)}%`}
          context="Discriminative power"
          icon={TrendingUp}
          variant="default"
        />
      </div>

      {/* Two Column Layout: Comparative Bar Chart on Left, Confusion Matrix on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.3fr) minmax(320px, 1fr)',
          gap: '1.75rem',
          marginBottom: '2rem',
          alignItems: 'start',
        }}
      >
        {/* Comparative Chart */}
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem' }}>
                Three-Model Performance Comparison
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Side-by-side evaluation metrics across holdout test set (Percentages %)
              </p>
            </div>
            <span className="badge badge-subtle">Holdout Test Set</span>
          </div>

          <div style={{ width: '100%', height: '340px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={COMPARATIVE_CHART_DATA}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1e6f7" vertical={false} />
                <XAxis dataKey="metric" tick={{ fill: '#4a4058', fontSize: 12 }} />
                <YAxis domain={[80, 100]} tick={{ fill: '#4a4058', fontSize: 11 }} />
                <Tooltip
                  formatter={(val, name) => [`${val}%`, name]}
                  contentStyle={{
                    borderRadius: '10px',
                    border: '1px solid #d8b4e2',
                    background: 'rgba(255,255,255,0.96)',
                  }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '15px' }} />
                <Bar dataKey="Logistic Regression" fill="#ec4899" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Decision Tree" fill="#9d8fae" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Random Forest" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(253, 242, 248, 0.7)',
              border: '1px solid rgba(244, 215, 238, 0.8)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              marginTop: '0.75rem',
            }}
          >
            <strong>Selection Rationale:</strong> <em>Logistic Regression</em> achieved the top holdout
            accuracy (98.25%) and ROC-AUC (0.9954) with a standardized pipeline, motivating its deployment
            in the production FastAPI service.
          </div>
        </GlassCard>

        {/* Confusion Matrix Visualizer */}
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem' }}>
                Confusion Matrix
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {selectedModel} on holdout set (n = 114)
              </p>
            </div>
            <span className="badge badge-primary">{selectedModel}</span>
          </div>

          {/* 2x2 Matrix */}
          <div style={{ margin: '1rem 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: '8px', textAlign: 'center' }}>
              {/* Header row */}
              <div />
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Predicted Malignant
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Predicted Benign
              </div>

              {/* Actual Malignant row */}
              <div
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Actual Malignant
              </div>

              {/* TP Cell */}
              <div className="cm-cell tp">
                <div>{cm.true_malignant}</div>
                <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#be123c', marginTop: '2px' }}>
                  True Malignant (TP)
                </div>
              </div>

              {/* FN Cell */}
              <div className="cm-cell fn">
                <div>{cm.false_benign}</div>
                <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '2px' }}>
                  False Benign (FN)
                </div>
              </div>

              {/* Actual Benign row */}
              <div
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Actual Benign
              </div>

              {/* FP Cell */}
              <div className="cm-cell fp">
                <div>{cm.false_malignant}</div>
                <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '2px' }}>
                  False Malignant (FP)
                </div>
              </div>

              {/* TN Cell */}
              <div className="cm-cell tn">
                <div>{cm.true_benign}</div>
                <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#047857', marginTop: '2px' }}>
                  True Benign (TN)
                </div>
              </div>
            </div>
          </div>

          {/* Matrix stats summary */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              padding: '0.85rem',
              background: 'rgba(255, 255, 255, 0.75)',
              borderRadius: '8px',
              border: '1px solid #f1e6f7',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Test Samples:</span>
              <strong>114 cases</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Correct Classifications:</span>
              <strong style={{ color: '#047857' }}>
                {cm.true_malignant + cm.true_benign} of 114
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Misclassifications:</span>
              <strong style={{ color: '#be123c' }}>
                {cm.false_malignant + cm.false_benign} of 114
              </strong>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Metric Definitions Guide */}
      <GlassCard>
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem' }}>
            Understanding the Evaluation Metrics
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Mathematical definitions and clinical relevance in cancer classification
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {METRIC_DEFINITIONS.map((def, idx) => (
            <div
              key={idx}
              style={{
                padding: '1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.75)',
                border: '1px solid #f1e6f7',
              }}
            >
              <h4 style={{ fontSize: '0.95rem', color: 'var(--color-primary-dark)', marginBottom: '0.35rem' }}>
                {def.name}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                {def.desc}
              </p>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  background: 'rgba(248, 240, 252, 0.9)',
                  padding: '0.3rem 0.5rem',
                  borderRadius: '4px',
                }}
              >
                Formula: {def.formula}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
