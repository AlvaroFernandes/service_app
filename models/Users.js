const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
      min: 6,
    },
    email: {
      type: String,
      required: [true, "please add an email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please add a password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Jobs" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
