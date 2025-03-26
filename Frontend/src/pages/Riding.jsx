import { Link, useLocation, useNavigate } from "react-router-dom";
import splitAddress from "../utils/splitAdress";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-finished", () => {
    navigate("/home");
  });

  const destinationParts = splitAddress(rideData?.dropoff);

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="ri-home-5-line text-lg font-medium"></i>
      </Link>
      <div className="h-[60%]">
        {/* <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
          className="w-full h-full object-cover"
        /> */}
        <LiveTracking />
      </div>

      <div className="h-[40%] p-2">
        <div className="flex items-center justify-between">
          <img
            className="h-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {rideData?.captain?.fullname?.firstname}
            </h2>
            <h4 className="text-xl font-semibold -my-1">
              {rideData?.captain?.vehicle?.plate}
            </h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
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
                <h2 className="text-xl font-bold">₹{rideData?.fare}</h2>
                <h4 className="text-base text-gray-600">Cash</h4>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-green-600 text-white p-4 rounded-xl text-lg font-semibold">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
