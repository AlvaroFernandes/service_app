const express = require("express");
const userRouter = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getUserInfo } = require("../controllers/userController");

userRouter.get("/userInfo/:_id", protect, getUserInfo);

module.exports = userRouter;
