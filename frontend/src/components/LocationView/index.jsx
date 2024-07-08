import useLocationsStore from "@/store/locations";

function LocationView() {
  const { getActiveLocation } = useLocationsStore();
  const { address, coordinates } = getActiveLocation();

  return (
    <div className="flex flex-col h-full">
      {address && (
        <>
          <h2 className="font-semibold text-lg">{address.split(", ")?.[0]}</h2>
          <p className="text-gray-600 text-sm font-normal my-1">
            {address.split(", ")?.[1]}
          </p>
        </>
      )}
      <div className="flex text-sm opacity-50 font-normal">
        <p>{new Date().toUTCString()}</p>
      </div>
      <div className="hidden md:block mt-12 text-sm">
        {coordinates && (
          <>
            <p className="mt-2">Lang: {coordinates?.[0]}</p>
            <p className="mt-2">Late: {coordinates?.[1]}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default LocationView;
