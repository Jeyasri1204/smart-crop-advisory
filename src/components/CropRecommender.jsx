import React, { useState } from 'react';
import { CROP_DATABASE, REGION_PRESETS } from '../data/agriData';
import { Sprout, Sliders, MapPin, CheckCircle2, Volume2, Sparkles, TrendingUp, Droplets, Calendar, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CropRecommender({ lang, speakText }) {
  const [nitrogen, setNitrogen] = useState(115);
  const [phosphorus, setPhosphorus] = useState(58);
  const [potassium, setPotassium] = useState(62);
  const [ph, setPh] = useState(6.6);
  const [rainfall, setRainfall] = useState(1000);
  const [soilType, setSoilType] = useState('Clay Loam');
  const [selectedPreset, setSelectedPreset] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleApplyPreset = (preset) => {
    setSelectedPreset(preset.name);
    setNitrogen(preset.N);
    setPhosphorus(preset.P);
    setPotassium(preset.K);
    setPh(preset.pH);
    setRainfall(preset.rainfall);
    setSoilType(preset.soil);
  };

  const calculateBestCrops = () => {
    setIsCalculating(true);
    setTimeout(() => {
      // AI Soil Matching Scoring Logic
      const scored = CROP_DATABASE.map(crop => {
        const req = crop.optimalNPK;
        const nDiff = Math.abs(nitrogen - req.N) / 250;
        const pDiff = Math.abs(phosphorus - req.P) / 150;
        const kDiff = Math.abs(potassium - req.K) / 150;
        const phDiff = Math.abs(ph - req.pH) / 4;
        
        const totalError = (nDiff * 0.3) + (pDiff * 0.25) + (kDiff * 0.25) + (phDiff * 0.2);
        const matchScore = Math.max(60, Math.round((1 - totalError) * 100));

        return {
          ...crop,
          matchScore
        };
      });

      scored.sort((a, b) => b.matchScore - a.matchScore);
      setRecommendations(scored);
      setIsCalculating(false);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}

      // Audio notification
      const topCrop = scored[0];
      const speechMsg = lang === 'ta'
        ? `உங்களுக்கு ஏற்ற சிறந்த பயிர் ${topCrop.tamilName}. பொருத்தம் ${topCrop.matchScore} சதவீதம்.`
        : `Top recommended crop for your soil profile is ${topCrop.name} with a ${topCrop.matchScore}% suitability match.`;
      speakText(speechMsg);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-emerald-500/20 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>{lang === 'ta' ? 'AI மண் மற்றும் பயிர் பொருந்தும் இயந்திரம்' : 'AI Soil-to-Crop Matcher'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {lang === 'ta' ? 'பயிர் பரிந்துரை இன்ஜின்' : 'Smart Crop Recommendation Engine'}
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              {lang === 'ta'
                ? 'உங்கள் நிலத்தின் NPK சத்துக்கள் மற்றும் காலநிலைக்கு ஏற்ற சிறந்த விளைச்சல் தரும் பயிர்களை AI மூலம் அறியலாம்.'
                : 'Input your soil test N-P-K parameters and regional weather data to calculate optimal high-yielding crops.'}
            </p>
          </div>
          <button
            onClick={calculateBestCrops}
            disabled={isCalculating}
            className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {isCalculating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                {lang === 'ta' ? 'கணக்கிடுகிறது...' : 'Analyzing Soil Data...'}
              </span>
            ) : (
              <>
                <Sprout className="w-5 h-5" />
                <span>{lang === 'ta' ? 'பயிர் பரிந்துரை பெறுக' : 'Generate Recommendation'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'ta' ? 'பிராந்திய மண் முன்அமைப்புகள் (Quick Presets)' : 'Quick Region Presets'}</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {REGION_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className={`p-3.5 rounded-2xl text-left border transition-all text-xs ${
                selectedPreset === preset.name
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                  : 'glass-card border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="font-bold text-sm text-slate-100">{preset.name}</div>
              <div className="text-slate-400 mt-1 flex items-center justify-between">
                <span>{preset.soil}</span>
                <span className="text-emerald-400 font-medium">NPK: {preset.N}-{preset.P}-{preset.K}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Grid & Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Card */}
        <div className="lg:col-span-1 glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">
              {lang === 'ta' ? 'மண் அளவுருக்கள் (Soil Test Inputs)' : 'Soil Test Parameters'}
            </h3>
          </div>

          {/* Nitrogen Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Nitrogen (N)</span>
              <span className="text-emerald-400 font-bold">{nitrogen} kg/ha</span>
            </div>
            <input
              type="range"
              min="20"
              max="250"
              value={nitrogen}
              onChange={(e) => setNitrogen(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Low (20)</span>
              <span>Optimal (120)</span>
              <span>High (250)</span>
            </div>
          </div>

          {/* Phosphorus Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Phosphorus (P)</span>
              <span className="text-emerald-400 font-bold">{phosphorus} kg/ha</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              value={phosphorus}
              onChange={(e) => setPhosphorus(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Low (10)</span>
              <span>Optimal (60)</span>
              <span>High (150)</span>
            </div>
          </div>

          {/* Potassium Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Potassium (K)</span>
              <span className="text-emerald-400 font-bold">{potassium} kg/ha</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              value={potassium}
              onChange={(e) => setPotassium(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Low (10)</span>
              <span>Optimal (60)</span>
              <span>High (150)</span>
            </div>
          </div>

          {/* Soil pH */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Soil pH Level</span>
              <span className="text-teal-400 font-bold">{ph}</span>
            </div>
            <input
              type="range"
              min="4.5"
              max="9.0"
              step="0.1"
              value={ph}
              onChange={(e) => setPh(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Acidic (4.5)</span>
              <span>Neutral (7.0)</span>
              <span>Alkaline (9.0)</span>
            </div>
          </div>

          {/* Soil Type Selector */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-semibold block">Soil Type</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="Clay Loam">Clay Loam (களிமண் கலவை)</option>
              <option value="Black Cotton Soil">Black Cotton Soil (கரிசல் மண்)</option>
              <option value="Red Sandy Loam">Red Sandy Loam (செம்மண்)</option>
              <option value="Alluvial Soil">Alluvial Soil (வண்டல் மண்)</option>
              <option value="Saline Soil">Saline / Coastal Soil (உவர் மண்)</option>
            </select>
          </div>

          {/* Rainfall */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Annual Rainfall</span>
              <span className="text-blue-400 font-bold">{rainfall} mm</span>
            </div>
            <input
              type="range"
              min="300"
              max="2000"
              step="50"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
            />
          </div>
        </div>

        {/* Results Output View */}
        <div className="lg:col-span-2 space-y-4">
          {!recommendations ? (
            <div className="glass-card p-12 rounded-3xl border border-slate-800 text-center flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                <Sprout className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {lang === 'ta' ? 'பரிந்துரை தயாரிக்க தயார்' : 'Ready for AI Soil Analysis'}
              </h3>
              <p className="text-slate-400 text-xs max-w-md">
                {lang === 'ta'
                  ? 'மேலே உள்ள மண் சத்துக்களை சரிசெய்து "பயிர் பரிந்துரை பெறுக" பொத்தானை அழுத்தவும்.'
                  : 'Adjust soil NPK sliders on the left or select a Quick Preset, then click "Generate Recommendation".'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{lang === 'ta' ? 'பரிந்துரைக்கப்பட்ட பயிர்கள் (AI Top Matches)' : 'Top AI Recommended Crops'}</span>
                </h3>
                <span className="text-xs text-slate-400">
                  {recommendations.length} {lang === 'ta' ? 'பயிர்கள் பகுப்பாய்வு செய்யப்பட்டன' : 'crops evaluated'}
                </span>
              </div>

              {recommendations.map((crop, index) => (
                <div
                  key={crop.id}
                  className={`glass-card p-6 rounded-3xl border transition-all ${
                    index === 0
                      ? 'border-emerald-500/50 bg-emerald-950/20 shadow-xl shadow-emerald-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                          index === 0
                            ? 'bg-emerald-500 text-slate-950'
                            : index === 1
                            ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        #{index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-white text-lg">{lang === 'ta' ? crop.tamilName : crop.name}</h4>
                          {index === 0 && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                              BEST MATCH
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{crop.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-400">{crop.matchScore}%</div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Suitability Index</div>
                      </div>
                      <button
                        onClick={() =>
                          speakText(
                            lang === 'ta'
                              ? `${crop.tamilName}. எதிர்பார்க்கப்படும் மகசூல்: ${crop.expectedYield}. வருமானம்: ${crop.profitPotential}`
                              : `${crop.name}. Expected yield: ${crop.expectedYield}. Profit potential: ${crop.profitPotential}`
                          )
                        }
                        className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition"
                        title="Voice Guidance"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-400" /> Expected Yield
                      </span>
                      <span className="font-bold text-slate-100 text-xs mt-1 block">{crop.expectedYield}</span>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] font-medium flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-blue-400" /> Water Requirement
                      </span>
                      <span className="font-bold text-slate-100 text-xs mt-1 block">{crop.waterReq}</span>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-400" /> Duration
                      </span>
                      <span className="font-bold text-slate-100 text-xs mt-1 block">{crop.durationDays}</span>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] font-medium flex items-center gap-1">
                        <Award className="w-3 h-3 text-teal-400" /> Profit Potential
                      </span>
                      <span className="font-bold text-emerald-400 text-xs mt-1 block">{crop.profitPotential}</span>
                    </div>
                  </div>

                  {/* Agronomic Tips */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Key Agronomic Advice:</span>
                    <ul className="space-y-1">
                      {crop.tips.map((tip, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
