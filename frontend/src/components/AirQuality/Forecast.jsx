import { useEffect, useState } from "react";
import { SmileFace } from "../home page/icons";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { getIcon } from "./AQIstatus";
import axios from "axios";
import { getAQIInfo } from ".";
import useLocations from "@/store/locations";

const Forecast = ({ data, aqi, status }) => {
  const [aqiHistory, setAqiHistory] = useState([]);

  const getActiveLocation = useLocations((state) => state.getActiveLocation);
  const id = getActiveLocation()?.id;
  // const [icon, color] = getIcon(status);

  const fetchData = async (id) => {
    await axios
      .get(`http://localhost:3001/api/forecast?id=${id}`)
      .then((res) => setAqiHistory(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <div className="my-8">
      <p className=" font-medium text-xs opacity-75 pb-3">Forecast</p>

      <Carousel className="m-auto">
        <CarouselContent className="gap-2 mx-auto">
          {aqiHistory &&
            aqiHistory.map((v, i) => {
              const date = new Date(v.hour);
              const hour = date.toLocaleString("en-US", {
                hour: "numeric",
                hour12: true,
              });
              const { aqi, category } = getAQIInfo(v.maxCO2);
              const icon = getIcon(category);
              return (
                <CarouselItem
                  className="basis-[auto] w-fit p-0 select-none "
                  key={i}
                >
                  <Card>
                    <CardContent className="px-2 py-2 flex flex-col items-center justify-center">
                      <p className=" text-[10x] font-light mb-1.5">{hour}</p>
                      {icon[0]}
                      <p className="text-base font-bold flex justify-center gap-2">
                        {aqi}{" "}
                        <span className=" text-[10px] font-normal">AQI</span>
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>
    </div>
  );
};

export default Forecast;
