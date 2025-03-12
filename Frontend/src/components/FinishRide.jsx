import { Link } from "react-router-dom";

const FinishRide = ({ setFinishRidePanel }) => {
  return (
    <div className="">
      <h4
        className="absolute top-0 text-center w-full"
        onClick={() => setFinishRidePanel(false)}
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i>
      </h4>
      <h3 className="text-2xl font-semibold mb-3">Finish this Ride</h3>

      <hr />

      <div className="flex items-center justify-between mt-2 bg-yellow-400 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
          <h2 className="text-xl font-medium">Swati Sharma</h2>
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
              <h2 className="text-xl font-bold">562/11-A</h2>
              <h4 className="text-base text-gray-600">
                Kaikondrahalli, Bengaluru, Karnataka
              </h4>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <h3>
              <i className="ri-square-fill"></i>
            </h3>
            <div className="w-full py-3 border-b">
              <h2 className="text-xl font-bold">Third Wave Coffee</h2>
              <h4 className="text-base text-gray-600">
                17th Cross Rd,PWD Quarters, 1st Sector, HSR Layout, Bengaluru,
                Karnataka
              </h4>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <h3>
              <i className="ri-bank-card-2-fill"></i>
            </h3>
            <div className="w-full py-3">
              <h2 className="text-xl font-bold">$40</h2>
              <h4 className="text-base text-gray-600">Cash</h4>
            </div>
          </div>
        </div>
        <div className="w-full flex">
          <Link
            to={"/captain-home"}
            className="w-full bg-green-600 text-white text-center p-4 rounded-xl text-lg font-semibold"
          >
            Finish Ride
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
