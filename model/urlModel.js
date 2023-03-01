const mongoose = require('mongoose');

const ShortUrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Number,
    default: Date.now
  }
});

module.exports = mongoose.model('ShortUrl', ShortUrlSchema);
