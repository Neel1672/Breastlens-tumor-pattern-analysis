# BreastLens — Breast Cancer Classification & Tumor Pattern Analysis

[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-1.0-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Scikit--Learn](https://img.shields.io/badge/Scikit--Learn-1.4+-f7931e?logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-pink.svg)](LICENSE)

> **"Explore the patterns behind the data."**  
> An interactive machine learning web application and biomedical research platform exploring supervised classification, feature correlation matrices, K-Means clustering, and 2D Principal Component Analysis (PCA) on the Wisconsin Diagnostic Breast Cancer (WDBC) dataset.

---

> [!WARNING]  
> **Educational & Research Notice:** This application is a scientific demonstration platform. Its predictions are mathematical outputs of trained machine learning classifiers and **must not be used as clinical medical diagnoses or healthcare decisions**.

---

## 🔬 Project Overview

BreastLens bridges machine learning research and modern software engineering. It provides an intuitive, high-performance interface for exploring the dimensional characteristics of digitized breast tumor cell nuclei (biopsy samples) and testing predictive models.

### Key Highlights
* **Interactive Classification Lab:** Input 30 continuous cell contour attributes to receive real-time class predictions and calibrated probability distributions from an active FastAPI backend.
* **Pattern Explorer:** Interactive 2D PCA scatter manifold mapping 30 dimensions to principal components (explaining 63.24% of cumulative variance) with Ground-Truth and K-Means cluster color overlays.
* **Supervised Model Benchmarking:** Empirical performance comparison of three classifiers evaluated in research: **Logistic Regression** (98.25% test accuracy), **Decision Tree** (91.23%), and **Random Forest** (95.61%).
* **Interactive Confusion Matrix:** Transparent breakdown of True Positives, False Positives, True Negatives, and False Negatives on the holdout test set ($n = 114$).
* **Full 30-Feature Data Mining Reference:** Filterable, searchable statistical table displaying means, standard deviations, minima, maxima, and diagnosis-stratified values for all 30 features.
* **Awareness-Inspired Scientific Aesthetic:** Soft rose pink and amethyst purple palette with translucent glass panels, backdrop blur, ambient radial gradients, responsive navigation, and accessible typography.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite 6, JavaScript (ES Modules) |
| **Routing** | React Router v6 |
| **Visualizations** | Recharts (Responsive bar charts, doughnut distributions, PCA scatter plots) |
| **Icons** | Lucide React, Custom Pink Ribbon Awareness SVG |
| **Design System** | Modern CSS with custom variables, Glassmorphism (`backdrop-filter`), Responsive CSS Grid |
| **Backend API** | FastAPI, Uvicorn, Pydantic |
| **Machine Learning** | Scikit-learn (Pipelines, StandardScaler, LogisticRegression, KMeans, PCA), Joblib, Pandas, NumPy |

---

## 📁 Repository Structure

```
breast-cancer-frontend/
├── public/                 # Static assets and favicons
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BreastCancerRibbon.jsx # Awareness pink ribbon vector logo
│   │   ├── CorsHelperModal.jsx    # FastAPI setup & CORS guidance modal
│   │   ├── EmptyState.jsx         # Data placeholder and error state
│   │   ├── GlassCard.jsx          # Translucent frosted glass card wrapper
│   │   ├── LoadingSkeleton.jsx    # Animated loading skeletons
│   │   ├── MetricCard.jsx         # Stat KPI cards with status accents
│   │   ├── PageHeader.jsx         # Uniform page header with breadcrumb badges
│   │   ├── Sidebar.jsx            # Desktop & mobile responsive sidebar
│   │   ├── StatusIndicator.jsx    # Live API health check and ribbon badge
│   │   └── Topbar.jsx             # Sticky navigation bar
│   ├── data/
│   │   ├── analysisData.json      # Verified statistical parameters from the notebook
│   │   └── featureNames.json      # The 30 canonical model feature names
│   ├── pages/
│   │   ├── AboutProject.jsx       # Platform architecture, objectives and disclaimer
│   │   ├── ClassificationLab.jsx # 30-feature interactive inference laboratory
│   │   ├── DatasetInsights.jsx   # 30-feature statistical reference table
│   │   ├── ModelEvaluation.jsx   # 3-model benchmark & confusion matrix
│   │   ├── Overview.jsx          # Landing dashboard & methodology workflow
│   │   └── PatternExplorer.jsx   # 2D PCA & K-Means cluster explorer
│   ├── services/
│   │   └── api.js                # Configurable FastAPI client service
│   ├── styles/
│   │   ├── components.css        # Layout, glass cards, buttons, responsive rules
│   │   ├── global.css            # Ambient lighting, typography, keyframes
│   │   └── variables.css         # Pink & purple palette, shadows, and spacing tokens
│   ├── App.jsx                   # Application root with client-side routing
│   └── main.jsx                  # React 18 DOM mount point
├── .env.example            # Environment configuration template
├── .gitignore              # Production-grade git ignore rules
├── index.html              # HTML5 entry with Plus Jakarta Sans typography
├── package.json            # Dependencies and npm scripts
├── vite.config.js          # Vite build configuration
└── README.md               # Complete project documentation
```

---

## 🚀 Getting Started

Follow these steps to run the complete stack locally.

### 1. Prerequisites
* **Node.js** (v18.0 or newer)
* **Python** (v3.10 or newer)
* **Git**

### 2. Frontend Setup

1. Open a terminal in the `breast-cancer-frontend` directory:
   ```bash
   cd breast-cancer-frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. (Optional) Create your local environment file:
   ```bash
   cp .env.example .env
   ```
   *Default API URL:* `VITE_API_BASE_URL=http://127.0.0.1:8000`
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser at **`http://localhost:5173`**.

---

### 3. Backend Setup

The backend serves the trained Logistic Regression model via FastAPI.

1. Navigate to your backend directory containing `main.py`, `breast_cancer_model.joblib`, and `feature_names.json`:
   ```bash
   cd "<backend-folder>"
   ```
2. Ensure required Python packages are installed:
   ```bash
   pip install fastapi uvicorn scikit-learn pandas joblib pydantic
   ```
3. Start the Uvicorn server:
   ```bash
   python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```
4. Verify the backend is running by visiting:
   * **API Root:** `http://127.0.0.1:8000/`
   * **Interactive Swagger Docs:** `http://127.0.0.1:8000/docs`

---

## 🌐 Enabling CORS in FastAPI (If Blocked)

Modern browsers block cross-origin requests by default if the backend does not return `Access-Control-Allow-Origin` headers.

If your frontend shows an **"API Offline"** or **"CORS policy"** message, add the standard FastAPI CORS middleware to `main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Breast Cancer Classification API",
    # ...
)

# Insert CORS middleware right after creating `app`:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specifically ["http://localhost:5173", "http://127.0.0.1:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Save `main.py`. Uvicorn will automatically reload, and the frontend will instantly detect the active connection.

---

## 📡 API Specification

### Endpoint: Home / Health Check
* **Method:** `GET`
* **Path:** `/`
* **Response:**
  ```json
  {
    "message": "Breast Cancer Classification API is running!",
    "model": "Logistic Regression",
    "required_features": 30,
    "notice": "Educational demonstration only; not a medical diagnosis."
  }
  ```

### Endpoint: Run Inference
* **Method:** `POST`
* **Path:** `/predict`
* **Request Body:**
  ```json
  {
    "features": {
      "mean radius": 14.2,
      "mean texture": 19.3,
      "mean perimeter": 92.0,
      "...": "all 30 features matching feature_names.json"
    }
  }
  ```
* **Response Body:**
  ```json
  {
    "predicted_class": 1,
    "predicted_label": "Benign",
    "class_probabilities": {
      "malignant": 0.0241,
      "benign": 0.9759
    },
    "notice": "Educational demonstration only. This model is not a medical diagnostic tool."
  }
  ```

---

## 📊 Dataset & Model Results Summary

The dataset originates from the **Wisconsin Diagnostic Breast Cancer (WDBC)** repository:
* **Total Instances:** 569
* **Benign Records:** 357 (62.74%)
* **Malignant Records:** 212 (37.26%)
* **Missing Attributes:** 0 across all 30 features
* **Holdout Test Set ($n = 114$):** 42 Malignant, 72 Benign

### Supervised Classification Benchmark

| Model | Test Accuracy | Malignant Precision | Malignant Recall | Malignant F1-Score | Malignant ROC-AUC |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Logistic Regression** (Deployed) | **98.25%** | **97.62%** | **97.62%** | **97.62%** | **0.9954** |
| **Random Forest** | 95.61% | 95.12% | 92.86% | 93.98% | 0.9931 |
| **Decision Tree** | 91.23% | 86.67% | 92.86% | 89.66% | 0.9163 |

### Logistic Regression Holdout Confusion Matrix ($n = 114$)
$$\begin{pmatrix} \text{True Malignant (TP) = 41} & \text{False Benign (FN) = 1} \\ \text{False Malignant (FP) = 1} & \text{True Benign (TN) = 71} \end{pmatrix}$$

* **Total Correct:** 112 / 114 (98.25%)
* **False Negatives:** 1 / 42 (2.38%)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
