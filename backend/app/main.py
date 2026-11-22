from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from app.core.config import get_settings
from app.modules.clubs.router import router as clubs_router
from app.modules.diagnostics.router import router as diagnostics_router
from app.modules.health.router import router as health_router
from app.modules.auth.router import router as auth_router
from app.modules.opportunities.router import router as opportunities_router
from app.modules.dhanda.router import router as dhanda_router
from app.modules.payments.router import router as payments_router
from app.modules.uploads.router import router as uploads_router
from app.modules.socials.router import router as socials_router
from app.modules.notices.router import router as notices_router
from app.modules.forms.router import router as forms_router
from app.modules.apikeys.router import router as apikeys_router
from app.modules.systemsettings.router import router as systemsettings_router

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    docs_url="/docs" if settings.app_env.lower() != "production" else None,
    redoc_url=None,
)


@app.exception_handler(HTTPException)
async def api_http_error(_request: Request, exc: HTTPException) -> JSONResponse:
    message = exc.detail if isinstance(exc.detail, str) else "The request could not be completed."
    return JSONResponse(
        {"success": False, "error": message, "detail": exc.detail},
        status_code=exc.status_code,
        headers=exc.headers,
    )


@app.exception_handler(RequestValidationError)
async def api_validation_error(_request: Request, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(
        {"success": False, "error": "Invalid request payload.", "detail": jsonable_encoder(exc.errors())},
        status_code=422,
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-Admin-Token", "X-Diagnostics-Token"],
)
app.include_router(health_router)
app.include_router(auth_router, prefix=settings.api_prefix)
app.include_router(clubs_router, prefix=settings.api_prefix)
app.include_router(diagnostics_router, prefix=settings.api_prefix)
app.include_router(opportunities_router, prefix=settings.api_prefix)
app.include_router(dhanda_router, prefix=settings.api_prefix)
app.include_router(payments_router, prefix=settings.api_prefix)
app.include_router(uploads_router, prefix=settings.api_prefix)
app.include_router(socials_router, prefix=settings.api_prefix)
app.include_router(notices_router, prefix=settings.api_prefix)
app.include_router(forms_router, prefix=settings.api_prefix)
app.include_router(apikeys_router, prefix=settings.api_prefix)
app.include_router(systemsettings_router, prefix=settings.api_prefix)
