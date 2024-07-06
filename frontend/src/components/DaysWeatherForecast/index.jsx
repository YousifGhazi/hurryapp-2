import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { LuCloudSunRain } from "react-icons/lu";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";

function DaysWeatherForecast() {
  const [forecast, setForecast] = useState([]);
  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=33.2982&lon=44.3425&units=metric&appid=fcd70ac0ca9094b1f4f1e3cc662a61dc"
      );
      const data = await res.json();
      const forecastList = [];
      // claculate min and max temp for each day
      for (let i = 0; i < data.list.length; i += 8) {
        let min = data.list[i].main.temp_min;
        let max = data.list[i].main.temp_max;
        for (let j = 1; j < 8; j++) {
          if (data.list[i + j].main.temp_min < min) {
            min = data.list[i + j].main.temp_min;
          }
          if (data.list[i + j].main.temp_max > max) {
            max = data.list[i + j].main.temp_max;
          }
        }

        const date = data.list[i].dt_txt.split(" ")[0];
        forecastList.push({
          min: Math.round(min),
          max: Math.round(max),
          // fromat date to be like "Sun, 12 Dec"
          date: String(new Date(date))
            .split(" ")
            .slice(0, 3)
            .join(" ")
            .toUpperCase(),
          status: data.list[i].weather[0].main,
        });
      }
      setForecast(forecastList);
    };
    fetchLocations();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Weather Forcast</h2>
      <p className="text-[0.625rem] text-gray-600 mb-3">Next 5 days</p>
      <div className="flex flex-col gap-2">
        {forecast.map((day, index) => (
          <Card key={index} className="flex justify-between items-center p-2 font-medium text-base">
            <p className="text-[0.75rem]">{day.date}</p>
            <div className="flex items-center justify-center gap-2">
              <p className="flex items-center text-[1rem]">
                {day.max}
                <span className="text-[0.5rem] text-gray-600 pl-1">°C</span>
                <FaLongArrowAltUp className="ml-1" size={7} color="#02DB5C" />
              </p>
              <p className="flex items-center text-[1rem]">
                {day.min}
                <span className="text-[0.625rem] text-gray-600 pt-1 pl-1">°C</span>
                <FaLongArrowAltDown className="ml-1 mt-1" size={7} color="#fa4040" />
              </p>
              <LuCloudSunRain size={24} color="#5d5fef" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DaysWeatherForecast;
