import React from 'react';
import { X, Server, Terminal, CheckCircle2, Copy } from 'lucide-react';
import GlassCard from './GlassCard';

export default function CorsHelperModal({ isOpen, onClose, isOnline, backendInfo }) {
  if (!isOpen) return null;

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
  };

  const corsCodeSnippet = `from fastapi.middleware.cors import CORSMiddleware

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:5173", "http://127.0.0.1:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(6px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '620px',
        }}
      >
        <GlassCard
          className="fade-in"
          style={{
            background: 'rgba(255, 255, 255, 0.96)',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Server size={22} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>FastAPI Backend Integration</h3>
            </div>
            <button
              onClick={onClose}
              style={{
                color: 'var(--text-muted)',
                padding: '0.3rem',
                borderRadius: '6px',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Connection status banner */}
          <div
            className={`alert-banner ${isOnline ? 'info' : 'warning'}`}
            style={{ marginBottom: '1.25rem' }}
          >
            {isOnline ? (
              <div>
                <strong>Backend Online!</strong> Connected to{' '}
                <code>http://127.0.0.1:8000</code>. Model: {backendInfo?.model || 'Logistic Regression'}.
              </div>
            ) : (
              <div>
                <strong>Backend is currently unreachable.</strong> The frontend makes direct POST requests to{' '}
                <code>http://127.0.0.1:8000/predict</code>. Follow the steps below to run or configure it.
              </div>
            )}
          </div>

          {/* Step 1: Run backend */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Terminal size={17} style={{ color: 'var(--color-primary)' }} />
              Step 1: Start the FastAPI Server
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Navigate to your backend directory containing <code>main.py</code> and run:
            </p>
            <div
              style={{
                background: '#0f172a',
                color: '#38bdf8',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <code>python -m uvicorn main:app --reload</code>
              <button
                onClick={() => copyCode('python -m uvicorn main:app --reload')}
                title="Copy command"
                style={{ color: '#94a3b8' }}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          {/* Step 2: Enable CORS if needed */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <CheckCircle2 size={17} style={{ color: 'var(--color-accent)' }} />
              Step 2: CORS Middleware Setup (if requests are blocked)
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Browsers restrict cross-origin requests by default. In <code>main.py</code>, right after{' '}
              <code>app = FastAPI(...)</code>, insert:
            </p>
            <div
              style={{
                position: 'relative',
                background: '#0f172a',
                color: '#f8fafc',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                lineHeight: 1.5,
                overflowX: 'auto',
              }}
            >
              <pre>{corsCodeSnippet}</pre>
              <button
                onClick={() => copyCode(corsCodeSnippet)}
                title="Copy CORS Snippet"
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  color: '#94a3b8',
                }}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button className="btn btn-primary btn-sm" onClick={onClose}>
              Done
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
