import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLocations = create(
  persist(
    (set, get) => ({
      locations: {},
      setLocations: (locations) => set({ locations }),
      setLocationsList: (locationsList) =>
        set((state) => ({
          locations: {
            ...state.locations,
            list: locationsList,
          },
        })),
      setActiveLocation: (id) =>
        set((state) => ({
          locations: {
            ...state.locations,
            activeLocation: id,
          },
        })),
      getActiveLocation: () => {
        const { locations } = get();
        return locations.list?.find(
          (location) => location.id === locations.activeLocation
        );
      },
    }),
    {
      name: "locations-storage",
    }
  )
);

export default useLocations;
