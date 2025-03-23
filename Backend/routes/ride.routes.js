const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("dropoff")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid dropoff address"),
  body("vehicleType")
    .isString()
    .isIn(["car", "moto", "auto"])
    .withMessage("Invalid vehicle type"),
  rideController.createRide
);

router.get(
  "/get-fare",
  authMiddleware.authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup location"),
  query("dropoff")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid dropoff location"),
  rideController.getFare
);

module.exports = router;
