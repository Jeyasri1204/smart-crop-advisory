import React, { useState } from 'react';
import { Sprout, Phone, User, MapPin, ShieldCheck, ArrowRight, Sparkles, KeyRound, Globe } from 'lucide-react';

export default function LoginPage({ onLoginSuccess, lang, setLang }) {
  const [farmerName, setFarmerName] = useState('Ramesh');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [district, setDistrict] = useState('Coimbatore, Tamil Nadu');
  const [otp, setOtp] = useState('1234');
  const [showOtpField, setShowOtpField] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setShowOtpField(true);
  };

  const handleVerifyAndLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      onLoginSuccess({
        name: farmerName || 'Ramesh',
        phone: `+91 ${mobileNumber}`,
        location: district
      });
    }, 800);
  };

  const handleGuestLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      onLoginSuccess({
        name: 'Ramesh',
        phone: '+91 98765 43210',
        location: 'Coimbatore, Tamil Nadu'
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-slate-950 font-sans relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md space-y-6 relative z-10 animate-fadeIn">
        {/* Top Header & Logo */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 mx-auto shadow-2xl shadow-emerald-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-emerald-400">
              <Sprout className="w-8 h-8" />
            </div>
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest">
              SMART CROP ADVISORY PORTAL
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white mt-2">
              Agri<span className="text-emerald-400">Smart</span> Login
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'ta'
                ? 'விவசாயி கணக்கில் உள்நுழைய மொபைல் எண்ணைப் பயன்படுத்தவும்'
                : 'Smart Crop Advisory Portal for Small & Marginal Farmers'}
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-[11px]">
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
        </div>

        {/* Login Form Card */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
          {!showOtpField ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {/* Farmer Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'ta' ? 'விவசாயி பெயர் (Farmer Name)' : 'Farmer Name'}</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="eg: Ramesh"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold"
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'ta' ? 'மொபைல் எண் (Mobile Number)' : 'Mobile Number (+91)'}</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono font-bold"
                  />
                </div>
              </div>

              {/* District / Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'ta' ? 'மாவட்டம் (District / Location)' : 'District Location'}</span>
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold"
                >
                  <option value="Coimbatore, Tamil Nadu">Coimbatore, Tamil Nadu (கோவை)</option>
                  <option value="Thanjavur, Tamil Nadu">Thanjavur, Tamil Nadu (தஞ்சாவூர்)</option>
                  <option value="Madurai, Tamil Nadu">Madurai, Tamil Nadu (மதுரை)</option>
                  <option value="Trichy, Tamil Nadu">Trichy, Tamil Nadu (திருச்சி)</option>
                  <option value="Salem, Tamil Nadu">Salem, Tamil Nadu (சேலம்)</option>
                  <option value="Erode, Tamil Nadu">Erode, Tamil Nadu (ஈரோடு)</option>
                </select>
              </div>

              {/* Submit OTP Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-2xl transition shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <span>{lang === 'ta' ? 'OTP அனுப்பவும் (Send OTP)' : 'Send OTP Verification'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* OTP Verification Step */
            <form onSubmit={handleVerifyAndLogin} className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-sm">Verify OTP Code</h3>
                <p className="text-xs text-slate-400">Sent to +91 {mobileNumber}</p>
              </div>

              <div className="space-y-1.5">
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-center text-lg font-mono font-black text-emerald-400 tracking-[1em] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 text-center block">Default OTP for demo: 1234</span>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-2xl transition shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <span>Logging in...</span>
                ) : (
                  <>
                    <span>{lang === 'ta' ? 'உள்நுழைக (Verify & Login)' : 'Verify & Enter Advisory Portal'}</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowOtpField(false)}
                className="w-full text-center text-xs text-slate-400 hover:text-white pt-2"
              >
                ← Change Mobile Number
              </button>
            </form>
          )}

          {/* Quick Demo Guest Login Option */}
          <div className="pt-4 border-t border-slate-800/80 text-center space-y-2">
            <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Or Fast Track Demo</span>
            <button
              onClick={handleGuestLogin}
              disabled={isLoggingIn}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-2xl border border-slate-800 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ta' ? 'ரமேஷ் கணக்கில் நேரடியாக உள்நுழைக' : 'Quick Demo Login (Ramesh Farmer Profile)'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-600">
          Integrated with Agmarknet Mandi API & ICAR Fertigation Database
        </p>
      </div>
    </div>
  );
}
