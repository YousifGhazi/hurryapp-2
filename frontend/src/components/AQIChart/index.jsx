import { useEffect, useState } from "react";
import clsx from "clsx";

function AQIChart() {
  const [AQIHisory, setAQIHisory] = useState([]);
  useEffect(() => {
    setAQIHisory([2, 5, 7, 4, 3, 8, 2]);
  }, []);

  const colors = {
    borders: [
      "shadow-[0px_0px_0px_2px_#02db5c7a]",
      "shadow-[0px_0px_0px_2px_#ffde307a]",
      "shadow-[0px_0px_0px_2px_#feb1567a]",
      "shadow-[0px_0px_0px_2px_#ff6c3e7a]",
    ],
    backgrounds: [
      "bg-[#02DB5C]",
      "bg-[#FFDE30]",
      "bg-[#FEB156]",
      "bg-[#FF6C3E]",
    ],
    line: [
      "bg-[#02db5c3d]",
      "bg-[#ffde303d]",
      "bg-[#feb1563d]",
      "bg-[#ff6c3e3d]",
    ],
  };

  const getChartColor = (type, value) => {
    if (value < 4) return colors[type][0];
    if (value < 5) return colors[type][1];
    if (value < 7) return colors[type][2];
    return colors[type][3];
  };

  return (
    <>
      <h2 className="text-xl font-bold">AQ History</h2>
      <p className="text-[0.625rem] text-gray-600 mb-3">Last 7 days</p>
      <div className="py-4 ">
        <div className="mx-auto bg-white bg-repeating-linear bg-[length:30px_30px] h-[200px] w-full max-w-[500px]">
          <div className="flex  h-full w-full justify-between">
            {AQIHisory.map((reading, index) => (
              <div
                key={index}
                className={clsx(
                  "relative self-end  h-[200xp] w-[11%] max-w-[45px] rounded-sm",
                  getChartColor("line", reading)
                )}
                style={{ height: `${(reading / 12) * 100}%` }}
              >
                <div
                  className={clsx(
                    "flex items-center justify-center absolute text-white w-[80%] aspect-square text-[11px] font-semibold rounded-full top-0 translate-y-[-50%] left-[50%] translate-x-[-50%]",
                    getChartColor("backgrounds", reading),
                    getChartColor("borders", reading)
                  )}
                >
                  {reading}
                </div>
              </div>
            ))}
          </div>
          <div className="flex h-full w-full justify-between">
            {AQIHisory.map((reading, index) => (
              <p
                key={index}
                className="w-[12%] max-w-[45px] mt-1 font-[500] text-black opacity-40 text-[10px]  text-center"
              >
                SUN
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AQIChart;
