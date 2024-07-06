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
        "https://api.openweathermap.org/data/2.5/forecast?lat=33.2982&lon=44.3425&appid=fcd70ac0ca9094b1f4f1e3cc662a61dc"
      );
      const data = await res.json();
      const forecastList = data.list.slice(0, 9);
      console.log(forecastList);
      setForecast(data.list);
    };
    fetchLocations();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Weather</h2>
      <div className="flex  justify-between my-4">
        <div>
          <p className="text-sm text-gray-400">Now</p>
          <h3>Rain Shower</h3>
          <p className="text-sm text-gray-400">Feels like 11</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="font-bold text-2xl">15</p>
          <LuCloudSunRain size={45} color="#5d5fef" />
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
                <CardContent className="px-2 py-4 flex flex-col items-center justify-center">
                  <LuCloudSunRain size={30} color="#5d5fef" />
                  <p className="font-bold text-lg">15°C</p>
                  <p className="text-xs text-gray-400">
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
    </div>
  );
}

export default WeahterForecast;
