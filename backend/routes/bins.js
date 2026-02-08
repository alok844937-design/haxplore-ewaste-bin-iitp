const express = require('express');
const router = express.Router();

const binsData = [
  { name: "IIT Patna E-Waste Bin", lat: 25.526, lng: 84.907, types: ["phone", "battery", "charger"], fillLevel: 45 },
  { name: "Meerut Collect Point", lat: 28.9845, lng: 77.7064, types: ["phone", "laptop", "cable"], fillLevel: 20 },
  { name: "Delhi Sector 15", lat: 28.551, lng: 77.249, types: ["laptop", "battery"], fillLevel: 70 }
];

router.get('/', (req, res) => {
  const { lat = 28.98, lng = 77.70, type = 'phone' } = req.query;
  const bins = binsData.filter(bin => bin.types.includes(type))
    .map(bin => ({
      ...bin,
      distance: Math.sqrt((bin.lat - parseFloat(lat))**2 + (bin.lng - parseFloat(lng))**2) * 111
    })).sort((a, b) => a.distance - b.distance);
  res.json({ success: true, nearest: bins.slice(0, 5) });
});

module.exports = router;