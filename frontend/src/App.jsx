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
        address: "Hub200, Baghdad",
        id: 1,
        coordinates: [33.314145062834854, 44.422286165730895],
      },
      {
        address: "Test, Baghdad",
        id: 3,
        coordinates: [34.314145062834854, 45.422286165730895],
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
