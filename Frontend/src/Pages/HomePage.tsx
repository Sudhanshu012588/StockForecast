
import { ArrowRight, TrendingUp, BarChart3, Shield, Brain, Activity } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <nav className="border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          <div className="font-bold text-xl text-[#ff9900]">
            MARKET TERMINAL
          </div>

          <div className="hidden md:flex gap-8 text-sm text-zinc-400">
            <a href="#">Analytics</a>
            <a href="#">Forecasting</a>
            <a href="#">Terminal</a>
            <a href="#">Backtesting</a>
          </div>

          <button className="bg-[#ff9900] text-black px-4 py-2 font-bold">
            Launch Terminal
          </button>

        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,#ff9900_0%,transparent_60%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-8 py-28 relative">

          <div className="text-[#ff9900] font-mono mb-4">
            QUANTITATIVE TRADING PLATFORM
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight max-w-5xl">
            Market Intelligence
            <br />
            For Serious Traders
          </h1>

          <p className="text-zinc-400 text-xl mt-8 max-w-3xl">
            Analyze stocks, forecast price movements,
            measure risk, simulate trades and build
            conviction using institutional-grade tools.
          </p>

          <div className="flex gap-4 mt-10">

            <button className="bg-[#ff9900] text-black px-8 py-4 font-bold flex items-center gap-2">
              Launch Terminal
              <ArrowRight size={18} />
            </button>

            <button className="border border-[#2a2a2a] px-8 py-4">
              Watch Demo
            </button>

          </div>

        </div>

      </section>

      {/* METRICS */}
      <section className="border-y border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4">

          <Metric value="5000+" label="Stocks Tracked" />
          <Metric value="15Y+" label="Historical Data" />
          <Metric value="AI" label="Forecast Models" />
          <Metric value="NSE" label="Market Coverage" />

        </div>
      </section>

      {/* TERMINAL PREVIEW */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="flex items-center gap-3 mb-8">

          <div className="h-3 w-3 bg-red-500 rounded-full" />
          <div className="h-3 w-3 bg-yellow-500 rounded-full" />
          <div className="h-3 w-3 bg-green-500 rounded-full" />

          <span className="text-zinc-500 ml-4 font-mono">
            LIVE TERMINAL
          </span>

        </div>

        <div className="border border-[#2a2a2a] bg-[#0b0b0b]">

          <div className="bg-[#ff9900] text-black px-4 py-2 font-bold">
            TATASTEEL.NS
          </div>

          <div className="grid lg:grid-cols-4">

            <div className="border-r border-[#2a2a2a] p-6 space-y-6">

              <TerminalMetric
                title="CAGR"
                value="18.24%"
              />

              <TerminalMetric
                title="VOLATILITY"
                value="24.10%"
              />

              <TerminalMetric
                title="SHARPE"
                value="0.92"
              />

              <TerminalMetric
                title="MAX DD"
                value="-38.7%"
                red
              />

            </div>

            <div className="lg:col-span-3 p-6">

              <div className="h-[500px] border border-[#2a2a2a] flex items-center justify-center text-zinc-500">
                Trading Chart Preview
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        <h2 className="text-4xl font-bold mb-12">
          Built For Modern Traders
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <FeatureCard
            icon={<Brain />}
            title="AI Forecasting"
            desc="Predict future price action using advanced forecasting models."
          />

          <FeatureCard
            icon={<TrendingUp />}
            title="Risk Analytics"
            desc="Sharpe ratio, volatility, drawdown and portfolio risk."
          />

          <FeatureCard
            icon={<BarChart3 />}
            title="Trade Planning"
            desc="Set SL and TP directly on charts and evaluate risk-reward."
          />

          <FeatureCard
            icon={<Shield />}
            title="Backtesting"
            desc="Validate strategies against years of historical data."
          />

        </div>

      </section>

      {/* FORECAST SHOWCASE */}
      <section className="bg-[#0b0b0b] border-y border-[#1f1f1f]">

        <div className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-12">

          <div>

            <div className="text-[#ff9900] font-mono mb-3">
              FORECAST ENGINE
            </div>

            <h2 className="text-5xl font-bold">
              See What Could
              Happen Next
            </h2>

            <p className="text-zinc-400 mt-6">
              Generate AI-powered forecasts and evaluate
              confidence intervals before entering trades.
            </p>

          </div>

          <div className="border border-[#2a2a2a] h-[400px] flex items-center justify-center text-zinc-500">
            Forecast Chart
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto text-center px-8 py-28">

        <div className="font-mono text-[#ff9900] mb-4">
          &gt; Ready to analyze your next trade?
        </div>

        <h2 className="text-5xl font-bold">
          Launch The Terminal
        </h2>

        <button className="mt-10 bg-[#ff9900] text-black px-10 py-4 font-bold">
          Start Trading
        </button>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1f1f1f]">

        <div className="max-w-7xl mx-auto px-8 py-10 text-zinc-500">

          Market Terminal • Analytics • Forecasting •
          Backtesting • React + FastAPI + TimesFM

        </div>

      </footer>

    </div>
  );
}

function Metric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="text-center py-10 border-r border-[#1f1f1f]">
      <div className="text-4xl font-bold text-[#ff9900]">
        {value}
      </div>

      <div className="text-zinc-500 mt-2">
        {label}
      </div>
    </div>
  );
}

function TerminalMetric({
  title,
  value,
  red = false,
}: {
  title: string;
  value: string;
  red?: boolean;
}) {
  return (
    <div>
      <div className="text-xs text-zinc-500">
        {title}
      </div>

      <div
        className={`text-2xl font-bold ${
          red
            ? "text-red-400"
            : "text-[#00ff88]"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="border border-[#2a2a2a] bg-[#0b0b0b] p-6 hover:border-[#ff9900] transition-all">

      <div className="text-[#ff9900] mb-4">
        {icon}
      </div>

      <h3 className="font-bold text-xl mb-3">
        {title}
      </h3>

      <p className="text-zinc-500">
        {desc}
      </p>

    </div>
  );
}

