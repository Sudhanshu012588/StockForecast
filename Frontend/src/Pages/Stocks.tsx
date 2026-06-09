import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import TradingChart from "../Components/TradingCharts.tsx"
interface StockCandle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface StockResponse {
  status: string;
  ticker: string;
  annual_return: number;
  cagr: number;
  volatility: number;
  sharpe_ratio: number;
  max_drawdown: number;
  historical: StockCandle[];
}

export const Stocks = () => {
  const [ticker, setTicker] = useState("");
  const [stockData, setStockData] = useState<StockResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 20;

  const notify = (msg: string) => toast.error(msg);

  const getStock = async (ticker: string) => {
    if (!ticker.trim()) {
      notify("Enter a ticker");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post<StockResponse>(
        `${import.meta.env.VITE_BASE_URL}/stock/getStock/${ticker}`
      );

      const data = res.data;

      if (data.status === "Bad") {
        throw new Error("Invalid NSE ticker");
      }

      setStockData(data);
      setCurrentPage(1);
    } catch (error) {
      if (error instanceof Error) {
        notify(error.message);
      } else {
        notify("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const paginatedData =
    stockData?.historical.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    ) ?? [];

  const totalPages = stockData
    ? Math.ceil(stockData.historical.length / ITEMS_PER_PAGE)
    : 0;

  return (
    <>
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Stock Analytics Dashboard
          </h1>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="Enter NSE Ticker (e.g. TATASTEEL)"
              className="px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 outline-none flex-1 max-w-md"
            />

            <button
              onClick={() => getStock(ticker)}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </div>
          
          {stockData && (
            <>
            <div className="flex items-center justify-center">
            <div>
            <p>Right Click to set Stop Loss </p>
            </div>
            <p>Left Click to set Take Profit</p>
            </div>
            
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  {stockData.ticker}
                </h2>

                <p className="text-zinc-400">
                  Historical Data Points:{" "}
                  {stockData.historical.length.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
                  <p className="text-zinc-400 text-sm">Annual Return</p>
                  <p className="text-2xl font-bold">
                    {stockData.annual_return.toFixed(2)}%
                  </p>
                </div>

                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
                  <p className="text-zinc-400 text-sm">CAGR</p>
                  <p className="text-2xl font-bold">
                    {stockData.cagr.toFixed(2)}%
                  </p>
                </div>

                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
                  <p className="text-zinc-400 text-sm">Volatility</p>
                  <p className="text-2xl font-bold">
                    {stockData.volatility.toFixed(2)}%
                  </p>
                </div>

                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
                  <p className="text-zinc-400 text-sm">Sharpe Ratio</p>
                  <p className="text-2xl font-bold">
                    {stockData.sharpe_ratio.toFixed(2)}
                  </p>
                </div>

                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
                  <p className="text-zinc-400 text-sm">Max Drawdown</p>
                  <p className="text-2xl font-bold text-red-400">
                    {stockData.max_drawdown.toFixed(2)}%
                  </p>
                </div>

                
              </div>
              <TradingChart
  data={stockData.historical}
/>

              <div className="overflow-x-auto mt-10 rounded-xl border border-zinc-700">
                <table className="w-full">
                  <thead className="bg-zinc-900">
                    <tr>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-right">Open</th>
                      <th className="p-3 text-right">High</th>
                      <th className="p-3 text-right">Low</th>
                      <th className="p-3 text-right">Close</th>
                      <th className="p-3 text-right">Volume</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedData.map((candle, index) => (
                      <tr
                        key={index}
                        className="border-t border-zinc-800 hover:bg-zinc-900"
                      >
                        <td className="p-3">
                          {new Date(candle.date).toLocaleDateString()}
                        </td>

                        <td className="p-3 text-right">
                          ₹{candle.open.toFixed(2)}
                        </td>

                        <td className="p-3 text-right">
                          ₹{candle.high.toFixed(2)}
                        </td>

                        <td className="p-3 text-right">
                          ₹{candle.low.toFixed(2)}
                        </td>

                        <td className="p-3 text-right font-semibold">
                          ₹{candle.close.toFixed(2)}
                        </td>

                        <td className="p-3 text-right">
                          {candle.volume.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-4 py-2 bg-zinc-800 rounded-lg disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="font-semibold">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  className="px-4 py-2 bg-zinc-800 rounded-lg disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  );
};