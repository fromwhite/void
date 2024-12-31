import style from "./App.module.css";
import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, ThreeElements } from "@react-three/fiber";
import { Mesh } from "three";
import { debounce } from "lodash";
import  MapBox  from "./layers/mapbox";
import  OpenStreetMap  from "./layers/open_street_map";
import { Coordinates } from "react-three-map";
import Ctrl from "./ctrl";
import { credits, state } from "./state";
import { Loader } from './geist'
import { is_position_in_bbox,markers } from "./layers/wiki";

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
  },[])

  useEffect(() => {
    const update = debounce(() => {
      const params = new URLSearchParams({
        lat: viewState.latitude.toFixed(2),
        lon: viewState.longitude.toFixed(2),
        zoom:(viewState.zoom ?? 13).toFixed(2),
      });
  
      window.history.replaceState(null, "", `?${params.toString()}`);

      if (bbox && bbox.length > 0) {
        const in_bbox = is_position_in_bbox(viewState.latitude,viewState.longitude,bbox)
        setIsInBbox(in_bbox);
      }
      
    }, 500);
  
    update();
  
    return () => update.cancel();
  }, [viewState]);

  const SelectedMap = useMemo(() => {
    return base_map === "Mapbox" ? MapBox : OpenStreetMap;
  }, [base_map]);

  const markersMemo = useMemo(() => {
    if (!wiki_list || wiki_list.list.length === 0) return null;
    return markers(wiki_list as any);
  }, [wiki_list]);

  return (
    <>
      <div className={style.map}>
      <SelectedMap 
        mapbox_access_token={mapbox_access_token} 
        onViewStateChange={setViewState}
        viewState={viewState}
      >
        <Uluru />
        {markersMemo}
      </SelectedMap>
        <span className={style.credits}>{credits[base_map]}</span>
        { request_loader  && <Loader size={16} style={{ position:"absolute",top:"2px",right:"2px",animation: "spin 1s linear infinite"}} /> }
      </div>
      <Ctrl />
    </>
  );
}



const Box = (props: ThreeElements["mesh"]) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_state, delta) => {
    if (!ref.current) return;
    // @ts-ignore r171
    ref.current.rotation.x += delta;
    // @ts-ignore r171
    ref.current.rotation.z -= delta;
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const Uluru = () => {
  return (
    <Coordinates latitude={-25.3444} longitude={131.0369}>
      <hemisphereLight
          args={["#ffffff", "#60666C"]}
          position={[1, 4.5, 3]}
          intensity={Math.PI}
        />
      <object3D scale={500}>
        <Box position={[-1.2, 0.5, 0]} />
        <Box position={[1.2, 0.5, 0]} />
      </object3D>
    </Coordinates>
    );
}