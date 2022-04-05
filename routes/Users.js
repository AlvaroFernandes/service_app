const express = require("express");
const userRouter = express.Router();

const { getUserInfo } = require("../controllers/UsersController");
const { protect } = require("../middleware/authMiddleware");

userRouter.get("/userInfo", protect, getUserInfo);

module.exports = userRouter;
