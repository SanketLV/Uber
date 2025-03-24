const VehicleCard = ({
  img,
  name,
  description,
  time,
  capacity,
  price,
  setConfirmRidePanel,
  setVehiclePanel,
  selectVehicle,
}) => {
  return (
    <div
      className="flex items-center p-3 border-2 mb-3 active:border-black rounded-xl"
      onClick={() => {
        setConfirmRidePanel(true);
        setVehiclePanel(false);
        selectVehicle(name);
      }}
    >
      <div>
        <img src={img} alt="car" className="h-20 w-40" />
      </div>
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col">
          <h4 className="font-medium text-lg">
            {name}{" "}
            <span>
              <i className="ri-user-fill"></i>
            </span>
            {capacity}
          </h4>
          <h4 className="text-gray-500 text-sm">{time} away</h4>
          <h4 className="text-gray-500 text-xs">{description}</h4>
        </div>
        <div className="">
          <h2 className="font-medium">₹{price}</h2>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
