const mongoose = require("mongoose");

const betsSchema = new mongoose.Schema({
  addedAt: {
    default: () => new Date(),
    type: Date
  },
  username: {
    type: String,
  },
  betid: {
    type: String,
    required: true,
  },
  authorid: {
    type: String,
    required: true,
  },
    betamount: {
    type: Number,
  },
    logo: {
    type: String,
  },
  chnId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Bets", betsSchema);