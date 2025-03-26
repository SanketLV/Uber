import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <img
            src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
            alt="driver"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h4 className="text-lg font-medium capitalize">
            {captain.fullname.firstname + " " + captain.fullname.lastname}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹168.45</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex items-start justify-center gap-5 p-3 mt-6 bg-gray-100 rounded-xl">
        <div className="text-center">
          <i className="ri-time-line text-3xl mb-2 font-thin"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="ri-speed-up-line text-3xl mb-2 font-thin"></i>
          <h5 className="text-lg font-medium">30 KM</h5>
          <p className="text-sm text-gray-600">Total Distance</p>
        </div>
        <div className="text-center">
          <i className="ri-survey-line text-3xl mb-2 font-thin"></i>
          <h5 className="text-lg font-medium">20</h5>
          <p className="text-sm text-gray-600">Total Jobs</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
