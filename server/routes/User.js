const express = require("express");
const router = express.Router();

//import controllers
const { register } = require("../controllers/user");

//middleware
const { userRegisterValidator } = require("../middlewares/user");
//api routes
router.post("/register", userRegisterValidator, register);
module.exports = router;
