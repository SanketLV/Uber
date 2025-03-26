import { useRef, useState, useCallback, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "../utils/axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", {
      userType: "user",
      userId: user?._id,
    });
  }, [user]);

  socket.on("ride-confirmed", (data) => {
    console.log("Ride-Confirmed:", data);
    setRide(data);
    setWaitingForDriver(true);
    setVehicleFound(false);
  });

  socket.on("ride-started", (data) => {
    console.log("Ride-Started:", data);
    setWaitingForDriver(false);
    navigate(`/riding`, { state: { ride } });
  });

  const fetchSuggestions = useCallback(async (value) => {
    if (!value || value.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `/maps/get-suggestion?input=${encodeURIComponent(value)}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (value, field) => {
    if (field === "pickup") {
      setPickup(value);
    } else {
      setDestination(value);
    }
    setActiveField(field);
    setVehicleFound(false);
    // setConfirmRidePanel(false);

    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set a new timer
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 500); // Wait for 500ms after the user stops typing
  };

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleSuggestionClick = (suggestion) => {
    const address = suggestion.description;
    if (activeField === "pickup") {
      setPickup(address);
    } else {
      setDestination(address);
    }
    setSuggestions([]);
    // setPanelOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  };

  const findTrip = async () => {
    try {
      // First get the fare
      const fareResponse = await axios.get(
        `/rides/get-fare?pickup=${pickup}&dropoff=${destination}`
      );

      // If fare is retrieved successfully, show the vehicle panel
      if (fareResponse.data) {
        setFare(fareResponse.data);
        setVehiclePanel(true);
        setPanelOpen(false);
        // setVehicleFound(false);
        // setWaitingForDriver(false);
      }
    } catch (error) {
      console.error("Error fetching fare:", error);
      alert("Error fetching fare. Please try again.");
    }
  };

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : "0%",
    });
    gsap.to(panelCloseRef.current, {
      opacity: panelOpen ? 1 : 0,
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
    });
  }, [waitingForDriver]);

  async function createRide() {
    const response = await axios.post("/rides/create", {
      pickup,
      dropoff: destination,
      vehicleType,
    });

    console.log(response.data);
  }

  // Function to reset all panels
  const resetPanels = () => {
    setPanelOpen(false);
    setVehiclePanel(false);
    setConfirmRidePanel(false);
    setVehicleFound(false);
    setWaitingForDriver(false);
  };

  // Update panel open handler
  const handlePanelOpen = (field) => {
    setPanelOpen(true);
    setActiveField(field);
    setVehicleFound(false);
    // setConfirmRidePanel(false);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="logo-black.png"
        alt="logo"
        className="w-20 absolute left-5 top-5"
      />

      <div className="h-screen w-screen">
        {/* <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
          className="w-screen h-screen object-cover"
        /> */}
        <LiveTracking />
      </div>

      <div className="flex flex-col justify-end absolute h-screen top-0 rounded-t-2xl w-full">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            ref={panelCloseRef}
            className="text-2xl absolute right-6 opacity-0"
            onClick={resetPanels}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold mb-4">Find a Trip</h4>
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className="flex flex-col gap-3 relative"
          >
            <input
              className="bg-[#eee] px-12 py-3 text-base rounded-lg w-full"
              type="text"
              value={pickup}
              onChange={(e) => handleInputChange(e.target.value, "pickup")}
              onClick={() => handlePanelOpen("pickup")}
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] px-12 py-3 text-base rounded-lg w-full"
              type="text"
              value={destination}
              onChange={(e) => handleInputChange(e.target.value, "destination")}
              onClick={() => handlePanelOpen("destination")}
              placeholder="Enter your destination"
            />
          </form>
          <button
            className="bg-black text-white px-4 py-3 rounded-lg w-full mt-2"
            disabled={!pickup || !destination}
            onClick={findTrip}
          >
            Find Trip
          </button>
        </div>

        <div className="h-0 px-5 bg-white" ref={panelRef}>
          <LocationSearchPanel
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div
        className="fixed bottom-0 z-10 w-full px-3 py-6 bg-white translate-y-full"
        ref={vehiclePanelRef}
      >
        <VehiclePanel
          fare={fare}
          selectVehicle={setVehicleType}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div
        className="fixed bottom-0 z-20 w-full px-3 py-6 bg-white translate-y-full"
        ref={confirmRidePanelRef}
        style={{ visibility: confirmRidePanel ? "visible" : "hidden" }}
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setVehicleFound={setVehicleFound}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div
        className="fixed bottom-0 z-30 w-full px-3 py-6 bg-white translate-y-full pointer-events-none"
        ref={vehicleFoundRef}
        style={{ visibility: vehicleFound ? "visible" : "hidden" }}
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 z-40 w-full px-3 py-6 bg-white translate-y-full"
      >
        <WaitingForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
