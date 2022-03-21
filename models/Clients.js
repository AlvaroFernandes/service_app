const mongoose = require("mongoose");

const ClientsSchema = new mongoose.Schema(
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
    price: {
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

ClientsSchema.path("price").get((num) => {
  return (num / 100).toFixed(2);
});

ClientsSchema.path("price").set((num) => {
  return num * 100;
});

module.exports = mongoose.model("Clients", ClientsSchema);
