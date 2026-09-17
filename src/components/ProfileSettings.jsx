import React, { useState } from 'react';
import { User, MapPin, Phone, Globe, Volume2, HelpCircle, LogOut, ChevronRight, Sprout, ShieldCheck, Edit3, Camera, Save, CheckCircle2 } from 'lucide-react';

export default function ProfileSettings({ userProfile, setUserProfile, lang, setLang, handleLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile?.name || 'Ramesh');
  const [phone, setPhone] = useState(userProfile?.phone || '+91 98765 43210');
  const [location, setLocation] = useState(userProfile?.location || 'Coimbatore, Tamil Nadu');
  const [landSize, setLandSize] = useState(userProfile?.landSize || '2.5 Acres');
  const [primaryCrop, setPrimaryCrop] = useState(userProfile?.primaryCrop || 'Paddy (Rice)');
  const [soilType, setSoilType] = useState(userProfile?.soilType || 'Clay Loam (களிமண்)');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile({
      name,
      phone,
      location,
      landSize,
      primaryCrop,
      soilType
    });
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
      {/* Save Toast Notification */}
      {isSaved && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Profile details updated successfully!</span>
          </span>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/20 shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-3xl">
                  👨‍🌾
                </div>
              </div>
              <button
                onClick={() => alert("Upload custom profile picture triggered.")}
                className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center absolute -bottom-1 -right-1 shadow-lg hover:scale-105 transition"
                title="Change Avatar Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">{userProfile?.name || name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                  VERIFIED FARMER
                </span>
              </div>

              <div className="text-xs text-slate-400 mt-1 space-y-0.5 font-semibold">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{userProfile?.phone || phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>{userProfile?.location || location}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Editable Profile Form */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="pt-4 border-t border-slate-800 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-bold block mb-1">Farmer Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">District / Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Land Size (Acres)</label>
                <input
                  type="text"
                  value={landSize}
                  onChange={(e) => setLandSize(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Primary Crop</label>
                <select
                  value={primaryCrop}
                  onChange={(e) => setPrimaryCrop(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
                >
                  <option value="Paddy (Rice)">Paddy (Rice)</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Maize">Maize</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Soil Type</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
                >
                  <option value="Clay Loam (களிமண்)">Clay Loam (களிமண்)</option>
                  <option value="Red Loam (செம்மண்)">Red Loam (செம்மண்)</option>
                  <option value="Black Cotton (கரிசல் மண்)">Black Cotton (கரிசல் மண்)</option>
                  <option value="Alluvial (வண்டல் மண்)">Alluvial (வண்டல் மண்)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-lg flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </form>
        ) : (
          /* Profile Stats Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Farm Land Size</span>
              <strong className="text-sm text-emerald-400 font-black">{userProfile?.landSize || landSize}</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Primary Crop</span>
              <strong className="text-sm text-white font-black">{userProfile?.primaryCrop || primaryCrop}</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Soil Classification</span>
              <strong className="text-sm text-amber-400 font-black">{userProfile?.soilType || soilType}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Settings Options List */}
      <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden divide-y divide-slate-800/80 text-xs">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-white">App Language (மொழி)</span>
          </div>
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setLang('ta')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                lang === 'ta' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                lang === 'en' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              English
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full p-4 flex items-center justify-between text-left text-red-400 hover:bg-red-950/20 transition"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5" />
            <span className="font-extrabold">Logout / Switch Account (வெளியேறு)</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
