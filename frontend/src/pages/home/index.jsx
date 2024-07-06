import TipsCarousel from "@/components/TipsCarousel";
import LocationView from "@/components/LocationView";
import { BackIcon, SmileFace } from "../../components/home page/icons";
import WeahterForecast from "@/components/WeatherForecast";
import DaysWeatherForecast from "@/components/DaysWeatherForecast";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import AirQuality from "@/components/AirQuality";

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-8 px-4 m-auto w-full min-h-[100dvh] max-w-[1000px] overflow-x-auto bg-gray-50 ">
      <nav className="flex w-full items-center p-4">
        <Link to="/map" replace={true}>
          <BackIcon />
        </Link>
        <h1 className="mx-auto text-xl font-semibold md:p-4 md:text-2xl">
          Home
        </h1>
      </nav>

      <div className="w-full md:w-[40%] bg-white rounded-lg  px-4 py-4 text-lg font-semibold flex flex-col justify-center md:justify-start  gap-1">
        <LocationView />
      </div>

      <div className="md:flex-1  bg-white rounded-lg w-full  px-4 py-4 text-lg font-semibold flex flex-col justify-center gap-1">
        <WeahterForecast />
      </div>

      <div className="flex flex-col w-full md:flex-row-reverse gap-4">
        <AirQuality />
        <div className="flex flex-col justify-center md:justify-start gap-1 md:flex-1 bg-white rounded-lg w-full px-4 py-4 text-lg font-semibold ">
          <DaysWeatherForecast />
        </div>
      </div>

      <div className="w-full min-h-[338px] rounded-[8px] ">
        <h2 className="text-xl font-bold px-4 py-4">Tips</h2>
        <TipsCarousel />
      </div>
    </div>
  );
};

export default PageTransition(HomePage, "home");
// export default HomePage;
