const express = require("express");
const jobsRouter = express.Router();
require("dotenv").config();

const { getJobs } = require("../controllers/JobsControllers");
const { protect } = require("../middleware/authMiddleware");

jobsRouter.post("/getJobs", protect, getJobs);

module.exports = jobsRouter;
