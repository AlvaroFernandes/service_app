const express = require("express");
const userRouter = express.Router();
require("dotenv").config();

const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");

const User = require("../models/User");
const Clients = require("../models/Clients");
const Staffs = require("../models/Staffs");
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
    res.clearCookie("access_token", { path: "/", domain: "localhost" }).send();
    res
      .status(200)
      .json({ user: { username: "", email: "", role: "" }, success: true });
  }
);

userRouter.post(
  "/jobs",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const job = new job(req.body);
    job.save((error) => {
      if (error)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        req.user.jobs.push(job);
        req.user.save((error) => {
          if (error)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else {
            res.status(200).json({
              message: {
                msgBody: "Job successfully created",
                msgError: false,
              },
            });
          }
        });
      }
    });
  }
);

userRouter.post(
  "/inputclient",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const { name, email, phone, address, price, obs } = req.body;
    console.log(name);
    Clients.findOne({ email }, (error, client) => {
      if (error)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      if (client)
        res.status(400).json({
          message: { msgBody: "Client already register", msgError: true },
        });
      else {
        const newClient = new Client({
          name,
          email,
          phone,
          address,
          price,
          obs,
        });
        newClient.save((error) => {
          if (error)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else {
            if (price) {
              req
                .assert("price", "Enter a price (numbers only)")
                .regex(/^\d+(\.\d{2})?$/);
            }
            res.status(201).json({
              message: { msgBody: "Client registered", msgError: false },
            });
          }
        });
      }
    });
  }
);

userRouter.post(
  "/inputStaff",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, email, phone, address, salary, obs } = req.body;
    Clients.findOne({ email }, (error, staff) => {
      if (error)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      if (staff)
        res.status(400).json({
          message: { msgBody: "Staff already register", msgError: true },
        });
      else {
        const newStaff = new Staff({
          name,
          email,
          phone,
          address,
          salary,
          obs,
        });
        newStaff.save((error) => {
          if (error)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else {
            if (salary) {
              req
                .assert("salary", "Enter a salary(numbers only)")
                .regex(/^\d+(\.\d{2})?$/);
            }
            res.status(201).json({
              message: { msgBody: "Staff registered", msgError: false },
            });
          }
        });
      }
    });
  }
);
module.exports = userRouter;
