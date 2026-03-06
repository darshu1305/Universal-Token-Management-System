const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  }
});

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  category: {
    type: String
  },
  services: [serviceSchema]
}, { timestamps: true });


shopSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await require("bcryptjs").genSalt(10);
  this.password = await require("bcryptjs").hash(this.password, salt);
});

shopSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("Shop", shopSchema);