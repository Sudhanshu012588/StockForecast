from fastapi import APIRouter
from src.Controller.Stock import getStock
router = APIRouter(prefix="/stock")


@router.post("/getStock/{ticker}")
async def StockRoute(ticker:str):
    data = getStock(ticker)
    return data