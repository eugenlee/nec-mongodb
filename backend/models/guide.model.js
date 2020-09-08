const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const guideSchema = new Schema({
  imgLink: { type: String, required: true },
  firstText: { type: String, required: true },
  articleLink: { type: String, required: true },
  secondText: { type: String, required: true },
  spanBody: { type: String, required: true },
  mainBody: { type: String, required: true }
}, {
  timestamps: true,
});

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;