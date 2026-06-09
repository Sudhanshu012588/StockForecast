import yfinance as yf
import pandas as pd
import numpy as np
from src.Models.StockRes import (
    StockCandle,
    HistoricalStockResponse,
)



def calculate_volatility(df):
    daily_returns = df["close"].pct_change().dropna()

    volatility = (
        daily_returns.std()
        * np.sqrt(252)
        * 100
    )

    return round(volatility, 2)


def calculate_sharpe_ratio(
    close_prices,
    risk_free_rate=0.07
):
    daily_returns = close_prices.pct_change().dropna()

    annual_return = daily_returns.mean() * 252

    annual_volatility = (
        daily_returns.std() * np.sqrt(252)
    )

    sharpe_ratio = (
        annual_return - risk_free_rate
    ) / annual_volatility

    return round(float(sharpe_ratio), 2)



def calculate_max_drawdown(close_prices):

    rolling_max = close_prices.cummax()

    drawdown = (
        close_prices - rolling_max
    ) / rolling_max

    max_drawdown = drawdown.min()

    return round(float(max_drawdown * 100), 2)

def getStock(ticker: str) -> HistoricalStockResponse:
    try:
        if not ticker.endswith(".NS"):
            ticker += ".NS"

        df = yf.download(
            ticker,
            start="2010-01-01",
            auto_adjust=True,
            progress=False,
        )

        if df.empty:
            raise Exception("No data found")

        if isinstance(df.columns, pd.MultiIndex):
            df.columns = [col[0] for col in df.columns]

        df = df.reset_index()

        df = df.rename(
            columns={
                "Date": "date",
                "Open": "open",
                "High": "high",
                "Low": "low",
                "Close": "close",
                "Volume": "volume",
            }
        )
        df = df.sort_values(by="date", ascending=False).reset_index(drop=True)
        historical = [
            StockCandle(
                date=row["date"],
                open=float(row["open"]),
                high=float(row["high"]),
                low=float(row["low"]),
                close=float(row["close"]),
                volume=int(row["volume"]),
            )
            for _, row in df.iterrows()
        ]

        current_price = df["close"].iloc[-1]

        if len(df) >= 252:
            price_1_year_ago = df["close"].iloc[-252]
            annual_return = (
                (current_price - price_1_year_ago)
                / price_1_year_ago
            ) * 100
        else:
            annual_return = 0

        start_price = df["close"].iloc[0]
        end_price = df["close"].iloc[-1]

        years = (
            (df["date"].iloc[-1] - df["date"].iloc[0]).days
            / 365.25
        )

        cagr = (
            (end_price / start_price) ** (1 / years) - 1
        ) * 100

        volatility = calculate_volatility(df)
        sharpe_ratio = calculate_sharpe_ratio(df["close"])
        max_drawdown = calculate_max_drawdown(df["close"])

        return HistoricalStockResponse(
            status="Healthy",
            ticker=ticker,
            annual_return=annual_return,
            cagr=cagr,
            volatility=volatility,
            sharpe_ratio=sharpe_ratio,
            max_drawdown=max_drawdown,
            historical=historical,
        )

    except Exception as e:
        print(f"Error fetching stock data: {e}")

        return HistoricalStockResponse(
            status="Bad",
            ticker=ticker,
            annual_return=-1,
            cagr=-1,
            volatility=-1,
            sharpe_ratio=-1,
            max_drawdown=-1,
            historical=[],
        )