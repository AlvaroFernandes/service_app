const User = require("../models/user");

exports.register = async (req, res) => {
  const usernameExists = await User.findOne({
    username: req.body.username,
  });
  const emailExists = await User.findOne({
    email: req.body.email,
  });

  if (usernameExists) {
    return res.status(403).json({
      error: "Username is taken",
    });
  }
  if (emailExists) {
    return res.status(403).json({
      error: "Email is taken",
    });
  }

  const user = new User(req.body);
  await user.save();

  res.status(201).json({
    message: "Signup successful! Please Login to preceed.",
  });
};
