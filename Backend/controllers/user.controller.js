const User = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const hashedPassword = await User.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname?.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  return res.status(201).json({
    user,
    token,
    message: "User created successfully",
  });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isMatch = await existingUser.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = existingUser.generateAuthToken();

  return res.status(200).json({
    user: existingUser,
    token,
    message: "User logged in successfully",
  });
};
