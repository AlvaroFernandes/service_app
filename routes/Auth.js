const express = require("express");
const authRouter = express.Router();

const {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/forgotPassword", forgotPassword);
authRouter.put("/resetPassword/:resetToken", resetPassword);

module.exports = authRouter;
