from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime
from app.core.local_db import get_db

import os
import json
import httpx
from dotenv import load_dotenv

router = APIRouter(prefix="/notices", tags=["notices"])

class ReformatRequest(BaseModel):
    rough_text: str
    tone: Optional[str] = "Professional Campus Notice"

@router.post("/ai-reformat")
def ai_reformat_notice(payload: ReformatRequest):
    load_dotenv()
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured in backend environment.")

    rough_text = payload.rough_text.strip()
    if not rough_text:
        raise HTTPException(status_code=400, detail="Notice rough text is required.")

    system_prompt = (
        "You are an expert university administrative communications writer for Afterclass Amity. "
        "Take the user's rough or informal student announcement notes and reformat them into an authoritative, "
        "high-clarity, student-engaging circular. "
        "Respond ONLY with a valid JSON object matching this schema:\n"
        "{\n"
        '  "title": "Clear, uppercase or headline capitalized punchy title (max 70 chars)",\n'
        '  "category": "One of: Urgent Alert | Exam & Academics | Cultural Fest | Campus Facilities",\n'
        '  "badge": "One of: URGENT | OFFICIAL | FEST | UPDATE",\n'
        '  "excerpt": "Well-formatted 2-3 sentence announcement with critical times, locations, and actions clearly stated."\n'
        "}"
    )

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    body = {
        "model": "qwen/qwen3.8-27b",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Tone: {payload.tone}\nNotes:\n{rough_text}"}
        ],
        "response_format": {"type": "json_object"},
        "temperature": 0.2,
        "max_tokens": 300
    }

    try:
        res = httpx.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=body, timeout=12.0)
        if res.status_code != 200:
            raise HTTPException(status_code=res.status_code, detail=f"Groq API error: {res.text}")
        data = res.json()
        content_str = data["choices"][0]["message"]["content"]
        parsed = json.loads(content_str)
        return {
            "success": True,
            "reformatted": {
                "title": parsed.get("title", ""),
                "category": parsed.get("category", "Urgent Alert"),
                "badge": parsed.get("badge", "OFFICIAL"),
                "excerpt": parsed.get("excerpt", "")
            }
        }
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse LLM structured response.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error connecting to Groq LLM: {str(e)}")

class NoticeCreate(BaseModel):
    title: str
    category: str = "Urgent Alert"
    badge: str = "NEW"
    excerpt: str

@router.get("")
def list_notices():
    conn = get_db()
    cursor = conn.execute("SELECT * FROM notices ORDER BY created_at DESC")
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return {"success": True, "count": len(rows), "data": rows}

@router.post("", status_code=201)
def create_notice(payload: NoticeCreate):
    notice_id = f"notice-{uuid.uuid4().hex[:8]}"
    now = datetime.now()
    date_str = now.strftime("%b %d, %Y")
    time_str = now.strftime("%I:%M %p")
    
    conn = get_db()
    with conn:
        conn.execute("""
            INSERT INTO notices (id, title, category, badge, date, time, excerpt)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            notice_id,
            payload.title,
            payload.category,
            payload.badge,
            date_str,
            time_str,
            payload.excerpt
        ))
    conn.close()
    
    return {
        "success": True,
        "message": "Notice published to all campuses successfully!",
        "notice": {
            "id": notice_id,
            "title": payload.title,
            "category": payload.category,
            "badge": payload.badge,
            "date": date_str,
            "time": time_str,
            "excerpt": payload.excerpt
        }
    }

@router.delete("/{notice_id}")
def delete_notice(notice_id: str):
    conn = get_db()
    with conn:
        conn.execute("DELETE FROM notices WHERE id = ?", (notice_id,))
    conn.close()
    return {"success": True, "message": f"Notice {notice_id} deleted."}
