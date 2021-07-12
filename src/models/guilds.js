const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  addedAt: {
    default: () => new Date(),
    type: Date
  },
  username: {
    type: String,
  },
  guildid: {
    type: String,
    required: true,
    unique: true
  },
    prefix: {
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

module.exports = mongoose.model("Guilds", guildSchema);