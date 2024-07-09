import HomePage from "@/pages/home";
import MAP from "@/pages/map";
import useLocations from "@/store/locations";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useHTTP from "./hooks/useHTTP";
import { AnimatePresence } from "framer-motion";

function App() {
  const { setLocationsList, setActiveLocation } = useLocations();
  const location = useLocation();

  useEffect(() => {
    const loc = [
      {
        address: "Al Hikma, Baghdad",
        id: 1,
        coordinates: [43.8473, 33.1812],
      },
      {
        address: "54 street, AL Basra",
        id: 2,
        coordinates: [44.32450116569708, 33.319625821412195],
      },
    ];
    setLocationsList(loc);
    setActiveLocation(loc[0].id);
  }, []);

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <main className="bg-gray-50">
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/*" element={<MAP />} />
          <Route path="/map" element={<MAP />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </AnimatePresence>
    </main>
  );
}

export default App;
