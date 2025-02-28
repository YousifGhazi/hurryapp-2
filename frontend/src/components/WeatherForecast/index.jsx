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

function WeahterForecast({ getWeatherIcons }) {
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
    <>
      <h2 className="text-xl font-bold">Weather</h2>
      <div className="flex justify-between">
        <div className=" leading-tight mb-4 mt-2">
          <p className="text-[10px] font-medium text-gray-400">Now</p>
          <h3 className="text-base font-medium capitalize">
            {(forecast[0] && forecast[0]?.weather[0]?.description) || "Clear"}
          </h3>
          <p className="text-[10px] font-medium text-gray-400">
            Feels like{" "}
            {(forecast[0] && Math.round(forecast[0]?.main?.feels_like)) || 0}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <p className="font-bold text-2xl">
              {(forecast[0] && Math.round(forecast[0]?.main?.temp)) || 0}
            </p>
            <span className=" text-[11px] font-normal">°C</span>
          </div>
          {getWeatherIcons(forecast[0]?.weather[0]?.main, {
            size: 45,
            color: "#5D5FEF",
          })}
        </div>
      </div>
      <Carousel className="m-auto md:m-0 w-full">
        <CarouselContent className="gap-2 mx-auto">
          {forecast.map((reading, index) => (
            <CarouselItem
              className="basis-[auto] w-fit p-0 select-none "
              key={index}
            >
              <Card>
                <CardContent className="px-2 py-2 flex flex-col items-center justify-center gap-0">
                  {getWeatherIcons(reading.weather[0].main, {
                    size: 24,
                    color: "#5D5FEF",
                  })}
                  <p className="font-medium text-base h-6 pt-2">
                    {Math.round(reading.main.temp)}°C
                  </p>
                  <p className="text-[10px] font-light text-gray-400">
                    {reading.dt_txt.split(" ")[1].slice(0, 5)}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>
    </>
  );
}

export default WeahterForecast;
