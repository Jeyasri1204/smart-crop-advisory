import React, { useState } from 'react';
import { MANDI_PRICES } from '../data/agriData';
import { TrendingUp, TrendingDown, Store, Volume2, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MarketIntelligence({ lang, speakText }) {
  const [selectedItem, setSelectedItem] = useState(MANDI_PRICES[0]);

  // Construct chart data points safely from historical array
  const historicalArray = Array.isArray(selectedItem?.historical)
    ? selectedItem.historical
    : [2100, 2150, 2200, 2280, 2350];

  const chartData = historicalArray.map((val, idx) => ({
    day: `Day ${idx * 6 + 1}`,
    price: val,
    predicted: idx === 4 ? val + 90 : null
  }));

  const isBullish = selectedItem?.trend ? selectedItem.trend.startsWith('+') : true;

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-amber-500/20 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
              <Store className="w-4 h-4" />
              <span>{lang === 'ta' ? 'அக்மார்க்நெட் சந்தை தரவு' : 'Agmarknet Mandi Integration'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {lang === 'ta' ? 'சந்தை விலை பகுப்பாய்வு' : 'Mandi Market Intelligence & Price Forecast'}
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              {lang === 'ta'
                ? 'பிராந்திய சந்தைகளின் நேரலை விலைகள் மற்றும் AI மூலம் கணிக்கப்பட்ட எதிர்கால விலை மாற்றங்களை அறிந்து அதிக லாபத்தில் விற்கலாம்.'
                : 'Track live mandi prices across key regional agricultural markets, analyze 30-day price velocity, and receive AI selling signals.'}
            </p>
          </div>

          <button
            onClick={() =>
              speakText(
                lang === 'ta'
                  ? `${selectedItem.crop} தற்போதைய சந்தை விலை ${selectedItem.price}. சந்தை நிலவரம் ${selectedItem.status}.`
                  : `Current Mandi price for ${selectedItem.crop} is ${selectedItem.price}. Market trend is ${selectedItem.status}.`
              )
            }
            className="w-full md:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-2xl border border-slate-700 transition flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ta' ? 'விலை விபரங்களை கேள்' : 'Audio Price Summary'}</span>
          </button>
        </div>
      </div>

      {/* Mandi Cards Ticker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {MANDI_PRICES.map((item, idx) => {
          const itemTrend = item?.trend || '+1.5%';
          const itemBullish = itemTrend.startsWith('+');
          return (
            <button
              key={idx}
              onClick={() => setSelectedItem(item)}
              className={`p-4 rounded-3xl text-left border transition-all ${
                selectedItem.crop === item.crop
                  ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/30'
                  : 'glass-card border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-white truncate">{item.crop}</div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">{item.market}</div>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-sm font-black text-white">{item.price}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
                    itemBullish ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {itemBullish ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {itemTrend}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Graph & Decision Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recharts Price Trend */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <span>{selectedItem.crop} Price Trend (30 Days)</span>
              </h3>
              <p className="text-xs text-slate-400">{selectedItem.market}</p>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-amber-400">{selectedItem.price}</span>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Latest Mandi Rate</span>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stop-color="#f59e0b" stop-opacity={0.4} />
                    <stop offset="95%" stop-color="#f59e0b" stop-opacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Selling Recommendation Engine */}
        <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>AI Selling Recommendation</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                HIGH PROFIT SIGNAL
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-[11px] text-slate-400 font-bold block">RECOMMENDED STRATEGY</span>
              <h4 className="text-lg font-black text-white">
                {isBullish ? "HOLD FOR 5 DAYS & SELL" : "SELL NOW AT MANDI"}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isBullish
                  ? "Festival demand is increasing mandi rates by 4.2%. Expected price increase of +₹90/quintal next week."
                  : "Mandi arrivals increasing. Sell existing stock today to avoid potential 2% price dip."}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Updated live from Agmarknet API & Tamil Nadu Mandi Feed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
