const LocationSearchPanel = ({ suggestions, onSuggestionClick, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <div className="text-center text-gray-500 my-4">
          <i className="ri-loader-4-line animate-spin text-2xl"></i>
          <p>Searching locations...</p>
        </div>
      ) : suggestions && suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center border-2 active:border-2 active:border-black p-3 justify-start gap-4 my-4 rounded-xl hover:bg-gray-50 cursor-pointer"
            onClick={() => onSuggestionClick(suggestion)}
          >
            <h2 className="bg-[#eee] h-11 w-14 flex justify-center items-center rounded-full">
              <i className="ri-map-pin-fill text-xl"></i>
            </h2>
            <h1 className="font-medium">{suggestion.description}</h1>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 my-4">
          Type to see location suggestions
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
