const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'other'],
  },
  proficiency: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  icon: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Skill', skillSchema);
