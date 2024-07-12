import useLocationsStore from "@/store/locations";

function LocationView() {
  const { getActiveLocation } = useLocationsStore();

  const activeLocation = getActiveLocation();

  return (
    <div className="flex flex-col h-full">
      {activeLocation?.address && (
        <>
          <h2 className="font-semibold text-lg">
            {activeLocation?.address.split(", ")?.[0]}
          </h2>
          <p className="text-gray-600 text-sm font-normal my-1">
            {activeLocation?.address.split(", ")?.[1]}
          </p>
        </>
      )}
      <div className="flex text-sm opacity-50 font-normal">
        <p>{new Date().toUTCString()}</p>
      </div>
      <div className="hidden md:block mt-12 text-sm">
        {activeLocation?.coordinates && (
          <>
            <p className="mt-2 font-normal opacity-90">Lang: {activeLocation?.coordinates?.[0]}</p>
            <p className="mt-2 font-normal opacity-90">Late: {activeLocation?.coordinates?.[1]}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default LocationView;
