const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ INLINE BINS DATA - No external files
const binsData = [
  { name: "IIT Patna E-Waste Bin", lat: 25.526, lng: 84.907, types: ["phone", "battery"], fillLevel: 45 },
  { name: "Meerut Collect Point", lat: 28.9845, lng: 77.7064, types: ["phone", "laptop"], fillLevel: 20 }
];

// 🗺️ BINS API
app.get("/api/bins", (req, res) => {
  const { lat = 28.98, lng = 77.70, type = 'phone' } = req.query;
  const bins = binsData
    .filter(bin => bin.types.includes(type))
    .map(bin => ({
      ...bin,
      distance: Math.sqrt((bin.lat - parseFloat(lat))**2 + (bin.lng - parseFloat(lng))**2) * 111
    }))
    .sort((a, b) => a.distance - b.distance);
  
  res.json({ success: true, nearest: bins.slice(0, 5) });
});

// 🤖 AI DETECTION API
app.post("/api/detect", (req, res) => {
  const wasteTypes = { phone: 500, battery: 50, laptop: 2000 };
  const detected = Object.keys(wasteTypes)[Math.floor(Math.random() * 3)];
  
  res.json({
    success: true,
    detected,
    value: wasteTypes[detected],
    confidence: 0.92,
    co2Saved: detected === 'phone' ? 2.5 : 0.5
  });
});

app.get("/", (req, res) => {
  res.json({ message: "✅ HAXPLORE Backend LIVE!" });
});

app.listen(5000, () => {
  console.log("🚀 Server: http://localhost:5000");
});