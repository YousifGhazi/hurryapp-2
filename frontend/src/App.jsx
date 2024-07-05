import HomePage from "@/pages/home";
import MAP from "@/pages/map";
import useLocations from "@/store/locations";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useHTTP from "./hooks/useHTTP";

function App() {
  const { setLocationsList, setActiveLocation } = useLocations();
  const [sendHTTP, res] = useHTTP();
  // useEffect(() => {
  //   const fetchLocations = async () => {
  //     const res = await fetch(
  //       "https://api.openweathermap.org/data/2.5/forecast?lat=33.2982&lon=44.3425&appid=fcd70ac0ca9094b1f4f1e3cc662a61dc"
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //   };
  //   fetchLocations();
  // }, []);
  useEffect(() => {
    const loc = [
      {
        address: "Al hikma, Baghdad",
        id: 1,
        coordinates: [43.8473, 33.1812],
      },
      {
        address: "54 street, AL Basra",
        id: 2,
        coordinates: [43.8473, 33.1812],
      },
    ];
    setLocationsList(loc);
    setActiveLocation(loc[0].id);
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/map" element={<MAP />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </main>
  );
}

export default App;
