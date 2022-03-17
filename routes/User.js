const express = require("express");
const userRouter = express.Router();
require("dotenv").config();

const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");

const User = require("../models/User");
const Jobs = require("../models/Jobs");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: process.env.ISS,
      sub: userID,
    },
    process.env.SECRET_JWT,
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  const { username, password, email, role } = req.body;

  User.findOne({ username }, (error, user) => {
    if (error)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res.status(400).json({
        message: { msgBody: "Username already taken", msgError: true },
      });
    else {
      const newUser = new User({ username, password, role, email });
      newUser.save((error) => {
        if (error)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else
          res.status(201).json({
            message: { msgBody: "Account created", msgError: false },
          });
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role, email } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res
        .status(200)
        .json({ isAuthenticated: true, user: { username, email, role } });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", email: "", role: "" }, success: true });
  }
);

userRouter.port(
  "/jobs",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

module.exports = userRouter;
