import React, { useState, useEffect } from 'react';
import {
  Microscope,
  Send,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Server,
  Terminal,
  Activity,
  ShieldAlert,
  Percent,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import PageHeader from '../components/PageHeader';
import BreastCancerRibbon from '../components/BreastCancerRibbon';
import { predictBreastCancer, checkBackendHealth, API_BASE_URL } from '../services/api';
import featureNames from '../data/featureNames.json';
import analysisData from '../data/analysisData.json';

const { presets, features_summary } = analysisData;

// Create a lookup for feature defaults, mins, maxs, and units/hints
const FEATURE_META = {};
features_summary.forEach((f) => {
  FEATURE_META[f.name] = {
    mean: f.mean,
    min: f.min,
    max: f.max,
    benign_mean: f.benign_mean,
    malignant_mean: f.malignant_mean,
  };
});

// Group the 30 features into the 3 explicit categories
const MEAN_FEATURES = featureNames.filter((name) => name.startsWith('mean '));
const SE_FEATURES = featureNames.filter((name) => name.endsWith(' error'));
const WORST_FEATURES = featureNames.filter((name) => name.startsWith('worst '));

export default function ClassificationLab({ onOpenCorsModal }) {
  // Form values state initialized with benign sample by default for instant exploration
  const [formValues, setFormValues] = useState(() => ({
    ...presets.benign_sample,
  }));

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [backendStatus, setBackendStatus] = useState({ checked: false, online: false });

  // Initial check on mount
  useEffect(() => {
    let isMounted = true;
    checkBackendHealth().then((res) => {
      if (isMounted) {
        setBackendStatus({ checked: true, online: res.online });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (featureName, value) => {
    setFormValues((prev) => ({
      ...prev,
      [featureName]: value,
    }));

    // Clear specific error
    if (errors[featureName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[featureName];
        return next;
      });
    }
  };

  const loadPreset = (presetKey) => {
    if (presets[presetKey]) {
      setFormValues({ ...presets[presetKey] });
      setErrors({});
      setApiError(null);
    }
  };

  const handleReset = () => {
    const blank = {};
    featureNames.forEach((name) => {
      blank[name] = '';
    });
    setFormValues(blank);
    setErrors({});
    setPredictionResult(null);
    setApiError(null);
  };

  const validateForm = () => {
    const newErrors = {};
    let hasError = false;

    featureNames.forEach((name) => {
      const val = formValues[name];
      if (val === '' || val === undefined || val === null || isNaN(Number(val))) {
        newErrors[name] = 'Required numeric value';
        hasError = true;
      } else if (Number(val) < 0) {
        newErrors[name] = 'Must be non-negative';
        hasError = true;
      }
    });

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      setApiError('Please fill in all 30 features with valid numeric values before classification.');
      return;
    }

    // Prepare payload with numerical conversion
    const payloadFeatures = {};
    featureNames.forEach((name) => {
      payloadFeatures[name] = parseFloat(formValues[name]);
    });

    setIsLoading(true);
    setPredictionResult(null);

    const result = await predictBreastCancer(payloadFeatures);
    setIsLoading(false);

    if (result.success) {
      setPredictionResult(result.data);
      setBackendStatus({ checked: true, online: true });
    } else {
      setApiError(result.error);
      if (result.isCors || result.error.includes('Could not reach')) {
        setBackendStatus({ checked: true, online: false });
      }
    }
  };

  return (
    <div className="fade-in">
      <PageHeader
        badge={
          <span className="badge badge-primary">
            <BreastCancerRibbon size={14} />
            Diagnostic Inference Engine
          </span>
        }
        title="Classification Lab"
        description="Interact with the trained Logistic Regression pipeline. Provide 30 continuous cell nucleus measurements or load verified test cases to compute class probabilities via the FastAPI inference engine."
      />

      {/* Preset Action Bar */}
      <GlassCard style={{ marginBottom: '1.75rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={16} style={{ color: 'var(--color-primary)' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Quick Presets:
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => loadPreset('benign_sample')}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#059669' }} />
              Load Benign Sample
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => loadPreset('malignant_sample')}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ec4899' }} />
              Load Malignant Sample
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => loadPreset('average_sample')}
            >
              Dataset Average
            </button>

            <button
              type="button"
              className="btn btn-sm"
              onClick={handleReset}
              style={{
                color: 'var(--text-muted)',
                background: 'rgba(248, 240, 252, 0.8)',
                border: '1px solid #d8b4e2',
              }}
            >
              <RotateCcw size={13} />
              Reset All
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Two Column Layout: Left Form (30 Features in 3 Sections), Right Live Prediction Panel */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(320px, 400px)',
          gap: '1.75rem',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Form */}
        <form onSubmit={handleSubmit}>
          {/* Section 1: Mean Features */}
          <GlassCard style={{ marginBottom: '1.5rem' }}>
            <div className="form-section-header" style={{ marginTop: 0 }}>
              <div className="form-section-title">
                <span className="badge badge-primary">1</span>
                Mean Features (10)
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Average values of cell nucleus contours
              </span>
            </div>

            <div className="feature-grid">
              {MEAN_FEATURES.map((name) => (
                <FeatureInputField
                  key={name}
                  name={name}
                  value={formValues[name]}
                  error={errors[name]}
                  meta={FEATURE_META[name]}
                  onChange={handleInputChange}
                />
              ))}
            </div>
          </GlassCard>

          {/* Section 2: Standard Error Features */}
          <GlassCard style={{ marginBottom: '1.5rem' }}>
            <div className="form-section-header" style={{ marginTop: 0 }}>
              <div className="form-section-title">
                <span className="badge badge-accent">2</span>
                Standard Error Features (10)
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Standard error of cell contours
              </span>
            </div>

            <div className="feature-grid">
              {SE_FEATURES.map((name) => (
                <FeatureInputField
                  key={name}
                  name={name}
                  value={formValues[name]}
                  error={errors[name]}
                  meta={FEATURE_META[name]}
                  onChange={handleInputChange}
                />
              ))}
            </div>
          </GlassCard>

          {/* Section 3: Worst Features */}
          <GlassCard style={{ marginBottom: '1.75rem' }}>
            <div className="form-section-header" style={{ marginTop: 0 }}>
              <div className="form-section-title">
                <span className="badge badge-warning">3</span>
                Worst / Largest Features (10)
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Mean of the three largest measurements
              </span>
            </div>

            <div className="feature-grid">
              {WORST_FEATURES.map((name) => (
                <FeatureInputField
                  key={name}
                  name={name}
                  value={formValues[name]}
                  error={errors[name]}
                  meta={FEATURE_META[name]}
                  onChange={handleInputChange}
                />
              ))}
            </div>
          </GlassCard>

          {/* Action Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              padding: '1.25rem',
              background: 'rgba(255, 255, 255, 0.85)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-card)',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              All 30 input parameters will be passed to <code>{API_BASE_URL}/predict</code>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
                disabled={isLoading}
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
                style={{ minWidth: '180px' }}
              >
                {isLoading ? (
                  <>
                    <Activity size={16} className="pulse-dot" />
                    Computing...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Run Classification
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Right Column: Prediction Results Panel */}
        <div style={{ position: 'sticky', top: '5.5rem' }}>
          {/* Main Result Card */}
          <GlassCard
            variant={
              predictionResult
                ? predictionResult.predicted_label === 'Benign'
                  ? 'benign'
                  : 'malignant'
                : 'default'
            }
            style={{
              padding: '1.75rem',
              marginBottom: '1.25rem',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(243, 232, 248, 0.8)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={18} style={{ color: 'var(--color-primary)' }} />
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Model Prediction</h3>
              </div>
              <span className="badge badge-subtle">FastAPI Live</span>
            </div>

            {isLoading && (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '3px solid rgba(236, 72, 153, 0.2)',
                    borderTopColor: 'var(--color-primary)',
                    animation: 'spin 1s infinite linear',
                    margin: '0 auto 1rem',
                  }}
                />
                <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
                  Processing Vector...
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Evaluating 30 continuous features through Logistic Regression Pipeline
                </p>
              </div>
            )}

            {!isLoading && predictionResult && (
              <div className="fade-in">
                {/* Classification Decision */}
                <div
                  style={{
                    textAlign: 'center',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background:
                      predictionResult.predicted_label === 'Benign'
                        ? 'rgba(5, 150, 105, 0.1)'
                        : 'rgba(236, 72, 153, 0.12)',
                    border: `1.5px solid ${
                      predictionResult.predicted_label === 'Benign'
                        ? 'var(--color-benign-border)'
                        : 'var(--color-malignant-border)'
                    }`,
                    marginBottom: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Predicted Classification Class
                  </span>
                  <div
                    style={{
                      fontSize: '2rem',
                      fontWeight: 800,
                      color:
                        predictionResult.predicted_label === 'Benign'
                          ? '#047857'
                          : '#be185d',
                      margin: '0.25rem 0',
                    }}
                  >
                    {predictionResult.predicted_label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Encoded Class ID: <strong>{predictionResult.predicted_class}</strong>{' '}
                    ({predictionResult.predicted_class === 0 ? 'Malignant' : 'Benign'})
                  </div>
                </div>

                {/* Probability Gauges */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    Class Probabilities (Softmax/Sigmoid Output)
                  </h4>

                  {/* Benign Bar */}
                  <div style={{ marginBottom: '0.85rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.82rem',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#047857' }}>Benign Probability:</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {(predictionResult.class_probabilities.benign * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: '10px',
                        borderRadius: '9999px',
                        background: '#e2e8f0',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${predictionResult.class_probabilities.benign * 100}%`,
                          background: 'linear-gradient(90deg, #10b981, #059669)',
                          borderRadius: '9999px',
                          transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Malignant Bar */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.82rem',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#be185d' }}>Malignant Probability:</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {(predictionResult.class_probabilities.malignant * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: '10px',
                        borderRadius: '9999px',
                        background: '#e2e8f0',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${predictionResult.class_probabilities.malignant * 100}%`,
                          background: 'linear-gradient(90deg, #f472b6, #ec4899, #be185d)',
                          borderRadius: '9999px',
                          transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Inference Notice from Backend */}
                <div
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(253, 242, 248, 0.85)',
                    border: '1px solid rgba(244, 215, 238, 0.8)',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.4,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                    <ShieldAlert size={13} />
                    <span>Inference Advisory</span>
                  </div>
                  {predictionResult.notice}
                </div>
              </div>
            )}

            {!isLoading && !predictionResult && !apiError && (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <Microscope
                  size={42}
                  style={{ color: '#c084fc', margin: '0 auto 0.75rem', display: 'block' }}
                />
                <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Awaiting Input
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Click <strong>Run Classification</strong> to submit the 30 continuous features to the backend model.
                </p>
              </div>
            )}

            {/* Error or Backend Offline State */}
            {!isLoading && apiError && (
              <div className="fade-in">
                <div
                  className="alert-banner error"
                  style={{ marginBottom: '1rem' }}
                >
                  <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Prediction Failed</strong>
                    <p style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: '#7f1d1d' }}>
                      {apiError}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    fontSize: '0.8rem',
                  }}
                >
                  <p style={{ fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    Troubleshooting Steps:
                  </p>
                  <ol style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <li>Ensure FastAPI is running: <code>python -m uvicorn main:app --reload</code></li>
                    <li>Verify port 8000 is open at <code>http://127.0.0.1:8000</code></li>
                    <li>If blocked by CORS, click the button below to view the minimal middleware fix.</li>
                  </ol>

                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={onOpenCorsModal}
                    style={{ marginTop: '0.75rem', width: '100%' }}
                  >
                    <Server size={14} />
                    View Backend & CORS Instructions
                  </button>
                </div>
              </div>
            )}
          </GlassCard>

          {/* Research Disclaimer Card */}
          <GlassCard style={{ padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.82rem' }}>
              <ShieldAlert size={14} style={{ color: 'var(--color-primary)' }} />
              <span>Scientific Disclaimer</span>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              This classifier is a machine learning demonstration of supervised learning on the WDBC dataset.
              Probabilities reflect logistic sigmoid scores, not biopsy certainty. Do not use for health diagnostics.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

// Subcomponent for each feature input field
function FeatureInputField({ name, value, error, meta, onChange }) {
  const labelClean = name.replace(/_/g, ' ');

  return (
    <div className={`feature-field ${error ? 'has-error' : ''}`}>
      <div className="feature-label-row">
        <label className="feature-label" title={labelClean}>
          {labelClean}
        </label>
        {meta && (
          <span className="feature-bench-hint" title={`Dataset Mean: ${meta.mean}`}>
            μ {meta.mean}
          </span>
        )}
      </div>

      <input
        type="number"
        step="any"
        className="feature-input"
        value={value === undefined ? '' : value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={meta ? `${meta.mean}` : '0.0'}
        aria-label={labelClean}
      />

      {error && <span className="feature-error-text">{error}</span>}
    </div>
  );
}
