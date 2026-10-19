import json
import joblib
import pandas as pd

from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# --------------------------------------------------
# 1. Load the trained model and feature names
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "breast_cancer_model.joblib"
FEATURES_PATH = BASE_DIR / "feature_names.json"

model = joblib.load(MODEL_PATH)

with open(FEATURES_PATH, "r") as file:
    feature_names = json.load(file)


# --------------------------------------------------
# 2. Create the FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="Breast Cancer Classification API",
    description=(
        "Educational machine learning project for "
        "breast cancer classification and tumor pattern analysis."
    ),
    version="1.0.0"
)

# Enable Cross-Origin Resource Sharing (CORS) for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# 3. Define the input format
# --------------------------------------------------

class PredictionRequest(BaseModel):
    features: dict[str, float] = Field(
        ...,
        description="Dictionary containing all 30 model input features."
    )


# --------------------------------------------------
# 4. Home endpoint
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Breast Cancer Classification API is running!",
        "model": "Logistic Regression",
        "required_features": len(feature_names),
        "notice": "Educational demonstration only; not a medical diagnosis."
    }


# --------------------------------------------------
# 5. Prediction endpoint
# --------------------------------------------------

@app.post("/predict")
def predict(request: PredictionRequest):

    # Check for missing or unexpected features
    missing_features = [
        name for name in feature_names
        if name not in request.features
    ]

    unexpected_features = [
        name for name in request.features
        if name not in feature_names
    ]

    if missing_features or unexpected_features:
        raise HTTPException(
            status_code=400,
            detail={
                "missing_features": missing_features,
                "unexpected_features": unexpected_features
            }
        )

    # Arrange values in the exact order expected by the model
    input_values = [
        request.features[name]
        for name in feature_names
    ]

    input_df = pd.DataFrame(
        [input_values],
        columns=feature_names
    )

    # Generate the prediction
    prediction = int(model.predict(input_df)[0])

    # Obtain the model's class probabilities
    probabilities = model.predict_proba(input_df)[0]

    probability_by_class = {
        int(class_label): float(probability)
        for class_label, probability
        in zip(model.classes_, probabilities)
    }

    # Dataset encoding: 0 = Malignant, 1 = Benign
    diagnosis_map = {
        0: "Malignant",
        1: "Benign"
    }

    return {
        "predicted_class": prediction,
        "predicted_label": diagnosis_map[prediction],
        "class_probabilities": {
            "malignant": probability_by_class[0],
            "benign": probability_by_class[1]
        },
        "notice": (
            "Educational demonstration only. "
            "This model is not a medical diagnostic tool."
        )
    }