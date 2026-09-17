import React, { useState } from 'react';
import CropRecommender from './components/CropRecommender';
import DiseaseDetector from './components/DiseaseDetector';
import FertilizerAdvisory from './components/FertilizerAdvisory';
import MarketIntelligence from './components/MarketIntelligence';
import WeatherAlerts from './components/WeatherAlerts';
import ConsolidatedAdvisory from './components/ConsolidatedAdvisory';
import ProfileSettings from './components/ProfileSettings';
import TechInfographic from './components/TechInfographic';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import PptViewer from './components/PptViewer';
import LoginPage from './components/LoginPage';
import { FARMER_PROFILE } from './data/agriData';
import { Sprout, Scan, CloudRain, Store, Mic, User, Layers, Smartphone, Monitor, Download, Bell, MapPin, Volume2, ShieldCheck, ChevronRight, CheckCircle2, Play, Award, Sparkles, CheckSquare, Presentation, Zap, LogOut } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to active home dashboard
  const [userProfile, setUserProfile] = useState(FARMER_PROFILE);
  const [activeScreen, setActiveScreen] = useState('home'); // 'home' | 'recommender' | 'disease' | 'weather' | 'market' | 'voice' | 'advisory' | 'profile' | 'infographic' | 'ppt'
  const [lang, setLang] = useState('ta'); // 'ta' or 'en'
  const [viewMode, setViewMode] = useState('widescreen'); // Direct full responsive layout
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechSubtitle, setSpeechSubtitle] = useState('');

  const handleLoginSuccess = (profile) => {
    setUserProfile(prev => ({
      ...(prev || FARMER_PROFILE),
      name: profile?.name || 'Ramesh',
      phone: profile?.phone || '+91 98765 43210',
      location: profile?.location || 'Coimbatore, Tamil Nadu'
    }));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeechSubtitle(text);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      // Voice Picker Fallback Algorithm
      const voices = window.speechSynthesis.getVoices();
      let targetVoice = null;

      if (lang === 'ta') {
        targetVoice = voices.find(v => v.lang.includes('ta') || v.lang.includes('TA')) ||
                      voices.find(v => v.lang.includes('hi') || v.lang.includes('HI')) ||
                      voices.find(v => v.lang.includes('en-IN'));
        utterance.lang = targetVoice ? targetVoice.lang : 'ta-IN';
      } else {
        targetVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-IN'));
        utterance.lang = targetVoice ? targetVoice.lang : 'en-US';
      }

      if (targetVoice) {
        utterance.voice = targetVoice;
      }

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => {
        setIsPlayingAudio(false);
        setSpeechSubtitle('');
      };
      utterance.onerror = () => {
        setIsPlayingAudio(false);
        setSpeechSubtitle('');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech Synthesis is not supported in this browser.");
    }
  };

  const navGrid = [
    { id: 'recommender', label: lang === 'ta' ? 'பயிர் பரிந்துரை' : 'Crop Recommendation', icon: Sprout, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { id: 'disease', label: lang === 'ta' ? 'நோய் கண்டறிதல்' : 'Disease Detection', icon: Scan, color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { id: 'weather', label: lang === 'ta' ? 'வானிலை எச்சரிக்கை' : 'Weather Alerts', icon: CloudRain, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'market', label: lang === 'ta' ? 'சந்தை விலை' : 'Market Prices', icon: Store, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { id: 'voice', label: lang === 'ta' ? 'குரல் உதவி' : 'Voice Assistant', icon: Mic, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { id: 'profile', label: lang === 'ta' ? 'எனது சுயவிவரம்' : 'My Profile', icon: User, color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' }
  ];

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} lang={lang} setLang={setLang} />;
  }

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Clean Production Top Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-2.5 text-xs font-semibold">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="text-white font-black text-sm">
              Smart Crop Advisory System
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-800 transition flex items-center gap-1 text-[11px]"
              title="Logout / Switch Account"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Logout</span>
            </button>

            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-[11px]">
              <button
                onClick={() => setLang('ta')}
                className={`px-2.5 py-0.5 rounded-lg font-bold transition ${lang === 'ta' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-0.5 rounded-lg font-bold transition ${lang === 'en' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}
              >
                En
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Responsive Body */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        {viewMode === 'mobile' ? (
          /* Mobile Smartphone Frame Simulation */
          <div className="w-full max-w-[410px] bg-slate-950 rounded-[48px] border-[10px] border-slate-900 shadow-2xl overflow-hidden min-h-[780px] flex flex-col relative ring-1 ring-slate-800">
            {/* Speaker & Notch */}
            <div className="w-full h-7 bg-slate-950 flex items-center justify-center pt-2 relative z-30">
              <div className="w-24 h-4 bg-slate-900 rounded-full"></div>
            </div>

            {/* Mobile Header Bar */}
            <div className="px-5 py-3 bg-slate-950/90 backdrop-blur border-b border-slate-900 flex items-center justify-between">
              <button onClick={() => setActiveScreen('home')} className="text-white font-extrabold text-sm flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span>Smart Crop Advisory</span>
              </button>
              <button onClick={() => alert("Notification: Tomorrow rain expected.")} className="text-slate-400 hover:text-white relative">
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5"></span>
              </button>
            </div>

            {/* Mobile Screen Router Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {activeScreen === 'home' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Farmer Welcome Banner */}
                  <div className="flex items-center justify-between bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                    <div>
                      <h3 className="font-extrabold text-white text-sm">
                        {lang === 'ta' ? `வணக்கம், ${userProfile?.name || 'ரமேஷ்'} 👋` : `Vanakkam, ${userProfile?.name || 'Ramesh'} 👋`}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{userProfile?.location || 'Coimbatore, Tamil Nadu'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1 text-[10px]">
                      <button
                        onClick={() => setLang('ta')}
                        className={`px-2 py-0.5 rounded ${lang === 'ta' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                      >
                        தமிழ்
                      </button>
                      <button
                        onClick={() => setLang('en')}
                        className={`px-2 py-0.5 rounded ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                      >
                        En
                      </button>
                    </div>
                  </div>

                  {/* 6 Launcher Tiles */}
                  <div className="grid grid-cols-2 gap-3">
                    {navGrid.map((tile) => {
                      const Icon = tile.icon;
                      return (
                        <button
                          key={tile.id}
                          onClick={() => {
                            if (tile.id === 'voice') setIsVoiceModalOpen(true);
                            else setActiveScreen(tile.id);
                          }}
                          className={`p-3.5 rounded-2xl border text-left flex flex-col items-center justify-center text-center gap-2 transition transform active:scale-95 ${tile.color}`}
                        >
                          <Icon className="w-6 h-6" />
                          <span className="font-extrabold text-xs text-white leading-tight">{tile.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Today's Advisory Card */}
                  <div className="glass-card p-4 rounded-2xl border border-blue-500/30 bg-blue-950/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-blue-400">
                      <span className="flex items-center gap-1.5">
                        <CloudRain className="w-4 h-4" />
                        <span>{lang === 'ta' ? 'இன்றைய விவசாய ஆலோசனை' : "Today's Advisory"}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px]">Coimbatore</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                      {lang === 'ta'
                        ? 'நாளை மழை பெய்ய 70% வாய்ப்பு உள்ளது. இன்று பூச்சிக்கொல்லி தெளிப்பதைத் தவிர்க்கவும். பாசனத்தை ஒத்திவைக்கவும்.'
                        : 'Rain expected tomorrow (70% prob). Avoid spraying pesticides today. Irrigation can be postponed.'}
                    </p>
                  </div>

                  {/* ⭐ Step-by-Step Farmer Action Plan */}
                  <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{lang === 'ta' ? 'விவசாயி நடவடிக்கை திட்டம்' : 'Farmer Action Plan'}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        LIVE SUPPORT
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200">
                        <strong className="block text-red-400 font-extrabold mb-0.5">⚡ NOW (உடனே)</strong>
                        <span>பாதிக்கப்பட்ட இலைகளை அகற்றி எரிக்கவும்.</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200">
                        <strong className="block text-amber-400 font-extrabold mb-0.5">📅 TODAY (இன்று)</strong>
                        <span>Tricyclazole மருந்து தெளிக்கவும்.</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-200">
                        <strong className="block text-blue-400 font-extrabold mb-0.5">🔍 NEXT 3–5 DAYS</strong>
                        <span>புதிய புள்ளிகள் வருகிறதா பார்க்கவும்.</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200">
                        <strong className="block text-purple-400 font-extrabold mb-0.5">🚨 IF SEVERE</strong>
                        <span>வேளாண் அலுவலரை அணுகவும்.</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action: Consolidated Advisory Link */}
                  <button
                    onClick={() => setActiveScreen('advisory')}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'ta' ? 'ஒருங்கிணைந்த அறிக்கை காண்க (PDF Report)' : 'View Consolidated PDF Advisory'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {activeScreen === 'recommender' && <CropRecommender lang={lang} speakText={speakText} />}
              {activeScreen === 'disease' && <DiseaseDetector lang={lang} speakText={speakText} />}
              {activeScreen === 'weather' && <WeatherAlerts lang={lang} speakText={speakText} />}
              {activeScreen === 'market' && <MarketIntelligence lang={lang} speakText={speakText} />}
              {activeScreen === 'advisory' && <ConsolidatedAdvisory lang={lang} speakText={speakText} />}
              {activeScreen === 'profile' && <ProfileSettings userProfile={userProfile} setUserProfile={setUserProfile} lang={lang} setLang={setLang} handleLogout={handleLogout} />}
              {activeScreen === 'infographic' && <TechInfographic lang={lang} />}
              {activeScreen === 'ppt' && <PptViewer lang={lang} />}
            </div>

            {/* Green Tamil Voice Mic Bar ("பேசுங்கள்") */}
            <div className="p-3 bg-slate-950 border-t border-slate-900">
              <button
                onClick={() => setIsVoiceModalOpen(true)}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition"
              >
                <Mic className="w-5 h-5 animate-pulse" />
                <span>{lang === 'ta' ? 'பேசுங்கள் (Talk in Tamil)' : 'Speak Query (Tamil)'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Widescreen / Infographic View Mode */
          <div className="w-full max-w-7xl mx-auto space-y-6">
            {/* Top Navigation Router */}
            <div className="glass-card p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveScreen('home')}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs transition ${
                    activeScreen === 'home' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Home Overview
                </button>
                {navGrid.map((tile) => (
                  <button
                    key={tile.id}
                    onClick={() => {
                      if (tile.id === 'voice') setIsVoiceModalOpen(true);
                      else setActiveScreen(tile.id);
                    }}
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
                      activeScreen === tile.id ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tile.label}
                  </button>
                ))}
                <button
                  onClick={() => setActiveScreen('advisory')}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
                    activeScreen === 'advisory' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Consolidated Advisory
                </button>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-[11px] shrink-0">
                <button
                  onClick={() => setLang('ta')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${lang === 'ta' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}
                >
                  தமிழ்
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${lang === 'en' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Widescreen Screen Router Content */}
            {activeScreen === 'home' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CropRecommender lang={lang} speakText={speakText} />
                  <DiseaseDetector lang={lang} speakText={speakText} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <WeatherAlerts lang={lang} speakText={speakText} />
                  <MarketIntelligence lang={lang} speakText={speakText} />
                </div>
              </div>
            )}
            {activeScreen === 'recommender' && <CropRecommender lang={lang} speakText={speakText} />}
            {activeScreen === 'disease' && <DiseaseDetector lang={lang} speakText={speakText} />}
            {activeScreen === 'weather' && <WeatherAlerts lang={lang} speakText={speakText} />}
            {activeScreen === 'market' && <MarketIntelligence lang={lang} speakText={speakText} />}
            {activeScreen === 'advisory' && <ConsolidatedAdvisory lang={lang} speakText={speakText} />}
            {activeScreen === 'profile' && <ProfileSettings userProfile={userProfile} setUserProfile={setUserProfile} lang={lang} setLang={setLang} handleLogout={handleLogout} />}
          </div>
        )}
      </div>

      {/* Audio Playback Indicator & Subtitles Toast */}
      {isPlayingAudio && (
        <div className="fixed bottom-6 right-6 z-50 glass-card px-5 py-4 rounded-3xl border border-emerald-500/50 bg-emerald-950/90 text-emerald-200 text-xs font-bold shadow-2xl flex items-center gap-4 max-w-md animate-bounce">
          <div className="p-2 rounded-2xl bg-emerald-500 text-slate-950 shrink-0">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">
              🔊 AUDIO SPEECH ADVISORY PLAYING
            </span>
            <p className="text-xs text-white leading-relaxed line-clamp-2">
              "{speechSubtitle}"
            </p>
          </div>
        </div>
      )}

      {/* Voice Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        lang={lang}
        speakText={speakText}
      />
    </div>
  );
}
