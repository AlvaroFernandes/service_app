const asyncHandler = require("express-async-handler");
const Jobs = require("../models/Jobs");
const { off } = require("../models/Users");
const Users = require("../models/Users");

const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Jobs.find();
  res.status(200).json(jobs);
});

const getJobsByUser = asyncHandler(async (req, res) => {
  const jobs = await Jobs.find({ user: req.user.id });
  res.status(200).json(jobs);
});

const getJobsByClient = asyncHandler(async (req, res) => {
  const jobs = await Jobs.find({ client });
  res.status(200).json(jobs);
});

const getJobsByStaff = asyncHandler(async (req, res) => {
  const jobs = await Jobs.find({ staff });
  res.status(200).json(jobs);
});

const createJob = asyncHandler(async (req, res) => {
  const { client, staff, dateStart, recurrence } = req.body;

  if (!client || !staff || !dateStart || !recurrence) {
    res.status(400);
    throw new Error("Please add all fields on the form");
  }

  const job = await Jobs.create({
    user: req.user.id,
    client,
    staff,
    dateStart,
    recurrence,
  });
  if (job) {
    res.status(200).json(job);
  }
});

const updateJob = asyncHandler(async (req, res) => {
  const job = await Jobs.findById(req.params.id);

  if (!job) {
    res.status(400);
    throw new Error("Job not foud");
  }

  const user = await Users.findById(req.user.id);

  //check user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the user is altering his jobs.
  if (job.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedJob);
});

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Jobs.findById(req.params.id);

  if (!job) {
    res.status(400);
    throw new Error("Job not foud");
  }

  const user = await Users.findById(req.user.id);

  //check user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the user is altering his jobs.
  if (job.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Jobs.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getJobs,
  getJobsByUser,
  getJobsByClient,
  getJobsByStaff,
  createJob,
  updateJob,
  deleteJob,
};
