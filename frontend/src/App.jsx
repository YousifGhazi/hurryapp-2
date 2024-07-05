import { HomePage } from "./components/home page";
import MAP from "@/components/Map";
import useLocations from "@/store/locations";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const { setLocationsList, setActiveLocation } = useLocations();

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
