import { FaMapLocationDot } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

import clsx from "clsx";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useLocations from "@/store/locations";
import { Link } from "react-router-dom";

function LocationsDrawer() {
  const { locations, setActiveLocation } = useLocations((state) => state);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="absolute flex items-center justify-center z-10 w-[3rem]  aspect-square text-white bg-[#02DB5C] rounded-[50%] bottom-10 left-4 active:scale-95 duration-200">
          <FaMapLocationDot />
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-green-50">
        <div className="mx-auto w-full max-w-sm ">
          <DrawerHeader>
            <DrawerTitle>Locations</DrawerTitle>
            <DrawerDescription>Selec your location</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 h-[30vh]">
            <ul className="flex flex-col gap-4">
              {locations?.list?.length > 0 ? (
                locations.list.map((location) => {
                  return (
                    <li
                      key={location.id}
                      onClick={() => setActiveLocation(location.id)}
                      className={clsx(
                        "flex items-center justify-between p-3 rounded-lg bg-white border-2 cursor-pointer duration-150",
                        location.id === locations.activeLocation &&
                          "border-green-500"
                      )}
                    >
                      <span>{location.address}</span>
                      <FaLocationDot className="inline-block" />
                    </li>
                  );
                })
              ) : (
                <li>no locations</li>
              )}
            </ul>
          </div>
          <DrawerFooter className="flex flex-row w-full">
            <Button className="flex-1 text-white bg-[#02DB5C] hover:bg-[#5ff09b]">
              <Link className="w-full" to="/" replace={true}>
                Go
              </Link>
            </Button>
            <DrawerClose asChild>
              <Button className="flex-1" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default LocationsDrawer;
