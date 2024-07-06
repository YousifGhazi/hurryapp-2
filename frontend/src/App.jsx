import HomePage from "@/pages/home";
import MAP from "@/pages/map";
import useLocations from "@/store/locations";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useHTTP from "./hooks/useHTTP";
import { AnimatePresence } from "framer-motion";

function App() {
  const { setLocationsList, setActiveLocation, locations, getActiveLocation } =
    useLocations();

  const [sendHTTP, res] = useHTTP();
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

  useEffect(() => {
    console.log(getActiveLocation());
  }, [locations]);

  return (
    <main className="bg-gray-50">
      <AnimatePresence>
        <Routes>
          <Route path="/map" element={<MAP />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </AnimatePresence>
    </main>
  );
}

export default App;
