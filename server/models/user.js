const mongoose = require("mongoose");
const uuidv1 = require("uuidv1");
const crypto = require("crypto");
const { stringify } = require("querystring");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    salt: String,
  },
  {
    timestamps: true,
  }
);

//virtual field
userSchema.virtual("password").set(function (password) {
  this._password = password;

  this.salt = uuidv1();

  this.hashedPassword = this.encryptPassword(password);
});

//methods
userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
};

module.exports = mongoose.model("User", userSchema);
