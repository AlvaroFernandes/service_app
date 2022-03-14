const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Jobs", JobsSchema);
