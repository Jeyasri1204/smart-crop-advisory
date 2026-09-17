import React, { useState } from 'react';
import { CROP_DATABASE, WEATHER_ALERTS } from '../data/agriData';
import { Droplets, CloudRain, Sun, Calendar, ShieldCheck, Info, Volume2, Sparkles, Scale } from 'lucide-react';

export default function FertilizerAdvisory({ lang, speakText }) {
  const [selectedCrop, setSelectedCrop] = useState(CROP_DATABASE[0]);
  const [landArea, setLandArea] = useState(2); // Acres
  const [growthStage, setGrowthStage] = useState('Vegetative');

  const stages = [
    { id: 'Basal', title: 'Basal / Sowing Stage (விதைக்கும் பருவம்)', N: 0.25, P: 1.0, K: 0.33, note: 'Apply full Phosphorus and initial Nitrogen split.' },
    { id: 'Vegetative', title: 'Vegetative Stage (வளர்ச்சிப் பருவம்)', N: 0.50, P: 0.0, K: 0.33, note: 'Top dress Nitrogen to promote rapid tillering and foliage.' },
    { id: 'Flowering', title: 'Flowering / Panicle Stage (பூக்கும் பருவம்)', N: 0.25, P: 0.0, K: 0.34, note: 'Apply Potassium split to boost grain weight and disease resistance.' },
    { id: 'Harvest', title: 'Pre-Harvest Stage (அறுவடைக்கு முன்)', N: 0.0, P: 0.0, K: 0.0, note: 'Stop fertilizer application. Drain field 10 days before harvest.' }
  ];

  const currentStageInfo = stages.find(s => s.id === growthStage) || stages[1];

  // Calculate NPK Dosage Bags (50kg bags)
  const calculateFertilizers = () => {
    const baseN = selectedCrop.optimalNPK.N * landArea * currentStageInfo.N;
    const baseP = selectedCrop.optimalNPK.P * landArea * currentStageInfo.P;
    const baseK = selectedCrop.optimalNPK.K * landArea * currentStageInfo.K;

    // Standard fertilizer formulas:
    // DAP (18% N, 46% P2O5)
    // Urea (46% N)
    // MOP (60% K2O)

    const dapKg = Math.round(baseP / 0.46);
    const nitrogenFromDap = dapKg * 0.18;
    const remainingN = Math.max(0, baseN - nitrogenFromDap);
    const ureaKg = Math.round(remainingN / 0.46);
    const mopKg = Math.round(baseK / 0.60);

    return {
      ureaKg,
      ureaBags: (ureaKg / 50).toFixed(1),
      dapKg,
      dapBags: (dapKg / 50).toFixed(1),
      mopKg,
      mopBags: (mopKg / 50).toFixed(1)
    };
  };

  const fert = calculateFertilizers();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-blue-500/20 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm mb-2">
              <Droplets className="w-4 h-4" />
              <span>{lang === 'ta' ? 'ICAR வழிகாட்டுதல்கள்' : 'ICAR Fertigation Guidelines'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {lang === 'ta' ? 'உரம் மற்றும் பாசன வழிகாட்டி' : 'Fertilizer & Irrigation Schedule'}
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              {lang === 'ta'
                ? 'உங்கள் பயிரின் வளர்ச்சிக்கேற்ப தேவையான உ உர மூட்டைகள் மற்றும் பாசன திட்டத்தை கணக்கிடுங்கள்.'
                : 'Customized NPK fertilizer bag dosages and weather-smart irrigation advisories for your exact land acreage.'}
            </p>
          </div>

          <button
            onClick={() =>
              speakText(
                lang === 'ta'
                  ? `${selectedCrop.tamilName} பயிருக்கு ${landArea} ஏக்கருக்கு தேவையான உரம்: யூரியா ${fert.ureaKg} கிலோ, டி.ஏ.பி ${fert.dapKg} கிலோ, பொட்டாஷ் ${fert.mopKg} கிலோ.`
                  : `Fertilizer dosage for ${landArea} acres of ${selectedCrop.name}: Urea ${fert.ureaKg} kg, DAP ${fert.dapKg} kg, MOP ${fert.mopKg} kg.`
              )
            }
            className="w-full md:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-2xl border border-slate-700 transition flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ta' ? 'குரல் வழி ஆலோசனையைக் கேள்' : 'Listen Audio Advisory'}</span>
          </button>
        </div>
      </div>

      {/* Main Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-1 glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-400" />
            <span>{lang === 'ta' ? 'நிலம் மற்றும் பயிர் விவரம்' : 'Farm Details'}</span>
          </h3>

          {/* Crop Selector */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-semibold block">Select Target Crop</label>
            <select
              value={selectedCrop.id}
              onChange={(e) => {
                const c = CROP_DATABASE.find(item => item.id === e.target.value);
                if (c) setSelectedCrop(c);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {CROP_DATABASE.map(c => (
                <option key={c.id} value={c.id}>{lang === 'ta' ? c.tamilName : c.name}</option>
              ))}
            </select>
          </div>

          {/* Land Area Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Land Area (Acres)</span>
              <span className="text-blue-400 font-bold">{landArea} Acres ({ (landArea * 0.404).toFixed(1) } Ha)</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="25"
              step="0.5"
              value={landArea}
              onChange={(e) => setLandArea(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Crop Growth Stage Selector */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-semibold block">Growth Stage (பயிர் பருவம்)</label>
            <div className="grid grid-cols-1 gap-2">
              {stages.map(stg => (
                <button
                  key={stg.id}
                  onClick={() => setGrowthStage(stg.id)}
                  className={`p-3 rounded-xl text-left border text-xs transition ${
                    growthStage === stg.id
                      ? 'bg-blue-950/60 border-blue-500 text-blue-200 font-bold'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {stg.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Dosage Grid & Weather Smart Advice */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stage Note */}
          <div className="glass-card p-4 rounded-2xl border border-blue-500/30 flex items-start gap-3 bg-blue-950/20">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-blue-300 block">{currentStageInfo.title}</span>
              <p className="text-xs text-slate-300 mt-0.5">{currentStageInfo.note}</p>
            </div>
          </div>

          {/* Dosage Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Urea */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl"></div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Urea (46% Nitrogen)</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-400">{fert.ureaKg}</span>
                <span className="text-xs text-slate-400 font-bold">kg total</span>
              </div>
              <div className="mt-2 text-xs text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 inline-block">
                <strong>{fert.ureaBags}</strong> Bags (50kg each)
              </div>
            </div>

            {/* DAP */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-xl"></div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">DAP (Phosphorus)</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-blue-400">{fert.dapKg}</span>
                <span className="text-xs text-slate-400 font-bold">kg total</span>
              </div>
              <div className="mt-2 text-xs text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 inline-block">
                <strong>{fert.dapBags}</strong> Bags (50kg each)
              </div>
            </div>

            {/* MOP */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-xl"></div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">MOP (Potassium)</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-amber-400">{fert.mopKg}</span>
                <span className="text-xs text-slate-400 font-bold">kg total</span>
              </div>
              <div className="mt-2 text-xs text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 inline-block">
                <strong>{fert.mopBags}</strong> Bags (50kg each)
              </div>
            </div>
          </div>

          {/* Weather Integrated Irrigation Widget */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span>{lang === 'ta' ? 'வானிலை பாசன வழிகாட்டி (Weather-Smart Irrigation)' : 'Real-Time Agrometeorological Advisory'}</span>
            </h3>

            <div className="space-y-3">
              {WEATHER_ALERTS.map(alert => (
                <div key={alert.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    alert.type === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {alert.type === 'warning' ? <CloudRain className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-slate-200">{alert.location} Alert</div>
                    <div className="text-slate-400 mt-0.5">{alert.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
