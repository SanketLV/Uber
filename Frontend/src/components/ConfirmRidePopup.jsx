import { useState } from "react";
import splitAddress from "../utils/splitAdress";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopup = ({
  setConfirmRidePopupPanel,
  setRidePopupPanel,
  ride,
}) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const pickupParts = splitAddress(ride?.pickup);
  const destinationParts = splitAddress(ride?.dropoff);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Ride Confirmed");

    const response = await axios.get("/rides/start-ride", {
      params: {
        rideId: ride._id,
        otp: otp,
      },
    });

    if (response.status === 200) {
      setConfirmRidePopupPanel(false);
      setRidePopupPanel(false);
      navigate("/captain-riding", { state: { ride } });
    }
  };

  return (
    <div>
      <h4
        className="absolute top-0 text-center w-full"
        onClick={() => setConfirmRidePopupPanel(false)}
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i>
      </h4>
      <h3 className="text-2xl font-semibold mb-3">
        Confirm this ride to Start
      </h3>

      <hr />

      <div className="flex items-center justify-between mt-2 bg-yellow-400 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
          <h2 className="text-xl font-medium capitalize">
            {ride?.user?.fullname?.firstname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.5 KM</h5>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="w-full">
          <div className="flex flex-row items-center gap-4">
            <h3 className="text-xl">
              <i className="ri-map-pin-3-fill"></i>
            </h3>
            <div className="w-full py-3 border-b">
              <h2 className="text-xl font-bold">{pickupParts?.main}</h2>
              <h4 className="text-base text-gray-600">{pickupParts?.detail}</h4>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <h3>
              <i className="ri-square-fill"></i>
            </h3>
            <div className="w-full py-3 border-b">
              <h2 className="text-xl font-bold">{destinationParts?.main}</h2>
              <h4 className="text-base text-gray-600">
                {destinationParts?.detail}
              </h4>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <h3>
              <i className="ri-bank-card-2-fill"></i>
            </h3>
            <div className="w-full py-3">
              <h2 className="text-xl font-bold">₹{ride?.fare}</h2>
              <h4 className="text-base text-gray-600">Cash</h4>
            </div>
          </div>
        </div>
        <div className="w-full">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="flex flex-col gap-2"
          >
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="bg-[#eee] px-6 py-4 font-mono text-lg text-center rounded-lg mt-3"
              maxLength={6}
              required
            />
            <div className="flex items-center gap-2">
              <button className="w-1/2 bg-green-600 text-white text-center p-4 rounded-xl text-lg font-semibold">
                Confirm
              </button>
              <button
                className="w-1/2 bg-red-600 text-white p-4 rounded-xl text-lg font-semibold"
                onClick={() => {
                  setConfirmRidePopupPanel(false);
                  setRidePopupPanel(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
