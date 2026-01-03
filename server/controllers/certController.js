const Certificate = require('../models/Certificate');
const crypto = require('crypto');

// Issue a new Certificate
exports.issueCertificate = async (req, res) => {
  try {
    const { userId, userName, title, type } = req.body;

    // Create unique data string
    const dataString = `${userId}-${title}-${Date.now()}`;
    // Generate SHA-256 Hash
    const hash = crypto.createHash('sha256').update(dataString).digest('hex');

    const newCert = new Certificate({ hash, userId, userName, title, type });
    await newCert.save();

    res.json({ success: true, hash });
  } catch (error) {
    res.status(500).json({ error: "Minting failed" });
  }
};

// Verify a Certificate (Public)
exports.verifyCertificate = async (req, res) => {
  try {
    const { hash } = req.params;
    const cert = await Certificate.findOne({ hash });
    
    if (!cert) return res.status(404).json({ valid: false });
    res.json({ valid: true, data: cert });
  } catch (error) {
    res.status(500).json({ error: "Verification failed" });
  }
};