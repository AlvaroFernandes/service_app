const jwt = require("jsonwebtoken");
const user = require("../models/user");

exports.verifyToken = (req, res, next) => {
  let accessToken = req.cookie.jwt;

  if (!accessToken) {
    return res.status(403).json({
      error: "Unauthorized",
    });
  }

  let payload;

  try {
    payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    req._id = payload._id;

    next();
  } catch (error) {
    return res.status(403).json({
      error: "Unauthorized",
    });
  }
};
