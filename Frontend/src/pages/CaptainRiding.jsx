import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      transform: finishRidePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [finishRidePanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-4 top-0 flex items-center justify-between w-full">
        <img src="logo-black.png" alt="logo" className="w-20" />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line text-lg font-medium"></i>
        </Link>
      </div>

      <div className="h-4/5">
        {/* <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
          className="w-full h-full object-cover"
        /> */}
        <LiveTracking />
      </div>

      <div className="h-1/5 p-4 bg-yellow-400 rounded-t-xl flex items-center justify-between relative">
        <h4
          className="absolute top-0 text-center w-[93%]"
          // onClick={() => setConfirmRidePopupPanel(false)}
        >
          <i className="ri-arrow-up-wide-fill text-3xl text-gray-200"></i>
        </h4>
        <h4 className="text-xl font-semibold">2 KM away</h4>
        <button
          className="bg-green-600 text-white text-center p-4 px-10 rounded-xl text-lg font-semibold"
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed bottom-0 z-20 w-full px-3 py-6 bg-white translate-y-full"
      >
        <FinishRide
          rideData={rideData}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
