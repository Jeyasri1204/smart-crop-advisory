// Agronomic Dataset & System Repository for Smart Crop Advisory System

export const SOIL_PRESETS = [
  {
    id: "tanjore",
    name: "Tanjore Delta Region (Tamil Nadu)",
    soilType: "Clay Loam (களிமண்)",
    soil: "Clay Loam (களிமண்)",
    nitrogen: 115,
    N: 115,
    phosphorus: 58,
    P: 58,
    potassium: 195,
    K: 195,
    ph: 6.8,
    pH: 6.8,
    moisture: 42,
    rainfall: "1150 mm",
    suitableCrops: ["Paddy (Rice)", "Sugarcane", "Black Gram", "Banana"]
  },
  {
    id: "indo-gangetic",
    name: "Indo-Gangetic Plains (Punjab/Haryana)",
    soilType: "Alluvial Soil (வண்டல் மண்)",
    soil: "Alluvial Soil (வண்டல் மண்)",
    nitrogen: 125,
    N: 125,
    phosphorus: 50,
    P: 50,
    potassium: 210,
    K: 210,
    ph: 7.2,
    pH: 7.2,
    moisture: 38,
    rainfall: "750 mm",
    suitableCrops: ["Wheat", "Paddy (Rice)", "Maize", "Mustard"]
  },
  {
    id: "deccan-black",
    name: "Deccan Black Cotton Belt (Maharashtra)",
    soilType: "Black Cotton Soil (கரிசல் மண்)",
    soil: "Black Cotton Soil (கரிசல் மண்)",
    nitrogen: 85,
    N: 85,
    phosphorus: 42,
    P: 42,
    potassium: 240,
    K: 240,
    ph: 7.8,
    pH: 7.8,
    moisture: 48,
    rainfall: "850 mm",
    suitableCrops: ["Cotton", "Soybean", "Sorghum", "Pigeon Pea"]
  },
  {
    id: "karnataka-plateau",
    name: "Karnataka Southern Plateau",
    soilType: "Red Sandy Loam (செம்மண்)",
    soil: "Red Sandy Loam (செம்மண்)",
    nitrogen: 95,
    N: 95,
    phosphorus: 70,
    P: 70,
    potassium: 160,
    K: 160,
    ph: 6.2,
    pH: 6.2,
    moisture: 32,
    rainfall: "920 mm",
    suitableCrops: ["Ragi (Finger Millet)", "Maize", "Groundnut", "Tomato"]
  }
];

export const REGION_PRESETS = SOIL_PRESETS;

export const CROP_DATABASE = [
  {
    id: "paddy",
    name: "Paddy (Rice)",
    tamilName: "நெல்",
    season: "Kharif / Samba",
    idealN: { min: 100, max: 140 },
    idealP: { min: 40, max: 60 },
    idealK: { min: 150, max: 220 },
    idealPh: { min: 6.0, max: 7.5 },
    yieldPotential: "2.8 - 3.5 Tons / Acre",
    marketPrice: "₹2,300 / Quintal",
    msp: "₹2,300 / Quintal",
    growthDuration: "120 - 135 Days",
    waterReq: "High (1200mm)",
    fertilizerSchedule: [
      { stage: "Basal (Transplanting)", urea: "30 kg", dap: "50 kg", mop: "20 kg" },
      { stage: "Active Tillering (25 Days)", urea: "35 kg", dap: "0 kg", mop: "15 kg" },
      { stage: "Panicle Initiation (50 Days)", urea: "25 kg", dap: "0 kg", mop: "15 kg" }
    ]
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    tamilName: "கரும்பு",
    season: "Annual / Special",
    idealN: { min: 150, max: 200 },
    idealP: { min: 60, max: 80 },
    idealK: { min: 180, max: 250 },
    idealPh: { min: 6.5, max: 8.0 },
    yieldPotential: "40 - 50 Tons / Acre",
    marketPrice: "₹3,150 / Ton",
    msp: "₹3,150 / Ton",
    growthDuration: "300 - 360 Days",
    waterReq: "Very High (1800mm)",
    fertilizerSchedule: [
      { stage: "Basal (Planting)", urea: "50 kg", dap: "75 kg", mop: "30 kg" },
      { stage: "Partial Earthing (45 Days)", urea: "60 kg", dap: "0 kg", mop: "25 kg" },
      { stage: "Final Earthing (90 Days)", urea: "50 kg", dap: "0 kg", mop: "25 kg" }
    ]
  },
  {
    id: "cotton",
    name: "Cotton",
    tamilName: "பருத்தி",
    season: "Kharif",
    idealN: { min: 80, max: 110 },
    idealP: { min: 35, max: 50 },
    idealK: { min: 120, max: 180 },
    idealPh: { min: 6.5, max: 8.2 },
    yieldPotential: "1.2 - 1.8 Tons / Acre",
    marketPrice: "₹7,200 / Quintal",
    msp: "₹7,121 / Quintal",
    growthDuration: "150 - 165 Days",
    waterReq: "Medium (700mm)",
    fertilizerSchedule: [
      { stage: "Basal Sowing", urea: "25 kg", dap: "40 kg", mop: "15 kg" },
      { stage: "Square Formation (40 Days)", urea: "30 kg", dap: "0 kg", mop: "15 kg" },
      { stage: "Boll Development (75 Days)", urea: "25 kg", dap: "0 kg", mop: "15 kg" }
    ]
  },
  {
    id: "tomato",
    name: "Tomato",
    tamilName: "தக்காளி",
    season: "Rabi / Kharif",
    idealN: { min: 90, max: 130 },
    idealP: { min: 60, max: 90 },
    idealK: { min: 140, max: 200 },
    idealPh: { min: 6.0, max: 7.0 },
    yieldPotential: "12 - 18 Tons / Acre",
    marketPrice: "₹2,800 / Quintal",
    msp: "N/A (Open Market)",
    growthDuration: "110 - 130 Days",
    waterReq: "Medium (600mm)",
    fertilizerSchedule: [
      { stage: "Transplanting", urea: "30 kg", dap: "60 kg", mop: "25 kg" },
      { stage: "Flowering (30 Days)", urea: "35 kg", dap: "0 kg", mop: "20 kg" },
      { stage: "Fruiting (60 Days)", urea: "25 kg", dap: "0 kg", mop: "20 kg" }
    ]
  },
  {
    id: "maize",
    name: "Maize (Corn)",
    tamilName: "மக்காச்சோளம்",
    season: "Kharif / Rabi",
    idealN: { min: 110, max: 150 },
    idealP: { min: 50, max: 70 },
    idealK: { min: 130, max: 170 },
    idealPh: { min: 5.8, max: 7.2 },
    yieldPotential: "3.0 - 4.0 Tons / Acre",
    marketPrice: "₹2,225 / Quintal",
    msp: "₹2,225 / Quintal",
    growthDuration: "100 - 115 Days",
    waterReq: "Medium (550mm)",
    fertilizerSchedule: [
      { stage: "Basal Sowing", urea: "35 kg", dap: "50 kg", mop: "20 kg" },
      { stage: "Knee-High Stage (30 Days)", urea: "40 kg", dap: "0 kg", mop: "15 kg" },
      { stage: "Tasseling (55 Days)", urea: "25 kg", dap: "0 kg", mop: "15 kg" }
    ]
  }
];

export const DISEASE_SAMPLES = [
  {
    id: "paddy-blast",
    name: "Paddy Leaf Blast",
    pathogen: "Pyricularia oryzae (Fungus)",
    tamilName: "நெல் குலை நோய் (Leaf Blast)",
    crop: "Paddy (Rice)",
    severity: "High",
    severityLevel: "High",
    confidence: "96.4%",
    spotDensity: "18 spots / cm²",
    chlorophyllLoss: "38%",
    fungalRisk: "Severe (High RH > 85%)",
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="photoBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230a160d"/><stop offset="50%" stop-color="%23112b1a"/><stop offset="100%" stop-color="%23050d07"/></linearGradient><linearGradient id="paddyBlade" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stop-color="%2314532d"/><stop offset="25%" stop-color="%2315803d"/><stop offset="55%" stop-color="%2322c55e"/><stop offset="80%" stop-color="%2316a34a"/><stop offset="100%" stop-color="%2314532d"/></linearGradient><radialGradient id="lesionCore" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%23f8fafc"/><stop offset="35%" stop-color="%23cbd5e1"/><stop offset="65%" stop-color="%237f1d1d"/><stop offset="90%" stop-color="%23450a0a"/><stop offset="100%" stop-color="%23fef08a" stop-opacity="0.8"/></radialGradient><filter id="macroBlur"><feGaussianBlur stdDeviation="1.5"/></filter><filter id="photoShadow"><feDropShadow dx="3" dy="6" stdDeviation="6" flood-color="%23000" flood-opacity="0.75"/></filter></defs><rect width="600" height="400" fill="url(%23photoBg)"/><path d="M -80,390 Q 180,210 680,-10 Q 480,190 -80,390 Z" fill="url(%23paddyBlade)" filter="url(%23photoShadow)"/><path d="M -80,390 Q 180,210 680,-10" fill="none" stroke="%2386efac" stroke-width="4.5" opacity="0.9"/><path d="M -20,340 Q 180,200 580,10" fill="none" stroke="%234ade80" stroke-width="1.5" opacity="0.5"/><path d="M -60,370 Q 180,220 620,-5" fill="none" stroke="%234ade80" stroke-width="1.5" opacity="0.5"/><ellipse cx="260" cy="200" rx="48" ry="17" fill="url(%23lesionCore)" stroke="%23b45309" stroke-width="2.5" transform="rotate(-33 260 200)"/><ellipse cx="410" cy="115" rx="58" ry="22" fill="url(%23lesionCore)" stroke="%23b45309" stroke-width="3" transform="rotate(-29 410 115)"/><ellipse cx="140" cy="280" rx="38" ry="15" fill="url(%23lesionCore)" stroke="%23b45309" stroke-width="2" transform="rotate(-36 140 280)"/><ellipse cx="320" cy="165" rx="30" ry="12" fill="url(%23lesionCore)" stroke="%23b45309" stroke-width="2" transform="rotate(-31 320 165)"/></svg>`,
    symptoms: "Spindle-shaped eye spots with grey/white centers and dark reddish-brown margins on leaf blades.",
    howItSpreads: "Airborne fungal spores carried by wind currents and high night-time humidity (>90%).",
    affectedParts: "Leaf blade, leaf collar, stem nodes, and panicle neck.",
    organicCure: "Foliar spray of Neem Oil (3% solution) or Panchagavya (3%). Soil application of Pseudomonas fluorescens @ 2.5 kg/ha.",
    chemicalCure: "Tricyclazole 75% WP @ 0.6g per Liter of water OR Carbendazim 50% WP @ 1g/L.",
    dosage: "0.6g Tricyclazole per 1 Liter water (120g in 200L water per acre).",
    applicationFrequency: "Spray twice at 10-14 day intervals during cool morning or evening hours.",
    safetyPrecautions: "Wear a face mask and protective gloves during spraying. Do not spray against wind direction. Keep livestock away for 48 hours.",
    prevention: {
      spacing: "Maintain recommended row spacing (20cm x 15cm) to ensure proper canopy ventilation.",
      removeLeaves: "Collect and burn infected crop stubbles & wild grass weeds from field bunds.",
      avoidOverhead: "Avoid continuous deep flooding; practice Alternate Wetting and Drying (AWD).",
      sanitation: "Use certified disease-free seeds treated with Carbendazim (2g/kg seed)."
    },
    farmerActionPlan: {
      now: "பாதிக்கப்பட்ட இலைகளை உடனே அறுத்து வயலுக்கு வெளியே எடுத்துச் சென்று எரிக்கவும்.",
      today: "Tricyclazole 75% WP மருந்தை 1 லிட்டர் தண்ணீருக்கு 0.6 கிராம் வீதம் கலந்து மாலையில் தெளிக்கவும்.",
      nextDays: "அடுத்த 3-5 நாட்களுக்கு புதிய புள்ளிகள் தோன்றுகிறதா என கண்காணிக்கவும். நைட்ரஜன் உரமிடுவதை நிறுத்துங்கள்.",
      ifSevere: "பாதிப்பு தீவிரமடைந்தால் உடனடியாக அருகிலுள்ள வேளாண் விரிவாக்க அலுவலரை (Agricultural Officer) அணுகவும்."
    },
    tamilVoiceScript: "உங்கள் நெல் பயிரில் குலை நோய் இருக்க 96.4 சதவீதம் வாய்ப்பு உள்ளது. பாதிக்கப்பட்ட இலைகளை உடனே அகற்றி, டிரைசைக்ளசோல் மருந்தை தெளிக்கவும்."
  },
  {
    id: "paddy-brownspot",
    name: "Paddy Brown Spot",
    pathogen: "Helminthosporium oryzae (Fungus)",
    tamilName: "நெல் பழுப்பு புள்ளி நோய் (Brown Spot)",
    crop: "Paddy (Rice)",
    severity: "Medium",
    severityLevel: "Medium",
    confidence: "94.2%",
    spotDensity: "12 spots / cm²",
    chlorophyllLoss: "24%",
    fungalRisk: "Moderate (Potassium Deficiency)",
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230c1d13"/><stop offset="100%" stop-color="%23040b07"/></linearGradient><linearGradient id="leaf2" x1="0" y1="0" x2="1" y2="0.2"><stop offset="0%" stop-color="%23166534"/><stop offset="40%" stop-color="%2322c55e"/><stop offset="80%" stop-color="%2315803d"/><stop offset="100%" stop-color="%2314532d"/></linearGradient><radialGradient id="brownSpot" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%23451a03"/><stop offset="50%" stop-color="%2378350f"/><stop offset="80%" stop-color="%23f59e0b"/><stop offset="100%" stop-color="%23fef08a" stop-opacity="0.9"/></radialGradient></defs><rect width="600" height="400" fill="url(%23bg2)"/><path d="M -50,370 Q 200,220 650,10 Q 420,200 -50,370 Z" fill="url(%23leaf2)"/><path d="M -50,370 Q 200,220 650,10" fill="none" stroke="%2386efac" stroke-width="4" opacity="0.85"/><circle cx="200" cy="220" r="26" fill="url(%23brownSpot)"/><circle cx="330" cy="155" r="32" fill="url(%23brownSpot)"/><circle cx="430" cy="100" r="24" fill="url(%23brownSpot)"/><circle cx="120" cy="270" r="22" fill="url(%23brownSpot)"/><circle cx="270" cy="180" r="18" fill="url(%23brownSpot)"/><circle cx="380" cy="130" r="16" fill="url(%23brownSpot)"/></svg>`,
    symptoms: "Oval or circular dark brown spots with distinct yellow halo appearing on leaves and grain husks.",
    howItSpreads: "Seed-borne and soil-borne fungal spores spreading via rain splashes and nutrient-deficient soil.",
    affectedParts: "Leaves, coleoptile, and glumes.",
    organicCure: "Apply Vermicompost (1 Ton/acre) + Spray Vermiwash @ 10% concentration. Apply Neem Cake @ 100kg/acre.",
    chemicalCure: "Mancozeb 75% WP @ 2g/L or Propiconazole 25% EC @ 1ml/L of water.",
    dosage: "2g Mancozeb per 1 Liter water (400g per 200L water tank per acre).",
    applicationFrequency: "Spray once at boot-leaf stage and repeat after 12 days if spots persist.",
    safetyPrecautions: "Avoid skin contact with chemical mixture. Wash hands and face with soap thoroughly after application.",
    prevention: {
      spacing: "Ensure proper hill spacing to reduce moisture micro-climate.",
      removeLeaves: "Remove infected nursery seedlings before transplanting to main field.",
      avoidOverhead: "Maintain 2-3 cm water level; avoid nutrient starvation.",
      sanitation: "Apply Muriate of Potash (MOP) @ 25kg/acre to correct soil potassium deficiency."
    },
    farmerActionPlan: {
      now: "வயலில் தேங்கியுள்ள பழைய கழிவு இலைகளை அகற்றி தூய்மைப்படுத்தவும்.",
      today: "Mancozeb மருந்தை 1 லிட்டர் தண்ணீருக்கு 2 கிராம் வீதம் கலந்து இலைகளில் தெளிக்கவும்.",
      nextDays: "3 நாட்களுக்குள் பொட்டாஷ் உரம் 25 கிலோ இடவும். மண் சத்து அளவை உயர்த்தவும்.",
      ifSevere: "புள்ளி பரவல் அதிகரித்தால் வேளாண் உதவி இயக்குனரை அணுகவும்."
    },
    tamilVoiceScript: "உங்கள் நெல் பயிரில் பழுப்பு புள்ளி நோய் கண்டறியப்பட்டுள்ளது. பொட்டாஷ் உரம் மற்றும் மாங்கோசெப் மருந்து தெளிக்கவும்."
  },
  {
    id: "tomato-blight",
    name: "Tomato Early Blight",
    pathogen: "Alternaria solani (Fungus)",
    tamilName: "தக்காளி இலை கருகல் (Early Blight)",
    crop: "Tomato",
    severity: "Medium",
    severityLevel: "Medium",
    confidence: "94.8%",
    spotDensity: "9 spots / cm²",
    chlorophyllLoss: "29%",
    fungalRisk: "Moderate (Warm & Humid)",
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230b1c11"/><stop offset="100%" stop-color="%23050d08"/></linearGradient><radialGradient id="targetRings" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%23451a03"/><stop offset="25%" stop-color="%23fef08a"/><stop offset="50%" stop-color="%239a3412"/><stop offset="75%" stop-color="%23fef08a"/><stop offset="100%" stop-color="%2378350f" stop-opacity="0.95"/></radialGradient></defs><rect width="600" height="400" fill="url(%23bg3)"/><path d="M 300,380 C 210,290 80,230 50,130 C 130,120 230,190 300,270 C 370,190 470,120 550,130 C 520,230 390,290 300,380 Z" fill="%2315803d" stroke="%234ade80" stroke-width="3.5"/><circle cx="200" cy="220" r="42" fill="url(%23targetRings)"/><circle cx="400" cy="230" r="48" fill="url(%23targetRings)"/></svg>`,
    symptoms: "Concentric target-board ring brown spots starting on mature lower leaves, leading to yellowing & leaf drop.",
    howItSpreads: "Fungal spores overwintering in crop debris, splashing upward during rainfall or furrow irrigation.",
    affectedParts: "Lower leaves, stems, and fruit calyx.",
    organicCure: "Foliar spray of Trichoderma harzianum (5g/L) or Neem oil 3% + Neem cake soil treatment @ 50kg/acre.",
    chemicalCure: "Mancozeb 75% WP @ 2g/L or Copper Oxychloride 50% WP @ 2.5g/L of water.",
    dosage: "2g Mancozeb per 1 Liter water (400g per 200L water tank for 1 acre).",
    applicationFrequency: "Apply spray every 7-10 days upon first symptom appearance.",
    safetyPrecautions: "Do not harvest tomatoes within 7 days of fungicide application (Pre-Harvest Interval). Wear protective mask.",
    prevention: {
      spacing: "Maintain wide plant spacing (60cm x 45cm) and perform staking to keep foliage off ground.",
      removeLeaves: "Prune lower infected leaves up to 30cm height from ground level and destroy them.",
      avoidOverhead: "Use drip irrigation instead of overhead sprinkler to keep tomato leaves dry.",
      sanitation: "Mulch soil with straw or black plastic film to prevent rain splash of soil spores."
    },
    farmerActionPlan: {
      now: "தரைமட்டத்தில் உள்ள பாதிக்கப்பட்ட கீழ் இலைகளை உடனே வெட்டி அகற்றி எரிக்கவும்.",
      today: "Mancozeb அல்லது காப்பர் ஆக்ஸிகுளோரைடு மருந்தை 1 லிட்டர் தண்ணீருக்கு 2 கிராம் கலந்து தெளிக்கவும்.",
      nextDays: "அடுத்த 3-5 நாட்களுக்கு சொட்டுநீர் பாசனத்தை மட்டும் பயன்படுத்தவும். இலைகளில் நீர் தெளிக்க வேண்டாம்.",
      ifSevere: "தக்காளி பழங்களில் கருப்பு அழுகல் பரவினால் அருகிலுள்ள Krishi Vigyan Kendra-வை தொடர்பு கொள்ளவும்."
    },
    tamilVoiceScript: "உங்கள் தக்காளி செடியில் இலை கருகல் நோய் இருக்க வாய்ப்பு உள்ளது. கீழ் இலைகளை உடனே அகற்றி, மாங்கோசெப் தெளிக்கவும்."
  },
  {
    id: "cotton-blight",
    name: "Cotton Angular Leaf Spot",
    pathogen: "Xanthomonas citri pv. malvacearum (Bacteria)",
    tamilName: "பருத்தி கோண இலைப்புள்ளி நோய்",
    crop: "Cotton",
    severity: "High",
    severityLevel: "High",
    confidence: "92.1%",
    spotDensity: "14 spots / cm²",
    chlorophyllLoss: "35%",
    fungalRisk: "High (Bacterial Vector)",
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="%2306130a"/><path d="M 300,370 L 210,240 L 50,220 L 160,120 L 120,20 L 300,90 L 480,20 L 440,120 L 550,220 L 390,240 Z" fill="%23166534" stroke="%2322c55e" stroke-width="4"/><polygon points="190,170 240,155 250,195 200,205" fill="%23451a03" stroke="%23b45309" stroke-width="3"/><polygon points="350,180 400,165 410,205 360,215" fill="%23451a03" stroke="%23b45309" stroke-width="3"/><polygon points="270,110 320,100 330,135 280,145" fill="%23451a03" stroke="%239a3412" stroke-width="3"/></svg>`,
    symptoms: "Water-soaked angular dark brown lesions restricted by leaf veinlets; black lesions on bolls.",
    howItSpreads: "Bacterial pathogen carried by infected seeds, wind-driven rain, and field implements.",
    affectedParts: "Cotyledons, leaf blades, bolls, and branches.",
    organicCure: "Seed treatment with 1% Copper Sulfate. Foliar spray of Fermented Buttermilk (5%) mixed with Asafoetida.",
    chemicalCure: "Streptocycline 100ppm (1g in 10L water) + Copper Oxychloride 50% WP @ 25g in 10L water.",
    dosage: "1g Streptocycline + 25g Copper Oxychloride in 10 Liters water.",
    applicationFrequency: "Spray twice at 15-day intervals starting from boll formation stage.",
    safetyPrecautions: "Use specialized measuring scoop for Streptocycline antibiotic. Store chemicals away from children.",
    prevention: {
      spacing: "Adopt recommended line planting (90cm x 60cm).",
      removeLeaves: "Remove bacterial black arm infected twigs and burn away from field.",
      avoidOverhead: "Avoid flood irrigation that washes bacteria across plant rows.",
      sanitation: "Acid delinting of cotton seeds prior to sowing."
    },
    farmerActionPlan: {
      now: "கோணப் புள்ளி பாதிக்கப்பட்ட பருத்திக் கிளைகளை வெட்டி எரிக்கவும்.",
      today: "ஸ்ட்ரெப்டோசைக்ளின் 1 கிராம் + காப்பர் ஆக்ஸிகுளோரைடு 25 கிராம் 10 லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்.",
      nextDays: "அடுத்த 5 நாட்களுக்கு காய்களில் கருப்பு புள்ளி பரவுகிறதா எனக் கண்காணிக்கவும்.",
      ifSevere: "பாதிப்பு அதிகமிருந்தால் உடனடியாக பருத்தி ஆராய்ச்சி நிலையத்தை அணுகவும்."
    },
    tamilVoiceScript: "உங்கள் பருத்தி பயிரில் கோண இலைப்புள்ளி நோய் உள்ளது. பாதிக்கப்பட்ட கிளைகளை அகற்றி ஸ்ட்ரெப்டோசைக்ளின் தெளிக்கவும்."
  },
  {
    id: "maize-blight",
    name: "Maize Northern Leaf Blight",
    pathogen: "Exserohilum turcicum (Fungus)",
    tamilName: "மக்காச்சோளம் இலை கருகல் நோய்",
    crop: "Maize (Corn)",
    severity: "Medium",
    severityLevel: "Medium",
    confidence: "93.7%",
    spotDensity: "7 spots / cm²",
    chlorophyllLoss: "22%",
    fungalRisk: "Moderate (Cool Moisture)",
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="%2307140b"/><path d="M 20,380 Q 280,180 580,120 Q 300,250 20,380 Z" fill="%2315803d" stroke="%234ade80" stroke-width="3.5"/><ellipse cx="250" cy="245" rx="80" ry="18" fill="%23d97706" opacity="0.9" transform="rotate(-23 250 245)"/><ellipse cx="250" cy="245" rx="60" ry="10" fill="%23451a03" transform="rotate(-23 250 245)"/><ellipse cx="420" cy="180" rx="90" ry="20" fill="%23d97706" opacity="0.9" transform="rotate(-18 420 180)"/><ellipse cx="420" cy="180" rx="70" ry="11" fill="%23451a03" transform="rotate(-18 420 180)"/></svg>`,
    symptoms: "Long elliptical grayish-green or tan lesions on lower leaves expanding upward.",
    howItSpreads: "Wind-blown fungal spores originating from infected crop residues in soil.",
    affectedParts: "Leaf blades and outer husks.",
    organicCure: "Spray Jeevamrutham 10% solution at 15-day intervals. Intercrop with cowpea.",
    chemicalCure: "Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1ml/L of water.",
    dosage: "2.5g Mancozeb per 1 Liter water.",
    applicationFrequency: "Apply at first sign of disease; repeat 14 days later if cool humid weather continues.",
    safetyPrecautions: "Avoid spraying during peak midday sunlight to prevent leaf scorch.",
    prevention: {
      spacing: "Maintain 60cm x 25cm plant geometry.",
      removeLeaves: "Incorporate crop residues deep into soil via disc plowing after harvest.",
      avoidOverhead: "Ensure efficient field surface drainage.",
      sanitation: "Plant resistant maize hybrid varieties certified by Agricultural University."
    },
    farmerActionPlan: {
      now: "அடி இலைகளில் உள்ள கருகல் புள்ளிகளைக் கண்டறிந்து பாதிக்கப்பட்ட பகுதிகளை அகற்றவும்.",
      today: "மாங்கோசெப் மருந்தை 1 லிட்டர் தண்ணீருக்கு 2.5 கிராம் வீதம் தெளிக்கவும்.",
      nextDays: "அடுத்த 3-5 நாட்களுக்கு பூக்கும் பருவத்தில் போதிய நீர்ச்சத்து இருப்பதை உறுதி செய்யவும்.",
      ifSevere: "கதிர் கருகல் பரவினால் வேளாண் அதிகாரியைத் தொடர்பு கொள்ளவும்."
    },
    tamilVoiceScript: "உங்கள் மக்காச்சோள பயிரில் இலை கருகல் கண்டறியப்பட்டுள்ளது. மாங்கோசெப் மருந்தை பரிந்துரைக்கப்பட்ட அளவில் தெளிக்கவும்."
  },
  {
    id: "healthy-leaf",
    name: "Healthy Leaf (No Disease)",
    pathogen: "None (Healthy Tissue)",
    tamilName: "ஆரோக்கியமான பயிர் (நோய் இல்லை)",
    crop: "Paddy / General",
    severity: "Healthy",
    severityLevel: "Low",
    confidence: "98.9%",
    spotDensity: "0 spots / cm²",
    chlorophyllLoss: "0%",
    fungalRisk: "Zero / Optimal Health",
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="%2304190c"/><path d="M 40,360 Q 280,120 570,40 Q 340,240 40,360 Z" fill="%2316a34a" stroke="%2386efac" stroke-width="4"/><path d="M 40,360 Q 310,190 570,40" fill="none" stroke="%23bbf7d0" stroke-width="4"/><path d="M 170,270 Q 230,240 280,245" fill="none" stroke="%2386efac" stroke-width="2"/><path d="M 270,200 Q 330,175 380,180" fill="none" stroke="%2386efac" stroke-width="2"/><path d="M 370,140 Q 420,115 470,120" fill="none" stroke="%2386efac" stroke-width="2"/></svg>`,
    symptoms: "Vibrant green chlorophyll tone, uniform cellular structure, zero spots or lesions detected.",
    howItSpreads: "N/A - Plant is in healthy state.",
    affectedParts: "None.",
    organicCure: "Maintain weekly Panchagavya (3%) or Jeevamrutham bio-booster application.",
    chemicalCure: "No chemical fungicide required.",
    dosage: "N/A - Maintain standard NPK fertigation schedule.",
    applicationFrequency: "N/A.",
    safetyPrecautions: "Routine farming hygiene.",
    prevention: {
      spacing: "Maintain standard crop spacing.",
      removeLeaves: "Keep field bunds free from host weeds.",
      avoidOverhead: "Practice optimal irrigation schedules.",
      sanitation: "Regular crop monitoring every 7 days."
    },
    farmerActionPlan: {
      now: "பயிர் ஆரோக்கியமாக உள்ளது. எந்த இரசாயன மருந்தும் தேவை இல்லை.",
      today: "வழக்கமான நீர் பாசனம் மற்றும் இயற்கை ஊட்டச்சத்து திரவத்தை (பஞ்சகாவ்யா) தெளிக்கவும்.",
      nextDays: "வாரத்திற்கு ஒருமுறை பயிர் வளர்ச்சியை தொடர்ந்து கண்காணிக்கவும்.",
      ifSevere: "எதிர்காலத்தில் நோய் அறிகுறிகள் தென்பட்டால் உடனடியாக ஸ்கேன் செய்யவும்."
    },
    tamilVoiceScript: "உங்கள் பயிர் மிகவும் ஆரோக்கியமாக உள்ளது. எந்த நோயும் இல்லை. வழக்கமான பாசனத்தை தொடரவும்."
  }
];

export const MANDI_PRICES = [
  { crop: "Paddy (Rice)", market: "Thanjavur Mandi", price: "₹2,350 / Qtl", trend: "+2.4%", status: "Bullish", historical: [2100, 2150, 2200, 2280, 2350] },
  { crop: "Sugarcane", market: "Coimbatore Mill", price: "₹3,150 / Ton", trend: "0.0%", status: "Stable", historical: [3150, 3150, 3150, 3150, 3150] },
  { crop: "Cotton", market: "Madurai APMC", price: "₹7,400 / Qtl", trend: "+4.1%", status: "High Demand", historical: [6800, 7000, 7150, 7300, 7400] },
  { crop: "Tomato", market: "Ottanchathiram Mandi", price: "₹2,800 / Qtl", trend: "-1.5%", status: "Fluctuating", historical: [3200, 3100, 2950, 2850, 2800] },
  { crop: "Maize", market: "Salem Market", price: "₹2,250 / Qtl", trend: "+1.2%", status: "Steady", historical: [2150, 2180, 2200, 2230, 2250] }
];

export const WEATHER_ALERTS = [
  { day: "Today", temp: "26°C", condition: "Moderate Rain", rainProb: "70%", humidity: "84%" },
  { day: "Tue", temp: "25°C", condition: "Heavy Showers", rainProb: "85%", humidity: "90%" },
  { day: "Wed", temp: "27°C", condition: "Partly Cloudy", rainProb: "30%", humidity: "75%" },
  { day: "Thu", temp: "28°C", condition: "Sunny", rainProb: "10%", humidity: "65%" },
  { day: "Fri", temp: "29°C", condition: "Clear Sky", rainProb: "5%", humidity: "60%" }
];

export const TAMIL_TRANSLATIONS = {
  "Smart Crop Advisory": "ஸ்மார்ட் பயிர் ஆலோசனை மையம்",
  "Crop Recommendation": "பயிர் பரிந்துரை இன்ஜின்",
  "Disease Detection": "நோய் கண்டறிதல் & சிகிச்சை",
  "Weather Alerts": "வானிலை எச்சரிக்கை",
  "Market Prices": "சந்தை விலை நிலவரம்",
  "Voice Assistant": "தமிழ் குரல் உதவி"
};

export const PPT_SLIDES = [
  { title: "Slide 1: Problem Statement", desc: "Smallholder farmers suffer crop yield losses due to untimely fertilizer application & late disease diagnosis." },
  { title: "Slide 2: Proposed AI Solution", desc: "Integrated AI Soil NPK Matcher, CV Leaf Disease Scanner & Agrometeorological Advisory System." },
  { title: "Slide 3: Technical Architecture", desc: "React 18, Node.js, Open-Meteo Weather API, TensorFlow Vision Model & Agmarknet Mandi Integration." },
  { title: "Slide 4: Impact & Feasibility", desc: "30% Reduction in chemical fertilizer costs, 40% faster disease intervention & Tamil Voice accessibility." }
];

export const FARMER_PROFILE = {
  name: "Ramesh",
  village: "Sulur",
  district: "Coimbatore",
  state: "Tamil Nadu",
  location: "Coimbatore, Tamil Nadu",
  phone: "+91 98765 43210",
  landSize: "2.5 Acres",
  primaryCrop: "Paddy (Rice)",
  soilType: "Clay Loam (களிமண்)",
  soilNPK: { N: 115, P: 58, K: 195, pH: 6.8 }
};
