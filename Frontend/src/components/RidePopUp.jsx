import splitAddress from "../utils/splitAdress";

const RidePopUp = ({
  setRidePopupPanel,
  setConfirmRidePopupPanel,
  ride,
  confirmRide,
}) => {
  console.log(ride);

  const pickupParts = splitAddress(ride?.pickup);
  const destinationParts = splitAddress(ride?.dropoff);

  return (
    <div>
      <h4
        className="absolute top-0 text-center w-full"
        onClick={() => setRidePopupPanel(false)}
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i>
      </h4>
      <h3 className="text-2xl font-semibold mb-3">New Ride Available!</h3>

      <hr />

      <div className="flex items-center justify-between mt-2 bg-yellow-400 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
          <h2 className="text-xl font-medium">
            {ride?.user?.fullname?.firstname +
              " " +
              ride?.user?.fullname?.lastname}
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
        <div className="flex w-full gap-2">
          <button
            className="w-full bg-green-600 text-white p-4 rounded-xl text-lg font-semibold"
            onClick={() => {
              setConfirmRidePopupPanel(true);
              confirmRide();
            }}
          >
            Accept
          </button>
          <button
            className="w-full bg-gray-300 text-gray-700 p-4 rounded-xl text-lg font-semibold"
            onClick={() => {
              setRidePopupPanel(false);
            }}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
