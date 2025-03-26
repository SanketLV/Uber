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

module.exports.getFare = getFare;

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

module.exports.confirmRide = async (rideId, captainId) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await Ride.findByIdAndUpdate(rideId, {
    status: "accepted",
    captain: captainId,
  });

  const ride = await Ride.findById(rideId)
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

module.exports.startRide = async (rideId, otp, captainId) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await Ride.findOne({
    _id: rideId,
  })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await Ride.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
      captain: captainId,
    }
  );

  return ride;
};

module.exports.finishRide = async (rideId, captainId) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await Ride.findOne({
    _id: rideId,
    captain: captainId,
  })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await Ride.findOneAndUpdate({ _id: rideId }, { status: "completed" });

  return ride;
};
