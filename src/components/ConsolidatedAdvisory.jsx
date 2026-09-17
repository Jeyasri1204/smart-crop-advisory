import React from 'react';
import { Sprout, Scan, CloudRain, Store, Download, Share2, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ConsolidatedAdvisory({ lang, speakText }) {
  const handleDownloadPDF = () => {
    alert("Downloading Consolidated Smart Crop Advisory (PDF) for Ramesh...");
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            OFFICIAL ADVISORY SUMMARY
          </span>
          <h2 className="text-2xl font-black text-white mt-2">
            {lang === 'ta' ? 'ஒருங்கிணைந்த விவசாய ஆலோசனை' : 'Consolidated Smart Advisory'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">Farmer: Ramesh | Location: Coimbatore, Tamil Nadu</p>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 text-xs"
        >
          <Download className="w-4 h-4" />
          <span>{lang === 'ta' ? 'அறிக்கையை பதிவிறக்குக (PDF)' : 'Download Advisory (PDF)'}</span>
        </button>
      </div>

      {/* 4-in-1 Advisory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Recommended Crop */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase">1. Recommended Crop</span>
              <h3 className="font-extrabold text-white text-base">Paddy (Short Duration)</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Highly suitable for your clay loam soil and current monsoon season. Expected yield: High (25-32 Qtl/Acre).
          </p>
        </div>

        {/* 2. Disease Advisory */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-red-400 uppercase">2. Disease Advisory</span>
              <h3 className="font-extrabold text-white text-base">Leaf Blight Detected</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Remove infected leaves immediately. Spray Tricyclazole 75% WP @ 0.6g/L water during evening hours.
          </p>
        </div>

        {/* 3. Weather Advisory */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <CloudRain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase">3. Weather Advisory</span>
              <h3 className="font-extrabold text-white text-base">Rain Expected Tomorrow</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            High rain probability (70%). Postpone irrigation and chemical spraying today to prevent runoff.
          </p>
        </div>

        {/* 4. Market Advisory */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase">4. Market Advisory</span>
              <h3 className="font-extrabold text-white text-base">Current Price: ₹2,150 / Quintal</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Coimbatore Mandi price is on a bullish trend (+3.1%). Good time to hold stock for 5-7 days for higher margin.
          </p>
        </div>
      </div>
    </div>
  );
}
