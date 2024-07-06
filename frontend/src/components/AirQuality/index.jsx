import { BackIcon, SmileFace } from "../../components/home page/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { LuCloudSunRain } from "react-icons/lu";
import { FaFaceSmile } from "react-icons/fa6";
import { FaFaceMeh } from "react-icons/fa6";
import { FaFaceFrownOpen } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import { FaChevronLeft } from "react-icons/fa6";

function AirQuality() {
  return (
    <div className="w-full max-w-[350px]">
      <div className="bg-white rounded-lg w-full h-auto px-4 flex flex-col justify-start pt-4">
        <p className="text-xl font-bold">Air Quality</p>

        <div className="w-full min-h-48 flex justify-center relative">
          <div className="bg-[#adf2ca] w-[70%] h-32 rounded-t-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden">
            <div className=" absolute w-[80%] h-10 left-0 bottom-0 bg-[#02DB5C]"></div>
            <div className="bg-white w-[90%] h-full rounded-t-full absolute top-[58%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
              <p className=" absolute top-[42%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-lighter flex items-center gap-2 text-base">
                <span className="text-3xl font-semibold">3</span> AQI
              </p>
              <div className="w-full h-[75%] flex items-end justify-center gap-4 mt-4">
                <FaFaceSmile className="mb-1.5" size={20} color="#02DB5C" />
                <p className="text-center font-bold text-2xl text-[#02DB5C]">
                  Low
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full h-24 flex justify-center">
            <div className="basis-[35%]  py-4 flex justify-center">
              <div className="h-full w-[10px] bg-[#adf2ca] rounded-lg z-0 relative">
                <div className="w-full h-10 absolute bottom-0 right-0 bg-[#02DB5C] rounded-full"></div>
              </div>

              <div className="flex flex-col gap-1 pl-3 pt-2">
                <p className=" text-[10px]">O3 (ug/m3)</p>
                <p className=" font-bold text-xl">53</p>
              </div>
            </div>
            <div className="basis-[35%]  py-4 flex justify-center">
              <div className="h-full w-[10px] bg-[#adf2ca] rounded-lg z-0 relative">
                <div className="w-full h-10 absolute bottom-0 right-0 bg-[#02DB5C] rounded-full"></div>
              </div>

              <div className="flex flex-col gap-1 pl-3 pt-2">
                <p className=" text-[10px]">O3 (ug/m3)</p>
                <p className=" font-bold text-xl">53</p>
              </div>
            </div>
            <div className="basis-[35%]  py-4 flex justify-center">
              <div className="h-full w-[10px] bg-[#adf2ca] rounded-lg z-0 relative">
                <div className="w-full h-10 absolute bottom-0 right-0 bg-[#02DB5C] rounded-full"></div>
              </div>

              <div className="flex flex-col gap-1 pl-3 pt-2">
                <p className=" text-[10px]">O3 (ug/m3)</p>
                <p className=" font-bold text-xl">53</p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4">
          <p className=" font-medium text-xs opacity-75 pb-3">Forecast</p>

          <Carousel className="m-auto max-w-xs">
            <CarouselContent className="gap-2 mx-auto">
              {/* {forecast.map((reading, index) => ( */}
              <CarouselItem
                className="basis-[auto] w-fit p-0 select-none "
                key={1}
              // key={index}
              >
                <Card>
                  <CardContent className="px-2 py-2 flex flex-col items-center justify-center gap-1">
                    <p className=" text-[10x] font-light">17:00</p>
                    <SmileFace />
                    <p className="text-base font-bold flex justify-center gap-2">
                      3 <span className=" text-[10px] font-normal">AQI</span>
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              {/* ))} */}
            </CarouselContent>
            <CarouselPrevious className="hidden" />
            <CarouselNext className="hidden" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default AirQuality;
