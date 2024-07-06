import { BackIcon, SmileFace } from "../../components/home page/icons";
import { FaFaceSmile } from "react-icons/fa6";
import { FaFaceMeh } from "react-icons/fa6";
import { FaFaceFrownOpen } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import { FaChevronLeft } from "react-icons/fa6";
import TipsCarousel from "@/components/TipsCarousel";
import LocationView from "@/components/LocationView";
import WeahterForecast from "../../components/WeatherForecast";
import DaysWeatherForecast from "@/components/DaysWeatherForecast";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

const HomePage = () => {
  // const aqi = [
  //   {
  //     src: <FaFaceSmile className="mb-1.5" size={20} color="#FFDE30" />,
  //     text: "Low",
  //   },
  //   {
  //     src: <FaFaceMeh className="mb-1.5" size={20} color="#FFDE30" />,
  //     text: "Normal",
  //   },
  //   {
  //     src: <FaFaceFrownOpen className="mb-1.5" size={20} color="#FFDE30" />,
  //     text: "Extreme",
  //   },
  // ];

  return (
    <div className="m-auto w-full min-h-[100dvh] max-w-sm overflow-x-auto bg-gray-50 flex flex-col gap-8 px-4">
      <nav className="flex w-full items-center p-4">
        <Link to="/map" replace={true}>
          <BackIcon />
        </Link>
        <h1 className="mx-auto text-xl font-semibold">Home</h1>
      </nav>

      <div className="bg-white rounded-lg w-full  px-4 py-4 text-lg font-semibold flex flex-col justify-center gap-1">
        <LocationView />
      </div>

      <div className="bg-white rounded-lg w-full  px-4 py-4 text-lg font-semibold flex flex-col justify-center gap-1">
        <WeahterForecast />
      </div>

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
          <p className=" font-medium text-xs opacity-75 pb-1">Forecast</p>

          <div className="w-full h-24 overflow-x-scroll flex items-center gap-3">
            <div className="min-w-16 h-[90%] flex flex-col justify-center items-center gap-0.5 shadow rounded-md">
              <p className=" text-[10x] font-light">17:00</p>
              <SmileFace />
              <p className="text-base font-bold flex justify-center gap-1">
                3 <span className=" text-[10px] font-normal">AQI</span>
              </p>
            </div>
            <div className="min-w-16 h-[90%] flex flex-col justify-center items-center gap-0.5 shadow rounded-md">
              <p className=" text-[10x] font-light">17:00</p>
              <SmileFace />
              <p className="text-base font-bold flex justify-center gap-1">
                3 <span className=" text-[10px] font-normal">AQI</span>
              </p>
            </div>
            <div className="min-w-16 h-[90%] flex flex-col justify-center items-center gap-0.5 shadow rounded-md">
              <p className=" text-[10x] font-light">17:00</p>
              <SmileFace />
              <p className="text-base font-bold flex justify-center gap-1">
                3 <span className=" text-[10px] font-normal">AQI</span>
              </p>
            </div>
            <div className="min-w-16 h-[90%] flex flex-col justify-center items-center gap-0.5 shadow rounded-md">
              <p className=" text-[10x] font-light">17:00</p>
              <SmileFace />
              <p className="text-base font-bold flex justify-center gap-1">
                3 <span className=" text-[10px] font-normal">AQI</span>
              </p>
            </div>
            <div className="min-w-16 h-[90%] flex flex-col justify-center items-center gap-0.5 shadow rounded-md">
              <p className=" text-[10x] font-light">17:00</p>
              <SmileFace />
              <p className="text-base font-bold flex justify-center gap-1">
                3 <span className=" text-[10px] font-normal">AQI</span>
              </p>
            </div>
            <div className="min-w-16 h-[90%] flex flex-col justify-center items-center gap-0.5 shadow rounded-md">
              <p className=" text-[10x] font-light">17:00</p>
              <SmileFace />
              <p className="text-base font-bold flex justify-center gap-1">
                3 <span className=" text-[10px] font-normal">AQI</span>
              </p>
            </div>
            <div className="min-w-16 h-[90%] flex flex-col justify-center items-center gap-0.5 shadow rounded-md">
              <p className=" text-[10x] font-light">17:00</p>
              <SmileFace />
              <p className="text-base font-bold flex justify-center gap-1">
                3 <span className=" text-[10px] font-normal">AQI</span>
              </p>
            </div>
            <div className="min-w-16 h-[90%] flex flex-col justify-center items-center gap-0.5 shadow rounded-md">
              <p className=" text-[10x] font-light">17:00</p>
              <SmileFace />
              <p className="text-base font-bold flex justify-center gap-1">
                3 <span className=" text-[10px] font-normal">AQI</span>
              </p>
            </div>
            <div className="min-w-16 h-[90%] flex flex-col justify-center items-center gap-0.5 shadow rounded-md">
              <p className=" text-[10x] font-light">17:00</p>
              <SmileFace />
              <p className="text-base font-bold flex justify-center gap-1">
                3 <span className=" text-[10px] font-normal">AQI</span>
              </p>
            </div>{" "}
            <div className="min-w-16 h-[90%] flex flex-col justify-center items-center gap-0.5 shadow rounded-md">
              <p className=" text-[10x] font-light">17:00</p>
              <SmileFace />
              <p className="text-base font-bold flex justify-center gap-1">
                3 <span className=" text-[10px] font-normal">AQI</span>
              </p>
            </div>
            <div className="min-w-16 h-[90%] flex flex-col justify-center items-center gap-0.5 shadow rounded-md">
              <p className=" text-[10x] font-light">17:00</p>
              <SmileFace />
              <p className="text-base font-bold flex justify-center gap-1">
                3 <span className=" text-[10px] font-normal">AQI</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg w-full px-4 py-4 text-lg font-semibold flex flex-col justify-center gap-1">
        <DaysWeatherForecast />
      </div>

      <div className="w-full min-h-[338px] rounded-[8px] ">
        <h2 className="text-xl font-bold px-4 py-4">Tips</h2>
        <TipsCarousel />
      </div>
    </div>
  );
};

export default PageTransition(HomePage);
// export default HomePage;
