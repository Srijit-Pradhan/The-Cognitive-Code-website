const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'The Cognitive Code'
  },
  coverImageUrl: {
    type: String,
    required: true
  },
  pdfUrl: {
    type: String,
    required: true
  },
  youtubeUrl: {
    type: String
  },
  tableOfContents: [{
    title: String,
    pageNumber: Number
  }],
  content: {
    type: String
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
