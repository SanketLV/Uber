import splitAddress from "../utils/splitAdress";

const WaitingForDriver = ({ setWaitingForDriver, ride }) => {
  const pickupParts = splitAddress(ride?.pickup);
  const destinationParts = splitAddress(ride?.dropoff);

  return (
    <div>
      <h4
        className="absolute top-0 text-center w-full"
        onClick={() => setWaitingForDriver(false)}
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i>
      </h4>

      <div className="flex items-center justify-between">
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">
            {ride?.captain?.fullname?.firstname}
          </h2>
          <h4 className="text-xl font-semibold -my-1">
            {ride?.captain?.vehicle?.plate}
          </h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          <h4 className="text-sm text-gray-600">OTP: {ride?.otp}</h4>
        </div>
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
      </div>
    </div>
  );
};

export default WaitingForDriver;
