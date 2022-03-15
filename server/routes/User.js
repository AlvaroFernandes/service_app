const express = require("express");
const router = express.Router();

//import controllers
const { register } = require("../controllers/user");
//api routes
router.post("/register", register);

module.exports = router;
