import useLocationsStore from "@/store/locations";

function LocationView() {
  const { locations, getActiveLocation } = useLocationsStore();
  const adress = getActiveLocation()?.address?.split(", ");
  return (
    <div>
      {
        adress &&
        <div>
          <h2 className="font-bold text-xl">{adress[0]}</h2>
          <p className="text-gray-600 text-sm my-1">{adress[1]}</p>
        </div>
      }
      <div className="flex text-lg">
        <p>{new Date().toUTCString()}</p>
      </div>
    </div>
  );
}

export default LocationView;
