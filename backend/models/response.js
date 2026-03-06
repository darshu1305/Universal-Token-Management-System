const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Token",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["info", "approved", "rejected", "completed"],
    default: "info"
  }
}, { timestamps: true });

module.exports = mongoose.model("Response", responseSchema);