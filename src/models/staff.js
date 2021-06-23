const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({ //olha dm
  role: {
    type: Array,
    required: false,
    default: []
  },
  reqid: {
        type: String,
        required: true,
        unique: true,
    },
staffid:{
        type: String,
        required: true,
    },
staffage:{
        type: String,
        required: true,
    },
stafflist: {
        type: String,
        required: true,
    },
  
staffref: {
        type: String,
        required: true,
    },
  
  staffexp: {
        type: String,
        required: true,
    },
  
  staffquiz: {
        type: String,
        required: true,
    },
  
  staffquiz2: {
        type: String,
        required: true,
    },
  
  staffquiz3: {
        type: String,
        required: true,
    },
  
  staffadmin: {
        type: String,
        required: true,
    },
  
  staffsuper:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("staff", staffSchema);