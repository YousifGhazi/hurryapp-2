import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import AQIstatus from "./AQIstatus";
import GasesBar from "./GasesBar";
import Forecast from "./Forecast";
import { Card } from "../ui/card";

function AirQuality() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("connect_error", () => {
      console.log("Socket connection error");
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("fetch", (message) => {
      setFlag(true);
      console.log("Message from server:", message);
    });

    return () => {
      socket.disconnect();
      setFlag(false);
    };
  }, []);

  useEffect(() => {
    if (flag) {
      console.log("Fetching data...");
      const fetchData = async () => {
        try {
          const res = await axios.get(
            "http://localhost:3000/api/readingSensors",
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          setData(res.data);
          setFlag(false);
        } catch (e) {
          console.log("Error fetching data:", e);
        }
      };

      fetchData();
    }
  }, [flag]);

  const aqi = {
    4.4: "Good",
    9.4: "Moderate",
    12.4: "Unhealthy for Sensitive Groups",
    15.4: "Unhealthy",
    30.4: "Very Unhealthy",
    40.4: "Hazardous",
    50.4: "Hazardous",
  };

  const getAQIInfo = (co) => {
    const keys = Object.keys(aqi).map(Number);
    for (let i = 0; i < keys.length; i++) {
      if (co <= keys[i]) {
        return { key: keys[i], value: aqi[keys[i]] };
      }
    }
    return { key: 'Out', value: 'Value out of range' };
  };

  const coValue = data[0]?.co;
  const aqiInfo = getAQIInfo(coValue);

  return (
    <div className="w-full mx-auto max-w-[350px]">
      <Card className="bg-white rounded-lg w-full h-auto px-4 flex flex-col justify-start pt-4">
        <p className="text-xl font-bold">Air Quality</p>

        <div className="w-full min-h-48 flex justify-center relative">
          <div className="min-w-full flex justify-center mt-4">
            <ProgressBar progress={15} status={"Good"} />
          </div>
          <div className="w-[90%] h-full rounded-t-full absolute top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
            <AQIstatus aqi={aqiInfo.key} status={"Good"} />
          </div>
        </div>

        <div className="w-full flex justify-center my-8">
          <div className="w-full h-24 flex flex-col items-center justify-center">
            <div className="flex w-full">
              <GasesBar name="CO" value={60} status={"Moderate"} />
              <GasesBar name="CO2" value={30} status={aqiInfo.value} />
              <GasesBar name="NH3" value={70} status={aqiInfo.value} />
            </div>
            <div className="w-full flex">
              <GasesBar name="CO" value={10} status={aqiInfo.value} />
              <GasesBar name="CO2" value={10} status={aqiInfo.value} />
              <GasesBar name="NH3" value={10} status={aqiInfo.value} />
            </div>
          </div>
        </div>

        {/* Need to update AQI value from historical data */}
        <Forecast data={data} aqi={aqiInfo.key} status={"Unhealthy"} />
      </Card>
    </div>
  );
}

export default AirQuality;
