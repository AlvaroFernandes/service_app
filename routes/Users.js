const express = require("express");
const userRouter = express.Router();

const {
  loginUser,
  registerUser,
  getUserInfo,
  logoutUser,
} = require("../controllers/UsersController");
const { protect } = require("../middleware/authMiddleware");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/userInfo", protect, getUserInfo);

userRouter.get("/logout", logoutUser);

module.exports = userRouter;
