import Map from "react-map-gl";
import { Canvas } from "react-three-map";

const isDev = window.location.hostname === "localhost";
const API_BASE_URL = isDev ? "/api" : "https://api.mapbox.com";

// const BOUNDS = [
//     [-10.0, 35.0], // [minLng, minLat]
//     [10.0, 55.0], // [maxLng, maxLat]
// ];

export default function MapBox({
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
    bearing?: number;
  };
  onViewStateChange: (newViewState: any) => void;
  children: React.ReactNode;
}) {
  return (
    <Map
      antialias
      {...viewState}
      mapboxAccessToken={mapbox_access_token}
      mapStyle={{
        version: 8,
        glyphs: `${API_BASE_URL}/fonts/v1/mapbox/{fontstack}/{range}.pbf?access_token=${mapbox_access_token}`,
        sources: {
          satellite: {
            type: "raster",
            tiles: [
              `${API_BASE_URL}/v4/mapbox.satellite/{z}/{x}/{y}@2x.webp?access_token=${mapbox_access_token}`,
            ],
            tileSize: 512,
          },
          // labels: {
          //   type: "vector",
          //   url: `mapbox://mapbox.mapbox-streets-v8`,
          // },
        },
        layers: [
          {
            id: "satellite",
            type: "raster",
            source: "satellite",
            paint: {},
          },
          // {
          //   id: "place-label",
          //   type: "symbol",
          //   source: "labels",
          //   "source-layer": "place_label",
          //   layout: {
          //     "text-field": ["get", "name"],
          //     "text-size": 12,
          //     "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          //   },
          //   paint: {
          //     "text-color": "#ffffff",
          //     "text-halo-color": "#000000",
          //     "text-halo-width": 1,
          //   },
          // },
        ],
      }}
      attributionControl={false}
      keyboard={false}
      doubleClickZoom={false}
      // dragRotate={false}
      // touchZoomRotate={false}
      // dragPan={false}
      // scrollZoom={false}

      // interactiveLayerIds={[]}
      // clickTolerance={0}
      // interactive={false}

      // minZoom={6}
      // maxZoom={16}
      // maxBounds={BOUNDS} // limit extents

      onMove={(evt) => onViewStateChange(evt.viewState)}
    >
      <Canvas latitude={viewState.latitude} longitude={viewState.longitude}>
        {children}
      </Canvas>
    </Map>
  );
}
