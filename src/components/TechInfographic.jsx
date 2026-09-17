import React from 'react';
import { Cpu, Server, Database, Sparkles, Layers, ArrowRight, ShieldCheck, CheckCircle2, PhoneCall, Globe, Code, Zap } from 'lucide-react';

export default function TechInfographic({ lang }) {
  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Top Banner Header */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
            <Zap className="w-4 h-4" />
            <span>TECHNOLOGICAL IDEA BOARD - SIH 2025</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            SMART CROP ADVISORY SYSTEM
          </h1>
          <p className="text-slate-400 text-xs mt-1">for Small & Marginal Farmers</p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Complete System Architecture Showcase</span>
        </div>
      </div>

      {/* Grid 1: Problem Addressed & Our Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Addressed */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-emerald-400 text-sm uppercase tracking-wider flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span>Problem Addressed</span>
          </h3>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-base">?</span>
              <div>
                <strong className="text-white block mb-0.5">Reduces Guesswork</strong>
                Eliminates dependency on unverified traditional advice and commercial pesticide dealers.
              </div>
            </li>
            <li className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-base">📉</span>
              <div>
                <strong className="text-white block mb-0.5">Minimizes Crop Losses</strong>
                Reduces input costs, resource wastage, and soil degradation.
              </div>
            </li>
            <li className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-base">🎯</span>
              <div>
                <strong className="text-white block mb-0.5">Data-Driven Decisions</strong>
                Provides timely, personalized precision guidance directly to smallholders.
              </div>
            </li>
          </ul>
        </div>

        {/* Our Solution */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-blue-400 text-sm uppercase tracking-wider flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span>Our Solution</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">🌱</span> AI Crop Recommendation
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
              <span className="text-blue-400 font-bold">💧</span> Fertilizer & Irrigation Schedule
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
              <span className="text-red-400 font-bold">🔬</span> AI Disease & Pest Detection
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
              <span className="text-amber-400 font-bold">🌦️</span> Real-time Weather Alerts
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">📊</span> Agmarknet Mandi Price Predictor
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
              <span className="text-purple-400 font-bold">🗣️</span> Tamil Voice & Speech Assistant
            </div>
          </div>
        </div>
      </div>

      {/* Grid 2: Technologies Used & System Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tech Stack Matrix */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-purple-400 text-sm uppercase tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span>Technologies Used</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-bold">Frontend:</span>
              <span className="font-extrabold text-white">React 18 / Vite / Tailwind</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-bold">Backend API:</span>
              <span className="font-extrabold text-blue-400">Node.js / Express / Python</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-bold">Database:</span>
              <span className="font-extrabold text-emerald-400">PostgreSQL / MongoDB</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-bold">AI / ML Engine:</span>
              <span className="font-extrabold text-amber-400">TensorFlow / PyTorch / OpenCV</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-bold">Integrations:</span>
              <span className="font-extrabold text-purple-400">OpenWeather, Agmarknet, ICAR</span>
            </div>
          </div>
        </div>

        {/* System Architecture Flow Diagram */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>System Architecture Flow</span>
          </h3>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">👨‍🌾 Farmer</span>
                <span className="text-[10px] text-slate-400">Mobile / Web App</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
                <ArrowRight className="w-5 h-5 text-blue-400" />
                <span className="text-[10px] text-blue-300 font-bold">REST API</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-purple-400 font-bold block mb-1">⚙️ Backend Server</span>
                <span className="text-[10px] text-slate-400">Node / Python API</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-[10px] text-center pt-2 border-t border-slate-800">
              <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                AI/ML Models
              </div>
              <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-500/30 text-blue-300">
                Weather API
              </div>
              <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300">
                Market Data API
              </div>
              <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-300">
                PostgreSQL DB
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-center text-xs shadow-lg shadow-emerald-500/20">
              Personalized Advisory to Farmer (Tamil & English Voice Output)
            </div>
          </div>
        </div>
      </div>

      {/* Innovation Banner */}
      <div className="glass-card p-6 rounded-3xl border border-emerald-500/40 bg-emerald-950/20 text-center space-y-1">
        <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">INNOVATION HIGHLIGHT</span>
        <p className="text-sm font-bold text-white max-w-3xl mx-auto">
          Integrates AI, Micro-Weather, Disease Scan Diagnostics, Agmarknet Market Trends & Tamil Voice Support in a single farmer-friendly unified platform.
        </p>
      </div>
    </div>
  );
}
