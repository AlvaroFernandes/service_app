const express = require("express");
const authRouter = express.Router();

const {
  loginUser,
  registerUser,
  forgotPassword,
} = require("../controllers/UsersController");

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/forgotPassword", forgotPassword);

module.exports = authRouter;
