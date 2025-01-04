import { useMemo } from "react";
import OpenStreetMap from "./open_street_map";
import MapBox from "./mapbox";
import Aerial from "./photorealistic_tiles";
import { state } from "../state";
import { im } from "./context";

export const BaseMap = ({
  mapbox_access_token,
  viewState,
  onViewStateChange,
  children,
}: {
  mapbox_access_token: string;
  viewState: {
    latitude: number;
    longitude: number;
    zoom?: number;
    pitch?: number;
    heading?: number;
  };
  onViewStateChange: (newViewState: any) => void;
  children?: React.ReactNode;
}) => {
  const base_map = state((s) => s.base_map);

  const CustomMap = useMemo(() => {
    switch (base_map) {
      case "OpenStreetMap":
        return OpenStreetMap;
      case "Mapbox":
        return MapBox;
      case "Google":
        return Aerial;
      default:
        return null;
    }
  }, [base_map]);

  if (!CustomMap) return null;

  return (
    <CustomMap
      mapbox_access_token={mapbox_access_token}
      viewState={viewState}
      onViewStateChange={onViewStateChange}
    >
      <im.Out />
      {children}
    </CustomMap>
  );
};
