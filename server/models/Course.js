const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  language: { type: String, default: "English" }, // <--- NEW FIELD
  
  nodes: [
    {
      id: { type: String, required: true },
      type: { type: String, default: 'default' },
      data: { 
        label: { type: String, required: true },
        description: { type: String } 
      },
      position: { 
        x: { type: Number, default: 0 }, 
        y: { type: Number, default: 0 } 
      }
    }
  ],
  edges: [
    {
      id: { type: String },
      source: { type: String },
      target: { type: String }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);