import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, CloudSun, AlertTriangle, MapPin, Volume2, RefreshCw, Radio, Search, Navigation } from 'lucide-react';

const PRESET_CITIES = [
  { name: "Coimbatore, TN", lat: 11.0168, lon: 76.9558 },
  { name: "Thanjavur (Tanjore Delta), TN", lat: 10.7870, lon: 79.1378 },
  { name: "Madurai, TN", lat: 9.9252, lon: 78.1198 },
  { name: "Tiruchirappalli (Trichy), TN", lat: 10.7905, lon: 78.7047 },
  { name: "Salem, TN", lat: 11.6643, lon: 78.1460 },
  { name: "Erode, TN", lat: 11.3410, lon: 77.7172 },
  { name: "Tirunelveli, TN", lat: 8.7139, lon: 77.7567 },
  { name: "Kumbakonam, TN", lat: 10.9602, lon: 79.3782 },
  { name: "Theni, TN", lat: 10.0104, lon: 77.4768 },
  { name: "Chennai, TN", lat: 13.0827, lon: 80.2707 }
];

export default function WeatherAlerts({ lang, speakText }) {
  const [selectedCity, setSelectedCity] = useState(PRESET_CITIES[0].name);
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState({
    temp: 26,
    condition: "Moderate Rain",
    humidity: 84,
    windSpeed: 12,
    location: "Coimbatore, TN",
    isLive: true,
    rainProbability: 70
  });

  const [forecast, setForecast] = useState([
    { day: "Today", temp: "26°C", condition: "Moderate Rain", rainProb: "70%" },
    { day: "Tue", temp: "25°C", condition: "Heavy Showers", rainProb: "85%" },
    { day: "Wed", temp: "27°C", condition: "Partly Cloudy", rainProb: "30%" },
    { day: "Thu", temp: "28°C", condition: "Sunny", rainProb: "10%" },
    { day: "Fri", temp: "29°C", condition: "Clear Sky", rainProb: "5%" }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // Fetch Real Live Weather from Open-Meteo API
  const fetchLiveWeather = (lat = 11.0168, lon = 76.9558, locName = "Coimbatore, TN") => {
    setIsLoading(true);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m,wind_speed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`)
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
          const cur = data.current_weather;
          const humidity = data.hourly?.relative_humidity_2m?.[0] || 78;
          const rainProb = data.daily?.precipitation_probability_max?.[0] || 45;

          setWeatherData({
            temp: Math.round(cur.temperature),
            condition: cur.weathercode > 50 ? "Rainy / Showers" : cur.weathercode > 2 ? "Partly Cloudy" : "Sunny / Clear",
            humidity: humidity,
            windSpeed: Math.round(cur.windspeed),
            location: locName,
            isLive: true,
            rainProbability: rainProb
          });

          // Map live 5-day forecast
          if (data.daily && data.daily.time) {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const mapped = data.daily.time.slice(0, 5).map((t, idx) => {
              const d = new Date(t);
              const dayName = idx === 0 ? "Today" : days[d.getDay()];
              const tempMax = Math.round(data.daily.temperature_2m_max[idx]);
              const pProb = data.daily.precipitation_probability_max[idx] || 10;
              return {
                day: dayName,
                temp: `${tempMax}°C`,
                condition: pProb > 50 ? "Rain Showers" : "Sunny",
                rainProb: `${pProb}%`
              };
            });
            setForecast(mapped);
          }
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  // Search Any City via Open-Meteo Geocoding API
  const handleSearchCity = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=1&language=en&format=json`)
      .then(res => res.json())
      .then(data => {
        if (data && data.results && data.results.length > 0) {
          const place = data.results[0];
          const fullName = `${place.name}, ${place.admin1 || place.country}`;
          setSelectedCity(fullName);
          fetchLiveWeather(place.latitude, place.longitude, fullName);
        } else {
          alert(`City "${searchQuery}" not found. Please try another location.`);
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  };

  const handleSelectPreset = (cityName) => {
    setSelectedCity(cityName);
    const cityObj = PRESET_CITIES.find(c => c.name === cityName);
    if (cityObj) {
      fetchLiveWeather(cityObj.lat, cityObj.lon, cityObj.name);
    }
  };

  const handleGPSDetect = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedCity("GPS Live Location");
          fetchLiveWeather(pos.coords.latitude, pos.coords.longitude, "Your GPS Location (Live)");
        },
        () => {
          alert("Geolocation permission denied. Using selected city.");
          setIsLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    fetchLiveWeather();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* City Selector Bar */}
      <div className="glass-card p-4 md:p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ta' ? 'நகரத்தைத் தேர்ந்தெடுக்கவும் (Select City)' : 'Select City for Real Temperature'}</span>
            </label>
            <select
              value={selectedCity}
              onChange={(e) => handleSelectPreset(e.target.value)}
              className="w-full sm:w-64 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {PRESET_CITIES.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchCity} className="w-full sm:flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={lang === 'ta' ? "வேறு நகரத்தைத் தேடுக... (eg: Pollachi, Madurai)" : "Search any city name (eg: Pollachi, Madurai)"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shrink-0"
            >
              {lang === 'ta' ? 'தேடுக' : 'Search'}
            </button>
          </form>

          {/* GPS Auto Detect */}
          <button
            onClick={handleGPSDetect}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 hover:text-emerald-300 transition shrink-0"
            title="Auto Detect GPS Location"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real Live Weather Output Display */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-400 font-semibold text-xs">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="font-extrabold text-white text-base">{weatherData.location}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>REAL LIVE WEATHER</span>
              </span>
            </div>

            <div className="text-6xl font-black text-white flex items-center justify-center sm:justify-start gap-4 py-1">
              <span>{weatherData.temp}°C</span>
              {weatherData.rainProbability > 50 ? (
                <CloudRain className="w-14 h-14 text-blue-400 animate-bounce" />
              ) : (
                <Sun className="w-14 h-14 text-amber-400 animate-spin" />
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-300 font-bold justify-center sm:justify-start pt-1">
              <span className="text-emerald-400">Condition: {weatherData.condition}</span>
              <span>•</span>
              <span className="text-blue-300">Humidity: {weatherData.humidity}%</span>
              <span>•</span>
              <span className="text-teal-300">Wind: {weatherData.windSpeed} km/h</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full sm:w-auto">
            <button
              onClick={() =>
                speakText(
                  lang === 'ta'
                    ? `${weatherData.location} நகரத்தில் நேரலை வெப்பநிலை ${weatherData.temp} டிகிரி செல்சியஸ். மழை பெய்ய ${weatherData.rainProbability} சதவீதம் வாய்ப்பு உள்ளது.`
                    : `Real-time weather for ${weatherData.location}. Temperature is ${weatherData.temp} degrees celsius.`
                )
              }
              className="px-5 py-3 rounded-2xl bg-blue-500 text-slate-950 font-bold text-xs hover:bg-blue-400 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <Volume2 className="w-4 h-4" />
              <span>{lang === 'ta' ? 'வானிலை குரல் அறிக்கை' : 'Listen Real Weather Audio'}</span>
            </button>

            <button
              onClick={() => fetchLiveWeather()}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-2xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 border border-slate-700 transition flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Fetching Real Temp...' : 'Refresh Real Temp'}</span>
            </button>
          </div>
        </div>

        {/* Real Rain Advisory Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-xs">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-amber-300 block text-sm">
              Live Rain Probability: {weatherData.rainProbability}% for {weatherData.location}
            </span>
            <p className="text-amber-100/90 mt-0.5">
              {weatherData.rainProbability > 50
                ? "Rain expected today/tomorrow. Postpone pesticide spraying and irrigation."
                : "Weather is favorable. Optimal conditions for fertigation and field spraying."}
            </p>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Grid */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <CloudSun className="w-4 h-4 text-amber-400" />
          <span>Real-Time 5-Day Temperature & Rain Forecast for {weatherData.location}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {forecast.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center transition ${
                idx === 0
                  ? 'bg-blue-950/40 border-blue-500 text-white ring-2 ring-blue-500/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="text-xs font-bold text-slate-400">{item.day}</div>
              <div className="my-2 flex justify-center text-blue-400">
                {parseInt(item.rainProb) > 50 ? (
                  <CloudRain className="w-7 h-7" />
                ) : (
                  <CloudSun className="w-7 h-7 text-amber-400" />
                )}
              </div>
              <div className="text-lg font-black text-white">{item.temp}</div>
              <div className="text-[10px] text-blue-300 font-bold mt-1">Rain: {item.rainProb}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
