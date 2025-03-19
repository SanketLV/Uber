const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { pickup, dropoff, vehicleType } = req.body;

  console.log(req.user);

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      dropoff,
      vehicleType,
    });

    return res.status(201).json(ride);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
