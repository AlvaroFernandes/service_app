const express = require("express");
const userRouter = express.Router();
require("dotenv").config();

const {
  loginUser,
  registerUser,
  getUserInfo,
  logoutUser,
} = require("../controllers/UserController");
const { protect } = require("../middleware/authMiddleware");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/userInfo", protect, getUserInfo);

userRouter.get("/logout", logoutUser);

module.exports = userRouter;
