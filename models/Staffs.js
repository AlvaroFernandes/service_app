const mongoose = require("mongoose");

const StaffsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      default: 0,
    },
    obs: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

StaffsSchema.path("salary").get((num) => {
  return (num / 100).toFixed(2);
});

StaffsSchema.path("salary").set((num) => {
  return num * 100;
});

module.exports = mongoose.model("Staffs", StaffsSchema);
