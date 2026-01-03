const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk ID
  courseId: { type: String, required: true },
  front: { type: String, required: true }, // The Question
  back: { type: String, required: true },  // The Answer
  box: { type: Number, default: 1 },       // Leitner Box (1-5)
  nextReviewDate: { type: Date, default: Date.now }, // When to show it again
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flashcard', FlashcardSchema);