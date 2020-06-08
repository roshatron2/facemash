const mongoose = require("mongoose");

var profileSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating: {
    type: Number,
    default: 1500,
  },
});

module.exports = mongoose.model("Profiles", profileSchema);
