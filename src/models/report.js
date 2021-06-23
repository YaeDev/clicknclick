const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  addedAt: {
    default: () => new Date(),
    type: Date
  },
  username: {
    type: String,
  },
  reporterid: {
    type: String,
    required: true
  },
    reason: {
    type: String,
  },
    files: {
    type: String,
  },
  botid: {
    type: String,
    required: true,
  },
    logo: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: false,
    default: []
  },
});

module.exports = mongoose.model("Reports", reportSchema);