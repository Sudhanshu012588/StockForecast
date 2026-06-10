import {
  createChart,
  CandlestickSeries,
  LineSeries,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

interface StockCandle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface Props {
  data: StockCandle[];
}

export default function TradingChart({ data }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartData = [...data].reverse();
  const [mode, setMode] = useState<"candle" | "line">(
    "candle"
  );

  const [hoverPrice, setHoverPrice] =
  useState<number | null>(null);

const [sl, setSl] =
  useState<number | null>(null);

const [tp, setTp] =
  useState<number | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(
  chartContainerRef.current,
  {
    width:
      chartContainerRef.current.clientWidth,

    height: 700,

    layout: {
      background: {
        color: "#0d0d0d",
      },
      textColor: "#bdbdbd",
      fontFamily:
        "JetBrains Mono, monospace",
    },

    grid: {
      vertLines: {
        color: "#1d1d1d",
      },
      horzLines: {
        color: "#1d1d1d",
      },
    },

    crosshair: {
      vertLine: {
        color: "#ff9900",
        width: 1,
      },

      horzLine: {
        color: "#ff9900",
        width: 1,
      },
    },

    rightPriceScale: {
      borderColor: "#2a2a2a",
    },

    timeScale: {
      borderColor: "#2a2a2a",
      timeVisible: true,
    },
  }
);

    const candleSeries =
      chart.addSeries(CandlestickSeries);

    const lineSeries =
      chart.addSeries(LineSeries);

    const formatted = chartData.map((c) => ({
      time: c.date.split("T")[0],
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));

    candleSeries.setData(formatted);

    lineSeries.setData(
      formatted.map((x) => ({
        time: x.time,
        value: x.close,
      }))
    );

    candleSeries.applyOptions({
      visible: mode === "candle",
    });

    lineSeries.applyOptions({
      visible: mode === "line",
    });

    chart.subscribeCrosshairMove(
      (param) => {
        if (!param.point) return;

        const price =
          candleSeries.coordinateToPrice(
            param.point.y
          );

        if (price !== null) {
      setHoverPrice(Number(price));
}
      }
    );

    chartContainerRef.current.oncontextmenu = (
      e
    ) => {
      e.preventDefault();

      const rect =
        chartContainerRef.current!.getBoundingClientRect();

      const y = e.clientY - rect.top;

      const price =
        candleSeries.coordinateToPrice(y);

      if (price) setTp(price);
    };

    chartContainerRef.current.onclick = (
      e
    ) => {
      const rect =
        chartContainerRef.current!.getBoundingClientRect();

      const y = e.clientY - rect.top;

      const price =
        candleSeries.coordinateToPrice(y);

      if (price) setSl(price);
    };

    return () => chart.remove();
  }, [data, mode]);

  const rr =
    sl && tp
      ? ((tp - data[0].close) /
          (data[0].close - sl))
      : null;

  return (
    <div className="w-full">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() =>
            setMode("candle")
          }
        >
          Candles
        </button>

        <button
          onClick={() =>
            setMode("line")
          }
        >
          Line
        </button>
      </div>

      <div
        ref={chartContainerRef}
        className="border rounded"
      />

      <div className="mt-4 grid grid-cols-4 gap-4">
        <div>
          Hover Price:
          {hoverPrice?.toFixed(2)}
        </div>

        <div>
          Stop Loss:
          {sl?.toFixed(2)}
        </div>

        <div>
          Take Profit:
          {tp?.toFixed(2)}
        </div>

        <div>
          RR:
          {rr?.toFixed(2)}
        </div>
      </div>
    </div>
  );
}