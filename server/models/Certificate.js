const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  hash: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  title: { type: String, required: true }, // e.g. "React Mastery"
  type: { type: String, enum: ['Course', 'Duel', 'Hackathon'], default: 'Course' },
  issueDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', CertificateSchema);