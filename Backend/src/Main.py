from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.Router.StockRouter import router as stock_router

class HealthResponse(BaseModel):
    status: Literal["healthy"]
    service: str
    version: str


app = FastAPI(
    title="Stock Forecast API",
    description="Backend API for stock history and TimesFM forecasts.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock_router)



@app.get("/", tags=["System"])
async def root() -> dict[str, str]:
    return {
        "message": "Stock Forecast API",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health", response_model=HealthResponse, tags=["System"])
async def health_check() -> HealthResponse:
    return HealthResponse(
        status="healthy",
        service="stock-forecast-api",
        version=app.version,
    )
