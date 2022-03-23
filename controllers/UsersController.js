const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/Users");

//generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: "30d" });
};
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credencials");
  }
});

const getUserInfo = asyncHandler(async (req, res) => {
  const { _id, name, email, role } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
    role,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("access_token", { path: "/", domain: "localhost" }).send();
  res
    .status(200)
    .json({ user: { username: "", email: "", role: "" }, success: true });
});

module.exports = { loginUser, registerUser, getUserInfo, logoutUser };
