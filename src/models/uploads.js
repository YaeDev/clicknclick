const mongoose = require("mongoose");

const upSchema = new mongoose.Schema({
  addedAt: {
    default: () => new Date(),
    type: Date
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Uploads", upSchema);