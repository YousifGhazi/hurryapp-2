import useLocationsStore from "@/store/locations";

function LocationView() {
  const { getActiveLocation } = useLocationsStore();
  const { address } = getActiveLocation();

  return (
    <div>
      {address && (
        <>
          <h2 className="font-bold text-xl">{address.split(", ")?.[0]}</h2>
          <p className="text-gray-600 text-sm my-1">
            {address.split(", ")?.[1]}
          </p>
        </>
      )}
      <div className="flex text-lg">
        <p>{new Date().toUTCString()}</p>
      </div>
    </div>
  );
}

export default LocationView;
