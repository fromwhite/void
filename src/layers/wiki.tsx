/**
 * inspired by https://x.com/matthewwsiu/status/1867016096043372752?s=46&t=EPQ16gkutyBYiDV93B6ItA
 * WikiNearby by @BrandonXLF
 * https://github.com/BrandonXLF/wikinearby
 */

import { Coordinates, coordsToVector3 } from "react-three-map/maplibre";
import {
  Points,
  Point,
  PointMaterial,
  Billboard,
  Text,
  useCursor,
} from "@react-three/drei";
import {
  point,
  featureCollection,
  bbox,
  bboxPolygon,
  booleanPointInPolygon,
} from "@turf/turf";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// import { a, useSpring } from "@react-spring/three";
import { X } from "../geist";
import { ui } from "./context";

export const query_wiki_nearby = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const original = `https://wikinearby.toolforge.org/api/nearby?q=${lat},${lon}&lang=en&offset=0`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(original)}`;
  const response = await fetch(proxyUrl).then((res) => res.json());
  return response;
};

export const get_bbox = async ({
  lat,
  lon,
  list,
  padding = 0.01,
}: {
  lat: number;
  lon: number;
  list: any;
  padding: number;
}) => {
  // convert GeoJSON
  const points = list.map((item: any) =>
    point([parseFloat(item.lon), parseFloat(item.lat)])
  );

  // FeatureCollection
  const feature_collection = featureCollection(points);

  // compute bounding box
  const bounds = bbox(feature_collection);

  // add padding
  const minLon = bounds[0] - padding;
  const maxLon = bounds[2] + padding;
  const minLat = bounds[1] - padding;
  const maxLat = bounds[3] + padding;

  return [minLon, minLat, maxLon, maxLat];
};

export const is_position_in_bbox = (
  lat: number,
  lon: number,
  bbox: number[]
) => {
  const pt = point([lon, lat]);
  const bboxPoly = bboxPolygon(bbox as [number, number, number, number]);
  return booleanPointInPolygon(pt, bboxPoly);
};

export const Markers = ({
  lat,
  lon,
  list,
}: {
  lat: number;
  lon: number;
  list: any[];
}) => {
  if (!list || list.length === 0) return null;

  const center = {
    longitude: Number(lon),
    latitude: Number(lat),
  };

  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handlePointClick = (index: number) => {
    setClickedIndex(index);
  };

  const handlePointHover = (index: number) => {
    setHoveredIndex(index);
  };

  useEffect(() => {
    setClickedIndex(null);
    setHoveredIndex(null);
  }, [list]);

  return (
    <>
      <Coordinates key={1} latitude={lat} longitude={lon}>
        <Points limit={list.length}>
          <PointMaterial
            transparent
            vertexColors
            size={6}
            sizeAttenuation={false}
            depthWrite={false}
            toneMapped={false}
            depthTest={false}
            renderOrder={1}
          />
          {list.map((item: any, i: number) => (
            <PointEvent
              key={i}
              index={i}
              label={item.desc}
              position={coordsToVector3(
                { latitude: Number(item.lat), longitude: Number(item.lon) },
                center
              )}
              isClicked={clickedIndex === i}
              isHovered={hoveredIndex === i}
              onClick={() => handlePointClick(i)}
              onPointerOver={() => handlePointHover(i)}
              onPointerOut={() => setHoveredIndex(null)}
            />
          ))}
        </Points>
      </Coordinates>
      <ui.In>
        <WikiPortal
          isOpen={clickedIndex !== null}
          src={list[clickedIndex ?? -1]?.page ?? ""}
          onClose={() => setClickedIndex(null)}
        />
      </ui.In>
    </>
  );
};

const PointEvent = ({
  index,
  label = "",
  position,
  isClicked,
  isHovered,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  index: number;
  label: string;
  position: [number, number, number];
  isClicked: boolean;
  isHovered: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}) => {
  // useCursor(hovered, "pointer");

  /**
   * TODO: POI text
   * 1. Localize the text:
   *    - Dynamically adapt the text to the selected language or locale.
   *    - Implement tokenized search for self-hosted Wiki data and ensure proper data separation.
   *
   * 2. Lock Z-axis to the map:
   *    - Align the text with the map surface and keep it consistent with the coordinate plane.
   *    - Ensure proper orientation during user interactions like rotation or panning.
   *
   * 3. Implement zoom scaling:
   *    - Dynamically adjust text size based on the zoom level.
   *    - Prevent text from becoming disproportionately large or small during zoom interactions.
   */

  /**
   * TODO: POI event
   * 1. Add spring-based physics interactions to enhance visual feedback during text scaling transitions.
   * 2. Adapt to different styles for OSM minimalist maps and Mapbox satellite tiles.
   * 3. Provide TSL animations and VFX options for enriched user experience.
   */

  // const { size, color } = useSpring({
  //     size: (clicked || hovered) ? 1.5 : 1,
  //     color: clicked ? 'lightblue' : hovered ? 'hotpink' : 'orange',
  // });

  return (
    <group
      position={position}
      scale={[1, 1, 1]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* <a.mesh> */}
      {/* <Billboard follow lockY> */}

      <Text
        scale={10}
        fontSize={10}
        color={isClicked ? "lightblue" : isHovered ? "hotpink" : "orange"}
        anchorX="center"
        anchorY="bottom"
        // font={"/fonts/Inter_Tight/InterTight-VariableFont_wght.ttf"}
        material-depthTest={false}
        rotation={[-Math.PI / 2, 0, 0]} // Temporarily lock the Y-axis at 90', keeping the text aligned with the XZ plane
      >
        {label}
      </Text>
      {/* </Billboard> */}
      {/* </a.mesh> */}
      {/* <a.mesh> */}
      <Point
        // scale={[10, 10, 10]}
        size={isClicked || isHovered ? 1.5 : 1}
        color={isClicked ? "lightblue" : isHovered ? "hotpink" : "orange"}
      ></Point>
      {/* </a.mesh> */}
    </group>
  );
};

export const WikiPortal = ({
  isOpen,
  src,
  onClose,
}: {
  isOpen: boolean;
  src: string;
  onClose: () => void;
}) => {
  if (!isOpen || !src) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: "5vh",
        left: "20px",
        width: "400px",
        height: "90vh",
        borderRadius: "10px",
        backgroundColor: "floralwhite",
        boxShadow: "0 0 9px 0 rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        willChange: "transform, opacity",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "14px",
          right: "10px",
          padding: "0",
          cursor: "pointer",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "20px",
          color: "black",
          outline: "none",
        }}
        onClick={onClose}
      >
        <X />
      </button>
      <iframe
        src={`https://en.m.wikipedia.org/wiki/${src}`}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="encrypted-media; picture-in-picture"
        sandbox="allow-same-origin allow-scripts"
        style={{ borderRadius: "10px" }}
      ></iframe>
    </div>,
    document.body
  );
};
