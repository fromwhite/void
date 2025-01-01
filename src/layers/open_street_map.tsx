import "maplibre-gl/dist/maplibre-gl.css";
import Map from "react-map-gl/maplibre";
import { Canvas } from "react-three-map/maplibre";

export default function OpenStreetMap({
  viewState,
  onViewStateChange,
  children,
}: {
  viewState: {
    latitude: number;
    longitude: number;
    zoom?: number;
    pitch?: number;
    heading?: number;
    bearing?: number;
  };
  onViewStateChange: (newViewState: any) => void;
  children: React.ReactNode;
}) {
  return (
    <Map
      {...viewState}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      antialias
      attributionControl={false}
      keyboard={false}
      doubleClickZoom={false}
      onMove={(evt) => onViewStateChange(evt.viewState)}
    >
      <Canvas latitude={viewState.latitude} longitude={viewState.longitude}>
        {children}
      </Canvas>
    </Map>
  );
}
