const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true }, // in kg
  height: { type: Number, required: true }, // in cm
  goal: { type: String, required: true }, // gain, lose, maintain
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
