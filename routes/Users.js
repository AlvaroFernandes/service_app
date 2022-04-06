const express = require("express");
const userRouter = express.Router();

const { protect } = require("../middleware/authMiddleware");

userRouter.post("/userInfo", protect);

module.exports = userRouter;
