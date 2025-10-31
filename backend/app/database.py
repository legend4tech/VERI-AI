# =================================================================
# Vira Engine - MongoDB Database Connection Module
# =================================================================
# Purpose: This module handles MongoDB connection and basic operations
# for storing property analysis data and results.
# =================================================================

import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from dotenv import load_dotenv
import json
from datetime import datetime

# Load environment variables
load_dotenv()

class ViraDatabase:
    def __init__(self):
        """Initialize MongoDB connection"""
        self.mongo_uri = os.getenv('MONGO_URI')
        if not self.mongo_uri:
            raise ValueError("MONGO_URI not found in environment variables")
        
        self.client = None
        self.db = None
        self.connect()
    
    def connect(self):
        """Establish connection to MongoDB"""
        try:
            print("[Database] Connecting to MongoDB...")
            # Shorter timeout for faster testing
            self.client = MongoClient(self.mongo_uri, serverSelectionTimeoutMS=3000)
            
            # Test the connection with timeout
            print("[Database] Testing connection...")
            self.client.admin.command('ping')
            
            # Use the database (extract from URI or use default)
            self.db = self.client['vira_engine']
            print("[Database] Successfully connected to MongoDB")
            
        except (ConnectionFailure, ServerSelectionTimeoutError) as e:
            print(f"[Database] Failed to connect to MongoDB: {e}")
            print("[Database] This might be due to network issues or incorrect credentials")
            raise
        except Exception as e:
            print(f"[Database] Unexpected error: {e}")
            raise
    
    def test_connection(self):
        """Test if MongoDB connection is working"""
        try:
            # Simple ping test
            result = self.client.admin.command('ping')
            print(f"[Database] Connection test successful: {result}")
            return True
        except Exception as e:
            print(f"[Database] Connection test failed: {e}")
            return False
    
    def get_collections_info(self):
        """Get information about existing collections"""
        try:
            collections = self.db.list_collection_names()
            print(f"[Database] Available collections: {collections}")
            return collections
        except Exception as e:
            print(f"[Database] Error getting collections: {e}")
            return []
    
    def close_connection(self):
        """Close MongoDB connection"""
        if self.client:
            self.client.close()
            print("[Database] MongoDB connection closed")

# Test function
def test_mongodb_connection():
    """Test MongoDB connection and basic operations"""
    try:
        db = ViraDatabase()
        
        # Test connection
        if db.test_connection():
            print("✅ MongoDB connection successful")
        else:
            print("❌ MongoDB connection failed")
            return False
        
        # Get collections info
        collections = db.get_collections_info()
        
        # Close connection
        db.close_connection()
        
        return True
        
    except Exception as e:
        print(f"❌ Database test failed: {e}")
        return False

if __name__ == "__main__":
    print("=== Testing MongoDB Connection ===")
    test_mongodb_connection()