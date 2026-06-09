from pydantic import BaseModel
from datetime import date

from typing import List

class StockCandle(BaseModel):
    date: date
    open: float
    high: float
    low: float
    close: float
    volume: int


class HistoricalStockResponse(BaseModel):
    status:str
    ticker: str
    annual_return: float 
    cagr: float
    volatility: float
    sharpe_ratio: float
    max_drawdown: float
    historical: List[StockCandle]