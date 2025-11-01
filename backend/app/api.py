# VERA AI - SPRINT 3, TASK 3.3: FULL API INTEGRATION
# This script integrates the AI analysis and ZK simulation into the FastAPI endpoint.

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware # Import CORS middleware
import uvicorn
import traceback
from datetime import datetime
import pandas as pd
import json

# --- Import our custom modules ---
# We import the enhanced functions from the updated main module.
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from main import perform_asset_analysis
from zk_proof_simulator import generate_mock_zk_proof

# --- Project Information ---
DESCRIPTION = """
Vera AI: The AI-Powered Risk Oracle for Real-World Assets. 🛡️

This API provides real-time risk analysis for tokenized real-world assets.
You can request an analysis for a specific asset token ID, and Vera AI will
perform a deep analysis of off-chain data to provide a risk assessment and a
verifiable proof hash.
"""

# --- Initialize the FastAPI App ---
app = FastAPI(
    title="Vera AI Oracle",
    description=DESCRIPTION,
    version="1.0.0", # Version bump to 1.0.0 for our first complete version
    contact={
        "name": "Vera AI Development Team",
        "email": "dev@vera-ai.example.com",
    },
)

# --- Add CORS Middleware ---
# This is crucial for allowing your frontend developer to call this API
# from a web browser hosted on a different domain (e.g., localhost:3000).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


# ========================================
# --- API Endpoints ---
# ========================================

# --- Endpoint 1: Root / Status Check ---
@app.get("/", tags=["Status"])
async def root():
    """
    Root endpoint to check the status of the API.
    Returns a welcome message confirming the server is running.
    """
    print("[API] Status check endpoint was hit.")
    return {"message": "Welcome to the Vera AI Oracle. The API is running."}

# --- Health Check Endpoint for Render ---
@app.get("/health", tags=["Status"])
async def health_check():
    """
    Health check endpoint for deployment platforms like Render.
    """
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat() + "Z"}

# --- API Info Endpoint ---
@app.get("/api/info", tags=["Status"])
async def api_info():
    """
    Returns API information for frontend integration.
    """
    return {
        "name": "Vera AI Oracle",
        "version": "1.0.0",
        "description": "AI-Powered Risk Oracle for Real-World Assets",
        "endpoints": {
            "analyze": "/analyze/{token_id}",
            "health": "/health",
            "docs": "/docs"
        }
    }


# --- Endpoint 2: The Main Analysis Endpoint (NOW FULLY IMPLEMENTED) ---
@app.get("/analyze/{token_id}", tags=["Analysis"])
async def analyze_asset(token_id: str):
    """
    Triggers the enhanced VERA-AI risk analysis for a given asset token ID.
    
    This process involves:
    1. MongoDB/Fallback Data Ingestion
    2. Enhanced AI Analysis with Realistic Risk Scoring
    3. Comprehensive Evidence Summary
    4. ZK-Proof Simulation
    
    Returns detailed risk assessment with scores from 15-95 based on risk category.
    """
    print(f"[API] Received enhanced analysis request for token_id: {token_id}")
    
    try:
        # Use the enhanced perform_asset_analysis function
        analysis_result = perform_asset_analysis(token_id)
        
        # Handle different analysis statuses
        if analysis_result.get("status") == "Success":
            # Generate ZK-proof for successful analysis
            mock_proof = generate_mock_zk_proof(analysis_result)
            
            # Create enhanced API response
            final_response = {
                "token_id": token_id,
                "status": "Success",
                "analysis_report": analysis_result,
                "onchain_proof_simulation": mock_proof,
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "api_version": "2.0_enhanced"
            }
            
            # Log enhanced details
            risk_score = analysis_result.get("risk_score", "N/A")
            risk_category = analysis_result.get("risk_assessment", {}).get("risk_category", "N/A")
            data_source = analysis_result.get("risk_assessment", {}).get("data_source", "unknown")
            
            print(f"[API] ✅ Enhanced analysis completed for {token_id}")
            print(f"[API] Risk Score: {risk_score}/100, Category: {risk_category}")
            print(f"[API] Data Source: {data_source}")
            
            return final_response
            
        elif analysis_result.get("status") == "Not Found":
            raise HTTPException(
                status_code=404, 
                detail=f"Asset token '{token_id}' not found in system"
            )
            
        else:
            # Partial success or failure
            error_details = analysis_result.get("details", "Analysis failed")
            print(f"[API] ⚠️ Analysis issue for {token_id}: {error_details}")
            
            raise HTTPException(
                status_code=500,
                detail=f"Analysis failed: {error_details}"
            )
            
    except HTTPException as http_exc:
        # Re-raise HTTP exceptions
        raise http_exc
        
    except Exception as e:
        print(f"[API] ❌ CRITICAL ERROR in enhanced /analyze endpoint: {e}")
        traceback.print_exc()
        raise HTTPException(
            status_code=500, 
            detail=f"Internal server error during enhanced analysis: {str(e)}"
        )


# ========================================
# --- Main Execution Block ---
# ========================================
if __name__ == "__main__":
    print("--- Starting Vera AI Server ---")
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
