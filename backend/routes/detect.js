const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });
const wasteTypes = {
  phone: { value: 500, co2: 2.5 },
  battery: { value: 50, co2: 0.5 },
  laptop: { value: 2000, co2: 5.0 },
  charger: { value: 20, co2: 0.2 }
};

router.post('/', upload.single('image'), (req, res) => {
  // Mock AI Detection (Real: TensorFlow.js)
  const types = Object.keys(wasteTypes);
  const detectedType = types[Math.floor(Math.random() * types.length)];
  const confidence = (0.85 + Math.random() * 0.15).toFixed(2);

  res.json({
    success: true,
    detected: detectedType,
    value: wasteTypes[detectedType].value,
    co2Saved: wasteTypes[detectedType].co2,
    confidence: parseFloat(confidence),
    explanation: `Shape+weight analysis: ${confidence*100}% match with ${detectedType}`
  });
});

module.exports = router;