import mapboxgl from "mapbox-gl";
import { useRef, useEffect, useState } from "react";
import hikmaImg from "../../assets/download.jpeg";
import LocationsDrawer from "@/components/Map/LocatinosDrawer";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

mapboxgl.accessToken =
  "pk.eyJ1IjoieW91c2lmLW9kYXkiLCJhIjoiY2x5OGp0cWxnMDd3OTJscGhmbWk5eDNxdSJ9.FASD-xbWAHmgzayQNOcHqQ";
function MAP() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(0);
  const router = useNavigate();
  const imgs = ["taha", "aswar", "aswar"];

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature 2",
        properties: {
          message: "Foo",
          imageId: 1011,
          iconSize: [40, 40],
        },
        geometry: {
          type: "Point",
          coordinates: [44.3425, 33.2982],
        },
      },
    ],
  };
  const jumpTo = (lng, lat, zoom, speed = 0.5) => {
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
    }, 2000);
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    let i = 0;
    for (const marker of geojson.features) {
      const el = document.createElement("div");
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = `marker bg-no-repeat !bg-cover bg-center rounded-[50%] bg-[url('./assets/taha.jpeg')]`;
      el.style.backgroundImage = hikmaImg;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = "100%";
      el.style.display = "block";
      el.style.border = "none";
      el.style.borderRadius = "50%";
      el.style.cursor = "pointer";
      el.style.padding = 0;

      el.addEventListener("click", () => {
        jumpTo(
          marker.geometry.coordinates[0],
          marker.geometry.coordinates[1],
          15,
          1
        );
        transformPage();
      });

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current);
      i++;
    }
  }, []);

  useEffect(() => {
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.on("load", () => {
      jumpTo(43.8473, 33.1812, 5);
    });
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 m-2 rounded-lg p-4 z-10 text-white bg-[#23374be6]">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="h-screen w-full" />
      <LocationsDrawer />
    </div>
  );
}

export default PageTransition(MAP, "map");
