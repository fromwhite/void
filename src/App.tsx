import style from "./App.module.css";
import { useEffect } from "react";
import { debounce } from "lodash";
import Ctrl from "./ctrl";
import { credits, state } from "./state";
import { Loader } from "./geist";
import { ui } from "./layers/context";
import { is_position_in_bbox, Markers } from "./layers/wiki";
import { BaseMap } from "./layers/adapter";
import { Uluru } from "./layers/example";

export function App() {
  const base_map = state((s) => s.base_map);
  const mapbox_access_token = state((s) => s.mapbox_access_token);
  const viewState = state((s) => s.viewState);
  const setViewState = state((s) => s.setViewState);
  const request_loader = state((s) => s.request_loader);
  const bbox = state((s) => s.bbox);
  const setIsInBbox = state((s) => s.setIsInBbox);
  const wiki_list = state((s) => s.wiki_list);

  const searchParams = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(searchParams.entries());

  // Ayers Rock, Uluru-Kata Tjuta National Park
  const initial_view = {
    latitude: parseFloat(queryParams["lat"] || "-25.3444"),
    longitude: parseFloat(queryParams["lon"] || "131.0369"),
    zoom: parseFloat(queryParams["zoom"] || "13"),
    pitch: 0,
  };

  useEffect(() => {
    setViewState(initial_view);
  }, []);

  useEffect(() => {
    const update = debounce(() => {
      const params = new URLSearchParams({
        lat: viewState.latitude.toFixed(2),
        lon: viewState.longitude.toFixed(2),
        zoom: (viewState.zoom ?? 13).toFixed(2),
      });

      window.history.replaceState(null, "", `?${params.toString()}`);

      if (bbox && bbox.length > 0) {
        const in_bbox = is_position_in_bbox(
          viewState.latitude,
          viewState.longitude,
          bbox
        );
        setIsInBbox(in_bbox);
      }
    }, 500);

    update();

    return () => update.cancel();
  }, [viewState]);

  return (
    <>
      <div className={style.map}>
        <BaseMap
          mapbox_access_token={mapbox_access_token}
          onViewStateChange={setViewState}
          viewState={viewState}
        >
          <Markers {...(wiki_list ?? { lat: 0, lon: 0, list: [] })} />
        </BaseMap>
        <span className={style.credits}>{credits[base_map]}</span>
        {request_loader && (
          <Loader
            size={16}
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              animation: "spin 1s linear infinite",
            }}
          />
        )}
      </div>
      <Uluru />
      <Ctrl />
      <ui.Out />
    </>
  );
}
