const User = require("../models/user");

exports.userRegisterValidator = (req, res, next) => {
  //username not null
  req.check("username", "Username is required").notEmpty();

  //email validation
  req.check("email", "Email is required").notEmpty();
  req.check("email", "Invalid Email").isEmail();

  //password check
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 character");
  req
    .check(
      "password",
      "Password must contain one uppercase, one lowercase, one numve and one special symbol"
    )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/, "i");

  //error check
  const errors = req.validationErrors();
  // show first
  if (errors) {
    const firstError = errors.map((err) => err.msg)[0];

    return res.status(400).json({ error: firstError });
  }

  next();
};

exports.userById = async (req, res, next) => {
  user.findById(req._id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  });
};
