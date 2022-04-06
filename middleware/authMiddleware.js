const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/Users");
const ErrorResponse = require("../utils/errorResponse");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //get token from header
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token.america, process.env.JWT_SECRET);

    const user = await User.findById(decode.id);
    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }
    req.user = user;

    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

module.exports = { protect };
