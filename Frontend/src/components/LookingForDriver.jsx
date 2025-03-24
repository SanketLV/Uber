import splitAddress from "../utils/splitAdress";

const LookingForDriver = ({
  setVehicleFound,
  pickup,
  destination,
  vehicleType,
  fare,
}) => {
  const pickupParts = splitAddress(pickup);
  const destinationParts = splitAddress(destination);

  return (
    <div>
      <h4
        className="absolute top-0 text-center w-full"
        onClick={() => {
          setVehicleFound(false);
        }}
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i>
      </h4>
      <h3 className="text-2xl font-semibold mb-3">Looking for a driver</h3>

      <hr />

      <div className="flex flex-col items-center gap-4">
        <img
          className="h-24"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt=""
        />
        <div className="w-full">
          <div className="flex flex-row items-center gap-4">
            <h3 className="text-xl">
              <i className="ri-map-pin-3-fill"></i>
            </h3>
            <div className="w-full py-3 border-b">
              <h2 className="text-xl font-bold">{pickupParts.main}</h2>
              <h4 className="text-base text-gray-600">{pickupParts.detail}</h4>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <h3>
              <i className="ri-square-fill"></i>
            </h3>
            <div className="w-full py-3 border-b">
              <h2 className="text-xl font-bold">{destinationParts.main}</h2>
              <h4 className="text-base text-gray-600">
                {destinationParts.detail}
              </h4>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <h3>
              <i className="ri-bank-card-2-fill"></i>
            </h3>
            <div className="w-full py-3">
              <h2 className="text-xl font-bold">₹{fare[vehicleType]}</h2>
              <h4 className="text-base text-gray-600">Cash</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
