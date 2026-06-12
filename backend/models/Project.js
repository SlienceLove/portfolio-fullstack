const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  techStack: [{
    type: String,
  }],
  features: [{
    type: String,
  }],
  screenshots: [{
    type: String,
  }],
  links: {
    github: String,
    demo: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
