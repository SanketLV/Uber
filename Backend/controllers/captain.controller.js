const Captain = require("../models/captain.model");
const BlacklistToken = require("../models/blacklistToken.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await Captain.findOne({ email });
  if (isCaptainAlreadyExist) {
    return res.status(400).json({
      message: "Captain already exist",
    });
  }

  const hashedPassword = await Captain.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname?.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();

  return res.status(201).json({
    captain,
    token,
    message: "Captain created successfully",
  });
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const existingCaptain = await Captain.findOne({ email }).select("+password");
  if (!existingCaptain) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isMatch = await existingCaptain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = existingCaptain.generateAuthToken();

  res.cookie("token", token);

  return res.status(200).json({
    captain: existingCaptain,
    token,
    message: "Login successful",
  });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  return res.status(200).json({
    captain: req.captain,
  });
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await BlacklistToken.create({ token });

  res.clearCookie("token");

  return res.status(200).json({
    message: "Captain logged out successfully",
  });
};
