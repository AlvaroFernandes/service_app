const asyncHandler = require("express-async-handler");
const Staffs = require("../models/Staffs");

const inputStaff = asyncHandler(async (req, res) => {
  const { name, email, phone, address, salary, obs } = req.body;

  if (!name || !email || !phone || !address || !salary) {
    res.status(400);
    throw new Error("Please add all required fields");
  }
  //check is client exists
  const staffExists = await Staffs.findOne({ email, phone });
  if (staffExists) {
    res.status(400);
    throw new Error("Staff already registered");
  }

  //create client
  const staff = await Staffs.create({
    name,
    email,
    phone,
    address,
    salary,
    obs,
  });
  if (staff) {
    res.status(200).json({
      _id: staff.id,
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      address: staff.address,
      salary: staff.salary,
      obs: staff.obs,
    });
  } else {
    res.status(400);
    throw new Error("Invalid staff data");
  }
});

module.exports = { inputStaff };
