from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import datetime
from app.core.local_db import get_db

router = APIRouter(prefix="/apikeys", tags=["API Keys / Secret Notes"])

class ApiKeyCreate(BaseModel):
    label: str
    key_value: str
    category: Optional[str] = "General"

class ApiKeyOut(BaseModel):
    id: str
    label: str
    key_value: str
    category: str
    created_at: str

@router.get("", response_model=dict)
def list_api_keys():
    conn = get_db()
    cur = conn.execute("SELECT id, label, key_value, category, created_at FROM api_keys ORDER BY created_at DESC")
    rows = cur.fetchall()
    conn.close()
    
    keys = [
        {
            "id": r["id"],
            "label": r["label"],
            "key_value": r["key_value"],
            "category": r["category"],
            "created_at": r["created_at"] or ""
        }
        for r in rows
    ]
    return {"success": True, "data": keys}

@router.post("", response_model=dict)
def create_api_key(payload: ApiKeyCreate):
    label = payload.label.strip()
    key_value = payload.key_value.strip()
    category = payload.category.strip() if payload.category else "General"
    
    if not label or not key_value:
        raise HTTPException(status_code=400, detail="Label and API key / secret value are required.")
        
    key_id = f"key_{uuid.uuid4().hex[:8]}"
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    conn = get_db()
    with conn:
        conn.execute("""
            INSERT INTO api_keys (id, label, key_value, category, created_at)
            VALUES (?, ?, ?, ?, ?)
        """, (key_id, label, key_value, category, created_at))
    conn.close()
    
    return {
        "success": True, 
        "data": {
            "id": key_id,
            "label": label,
            "key_value": key_value,
            "category": category,
            "created_at": created_at
        }
    }

@router.delete("/{key_id}", response_model=dict)
def delete_api_key(key_id: str):
    conn = get_db()
    with conn:
        cur = conn.execute("DELETE FROM api_keys WHERE id = ?", (key_id,))
        if cur.rowcount == 0:
            conn.close()
            raise HTTPException(status_code=404, detail="Key note not found.")
    conn.close()
    return {"success": True, "message": "Key note deleted successfully."}
