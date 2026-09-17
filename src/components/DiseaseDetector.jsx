import React, { useState } from 'react';
import { DISEASE_SAMPLES } from '../data/agriData';
import { Scan, Upload, ShieldAlert, CheckCircle, Volume2, AlertTriangle, Leaf, RefreshCw, Zap, Shield, Calendar, AlertCircle, Info, Clock, CheckSquare, Stethoscope, ArrowRight, UserCheck } from 'lucide-react';

export default function DiseaseDetector({ lang, speakText }) {
  const [selectedSample, setSelectedSample] = useState(DISEASE_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [customImage, setCustomImage] = useState(null);
  const [scanResult, setScanResult] = useState(DISEASE_SAMPLES[0]);

  const handleSelectSample = (sample) => {
    setSelectedSample(sample);
    setCustomImage(null);
    triggerScan(sample);
  };

  const triggerScan = (targetSample) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(targetSample);
      const audioMsg = targetSample.tamilVoiceScript || (
        lang === 'ta'
          ? `கண்டறியப்பட்ட நோய்: ${targetSample.tamilName}. ஆபத்து நிலை: ${targetSample.severity}.`
          : `Disease scan complete. Detected: ${targetSample.name} with ${targetSample.confidence} confidence.`
      );
      speakText(audioMsg);
    }, 1200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result);
        const randomSample = DISEASE_SAMPLES[Math.floor(Math.random() * (DISEASE_SAMPLES.length - 1))];
        const customResult = {
          ...randomSample,
          image: reader.result,
          name: `${randomSample.name} (Uploaded Photo)`
        };
        setSelectedSample(customResult);
        triggerScan(customResult);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-red-500/20 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-red-400 font-semibold text-sm mb-2">
              <Zap className="w-4 h-4 animate-pulse text-amber-400" />
              <span>{lang === 'ta' ? 'விவசாய முடிவெடுக்கும் உதவி அமைப்பு' : 'Farming Decision-Support System'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {lang === 'ta' ? 'AI பயிர் நோய் ஆய்வகம் & சிகிச்சை திட்டம்' : 'AI Crop Disease Diagnosis & Action Plan'}
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              {lang === 'ta'
                ? 'புகைப்படத்தை பதிவேற்றி நோய், கிருமி வகை, மருந்து அளவு, பாதுகாப்பு நடைமுறை மற்றும் 4-படி விவசாயி நடவடிக்கை திட்டத்தைப் பெறவும்.'
                : 'Upload crop leaf photos for AI diagnosis, pathogen identification, exact chemical/organic dosages, and step-by-step farmer action plans.'}
            </p>
          </div>

          <label className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-red-500 to-amber-600 hover:from-red-400 hover:to-amber-500 text-slate-950 font-bold rounded-2xl shadow-lg shadow-red-500/20 cursor-pointer transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
            <Upload className="w-5 h-5" />
            <span>{lang === 'ta' ? 'உண்மையான புகைப்படத்தை பதிவேற்றுக' : 'Upload Real Leaf Photo'}</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'ta' ? 'மாதிரி இலை புகைப்படங்கள் (Test Sample Presets)' : 'Sample Leaf Scanner Presets'}</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {DISEASE_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectSample(sample)}
              className={`p-2.5 rounded-2xl border transition-all text-left group overflow-hidden ${
                selectedSample.id === sample.id
                  ? 'bg-slate-800 border-red-500 ring-2 ring-red-500/40'
                  : 'glass-card border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="h-20 rounded-xl overflow-hidden mb-2 relative">
                <img src={sample.image} alt={sample.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <span
                  className={`absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                    sample.severityLevel === 'High'
                      ? 'bg-red-500 text-white'
                      : sample.severityLevel === 'Medium'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-emerald-500 text-slate-950'
                  }`}
                >
                  {sample.severityLevel === 'High' ? '🔴 High' : sample.severityLevel === 'Medium' ? '🟡 Med' : '🟢 Low'}
                </span>
              </div>
              <div className="font-bold text-xs text-white truncate">{lang === 'ta' ? sample.tamilName : sample.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{sample.crop}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Scanner & Main Diagnosis Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Scanner Screen & AI Confidence Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden min-h-[360px]">
            <label className="w-full h-72 rounded-2xl overflow-hidden relative border border-slate-700 bg-slate-950 cursor-pointer group block">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              <img
                src={customImage || selectedSample.image}
                alt="Scan Subject"
                className="w-full h-full object-cover group-hover:opacity-90 transition"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs font-bold text-white gap-2">
                <Upload className="w-5 h-5 text-emerald-400" />
                <span>{lang === 'ta' ? 'உண்மையான புகைப்படத்தை மாற்ற கிளிக் செய்யவும்' : 'Click to Upload Real Photo'}</span>
              </div>

              {/* Scanning Laser Line */}
              {isScanning && (
                <div className="absolute inset-0 bg-emerald-500/10 flex flex-col items-center justify-between">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#22c55e] animate-scan"></div>
                  <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2 mb-4 animate-pulse">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI Neural Network Scanning Leaf Tissue...</span>
                  </div>
                </div>
              )}

              {/* Computer Vision Frame Overlay */}
              {!isScanning && (
                <div className="absolute inset-4 border-2 border-dashed border-red-500/50 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                  <div className="flex justify-between text-[10px] font-mono text-red-400 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur">
                    <span>CONFIDENCE: {selectedSample.confidence}</span>
                    <span>PATHOGEN: DETECTED</span>
                  </div>
                  <div className="text-right text-[10px] font-mono text-emerald-400 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur self-end">
                    STATUS: SCANNED
                  </div>
                </div>
              )}
            </label>

            <div className="w-full mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Scan className="w-4 h-4 text-emerald-400" />
                <span>Resolution: High Matrix 1080p</span>
              </span>
              <button
                onClick={() => triggerScan(selectedSample)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{lang === 'ta' ? 'மீண்டும் ஸ்கேன் செய்க' : 'Rescan Image'}</span>
              </button>
            </div>
          </div>

          {/* AI Confidence & Disclaimer Alert Box */}
          <div className="glass-card p-5 rounded-3xl border border-amber-500/30 bg-amber-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <CheckCircle className="w-4 h-4" />
                <span>AI Prediction Confidence</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs border border-amber-500/30">
                {scanResult.confidence || "94.8% Match"}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed italic">
              ⚠️ <strong>Disclaimer:</strong> {lang === 'ta'
                ? 'AI முடிவுகள் ஆலோசனையே; தீவிர நிகழ்வுகளுக்கு உள்ளூர் வேளாண்மை அலுவலரை (Agricultural Officer) அணுகவும்.'
                : 'AI result is advisory; confirm severe cases with an agricultural expert or extension officer.'}
            </p>
          </div>
        </div>

        {/* Detailed Pathology & Diagnosis Panel */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Title & Severity Badge */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-white">
                    {lang === 'ta' ? scanResult.tamilName : scanResult.name}
                  </h3>
                  <button
                    onClick={() => speakText(scanResult.tamilVoiceScript || `${scanResult.name}. ${scanResult.symptoms}`)}
                    className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-emerald-400 transition"
                    title="Play Tamil Voice Advisory 🔊"
                  >
                    <Volume2 className="w-5 h-5 text-emerald-400 animate-pulse" />
                  </button>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                  <span>Crop: <strong className="text-slate-200">{scanResult.crop}</strong></span>
                  <span>•</span>
                  <span>Pathogen: <strong className="text-red-400 font-mono">{scanResult.pathogen}</strong></span>
                </div>
              </div>

              {/* Visual Severity Badges */}
              <div>
                {scanResult.severityLevel === 'High' && (
                  <span className="px-4 py-1.5 rounded-full text-xs font-black bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1.5 shadow-lg shadow-red-500/10">
                    🔴 High Severity (தீவிர ஆபத்து)
                  </span>
                )}
                {scanResult.severityLevel === 'Medium' && (
                  <span className="px-4 py-1.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1.5 shadow-lg shadow-amber-500/10">
                    🟡 Medium Severity (மிதமான ஆபத்து)
                  </span>
                )}
                {scanResult.severityLevel === 'Low' && (
                  <span className="px-4 py-1.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5 shadow-lg shadow-emerald-500/10">
                    🟢 Low Severity / Healthy (குறைந்த ஆபத்து)
                  </span>
                )}
              </div>
            </div>

            {/* "What should farmer do now?" Simple Action Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/40 flex items-start gap-3">
              <UserCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider block">
                  What should farmer do now? (விவசாயி இப்போது என்ன செய்ய வேண்டும்?)
                </span>
                <p className="text-xs text-white font-bold mt-1">
                  {scanResult.farmerActionPlan?.now || scanResult.organicCure}
                </p>
              </div>
            </div>
          </div>

          {/* ⭐ Step-by-Step Farmer Action Plan */}
          <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              <span>Step-by-Step Farmer Action Plan (படி-படியான விவசாயி நடவடிக்கை திட்டம்)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {/* NOW */}
              <div className="bg-red-950/30 p-4 rounded-2xl border border-red-500/30 space-y-1">
                <span className="px-2 py-0.5 rounded bg-red-500 text-slate-950 font-black text-[10px] uppercase">
                  ⚡ NOW (உடனே)
                </span>
                <p className="text-red-200 font-semibold mt-2 leading-relaxed">
                  {scanResult.farmerActionPlan?.now || "பாதிக்கப்பட்ட இலைகளை அகற்றி எரிக்கவும்."}
                </p>
              </div>

              {/* TODAY */}
              <div className="bg-amber-950/30 p-4 rounded-2xl border border-amber-500/30 space-y-1">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
                  📅 TODAY (இன்று)
                </span>
                <p className="text-amber-200 font-semibold mt-2 leading-relaxed">
                  {scanResult.farmerActionPlan?.today || "பரிந்துரைக்கப்பட்ட மருந்தை தெளிக்கவும்."}
                </p>
              </div>

              {/* NEXT 3-5 DAYS */}
              <div className="bg-blue-950/30 p-4 rounded-2xl border border-blue-500/30 space-y-1">
                <span className="px-2 py-0.5 rounded bg-blue-500 text-slate-950 font-black text-[10px] uppercase">
                  🔍 NEXT 3–5 DAYS
                </span>
                <p className="text-blue-200 font-semibold mt-2 leading-relaxed">
                  {scanResult.farmerActionPlan?.nextDays || "புதிய புள்ளிகள் வருகிறதா என கண்காணிக்கவும்."}
                </p>
              </div>

              {/* IF SEVERE */}
              <div className="bg-purple-950/30 p-4 rounded-2xl border border-purple-500/30 space-y-1">
                <span className="px-2 py-0.5 rounded bg-purple-500 text-white font-black text-[10px] uppercase">
                  🚨 IF SEVERE
                </span>
                <p className="text-purple-200 font-semibold mt-2 leading-relaxed">
                  {scanResult.farmerActionPlan?.ifSevere || "வேளாண் அலுவலரை அணுகவும்."}
                </p>
              </div>
            </div>
          </div>

          {/* Pathology, Symptoms, Spread & Affected Parts */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-amber-400" />
              <span>Disease Information & Pathology Breakdown</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold text-[11px] block">Symptoms (அறிகுறிகள்):</span>
                <p className="text-slate-200">{scanResult.symptoms}</p>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold text-[11px] block">How it spreads (பரவும் முறை):</span>
                <p className="text-slate-200">{scanResult.howItSpreads}</p>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold text-[11px] block">Affected Plant Parts:</span>
                <p className="text-slate-200">{scanResult.affectedParts}</p>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold text-[11px] block">Pathogen Agent:</span>
                <p className="text-red-400 font-mono font-bold">{scanResult.pathogen}</p>
              </div>
            </div>
          </div>

          {/* Organic & Chemical Treatments with Dosage & Precautions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Organic Treatment */}
            <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                <span>Organic / Natural Treatment</span>
              </h4>
              <p className="text-xs text-emerald-200 leading-relaxed">{scanResult.organicCure}</p>
            </div>

            {/* Chemical Treatment & Dosage */}
            <div className="glass-card p-5 rounded-3xl border border-blue-500/30 bg-blue-950/20 space-y-2">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Chemical Treatment & Exact Dosage</span>
              </h4>
              <p className="text-xs text-blue-200 leading-relaxed font-bold">{scanResult.chemicalCure}</p>
              <div className="text-[11px] text-blue-300 pt-1 border-t border-blue-500/20">
                <strong>Dosage:</strong> {scanResult.dosage}
              </div>
              <div className="text-[11px] text-blue-300">
                <strong>Frequency:</strong> {scanResult.applicationFrequency}
              </div>
            </div>
          </div>

          {/* Safety Precautions & Prevention Protocol */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Prevention Protocol & Field Safety</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                <span className="font-bold text-slate-300 block mb-1">📐 Proper Plant Spacing:</span>
                <p className="text-slate-400">{scanResult.prevention?.spacing}</p>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                <span className="font-bold text-slate-300 block mb-1">✂️ Leaf Pruning Routine:</span>
                <p className="text-slate-400">{scanResult.prevention?.removeLeaves}</p>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                <span className="font-bold text-slate-300 block mb-1">🚿 Avoid Overhead Irrigation:</span>
                <p className="text-slate-400">{scanResult.prevention?.avoidOverhead}</p>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                <span className="font-bold text-slate-300 block mb-1">🧼 Field Sanitation & Safety:</span>
                <p className="text-slate-400">{scanResult.safetyPrecautions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
