const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pet name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Pet type is required'],
    enum: ['dog', 'cat'],
    lowercase: true
  },
  age: {
    type: Number,
    required: [true, 'Pet age is required'],
    min: [0, 'Age must be a positive number'],
    max: [50, 'Age must be realistic']
  },
  owner: {
    name: {
      type: String,
      required: [true, 'Owner name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Owner phone is required'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);
