const asyncHandler = require("express-async-handler");

const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Jobs.find({ user: req.user.id });
  res.status(200).json(jobs);
});

const createJob = asyncHandler(async (req, res) => {});

module.exports = { getJobs };
