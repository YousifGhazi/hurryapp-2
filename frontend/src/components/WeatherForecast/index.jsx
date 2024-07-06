import { LuCloudSunRain } from "react-icons/lu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

function WeahterForecast() {
  const [forecast, setForecast] = useState([]);
  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=33.2982&lon=44.3425&units=metric&appid=fcd70ac0ca9094b1f4f1e3cc662a61dc"
      );
      const data = await res.json();
      const forecastList = data.list.slice(0, 9);
      console.log(forecastList);
      setForecast(forecastList);
    };
    fetchLocations();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Weather</h2>
      <div className="flex justify-between">
        <div className=" leading-tight mb-5 mt-2">
          <p className="text-xs font-medium text-gray-400">Now</p>
          <h3 className="text-base font-medium">Rain Shower</h3>
          <p className="text-xs font-medium text-gray-400">Feels like 11</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <p className="font-bold text-2xl">15</p>
            <span className=" text-[11px] font-normal">°C</span>
          </div>
          <LuCloudSunRain size={45} color="#5D5FEF" className=" mb-4" />
        </div>
      </div>
      <Carousel className="m-auto max-w-xs">
        <CarouselContent>
          {forecast.map((reading, index) => (
            <CarouselItem
              className="basis-[auto] w-fit pl-2 select-none"
              key={index}
            >
              <Card>
                <CardContent className="px-2 py-2 flex flex-col items-center justify-center gap-0">
                  <LuCloudSunRain size={25} color="#5d5fef" />
                  <p className="font-medium text-base h-6 pt-2">
                    {Math.round(reading.main.temp)}°C
                  </p>
                  <p className="text-[10px] font-light text-gray-400">
                    {reading.dt_txt.split(" ")[1].slice(0, 5)}
                  </p>
                  {index}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>
    </div>
  );
}

export default WeahterForecast;
