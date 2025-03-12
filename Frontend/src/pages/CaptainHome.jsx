import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const ridePopupPanelRef = useRef(null);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const confirmRidePopupPanelRef = useRef(null);

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmRidePopupPanel]);

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

      <div className="h-2/3">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="h-1/3 p-4">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopupPanelRef}
        className="fixed bottom-0 z-20 w-full px-3 py-6 bg-white translate-y-full"
      >
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed bottom-0 z-20 w-full h-screen px-3 py-6 bg-white translate-y-full"
      >
        <ConfirmRidePopup
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
