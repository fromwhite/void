import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const credits = {
  OpenStreetMap: "© OpenStreetMap contributors",
  Mapbox: "© Mapbox © OpenStreetMap Improve this map © Maxar",
  Google: "Map data © 2024 Google",
};

type BaseMapKeys = keyof typeof credits;

type GeolocationPosition = {
  coords: GeolocationCoordinates;
  timestamp: number;
};

type GeolocationCoordinates = {
  latitude: number;
  longitude: number;
  altitude?: number | null;
  accuracy?: number;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
};

type CoordinatesType = {
  latitude: number;
  longitude: number;
  zoom?: number;
  pitch?: number;
};

interface AppState {
  request_loader: boolean;
  base_map: BaseMapKeys;
  mapbox_access_token: string;
  google_tile_key: string;
  viewState: CoordinatesType;
  bbox: number[];
  is_in_bbox: boolean;
  wiki_list: {
    lat: number;
    lon: number;
    list: any[];
  } | null;
  // wiki_portal: number | null;

  setRequestLoader: (requestLoader: boolean) => void;
  setBasemap: (base_map: BaseMapKeys) => void;
  setMapboxKey: (mapbox_access_token: string) => void;
  setGoogleKey: (google_tile_key: string) => void;
  setViewState: (viewState: CoordinatesType) => void;
  setBbox: (bbox: number[]) => void;
  setIsInBbox: (is_in_bbox: boolean) => void;
  setWikiList: (wiki_list: any[]) => void;
}

type OmitMethods<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

const initAppState: OmitMethods<AppState> = {
  viewState: {
    latitude: -25.3444,
    longitude: 131.0369,
    zoom: 13,
    pitch: 0,
  },
  request_loader: false,
  base_map: "OpenStreetMap",
  mapbox_access_token: "",
  google_tile_key: "",
  bbox: [],
  is_in_bbox: false,
  wiki_list: null,
};

export const state = create<AppState>()(
  persist(
    (set) => ({
      ...initAppState,

      setRequestLoader: (request_loader: boolean) => set({ request_loader }),
      setBasemap: (base_map: BaseMapKeys) => set({ base_map }),
      setMapboxKey: (mapbox_access_token: string) =>
        set({ mapbox_access_token }),
      setGoogleKey: (google_tile_key: string) => set({ google_tile_key }),
      setViewState: (viewState: CoordinatesType) => set({ viewState }),
      setBbox: (bbox: number[]) => set({ bbox }),
      setIsInBbox: (is_in_bbox: boolean) => set({ is_in_bbox }),
      setWikiList: (wiki_list: any) => set({ wiki_list }),
    }),
    {
      name: "void",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        base_map: state.base_map,
        mapbox_access_token: state.mapbox_access_token,
        google_tile_key: state.google_tile_key,
      }),
    }
  )
);
