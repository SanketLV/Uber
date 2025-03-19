const Ride = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, dropoff) {
  if (!pickup || !dropoff) {
    throw new Error("Pickup and dropoff are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, dropoff);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };

  return fare;
}

function getOtp(num) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();

  return otp;
}

module.exports.createRide = async ({ user, pickup, dropoff, vehicleType }) => {
  if (!user || !pickup || !dropoff || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, dropoff);

  const ride = Ride.create({
    user,
    pickup,
    dropoff,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};
