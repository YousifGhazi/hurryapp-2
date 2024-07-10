import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import AQIstatus from "./AQIstatus";
import GasesBar from "./GasesBar";
import Forecast from "./Forecast";
import { Card } from "../ui/card";

function AirQuality() {
  const [data, setData] = useState(0);
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
            "http://localhost:3001/api/readingSensors",
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

  const getAQIInfo = (co2) => {
    const co2Breakpoints = [
      { cLow: 0, cHigh: 600, iLow: 0, iHigh: 50 },
      { cLow: 601, cHigh: 1200, iLow: 51, iHigh: 100 },
      { cLow: 1201, cHigh: 1800, iLow: 101, iHigh: 150 },
      { cLow: 1801, cHigh: 2400, iLow: 151, iHigh: 200 },
      { cLow: 2401, cHigh: 3200, iLow: 201, iHigh: 300 },
      { cLow: 3201, cHigh: 4000, iLow: 301, iHigh: 500 }
    ];

    const calculateCO2AQI = (co2) => {
      for (let i = 0; i < co2Breakpoints.length; i++) {
        const { cLow, cHigh, iLow, iHigh } = co2Breakpoints[i];
        if (co2 >= cLow && co2 <= cHigh) {
          const aqi = ((iHigh - iLow) / (cHigh - cLow)) * (co2 - cLow) + iLow;
          return Math.round(aqi);
        }
      }
      return '0';
    };

    const aqi = calculateCO2AQI(co2);
    const category = getCategory(aqi);

    return { aqi, category };
  };

  const getCategory = (aqi) => {
    if (aqi >= 0 && aqi <= 50) {
      return 'Good';
    } else if (aqi >= 51 && aqi <= 100) {
      return 'Moderate';
    } else if (aqi >= 101 && aqi <= 150) {
      return 'Unhealthy for Sensitive Groups';
    } else if (aqi >= 151 && aqi <= 200) {
      return 'Unhealthy';
    } else if (aqi >= 201 && aqi <= 300) {
      return 'Very Unhealthy';
    } else if (aqi >= 301 && aqi <= 500) {
      return 'Hazardous';
    } else {
      return 'Value out of range';
    }
  };

  const { aqi, category } = useMemo(() => getAQIInfo(data.co2), [data]);

  console.log(data);

  return (
    <div className="w-full mx-auto ">
      <Card className="bg-white rounded-lg w-full h-auto px-4 flex flex-col justify-start pt-4">
        <p className="text-xl font-bold">Air Quality</p>

        <div className="w-full min-h-48 flex justify-center relative">
          <div className="min-w-full flex justify-center mt-4">
            <ProgressBar progress={aqi} status={category} />
          </div>
          <div className="w-[90%] h-full rounded-t-full absolute top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
            <AQIstatus aqi={aqi} status={category} />
          </div>
        </div>

        <div className="w-full flex justify-center my-8">
          <div className="w-full h-24 flex flex-col items-center justify-center">
            <div className="flex w-full">
              <GasesBar name="CO" value={60} status={category} />
              <GasesBar name="CO2" value={10} status={category} />
              <GasesBar name="NH3" value={70} status={category} />
            </div>
            <div className="w-full flex">
              <GasesBar name="CO" value={10} status={category} />
              <GasesBar name="Taulen" value={10} status={category} />
              <GasesBar name="Alcohol" value={10} status={category} />
            </div>
          </div>
        </div>

        {/* Update AQI value from historical data */}
        {/* <Forecast data={data} aqi={aqiInfo.aqi} status={aqiInfo.category} /> */}
      </Card>
    </div>
  );
}

export default AirQuality;
