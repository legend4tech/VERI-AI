# =================================================================
# Vira Engine - Main Application Module
# =================================================================
# This is the core module of the Vira Engine that handles property
# risk analysis using Google's Gemini AI. It processes multiple data
# sources to identify potential risks in Nigerian real estate
# transactions.
#
# Key Features:
# - Multi-source data integration
# - AI-powered risk analysis
# - Structured output format
# - Error handling and logging
# =================================================================

import os
import json
import sys
import traceback
import google.generativeai as genai  # Gemini AI SDK for risk analysis
import pandas as pd  # For handling structured data
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError

# ========================================
# CONFIGURATION
# ========================================
# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Get API keys from environment variables
API_KEY = os.getenv('GEMINI_API_KEY')
MONGO_URI = os.getenv('MONGO_URI')

# Define data folders relative to this script's location (fallback for deed documents)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FOLDER = os.path.join(BASE_DIR, "..", "nigeria_demo_data")

# ========================================
# DATABASE CONNECTION
# ========================================
def get_mongodb_connection():
    """Get MongoDB connection"""
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=1000)  # Shorter timeout
        client.admin.command('ping')  # Test connection
        return client['vira_engine']
    except Exception as e:
        print(f"[Database] MongoDB connection timeout, using fallback: {e}")
        return None

def get_asset_data_fallback(token_id: str) -> dict:
    """Fallback method using local files when MongoDB is unavailable"""
    print(f"[Fallback Ingestion] Using local files for token_id: '{token_id}'")
    
    try:
        # Load metadata from local file
        metadata_filename = f"{token_id}.json"
        metadata_filepath = os.path.join(DATA_FOLDER, "metadata", metadata_filename)
        
        if not os.path.exists(metadata_filepath):
            print(f"[Error] Metadata file not found: {metadata_filepath}")
            return {"error": True, "message": "Asset not found"}
        
        with open(metadata_filepath, 'r') as f:
            metadata = json.load(f)
        
        # Extract registry key
        registry_key = None
        for attribute in metadata.get("attributes", []):
            if attribute.get("trait_type") == "Registry Search Key":
                registry_key = attribute.get("value")
                break
        
        if not registry_key:
            return {"error": True, "message": "Registry key missing"}
        
        # Load registry data from CSV
        registry_csv_path = os.path.join(DATA_FOLDER, "Nigerian_Land_Registry_Mock.csv")
        registry_df = pd.read_csv(registry_csv_path)
        registry_row = registry_df[registry_df['c_of_o_id'] == registry_key]
        
        if registry_row.empty:
            return {"error": True, "message": "Registry record not found"}
        
        registry_record = registry_row.iloc[0].to_dict()
        
        # Load news data
        news_path = os.path.join(DATA_FOLDER, "Nigerian_Gazette_Alerts.json")
        with open(news_path, 'r') as f:
            all_news = json.load(f)
        
        # Find relevant news
        owner_name = registry_record.get('owner_name', '')
        relevant_news = [alert for alert in all_news if owner_name and owner_name in alert.get('summary', '')]
        
        # Load deed document
        deed_filename = f"{token_id}_Deed_of_Assignment.txt"
        deed_path = os.path.join(DATA_FOLDER, deed_filename)
        
        if os.path.exists(deed_path):
            with open(deed_path, 'r') as f:
                deed_content = f.read()
        else:
            deed_content = f"Deed document for {token_id} not available."
        
        print(f"[Fallback Ingestion] Successfully loaded data from local files")
        
        return {
            "token_id": token_id,
            "metadata": metadata,
            "registry_record": registry_record,
            "news_alerts": relevant_news,
            "deed_content": deed_content,
            "registry_key": registry_key,
            "data_source": "local_files"
        }
        
    except Exception as e:
        print(f"[Error] Fallback ingestion failed: {e}")
        return {"error": True, "message": f"Fallback failed: {str(e)}"}

# ========================================
# --- Task 2.1: MongoDB Data Ingestion Module ---
# ========================================
def get_asset_data_from_mongodb(token_id: str) -> dict:
    """Retrieves all necessary data for a given asset token ID from MongoDB with fallback."""
    print(f"\n[MongoDB Ingestion] Received request for token_id: '{token_id}'")
    
    # Connect to MongoDB
    db = get_mongodb_connection()
    if db is None:
        print("[Warning] Could not connect to MongoDB, falling back to local files")
        return get_asset_data_fallback(token_id)
    
    try:
        # Get property metadata from MongoDB
        metadata_collection = db['property_metadata']
        metadata = metadata_collection.find_one({"token_id": token_id})
        
        if not metadata:
            print(f"[Error] Property metadata not found for token_id: '{token_id}'")
            return {"error": True, "message": "Asset not found"}
        
        print(f"[MongoDB Ingestion] Found metadata for {token_id}")
        
        # Extract registry search key from metadata
        registry_key = None
        for attribute in metadata.get("attributes", []):
            if attribute.get("trait_type") == "Registry Search Key":
                registry_key = attribute.get("value")
                break
        
        if not registry_key:
            print("[Error] Registry search key not found in metadata")
            return {"error": True, "message": "Registry key missing"}
        
        # Get registry data from MongoDB
        registry_collection = db['land_registry']
        registry_record = registry_collection.find_one({"c_of_o_id": registry_key})
        
        if not registry_record:
            print(f"[Error] Registry record not found for key: '{registry_key}'")
            return {"error": True, "message": "Registry record not found"}
        
        print(f"[MongoDB Ingestion] Found registry record for {registry_key}")
        
        # Get news alerts from MongoDB
        news_collection = db['news_alerts']
        owner_name = registry_record.get('owner_name', '')
        
        # Find relevant news alerts mentioning the owner
        relevant_news = []
        if owner_name:
            news_cursor = news_collection.find({
                "$or": [
                    {"summary": {"$regex": owner_name, "$options": "i"}},
                    {"headline": {"$regex": owner_name, "$options": "i"}}
                ]
            })
            relevant_news = list(news_cursor)
        
        print(f"[MongoDB Ingestion] Found {len(relevant_news)} relevant news alerts")
        
        # Get deed document (still from file system for now)
        deed_content = ""
        deed_filename = f"{token_id}_Deed_of_Assignment.txt"
        deed_path = os.path.join(DATA_FOLDER, deed_filename)
        
        if os.path.exists(deed_path):
            with open(deed_path, 'r') as f:
                deed_content = f.read()
            print(f"[MongoDB Ingestion] Loaded deed document: {deed_filename}")
        else:
            print(f"[Warning] Deed document not found: {deed_filename}")
            deed_content = f"Deed document for {token_id} not available."
        
        # Compile all data
        asset_data = {
            "token_id": token_id,
            "metadata": metadata,
            "registry_record": registry_record,
            "news_alerts": relevant_news,
            "deed_content": deed_content,
            "registry_key": registry_key,
            "data_source": "mongodb"
        }
        
        print("[MongoDB Ingestion] Successfully compiled all asset data from MongoDB")
        return asset_data
        
    except Exception as e:
        print(f"[Error] Failed to retrieve data from MongoDB: {e}")
        traceback.print_exc()
        return {"error": True, "message": f"Database query failed: {str(e)}"}

# ========================================
# --- Task 2.2: AI Investigation Module (Using Gemini ChatSession) ---
# ========================================
def run_llm_investigation_with_mongodb(token_id: str) -> dict:
    """Performs the AI Investigation using MongoDB data and Gemini ChatSession method."""
    print(f"\n[LLM Investigator] Starting MongoDB-powered investigation for token_id: '{token_id}'")
    
    # --- 1. Configure the API Key ---
    try:
        if not API_KEY or API_KEY == "YOUR_GOOGLE_API_KEY_HERE":
            print("[Error] Google API Key is missing. Please edit the script and paste your key.")
            return {"error": True, "message": "API key missing"}
        genai.configure(api_key=API_KEY)
    except Exception as e:
        print(f"[Error] Failed to configure Gemini: {e}")
        traceback.print_exc()
        return {"error": True, "message": f"Gemini configuration failed: {str(e)}"}

    # --- 2. Get Asset Data from MongoDB ---
    asset_data = get_asset_data_from_mongodb(token_id)
    if asset_data.get("error"):
        return asset_data  # Return the error from MongoDB ingestion
    
    try:
        # Extract data from MongoDB results
        deed_content = asset_data['deed_content']
        registry_record = asset_data['registry_record']
        news_alerts = asset_data['news_alerts']
        
        # Format registry data for AI analysis
        registry_content = f"""
Property Registration Details:
- Certificate of Occupancy ID: {registry_record.get('c_of_o_id')}
- Plot Number: {registry_record.get('plot_number')}
- Block Number: {registry_record.get('block_number')}
- Area: {registry_record.get('area_name')}
- State: {registry_record.get('state')}
- Owner Name: {registry_record.get('owner_name')}
- Date Registered: {registry_record.get('date_registered')}
- Status: {registry_record.get('status')}
"""
        
        # Format news content for AI analysis
        if news_alerts:
            news_content = "Relevant News Alerts:\n"
            for alert in news_alerts:
                news_content += f"""
Alert ID: {alert.get('alert_id', 'N/A')}
Date: {alert.get('date', 'N/A')}
Source: {alert.get('source', 'N/A')}
Category: {alert.get('category', 'N/A')}
Headline: {alert.get('headline', 'N/A')}
Summary: {alert.get('summary', 'N/A')}
---
"""
        else:
            news_content = "No relevant news alerts found for this property owner."
        
        print(f"[LLM Investigator] Prepared data from MongoDB:")
        print(f"  - Deed document: {len(deed_content)} characters")
        print(f"  - Registry record: {registry_record.get('owner_name')} in {registry_record.get('area_name')}")
        print(f"  - News alerts: {len(news_alerts)} relevant alerts")
        
    except Exception as e:
        print(f"[Error] Failed to process MongoDB data: {e}")
        traceback.print_exc()
        return {"error": True, "message": f"Data processing failed: {str(e)}"}

    # --- 3. Start a Chat Session with the AI ---
    try:
        print("[LLM Investigator] Initializing Gemini model and chat session...")
        # Use latest pro model
        model = genai.GenerativeModel('gemini-pro-latest')
        
        system_instruction = """
        You are VERA-AI, a comprehensive risk oracle for Nigerian real estate assets. Your task is to analyze property data from multiple sources and generate a detailed structured JSON risk assessment report.
        
        CRITICAL: Respond ONLY with the JSON object. No markdown, no explanations, no additional text.
        """
        
        chat = model.start_chat(history=[
            {'role': 'user', 'parts': [system_instruction]},
            {'role': 'model', 'parts': ["Understood. I will only respond with the specified JSON object."]}
        ])

        # --- 4. Send the Data to AI with Enhanced Prompt ---
        data_source_info = "MongoDB database" if asset_data.get("data_source") == "mongodb" else "local files (MongoDB unavailable)"
        
        # Prepare structured data for AI analysis
        registry_data_json = {
            "c_of_o_id": registry_record.get('c_of_o_id'),
            "plot_number": registry_record.get('plot_number'),
            "block_number": registry_record.get('block_number'),
            "area_name": registry_record.get('area_name'),
            "state": registry_record.get('state'),
            "owner_name": registry_record.get('owner_name'),
            "date_registered": registry_record.get('date_registered'),
            "status": registry_record.get('status')
        }
        
        # Format news alerts as structured data
        news_data_json = []
        for alert in news_alerts:
            news_data_json.append({
                "alert_id": alert.get('alert_id', 'N/A'),
                "date": alert.get('date', 'N/A'),
                "source": alert.get('source', 'N/A'),
                "category": alert.get('category', 'N/A'),
                "headline": alert.get('headline', 'N/A'),
                "summary": alert.get('summary', 'N/A')
            })
        
        # Deed content as structured data
        deed_data_json = {
            "document_type": "Deed of Assignment",
            "property_id": token_id,
            "content_length": len(deed_content),
            "full_content": deed_content[:2000] + "..." if len(deed_content) > 2000 else deed_content  # Truncate if too long
        }
        
        prompt = f"""
You are VERA-AI, a professional risk oracle for Nigerian real estate assets. Your task is to analyze the provided data from three sources and generate a realistic structured JSON report for property {token_id}.

CONTEXT: Nigerian real estate carries inherent risks due to complex land laws, documentation challenges, and regulatory environment. Even the cleanest properties should reflect baseline investment risks.

--- INSTRUCTIONS ---
1. Assess the risk based on all three data sources.
2. The 'risk_score' must be an integer using these REALISTIC ranges:
   - "No Risk Found": 15-25 (Even clean properties have baseline market/regulatory risks)
   - "Financial Pledge": 45-65 (Moderate risk due to financial encumbrances)
   - "Title Dispute": 70-85 (High risk due to ownership conflicts)
   - "Government Revocation": 80-95 (Very high risk due to potential seizure)
3. The 'risk_category' must be one of: "Title Dispute", "Financial Pledge", "Government Revocation", or "No Risk Found".
4. The 'summary' must be a concise, one-paragraph explanation of your findings and why this risk score was assigned.
5. The 'evidence_summary' must detail the findings from each of the three sources.
6. IMPORTANT: Always assign realistic risk scores that reflect real-world property investment risks.
7. Data retrieved from: {data_source_info}

--- NIGERIAN PROPERTY DATA ---
1. NIGERIAN LAND REGISTRY DATA: {json.dumps(registry_data_json)}
2. DEED OF ASSIGNMENT DOCUMENT: {json.dumps(deed_data_json)}
3. NIGERIAN GAZETTE ALERTS: {json.dumps(news_data_json)}

--- RISK SCORING EXAMPLES ---
- Property with clear title, recent registration, no news alerts: Risk Score 18-22
- Property with financial encumbrance mentioned in deed: Risk Score 50-60
- Property with ownership disputes in deed/news: Risk Score 75-82
- Property with government acquisition notices: Risk Score 85-92

--- REQUIRED JSON OUTPUT FORMAT ---
Provide only the JSON object, nothing else.
{{
    "risk_score": <integer>,
    "risk_category": "<string>",
    "summary": "<string>",
    "evidence_summary": [
        {{"source": "Nigerian Land Registry", "result": "Success/Failure", "detail": "<string>"}},
        {{"source": "Deed of Assignment", "result": "Success/Failure", "detail": "<string>"}},
        {{"source": "Nigerian Gazette Alerts", "result": "Success/Failure", "detail": "<string>"}}
    ],
    "data_source": "{data_source_info}",
    "property_id": "{token_id}"
}}
"""
        
        print("[LLM Investigator] Sending structured data to VERA-AI via chat...")
        response = chat.send_message(prompt)
        
        response_text = response.text.strip()
        print(f"[LLM Investigator] Received enhanced response: {response_text[:200]}...")
        
        # Clean up the response
        json_text = response_text.replace("```json", "").replace("```", "").strip()
        
        # Parse the enhanced JSON response
        result = json.loads(json_text)
        
        # Ensure backward compatibility by adding the old format
        if "risk_category" in result:
            result["potential_risk_type"] = result["risk_category"]
        
        print(f"[LLM Investigator] Risk Score: {result.get('risk_score', 'N/A')}")
        print(f"[LLM Investigator] Risk Category: {result.get('risk_category', 'N/A')}")
        
        return result

    except Exception as e:
        print(f"\n[Error] An error occurred during the Gemini chat session: {e}")
        traceback.print_exc()
        return {"error": True, "message": f"AI analysis failed: {str(e)}"}

# ========================================
# --- Task 2.3: Create Core Analysis Function ---
# ========================================
def perform_asset_analysis(token_id: str) -> dict:
    """
    Orchestrates the full asset risk analysis for a given token_id.
    This function acts as the main entry point for the API.
    """
    print(f"\n[Core Analysis] Starting full analysis for token_id: '{token_id}'")
    
    # Start with a default "failed" report structure.
    # This ensures we always return a consistent format, even on error.
    final_report = {
        "token_id": token_id,
        "status": "Failed",
        "risk_assessment": {"potential_risk_type": "Analysis Error"},
        "details": "An unexpected error occurred during analysis."
    }

    try:
        # Call the MongoDB-powered LLM investigator function.
        llm_result = run_llm_investigation_with_mongodb(token_id)
        
        # Check for errors returned from the investigator.
        if llm_result and "error" in llm_result:
            final_report["details"] = llm_result.get("message", "LLM investigation failed.")
            # Specifically check for the "Asset not found" error to set the status correctly.
            if llm_result.get("message") == "Asset not found.":
                final_report["status"] = "Not Found"
                final_report["risk_assessment"]["potential_risk_type"] = "Asset Not Found"
            print(f"[Core Analysis] LLM investigation failed: {final_report['details']}")

        # Check if the result from the LLM is valid and successful.
        elif llm_result and ("potential_risk_type" in llm_result or "risk_category" in llm_result):
            # If successful, update the report with enhanced data.
            final_report["status"] = "Success"
            final_report["risk_assessment"] = llm_result
            final_report["details"] = "Enhanced VERA-AI investigation completed successfully."
            
            # Add summary information to details if available
            if "summary" in llm_result:
                final_report["ai_summary"] = llm_result["summary"]
            if "risk_score" in llm_result:
                final_report["risk_score"] = llm_result["risk_score"]
        else:
            # Handle cases where the LLM might return an unexpected or empty response.
            final_report["status"] = "Partial Success"
            final_report["risk_assessment"] = {"potential_risk_type": "Unknown Risk"}
            final_report["details"] = "LLM investigation returned an unexpected or empty result."
            print(f"[Core Analysis] Warning: LLM result was unexpected: {llm_result}")

    except Exception as e:
        # Catch any critical errors during the process.
        final_report["details"] = f"Critical error during LLM investigation: {e}"
        print(f"[Core Analysis] Critical error: {e}")
        traceback.print_exc()

    print(f"[Core Analysis] Analysis complete for {token_id}.")
    return final_report

# ========================================
# MAIN EXECUTION
# ========================================
if __name__ == "__main__":
    print("\n" + "="*50)
    print("--- VERA AI | PROPERTY RISK ANALYSIS ---")
    print("="*50)
    
    # Get token ID from command line argument or use default
    if len(sys.argv) > 1:
        test_token_id = sys.argv[1]
        print(f"[Main] Analyzing property: {test_token_id}")
    else:
        test_token_id = "NGA-LAG-001"
        print(f"[Main] No token ID provided, using default: {test_token_id}")
        print("[Main] Usage: python app/main.py <TOKEN_ID>")
    
    # Test the new perform_asset_analysis function
    analysis_result = perform_asset_analysis(test_token_id)
    
    print("\n[Result] Asset Analysis Complete.")
    print(json.dumps(analysis_result, indent=2))

    print(f"\n--- ANALYSIS COMPLETE FOR {test_token_id} ---")
