const LocationSearchPanel = ({ setPanelOpen, setVehiclePanel }) => {
  return (
    <div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center border-2 active:border-2 active:border-black p-3 justify-start gap-4 my-4 rounded-xl"
          onClick={() => {
            setVehiclePanel(true);
            setPanelOpen(false);
          }}
        >
          <h2 className="bg-[#eee] h-11 w-14 flex justify-center items-center rounded-full">
            <i className="ri-map-pin-fill text-xl"></i>
          </h2>
          <h1 className="font-medium">
            Ramji mandir vali sheri, morwada, Junagadh, Gujarat - 362020
          </h1>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
