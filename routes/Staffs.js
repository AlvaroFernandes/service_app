const express = require("express");
const staffsRouter = express.Router();

const { inputStaff } = require("../controllers/StaffsController");
const { protect } = require("../middleware/authMiddleware");

staffsRouter.post("/registerstaff", protect, inputStaff);

module.exports = staffsRouter;
