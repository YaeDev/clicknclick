const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
      },
    about: {
        type: String,
        default: "Biografia não definida"
      },
      joincheck: {
    type: Number,
    default: 0
      },
        join: {
    type: Number,
    default: 0
      },
    botliked: {
        type: String,
        required: true
    },
  
      verified: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("users", usersSchema);