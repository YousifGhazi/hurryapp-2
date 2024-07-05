import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLocations = create(
  persist(
    (set) => ({
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
        return state.locations.list.find(
          (location) =>
            location.id === state.locations.activeLocation.id || null
        );
      },
    }),
    {
      name: "locations-storage",
    }
  )
);

export default useLocations;
