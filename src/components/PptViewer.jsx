import React, { useState } from 'react';
import { PPT_SLIDES } from '../data/agriData';
import { Presentation, ChevronLeft, ChevronRight, Award, Layers, Target, ShieldAlert, CheckCircle2, ExternalLink, Cpu } from 'lucide-react';

export default function PptViewer({ lang }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = PPT_SLIDES[currentSlideIndex];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Slide Navigation Header */}
      <div className="glass-card p-6 rounded-3xl border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-black">
            #{slide.slideNumber}
          </div>
          <div>
            <div className="text-xs text-purple-400 font-bold uppercase tracking-wider">Smart India Hackathon 2025 Submission</div>
            <h2 className="text-lg font-bold text-white">{slide.title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="p-2.5 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-white transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold px-3 text-slate-300">
            Slide {currentSlideIndex + 1} / {PPT_SLIDES.length}
          </span>
          <button
            onClick={() => setCurrentSlideIndex(prev => Math.min(PPT_SLIDES.length - 1, prev + 1))}
            disabled={currentSlideIndex === PPT_SLIDES.length - 1}
            className="p-2.5 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-white transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide Carousel Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
        {PPT_SLIDES.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`p-3 rounded-2xl text-xs font-bold border transition text-center ${
              currentSlideIndex === idx
                ? 'bg-purple-950/60 border-purple-500 text-purple-300 ring-2 ring-purple-500/30'
                : 'glass-card border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Slide {s.slideNumber}
          </button>
        ))}
      </div>

      {/* Main Slide Presentation View */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6 min-h-[440px] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Presentation className="w-64 h-64 text-purple-400" />
        </div>

        {/* Slide 1 View */}
        {slide.slideNumber === 1 && (
          <div className="space-y-6 max-w-3xl">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
              SMART INDIA HACKATHON 2025
            </div>
            <h1 className="text-3xl font-black text-white leading-tight">
              Smart Crop Advisory System for Small and Marginal Farmers
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Theme:</span>
                <span className="font-bold text-emerald-400">{slide.theme}</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Category:</span>
                <span className="font-bold text-purple-400">{slide.psCategory}</span>
              </div>
            </div>
          </div>
        )}

        {/* Slide 2 View */}
        {slide.slideNumber === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-950/20 border border-emerald-500/30 p-5 rounded-2xl space-y-3">
              <h3 className="font-bold text-emerald-400 text-sm uppercase tracking-wider">Proposed Solution</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {slide.proposedSolution.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-950/20 border border-blue-500/30 p-5 rounded-2xl space-y-3">
              <h3 className="font-bold text-blue-400 text-sm uppercase tracking-wider">Problem Addressed</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {slide.problemAddressed.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-950/20 border border-purple-500/30 p-5 rounded-2xl space-y-3">
              <h3 className="font-bold text-purple-400 text-sm uppercase tracking-wider">Core Innovation</h3>
              <p className="text-xs text-purple-200 leading-relaxed">{slide.innovation}</p>
            </div>
          </div>
        )}

        {/* Slide 3 View */}
        {slide.slideNumber === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-purple-400 font-bold block mb-1">Frontend Layer</span>
                <span className="text-slate-300">{slide.stack.frontend}</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-blue-400 font-bold block mb-1">Backend REST API</span>
                <span className="text-slate-300">{slide.stack.backend}</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">AI / ML Engine</span>
                <span className="text-slate-300">{slide.stack.aiModel}</span>
              </div>
            </div>

            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">End-to-End Advisory Workflow</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {slide.workflow.map((w, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                    {w}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Slide 4 View */}
        {slide.slideNumber === 4 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-400 text-sm">Feasibility Highlights</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {slide.feasibility.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 text-sm">Target Challenges</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {slide.challenges.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-purple-400 text-sm">Mitigation Strategy</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {slide.mitigation.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Slide 5 View */}
        {slide.slideNumber === 5 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">Environmental Benefit</span>
                <p className="text-slate-300">{slide.benefits.environmental}</p>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">Economic Benefit</span>
                <p className="text-slate-300">{slide.benefits.economic}</p>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-purple-400 font-bold block mb-1">Social Benefit</span>
                <p className="text-slate-300">{slide.benefits.social}</p>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-blue-400 font-bold block mb-1">Risk Reduction</span>
                <p className="text-slate-300">{slide.benefits.riskReduction}</p>
              </div>
            </div>
          </div>
        )}

        {/* Slide 6 View */}
        {slide.slideNumber === 6 && (
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base">Citations & Institutional Data Sources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {slide.references.map((ref, idx) => (
                <a
                  key={idx}
                  href={ref.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition flex items-center justify-between text-xs group"
                >
                  <span className="font-semibold text-slate-200 group-hover:text-purple-300">{ref.name}</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
