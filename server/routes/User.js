const express = require("express");
const router = express.Router();

//import controllers
const {
  register,
  login,
  logout,
  getLoggedUser,
} = require("../controllers/user");

//middleware
const { userRegisterValidator, userById } = require("../middlewares/user");
const { verifyToken } = require("../middlewares/auth");
//api routes
router.post("/register", userRegisterValidator, register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user", verifyToken, userById, getLoggedUser);

module.exports = router;
