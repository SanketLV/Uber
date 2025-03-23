import VehicleCard from "./VehicleCard";

const VehiclePanel = ({ setVehiclePanel, setConfirmRidePanel, fare }) => {
  return (
    <div>
      <h4
        className="absolute top-0 text-center w-full"
        onClick={() => {
          setVehiclePanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i>
      </h4>
      <h3 className="text-2xl font-semibold mb-3">Choose a Vehicle :</h3>

      <VehicleCard
        img={
          "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
        }
        capacity={4}
        name={"UberGo"}
        description={"Affordable, compact rides"}
        time={"2 mins"}
        price={fare.car}
        setConfirmRidePanel={setConfirmRidePanel}
        setVehiclePanel={setVehiclePanel}
      />

      <VehicleCard
        img={
          "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
        }
        capacity={1}
        name={"Moto"}
        description={"Affordable motorcycle rides"}
        time={"2 mins"}
        price={fare.moto}
        setConfirmRidePanel={setConfirmRidePanel}
        setVehiclePanel={setVehiclePanel}
      />

      {/* <VehicleCard
        img={
          "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_470,w_835/v1657101905/assets/af/2c5369-2dec-4ea6-b67b-fba6e4a01f49/original/hcv_final.png"
        }
        capacity={4}
        name={"Premier"}
        description={"Comfortable, Luxury rides"}
        time={"4 mins"}
        price={30}
        setConfirmRidePanel={setConfirmRidePanel}
        setVehiclePanel={setVehiclePanel}
      /> */}

      <VehicleCard
        img={
          "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
        }
        capacity={3}
        name={"UberAuto"}
        description={"Affordable Auto rides"}
        time={"3 mins"}
        price={fare.auto}
        setConfirmRidePanel={setConfirmRidePanel}
        setVehiclePanel={setVehiclePanel}
      />
    </div>
  );
};

export default VehiclePanel;
