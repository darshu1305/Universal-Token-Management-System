const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  tokenNumber: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["waiting", "serving", "completed"],
    default: "waiting"
  }
}, { timestamps: true });

// ✅ This prevents OverwriteModelError
module.exports =
  mongoose.models.Token || mongoose.model("Token", tokenSchema);