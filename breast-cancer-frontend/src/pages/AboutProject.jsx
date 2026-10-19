import React from 'react';
import {
  Info,
  ShieldAlert,
  Layers,
  Code2,
  Server,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  GitBranch,
  FileCode,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import PageHeader from '../components/PageHeader';
import BreastCancerRibbon from '../components/BreastCancerRibbon';

export default function AboutProject({ onOpenCorsModal }) {
  return (
    <div className="fade-in">
      <PageHeader
        badge={
          <span className="badge badge-primary">
            <BreastCancerRibbon size={14} />
            Oncology Machine Learning Platform
          </span>
        }
        title="About the Project"
        description="Comprehensive technical documentation for the Breast Cancer Classification and Tumor Pattern Analysis platform."
      />

      {/* Prominent Scientific Disclaimer Banner */}
      <div
        className="alert-banner warning"
        style={{
          padding: '1.25rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
        }}
      >
        <ShieldAlert size={26} style={{ color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ color: '#92400e', fontSize: '1.05rem', marginBottom: '0.35rem' }}>
            Machine Learning Research Disclaimer
          </h4>
          <p style={{ color: '#78350f', fontSize: '0.9rem', lineHeight: 1.6 }}>
            <strong>This application is an educational and research demonstration.</strong> Its predictions are algorithmic
            outputs and not medical diagnoses, and the model has not been established as suitable for clinical use. No medical
            decisions or treatment choices should be based upon the outputs of this software.
          </p>
        </div>
      </div>

      {/* Project Metadata Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <Layers size={20} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '1.15rem' }}>Platform & Scope</h3>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Domain:</strong> Biomedical Data Science & Oncology Machine Learning
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Platform:</strong> BreastLens Diagnostic Pattern Intelligence
            </p>
            <p>
              <strong>Dataset:</strong> Wisconsin Diagnostic Breast Cancer (WDBC), 569 instances, 30 continuous features.
            </p>
          </div>
        </GlassCard>

        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <Code2 size={20} style={{ color: 'var(--color-accent)' }} />
            <h3 style={{ fontSize: '1.15rem' }}>Architecture & Stack</h3>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Frontend:</strong> React 18, Vite, React Router, Recharts, Lucide Icons, Glassmorphism CSS.
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Backend:</strong> FastAPI, Uvicorn, Scikit-learn, Pandas, Joblib.
            </p>
            <p>
              <strong>Protocol:</strong> RESTful JSON API via <code>POST /predict</code> and <code>GET /</code>.
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Core Objectives */}
      <GlassCard style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={20} style={{ color: 'var(--color-primary)' }} />
          Core Technical Objectives
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            {
              title: '1. Tabular Biopsy Feature Modeling',
              desc: 'Acquiring, inspecting, and standardizing 569 patient biopsy samples with 30 continuous nuclear geometry attributes.',
            },
            {
              title: '2. Exploratory Data Analysis & Mining',
              desc: 'Performing distribution analysis, cross-correlations, and feature ranking to identify the highest predictive dimensions.',
            },
            {
              title: '3. Supervised Model Comparison',
              desc: 'Training and evaluating Logistic Regression, Decision Tree, and Random Forest pipelines under an 80/20 stratified split.',
            },
            {
              title: '4. Rigorous Model Evaluation',
              desc: 'Analyzing confusion matrices, sensitivity (recall), specificity, F1-scores, and ROC-AUC curves on holdout data.',
            },
            {
              title: '5. Unsupervised Clustering',
              desc: 'Deploying K-Means clustering (k=2) to examine natural geometrical separations and silhouette validation.',
            },
            {
              title: '6. Dimensionality Reduction (PCA)',
              desc: 'Projecting 30 continuous dimensions to a 2D principal plane capturing 63.24% of cumulative variance.',
            },
            {
              title: '7. Production-Ready Deployment',
              desc: 'Packaging the pipeline via FastAPI REST endpoints and presenting an interactive scientific frontend dashboard.',
            },
          ].map((obj, i) => (
            <div
              key={i}
              style={{
                padding: '1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.75)',
                border: '1px solid #f1e6f7',
              }}
            >
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                {obj.title}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {obj.desc}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Limitations and Future Improvements */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <AlertTriangle size={18} style={{ color: '#d97706' }} />
            <h3 style={{ fontSize: '1.15rem' }}>Known Limitations</h3>
          </div>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <li><strong>Dataset Scale:</strong> 569 instances is a modest sample size that may not capture rare histological variants.</li>
            <li><strong>Single Center:</strong> Collected from a single clinical source (University of Wisconsin), which can introduce geographic or institutional bias.</li>
            <li><strong>Single Model Active in API:</strong> The current deployed API exposes Logistic Regression; Decision Tree and Random Forest remain in research evaluation.</li>
            <li><strong>Tabular Contours:</strong> Uses pre-extracted nuclear contours rather than raw histological whole-slide images (WSI).</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Lightbulb size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '1.15rem' }}>Future Scope & Extensions</h3>
          </div>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <li><strong>Dynamic Model Switching:</strong> Extend FastAPI to allow users to dynamically choose between Logistic Regression, Random Forest, or XGBoost.</li>
            <li><strong>SHAP / LIME Interpretability:</strong> Implement feature attribution waterfalls to explain individual patient predictions visually.</li>
            <li><strong>Computer Vision Integration:</strong> Ingest digitized cell images directly through a Vision Transformer (ViT) or Convolutional Neural Network.</li>
            <li><strong>Containerized Cloud Deployment:</strong> Package both frontend and backend in a multi-container Docker Compose setup for one-click cloud hosting.</li>
          </ul>
        </GlassCard>
      </div>

      {/* Backend Integration Shortcut Card */}
      <GlassCard style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>FastAPI Connection & CORS Setup</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Need to test or troubleshoot the live prediction connection?
            </p>
          </div>
          <button className="btn btn-secondary" onClick={onOpenCorsModal}>
            <Server size={16} />
            View Server Configuration
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
