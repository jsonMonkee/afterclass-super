from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Afterclass API"
    app_env: str = "production"
    api_prefix: str = "/api/v1"
    frontend_origin: str = "http://localhost:3000"
    supabase_url: str | None = None
    supabase_secret_key: str | None = None
    supabase_service_role_key: str | None = None
    supabase_publishable_key: str | None = None
    supabase_anon_key: str | None = None
    auth_session_secret: str | None = None
    admin_api_token: str | None = None
    enable_db_diagnostics: bool = False
    diagnostics_api_token: str | None = None
    afterclass_enable_demo_accounts: bool = False
    razorpay_key_id: str | None = None
    razorpay_key_secret: str | None = None
    razorpay_webhook_secret: str | None = None
    razorpay_public_key_id: str | None = None
    supabase_storage_bucket: str = "afterclass-images"
    cloudinary_cloud_name: str | None = None
    cloudinary_upload_preset: str = "afterclass_uploads"
    cloudinary_api_key: str | None = None
    cloudinary_api_secret: str | None = None
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_user: str | None = None
    smtp_password: str | None = None
    smtp_from_email: str | None = None
    smtp_from_name: str = "Afterclass Amity"
    meta_app_id: str | None = "29385151124414706"
    meta_app_secret: str | None = "c52fc2d4fd65bae66f09e5440e45e2d7"

    model_config = SettingsConfigDict(
        env_file=Path(__file__).resolve().parents[2] / ".env",
        env_file_encoding="utf-8",
        env_prefix="",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
