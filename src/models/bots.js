const mongoose = require("mongoose");

const botsSchema = new mongoose.Schema({
  addedAt: {
    default: () => new Date(),
    type: Date
  },
  pats: {
    type: Number,
    required: true
  },
  terms: {
    type: Number,
  },
  multi: {
    type: Number,
  },
  botid: {
    type: String,
    required: true,
    unique: true
  },
  wins: {
  type: Number,
  },
  loses: {
  type: Number,
  },
  earned: {
  type: Number,
  },
  tg: {
  type: Number,
  },
  lastperson: {
    type: String,
  },
  ip: {
    type: String,
  },
  chnId: {
    type: String,
  },
  captain: {
    type: String,
  },
  personid: {
    type: String,
  },
  perpats: {
    type: Number,
  },
    username: {
    type: String,
  },
  logo: {
    type: String,
  },
  about: {
    type: String,
  },
  clicks: {
    type: Number,
  },
  date: {
    type: Date,
  },
  dailydt: {
    type: Date,
  },
  coins: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  background: {
  type: String,
  }
});

module.exports = mongoose.model("Bots", botsSchema);