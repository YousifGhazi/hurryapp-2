import HomePage from "@/pages/home";
import MAP from "@/pages/map";
import useLocations from "@/store/locations";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function App() {
  const { setLocationsList, setActiveLocation } = useLocations();
  const location = useLocation();

  useEffect(() => {
    const loc = [
      {
        id: 1,
        address: "Baghdad Hotel, Baghdad",
        coordinates: [33.31854409340224, 44.41512795376431],
      },
      {
        id: 2,
        address: "Abass house, Baghdad",
        coordinates: [33.38218132671615, 44.32298097836644],
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
