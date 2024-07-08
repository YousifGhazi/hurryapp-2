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

import { HiLocationMarker } from "react-icons/hi";
import { FaChevronLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import AQIstatus from "./AQIstatus";

function AirQuality() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);

  const socket = io('http://localhost:8080');

  useEffect(() => {
    socket.on('message', (message) => {
      setFlag(true);
      console.log('Message from server:', message);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (flag) {
      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/readingSensors", {
            headers: { "Content-Type": "application/json" },
          });
          setData(res.data);
          setFlag(false);
        } catch (e) {
          console.log(e);
        }
      };

      fetchData();
    }
  }, [flag]);

  console.log(data, "data");

  const aqi = {
    4.4: "Good",
    9.4: "Moderate",
    12.4: "Unhealthy for Sensitive Groups",
    15.4: "Unhealthy",
    30.4: "Very Unhealthy",
    40.4: "Hazardous",
    50.4: "Hazardous"
  }

  const getAQIInfo = (co) => {
    const keys = Object.keys(aqi).map(Number);
    for (let i = 0; i < keys.length; i++) {
      if (co <= keys[i]) {
        return { key: keys[i], value: aqi[keys[i]] };
      }
    }
    return { key: "Out of range", value: "Value out of range" };
  };

  const coValue = data[0]?.co;
  const aqiInfo = getAQIInfo(coValue);

  return (
    <div className="w-full mx-auto max-w-[350px]">
      <div className="bg-white rounded-lg w-full h-auto px-4 flex flex-col justify-start pt-4">
        <p className="text-xl font-bold">Air Quality</p>

        <div className="w-full min-h-48 flex justify-center relative">
          <div className="min-w-full flex justify-center mt-4">
            <ProgressBar className="" progress={15} status={"Good"} />
          </div>
          <div className="w-[90%] h-full rounded-t-full absolute top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
            <AQIstatus aqi={aqiInfo.key} status={"Good"} />
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full h-24 flex justify-center">
            <div className="basis-[35%]  py-4 flex justify-center">
              <div className="h-full w-[10px] bg-[#adf2ca] rounded-lg z-0 relative">
                <div className="w-full h-10 absolute bottom-0 right-0 bg-[#02DB5C] rounded-full"></div>
              </div>

              <div className="flex flex-col gap-1 pl-3 pt-2">
                <p className=" text-[10px]">CO2 (ppm)</p>
                {
                  data[0] &&
                  <p className=" font-bold text-xl">{data[0].CO2}</p>
                }
              </div>
            </div>
            <div className="basis-[35%]  py-4 flex justify-center">
              <div className="h-full w-[10px] bg-[#adf2ca] rounded-lg z-0 relative">
                <div className="w-full h-10 absolute bottom-0 right-0 bg-[#02DB5C] rounded-full"></div>
              </div>

              <div className="flex flex-col gap-1 pl-3 pt-2">
                <p className=" text-[10px]">CO (ppm)</p>
                {
                  data[0] &&
                  <p className=" font-bold text-xl">{data && data[0].co}</p>
                }
              </div>
            </div>
            <div className="basis-[35%]  py-4 flex justify-center">
              <div className="h-full w-[10px] bg-[#adf2ca] rounded-lg z-0 relative">
                <div className="w-full h-10 absolute bottom-0 right-0 bg-[#02DB5C] rounded-full"></div>
              </div>

              <div className="flex flex-col gap-1 pl-3 pt-2">
                <p className=" text-[10px]">NH3 (ppm)</p>
                {
                  data[0] &&
                  <p className=" font-bold text-xl">{data && data[0].NH4}</p>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="my-4">
          <p className=" font-medium text-xs opacity-75 pb-3">Forecast</p>

          <Carousel className="m-auto max-w-xs">
            <CarouselContent className="gap-2 mx-auto">
              {
                data && data.map((v, i) => {
                  return (
                    <CarouselItem
                      className="basis-[auto] w-fit p-0 select-none "
                      key={i}
                    >
                      <Card>
                        <CardContent className="px-2 py-2 flex flex-col items-center justify-center gap-1">
                          <p className=" text-[10x] font-light">17:00</p>
                          <SmileFace />
                          <p className="text-base font-bold flex justify-center gap-2">
                            {aqiInfo.key} <span className=" text-[10px] font-normal">AQI</span>
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  )
                })
              }
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
