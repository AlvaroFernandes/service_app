const express = require("express");
const userRouter = express.Router();

const {
  loginUser,
  registerUser,
  getUserInfo,
  forgotPassword,
} = require("../controllers/UsersController");
const { protect } = require("../middleware/authMiddleware");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.get("/userInfo", protect, getUserInfo);

module.exports = userRouter;
