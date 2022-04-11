const asyncHandler = require("express-async-handler");
const User = require("../models/Users");
const ErrorResponse = require("../utils/errorResponse");
const url = require("url");

const getUserInfo = asyncHandler(async (req, res, next) => {
  const _id = req.user.id;

  const user = await User.findById(_id);

  if (!user) {
    return next(new ErrorResponse("User not found", 401));
  }

  sendResponse(user, 200, res);
});

const sendResponse = (user, statusCode, res) => {
  res.status(statusCode).json({ success: true, user });
};

module.exports = {
  getUserInfo,
};
