const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
  {
    client: [{ type: mongoose.Schema.Types.ObjectId, ref: "Clients" }],
    staff: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staffs" }],
    dateStart: {
      type: Date,
    },
    recurrence: {
      type: String,
      enum: ["weekly", "fortnightly", "monthly", "once"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Jobs", JobsSchema);
