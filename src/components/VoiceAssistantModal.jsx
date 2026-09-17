import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, MessageSquare, Bot } from 'lucide-react';

export default function VoiceAssistantModal({ isOpen, onClose, lang, speakText }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantReply, setAssistantReply] = useState('');

  const sampleQueries = lang === 'ta' ? [
    "நெல் பயிருக்கு எவ்வளவு உரம் இட வேண்டும்?",
    "தக்காளி இலையில் கருகல் நோய் உள்ளது என்ன மருந்து வைக்கலாம்?",
    "இன்றைய நெல் சந்தை விலை என்ன?"
  ] : [
    "What is the recommended fertilizer for Paddy?",
    "How to cure Tomato Early Blight disease?",
    "What is the current Mandi price for Cotton?"
  ];

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript(lang === 'ta' ? 'கேட்கிறது... தயவுசெய்து பேசவும்' : 'Listening... Speak now');

    // Simulate Speech-to-Text Recognition
    setTimeout(() => {
      setIsListening(false);
      const chosenQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setTranscript(chosenQuery);
      processQuery(chosenQuery);
    }, 2500);
  };

  const processQuery = (query) => {
    let reply = '';
    if (query.includes('நெல்') || query.includes('Paddy')) {
      reply = lang === 'ta'
        ? 'நெல் பயிருக்கு ஏக்கருக்கு 120 கிலோ யூரியா, 60 கிலோ டிஏபி, மற்றும் 60 கிலோ பொட்டாஷ் இட பரிந்துரைக்கப்படுகிறது.'
        : 'For Paddy crop, standard recommended dosage per acre is 120kg Urea, 60kg DAP, and 60kg MOP in 3 split doses.';
    } else if (query.includes('தக்காளி') || query.includes('Tomato')) {
      reply = lang === 'ta'
        ? 'தக்காளி இலை கருகல் நோய்க்கு மாங்கோசெப் 2 கிராம் ஒரு லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும் அல்லது வேப்ப எண்ணெய் 3% தெளிக்கவும்.'
        : 'For Tomato Early Blight, spray Mancozeb 75% WP @ 2g/L or organic Neem oil 3% solution.';
    } else {
      reply = lang === 'ta'
        ? 'கும்பகோணம் சந்தையில் நெல் விலை குவிண்டாலுக்கு ரூ 2,350 ஆக உள்ளது. அடுத்த வாரம் விலை உயர வாய்ப்புள்ளது.'
        : 'Paddy current rate at regional mandi is ₹2,350 per quintal with a bullish trend forecast.';
    }

    setAssistantReply(reply);
    speakText(reply);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card w-full max-w-lg p-6 md:p-8 rounded-3xl border border-emerald-500/30 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">
              {lang === 'ta' ? 'தமிழ் குரல் உதவி' : 'Voice Assistant (Tamil & English)'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ta' ? 'விவசாய கேள்விகளை குரல் மூலம் கேட்கலாம்' : 'Voice-enabled AI advisory for farmers'}
            </p>
          </div>
        </div>

        {/* Mic Activation Button */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <button
            onClick={handleStartListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition transform hover:scale-105 shadow-xl ${
              isListening
                ? 'bg-red-500 text-white animate-pulse shadow-red-500/40'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-emerald-500/30'
            }`}
          >
            {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
          </button>
          <span className="text-xs font-semibold text-slate-300">
            {isListening
              ? (lang === 'ta' ? 'குரல் கேட்கிறது...' : 'Listening...')
              : (lang === 'ta' ? 'பேச பொத்தானை அழுத்தவும்' : 'Tap to speak query')}
          </span>
        </div>

        {/* Speech Transcript Output */}
        {transcript && (
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-500 font-semibold block mb-1">Your Voice Query:</span>
            <span className="text-emerald-400 font-medium">"{transcript}"</span>
          </div>
        )}

        {/* AI Assistant Answer */}
        {assistantReply && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-1">
            <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>AI Advisory Response</span>
              </span>
              <button onClick={() => speakText(assistantReply)} className="p-1 hover:text-white">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-emerald-100 leading-relaxed">{assistantReply}</p>
          </div>
        )}

        {/* Sample Voice Prompts */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            {lang === 'ta' ? 'மாதிரி குரல் கேள்விகள்:' : 'Sample Voice Questions:'}
          </span>
          <div className="space-y-1.5">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTranscript(q);
                  processQuery(q);
                }}
                className="w-full text-left p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-300 transition"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
