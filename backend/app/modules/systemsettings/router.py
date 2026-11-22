from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from pathlib import Path
import re
from app.core.config import get_settings

router = APIRouter(prefix="/settings", tags=["System Settings"])
ENV_PATH = Path(__file__).resolve().parents[3] / ".env"

class SettingsPayload(BaseModel):
    razorpay_key_id: Optional[str] = ""
    razorpay_key_secret: Optional[str] = ""
    razorpay_webhook_secret: Optional[str] = ""
    cloudinary_cloud_name: Optional[str] = ""
    cloudinary_api_key: Optional[str] = ""
    cloudinary_api_secret: Optional[str] = ""
    supabase_url: Optional[str] = ""
    supabase_publishable_key: Optional[str] = ""
    groq_api_key: Optional[str] = ""
    active_campus: Optional[str] = "auk"
    maintenance_mode: Optional[bool] = False
    meta_app_id: Optional[str] = ""

@router.get("", response_model=dict)
def read_system_settings():
    s = get_settings()
    env_content = ENV_PATH.read_text(encoding="utf-8") if ENV_PATH.exists() else ""
    
    def extract_val(key: str, default=""):
        m = re.search(rf'^{key}=(.*)$', env_content, re.MULTILINE)
        if m:
            val = m.group(1).strip().strip('"').strip("'")
            return val
        return default

    return {
        "success": True,
        "data": {
            "razorpay_key_id": extract_val("RAZORPAY_KEY_ID", s.razorpay_key_id or ""),
            "razorpay_key_secret": extract_val("RAZORPAY_KEY_SECRET", s.razorpay_key_secret or ""),
            "razorpay_webhook_secret": extract_val("RAZORPAY_WEBHOOK_SECRET", s.razorpay_webhook_secret or ""),
            "cloudinary_cloud_name": extract_val("CLOUDINARY_CLOUD_NAME", s.cloudinary_cloud_name or ""),
            "cloudinary_api_key": extract_val("CLOUDINARY_API_KEY", s.cloudinary_api_key or ""),
            "cloudinary_api_secret": extract_val("CLOUDINARY_API_SECRET", s.cloudinary_api_secret or ""),
            "supabase_url": extract_val("SUPABASE_URL", s.supabase_url or ""),
            "supabase_publishable_key": extract_val("SUPABASE_PUBLISHABLE_KEY", s.supabase_publishable_key or ""),
            "groq_api_key": extract_val("GROQ_API_KEY", ""),
            "active_campus": extract_val("ACTIVE_CAMPUS", "auk"),
            "maintenance_mode": extract_val("MAINTENANCE_MODE", "false").lower() == "true",
            "meta_app_id": extract_val("META_APP_ID", s.meta_app_id or "")
        }
    }

@router.post("", response_model=dict)
def update_system_settings(payload: SettingsPayload):
    if not ENV_PATH.exists():
        ENV_PATH.write_text("", encoding="utf-8")
        
    env_lines = ENV_PATH.read_text(encoding="utf-8").splitlines()
    updates = {
        "RAZORPAY_KEY_ID": payload.razorpay_key_id or "",
        "RAZORPAY_KEY_SECRET": payload.razorpay_key_secret or "",
        "RAZORPAY_WEBHOOK_SECRET": payload.razorpay_webhook_secret or "",
        "CLOUDINARY_CLOUD_NAME": payload.cloudinary_cloud_name or "",
        "CLOUDINARY_API_KEY": payload.cloudinary_api_key or "",
        "CLOUDINARY_API_SECRET": payload.cloudinary_api_secret or "",
        "SUPABASE_URL": payload.supabase_url or "",
        "SUPABASE_PUBLISHABLE_KEY": payload.supabase_publishable_key or "",
        "GROQ_API_KEY": payload.groq_api_key or "",
        "ACTIVE_CAMPUS": payload.active_campus or "auk",
        "MAINTENANCE_MODE": "true" if payload.maintenance_mode else "false",
        "META_APP_ID": payload.meta_app_id or "29385151124414706"
    }

    new_lines = []
    seen = set()

    for line in env_lines:
        line_clean = line.strip()
        if not line_clean or line_clean.startswith("#"):
            new_lines.append(line)
            continue
        
        eq_idx = line.find("=")
        if eq_idx != -1:
            k = line[:eq_idx].strip()
            if k in updates:
                new_lines.append(f'{k}="{updates[k]}"')
                seen.add(k)
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)

    for k, v in updates.items():
        if k not in seen:
            new_lines.append(f'{k}="{v}"')

    ENV_PATH.write_text("\n".join(new_lines) + "\n", encoding="utf-8")
    get_settings.cache_clear()

    return {"success": True, "message": "Settings updated and saved to .env directly."}
