# Vera AI - Render Deployment Guide

## 🚀 Deploy to Render

### Step 1: Prepare Your Repository
1. Push your code to GitHub/GitLab
2. Ensure all files are committed including:
   - `Procfile`
   - `render.yaml`
   - `requirements.txt`
   - `app/` directory

### Step 2: Create Render Service
1. Go to [render.com](https://render.com)
2. Sign up/Login with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure the service:
   - **Name**: `vera-ai-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.api:app --host 0.0.0.0 --port $PORT`

### Step 3: Set Environment Variables
In Render dashboard, add these environment variables:
- `GEMINI_API_KEY`: Your Google Gemini API key
- `MONGO_URI`: Your MongoDB connection string (optional, has fallback)

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment (usually 2-5 minutes)
3. Your API will be available at: `https://your-service-name.onrender.com`

## 🌐 Frontend Integration

### API Endpoints
Your deployed API will have these endpoints:

```
GET  /                    - Welcome message
GET  /health             - Health check
GET  /api/info           - API information
GET  /analyze/{token_id} - Main analysis endpoint
GET  /docs               - Interactive API documentation
```

### Example Frontend Usage

#### JavaScript/React Example:
```javascript
const API_BASE_URL = 'https://your-service-name.onrender.com';

// Analyze an asset
async function analyzeAsset(tokenId) {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze/${tokenId}`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('Risk Score:', data.analysis_report.risk_score);
      console.log('Risk Category:', data.analysis_report.risk_assessment.risk_category);
      return data;
    } else {
      throw new Error(data.detail);
    }
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
}

// Usage
analyzeAsset('NGA-LAG-001')
  .then(result => {
    // Handle successful analysis
    displayResults(result);
  })
  .catch(error => {
    // Handle error
    showError(error.message);
  });
```

#### Python Frontend Example:
```python
import requests

API_BASE_URL = 'https://your-service-name.onrender.com'

def analyze_asset(token_id):
    response = requests.get(f'{API_BASE_URL}/analyze/{token_id}')
    
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        raise Exception(f"Analysis failed: {response.json()['detail']}")

# Usage
try:
    result = analyze_asset('NGA-LAG-001')
    print(f"Risk Score: {result['analysis_report']['risk_score']}")
except Exception as e:
    print(f"Error: {e}")
```

### Response Format
The API returns structured JSON responses:

```json
{
  "token_id": "NGA-LAG-001",
  "status": "Success",
  "analysis_report": {
    "risk_score": 22,
    "risk_category": "No Risk Found",
    "summary": "Property analysis summary...",
    "evidence_summary": [...]
  },
  "onchain_proof_simulation": {
    "proof_hash": "0x...",
    "verification_status": "Valid"
  },
  "timestamp": "2024-10-30T12:00:00Z"
}
```

## 🔧 Testing Your Deployment

### 1. Health Check
```bash
curl https://your-service-name.onrender.com/health
```

### 2. Test Analysis
```bash
curl https://your-service-name.onrender.com/analyze/NGA-LAG-001
```

### 3. View API Documentation
Visit: `https://your-service-name.onrender.com/docs`

## 🛠️ Troubleshooting

### Common Issues:
1. **Build Fails**: Check `requirements.txt` for missing dependencies
2. **Environment Variables**: Ensure `GEMINI_API_KEY` is set correctly
3. **CORS Issues**: API already configured for cross-origin requests
4. **MongoDB Connection**: API has fallback to local files if MongoDB unavailable

### Logs:
- Check Render dashboard logs for deployment issues
- API includes detailed logging for debugging

## 📱 Frontend Framework Examples

### React Component Example:
```jsx
import React, { useState } from 'react';

function AssetAnalyzer() {
  const [tokenId, setTokenId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeAsset = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/analyze/${tokenId}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        value={tokenId} 
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="Enter Token ID (e.g., NGA-LAG-001)"
      />
      <button onClick={analyzeAsset} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Asset'}
      </button>
      
      {result && (
        <div>
          <h3>Risk Score: {result.analysis_report.risk_score}/100</h3>
          <p>Category: {result.analysis_report.risk_assessment.risk_category}</p>
          <p>Summary: {result.analysis_report.risk_assessment.summary}</p>
        </div>
      )}
    </div>
  );
}
```

## 🔐 Security Notes
- Never expose your `GEMINI_API_KEY` in frontend code
- Use environment variables for all sensitive data
- API includes CORS configuration for web browsers
- Consider rate limiting for production use