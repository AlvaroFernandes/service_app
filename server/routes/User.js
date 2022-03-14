const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/Users");
const Jobs = require("../models/Jobs");

userRouter.post("/register", (req, res) => {
  console.log(req.body)
  const { username, password, role } = req.body;
  User.findOne({ username }, (err, user) => {
    if(err)
      res.status(500).json({message: { msgBody: "Error has occured", msgError: true}});
    if(user)
      res.status(400).json({message: {msgBody: "Username is already taken, choose a different one", msgError: true}});
    else{
      const newUser = new User({username, password, role})
      newUser.save(err=>{
        if(err)
          res.status(500).json({message: { msgBody: "Error has occured", msgError: true}});
        else
          res.status(201).json({message: { msgBody: "Account created", msgError: false}});
      })
    }
  });
});

module.exports = userRouter;
