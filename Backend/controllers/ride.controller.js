const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSecketID } = require("../socket");
const Ride = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { pickup, dropoff, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      dropoff,
      vehicleType,
    });

    res.status(201).json(ride);

    const pickupLocation = await mapService.getAddressCoordinate(pickup);

    console.log(pickupLocation);

    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupLocation.ltd,
      pickupLocation.lng,
      5
    );

    console.log(captainsInRadius);

    ride.otp = "";

    const rideWithUser = await Ride.findOne({ _id: ride._id }).populate("user");

    captainsInRadius.map((captain) => {
      sendMessageToSecketID(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { pickup, dropoff } = req.query;

    const fare = await rideService.getFare(pickup, dropoff);
    return res.status(200).json(fare);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { rideId } = req.body;

    const ride = await rideService.confirmRide(rideId, req.captain._id);

    sendMessageToSecketID(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { rideId, otp } = req.query;

    const ride = await rideService.startRide(rideId, otp, req.captain._id);

    sendMessageToSecketID(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.finishRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { rideId } = req.body;

    const ride = await rideService.finishRide(rideId, req.captain._id);

    sendMessageToSecketID(ride.user.socketId, {
      event: "ride-finished",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
