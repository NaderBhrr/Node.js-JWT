const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minCharacter: 6,
  },
  email: {
    type: String,
    required: true,
    minCharacter: 10,
    maxCharacter: 255,
  },
  password: {
    type: String,
    required: true,
    minCharacter: 6,
    maxCharacter: 1024, // This is due to conversion of password into hash protected values
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
