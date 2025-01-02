const User = require("../models/user.model");
const BlacklistToken = require("../models/blacklistToken.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isUserAlreadyExist = await User.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exist",
    });
  }

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

  res.cookie("token", token);

  return res.status(200).json({
    user: existingUser,
    token,
    message: "User logged in successfully",
  });
};

module.exports.getUserProfile = async (req, res, next) => {
  return res.status(200).json({
    user: req.user,
  });
};

module.exports.logoutUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  if (token) {
    await BlacklistToken.create({ token });
  }

  res.clearCookie("token");

  return res.status(200).json({
    message: "User logged out successfully",
  });
};
