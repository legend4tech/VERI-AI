# ReAI AI Backend - Enhanced Property Risk Analysis Engine

## Overview

This is an enhanced version of the Vera AI Engine, upgraded from a basic property risk analysis system to a production-ready FastAPI backend with advanced features. The system now includes MongoDB integration, real API simulation capabilities, and comprehensive deployment infrastructure to demonstrate real-world applicability for Nigerian real estate risk assessment.

## 🚀 Key Backend Enhancements

### **Enhanced Architecture**
- **Original**: Simple Python script with basic AI analysis
- **Enhanced**: Full FastAPI web service with RESTful endpoints
- **Database**: MongoDB Atlas integration with intelligent fallback system
- **Deployment**: Production-ready with Render deployment configuration
- **API Documentation**: Auto-generated interactive docs with Swagger UI

## ✨ Backend Enhancement Features

### **Database Integration & API Simulation**
- 🗄️ **MongoDB Atlas Integration**: Simulates real land registry databases with authentic Nigerian property data
- � ***Intelligent Fallback System**: Automatically switches to local files when database is unavailable
- 🌐 **Real API Simulation**: Demonstrates integration with actual government databases and news APIs
- � **MCulti-Source Data Fusion**: Combines registry records, legal documents, and news alerts like real systems

### **Advanced AI Analysis**
- 🤖 **Enhanced Gemini Integration**: Uses latest Gemini Pro model with structured prompts
- 🎯 **Realistic Risk Scoring**: Implements industry-standard risk assessment (15-95 scale)
- � ***Comprehensive Evidence Analysis**: Processes multiple data sources simultaneously
- 🔍 **Nigerian Real Estate Context**: Tailored for Nigerian land laws and property challenges

### **Production-Ready Infrastructure**
- ⚡ **FastAPI Web Service**: High-performance async API with automatic validation
- �️ **COrRS Configuration**: Ready for frontend integration from any domain
- � **RAuto-Generated Documentation**: Interactive API docs at `/docs` endpoint
- 🔐 **ZK-Proof Simulation**: Blockchain-ready cryptographic proof generation
- 🚀 **Render Deployment**: One-click cloud deployment with `render.yaml`

## 🚀 Backend Setup & Testing

### Prerequisites
- Python 3.12+
- Google Cloud Platform account (for Gemini API)
- MongoDB Atlas account (optional - has fallback)

### Installation

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Configure environment**:
Create `.env` file with your API credentials:
```env
# Google Gemini AI API Key (Required)
GEMINI_API_KEY=your_google_gemini_api_key

# MongoDB Atlas Connection (Optional - uses local fallback)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

4. **Start the enhanced API server**:
```bash
python -m uvicorn app.api:app --host 0.0.0.0 --port 8000 --reload
```

5. **Test the enhanced system**:
```bash
# Run comprehensive API tests
python test_api_deployment.py http://localhost:8000

# Test specific property analysis
curl http://localhost:8000/analyze/NGA-LAG-001
```

## 📁 Project Structure

```
ReAi_Backend/
├── backend/                          # 🔧 AI Backend (Python FastAPI)
│   ├── app/
│   │   ├── api.py                   # Main FastAPI application
│   │   ├── main.py                  # Core AI analysis engine
│   │   ├── database.py              # MongoDB integration
│   │   └── zk_proof_simulator.py    # ZK proof simulation
│   ├── nigeria_demo_data/           # Sample property data
│   │   ├── metadata/                # Property metadata files
│   │   ├── *_Deed_of_Assignment.txt # Legal documents
│   │   ├── Nigerian_Gazette_Alerts.json
│   │   └── Nigerian_Land_Registry_Mock.csv
│   ├── render.yaml                  # Render deployment config
│   ├── Procfile                     # Process configuration
│   ├── requirements.txt             # Python dependencies
│   └── .env                         # Environment variables
├── packages/                        # 🌐 Frontend (Next.js + Starknet)
│   ├── nextjs/
│   │   ├── app/
│   │   │   ├── page.tsx            # Main landing page
│   │   │   └── layout.tsx          # App layout
│   │   ├── components/             # React components
│   │   ├── scaffold.config.ts      # Scaffold-Stark configuration
│   │   └── package.json
│   └── snfoundry/                  # Smart contracts
├── .github/workflows/              # CI/CD workflows
└── README.md                       # This file
```

## 🔌 API Endpoints

### Backend API (Port 8000)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API status check |
| `/health` | GET | Health check for monitoring |
| `/api/info` | GET | API information and version |
| `/analyze/{token_id}` | GET | Property risk analysis |
| `/docs` | GET | Interactive API documentation |

### Example API Usage

```bash
# Health check
curl http://localhost:8000/health

# Analyze property
curl http://localhost:8000/analyze/NGA-LAG-001

# View API documentation
open http://localhost:8000/docs
```

### Sample Response

```json
{
  "token_id": "NGA-LAG-001",
  "status": "Success",
  "analysis_report": {
    "risk_score": 78,
    "risk_category": "Title Dispute",
    "summary": "Property analysis indicates potential ownership conflicts...",
    "evidence_summary": [
      {
        "source": "Nigerian Land Registry",
        "result": "Success",
        "detail": "Registry record found and verified"
      }
    ]
  },
  "onchain_proof_simulation": {
    "proof_hash": "0x...",
    "verification_status": "Valid"
  },
  "timestamp": "2025-01-31T12:00:00Z"
}
```

## 🌍 Deployment

### Backend Deployment (Render)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Deploy backend to Render"
git push origin main
```

2. **Deploy on Render**:
   - Connect GitHub repository
   - Set root directory: `backend`
   - Environment variables: `GEMINI_API_KEY`, `MONGO_URI`
   - Auto-deploys from `render.yaml`

### Frontend Deployment (Vercel)

1. **Deploy on Vercel**:
   - Connect GitHub repository
   - Set root directory: `packages/nextjs`
   - Framework: Next.js (auto-detected)
   - Environment variables as needed

## 🔧 Development

### Adding New Properties

1. **Create metadata file**:
```bash
# Add to backend/nigeria_demo_data/metadata/
{
  "token_id": "NGA-NEW-001",
  "attributes": [
    {
      "trait_type": "Registry Search Key",
      "value": "REG-NEW-001"
    }
  ]
}
```

2. **Update registry data**:
```bash
# Add entry to Nigerian_Land_Registry_Mock.csv
```

3. **Test the new property**:
```bash
curl http://localhost:8000/analyze/NGA-NEW-001
```

### Customizing Risk Analysis

Modify the AI prompt in `backend/app/main.py`:

```python
# Update the system instruction for different risk categories
system_instruction = """
Your custom risk analysis instructions here...
"""
```

## 🛡️ Security Features

- ✅ Environment variables for sensitive data
- ✅ CORS properly configured for cross-origin requests
- ✅ Input validation on all API endpoints
- ✅ Automatic fallback mechanisms
- ✅ Comprehensive error handling and logging

## 📊 Monitoring & Testing

### Backend Testing
```bash
cd backend
python test_api_deployment.py http://localhost:8000
```

### Frontend Testing
```bash
cd packages/nextjs
yarn test
```

### Health Monitoring
- Backend: `GET /health`
- Frontend: Built-in Next.js monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

Copyright (c) 2025. All rights reserved.

## 🆘 Support

- **Backend Issues**: Check `backend/RENDER_DEPLOYMENT_STATUS.md`
- **Frontend Issues**: Refer to Scaffold-Stark 2 documentation
- **API Documentation**: Visit `/docs` endpoint when server is running

---

**Built with ❤️ for the Nigerian Real Estate Market**

