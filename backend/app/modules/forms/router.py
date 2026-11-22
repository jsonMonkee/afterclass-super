from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uuid
from app.core.local_db import get_db

router = APIRouter(prefix="/forms", tags=["forms"])

class FormCreate(BaseModel):
    title: str
    category: str = "Recruitment"
    google_form_url: str

@router.get("")
def list_forms():
    conn = get_db()
    cursor = conn.execute("SELECT * FROM forms ORDER BY created_at DESC")
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return {"success": True, "count": len(rows), "data": rows}

@router.post("", status_code=201)
def create_form(payload: FormCreate):
    form_id = f"form-{uuid.uuid4().hex[:8]}"
    url = payload.google_form_url.strip()
    if not url.startswith("http"):
        url = f"https://{url}"

    conn = get_db()
    with conn:
        conn.execute("""
            INSERT INTO forms (id, title, category, google_form_url, responses_count, status)
            VALUES (?, ?, ?, ?, 0, 'Active')
        """, (form_id, payload.title.strip(), payload.category, url))
    conn.close()

    return {
        "success": True,
        "message": "Google Form registered and linked successfully!",
        "form": {
            "id": form_id,
            "title": payload.title.strip(),
            "category": payload.category,
            "google_form_url": url,
            "responses_count": 0,
            "status": "Active"
        }
    }

@router.delete("/{form_id}")
def delete_form(form_id: str):
    conn = get_db()
    with conn:
        conn.execute("DELETE FROM forms WHERE id = ?", (form_id,))
    conn.close()
    return {"success": True, "message": f"Form {form_id} removed."}
