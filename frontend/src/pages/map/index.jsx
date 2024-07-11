import mapboxgl from "mapbox-gl";
import { useRef, useEffect, useState } from "react";
import hikmaImg from "../../assets/download.jpeg";
import LocationsDrawer from "@/components/Map/LocatinosDrawer";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import useLocations from "@/store/locations";

mapboxgl.accessToken =
  "pk.eyJ1IjoieW91c2lmLW9kYXkiLCJhIjoiY2x5OGp0cWxnMDd3OTJscGhmbWk5eDNxdSJ9.FASD-xbWAHmgzayQNOcHqQ";
function MAP() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(0);
  const router = useNavigate();

  const location = useLocations((state) => state.locations);
  const setActiveLocation = useLocations((state) => state.setActiveLocation);

  const jumpTo = (lat, lng, zoom, speed = 0.5) => {
    map.current.flyTo({
      center: [lng, lat],
      zoom: zoom,
      speed: speed,
      essential: true,
    });
  };

  const transformPage = () => {
    setTimeout(() => {
      router("/");
    }, 1000);
  };

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    if (location?.list) {
      for (const marker of location.list) {
        console.log(marker);
        const el = document.createElement("div");
        const width = 40;
        const height = 40;
        el.className = `marker bg-no-repeat !bg-cover bg-center rounded-[50%] bg-[url('./assets/hub200.jpeg')]`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = "100%";
        el.style.display = "block";
        el.style.border = "none";
        el.style.borderRadius = "50%";
        el.style.cursor = "pointer";
        el.style.padding = 0;

        el.addEventListener("click", () => {
          jumpTo(marker.coordinates[0], marker.coordinates[1], 15, 1);
          setActiveLocation(marker.id);
          transformPage();
        });

        new mapboxgl.Marker(el)
          .setLngLat([marker.coordinates[1], marker.coordinates[0]])
          .addTo(map.current);
      }
    }
  }, []);

  useEffect(() => {
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.on("load", () => {
      jumpTo(33.1812, 43.8473, 5);
    });
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 m-2 rounded-lg p-4 z-10 text-white bg-[#23374be6]">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="h-[100dvh] w-full" />
      <LocationsDrawer />
    </div>
  );
}

export default PageTransition(MAP, "map");
