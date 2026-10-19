/**
 * BreastLens API Client
 * Connects the frontend to the FastAPI machine learning backend.
 */

const CONFIGURED_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

// Target URLs to attempt (configured direct URL first, then Vite /api proxy fallback)
const CANDIDATE_URLS = [
  CONFIGURED_URL,
  '/api',
  'http://localhost:8000',
];

let workingBaseUrl = null;

async function resolveBaseUrl() {
  if (workingBaseUrl) return workingBaseUrl;

  for (const candidate of CANDIDATE_URLS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${candidate}/`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        workingBaseUrl = candidate;
        return candidate;
      }
    } catch {
      // Continue to next candidate
    }
  }

  return CONFIGURED_URL;
}

/**
 * Checks the status and metadata of the FastAPI backend.
 * @returns {Promise<{ online: boolean, data?: object, error?: string }>}
 */
export async function checkBackendHealth() {
  try {
    const baseUrl = await resolveBaseUrl();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`${baseUrl}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        online: false,
        error: `Server responded with status ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    workingBaseUrl = baseUrl;
    return {
      online: true,
      data,
    };
  } catch (err) {
    // If workingBaseUrl failed, reset and try other candidates once
    workingBaseUrl = null;
    let errorMessage = err.message || 'Unable to connect to backend';
    let isCors = false;

    if (err.name === 'AbortError') {
      errorMessage = 'Backend health check timed out (4s). Is uvicorn running?';
    } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      errorMessage = 'Connection refused or blocked by CORS policy. Ensure FastAPI server is running with CORS enabled.';
      isCors = true;
    }

    return {
      online: false,
      error: errorMessage,
      isCors,
    };
  }
}

/**
 * Sends 30 feature values to the FastAPI /predict endpoint.
 * @param {Record<string, number>} features 
 * @returns {Promise<{ success: boolean, data?: object, error?: string, details?: any }>}
 */
export async function predictBreastCancer(features) {
  const urlsToTry = workingBaseUrl 
    ? [workingBaseUrl, ...CANDIDATE_URLS.filter((u) => u !== workingBaseUrl)]
    : CANDIDATE_URLS;

  let lastError = null;
  let lastDetails = null;

  for (const baseUrl of urlsToTry) {
    try {
      const response = await fetch(`${baseUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ features }),
      });

      if (!response.ok) {
        let errorDetails = null;
        try {
          errorDetails = await response.json();
        } catch {
          // Ignored
        }

        const message = errorDetails?.detail 
          ? (typeof errorDetails.detail === 'string' ? errorDetails.detail : JSON.stringify(errorDetails.detail))
          : `API request failed with HTTP ${response.status} (${response.statusText})`;

        lastError = message;
        lastDetails = errorDetails;
        continue;
      }

      const data = await response.json();

      // Verify schema from main.py
      if (typeof data.predicted_class === 'undefined' || !data.class_probabilities) {
        return {
          success: false,
          error: 'Unexpected response schema received from backend prediction service.',
          data,
        };
      }

      workingBaseUrl = baseUrl;
      return {
        success: true,
        data,
      };
    } catch (err) {
      lastError = err.message || 'Network error occurred while contacting the prediction API.';
    }
  }

  let isCors = false;
  if (lastError && lastError.includes('Failed to fetch')) {
    lastError = 'Could not reach http://127.0.0.1:8000. Ensure the FastAPI backend is running and CORS headers are configured.';
    isCors = true;
  }

  return {
    success: false,
    error: lastError,
    details: lastDetails,
    isCors,
  };
}

export const API_BASE_URL = CONFIGURED_URL;
