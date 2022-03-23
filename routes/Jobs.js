const express = require("express");
const jobsRouter = express.Router();

const {
  getJobs,
  getJobsByUser,
  getJobsByClient,
  getJobsByStaff,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/JobsController");
const { protect } = require("../middleware/authMiddleware");

jobsRouter.get("/getjobs", protect, getJobs);
jobsRouter.get("/userjobs", protect, getJobsByUser);
jobsRouter.get("/clientjobs", protect, getJobsByClient);
jobsRouter.get("/staffjobs", protect, getJobsByStaff);
jobsRouter.post("/createjob", protect, createJob);
jobsRouter.put("/updatejob/:id", protect, updateJob);
jobsRouter.delete("/deletejob/:id", protect, deleteJob);

module.exports = jobsRouter;
