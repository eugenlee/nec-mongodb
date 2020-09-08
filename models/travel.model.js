const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const travelSchema = new Schema({
  continent: { type: String, required: true },
  image: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  link: { type: String, required: true },
  mainBody: { type: String, required: true }
}, {
  timestamps: true,
});

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;