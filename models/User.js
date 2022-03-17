const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Jobs" }],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (error, passwordHash) => {
    if (error) return next(error);
    this.password = passwordHash;

    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) return cb(error);
    else {
      if (!isMatch) return cb(null, isMatch);

      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
