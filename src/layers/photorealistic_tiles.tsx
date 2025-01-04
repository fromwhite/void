/**
 * Google Maps Photorealistic 3D Tiles
 * inspired by cesium tile viewer
 * based on @NASA AMMOS
 */

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import * as THREE from "three";
import { GeoUtils, WGS84_ELLIPSOID, TilesRenderer } from "3d-tiles-renderer";
import {
  GoogleCloudAuthPlugin,
  TilesFadePlugin,
  TileCompressionPlugin,
  GLTFExtensionsPlugin,
} from "3d-tiles-renderer/plugins/index.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Perf } from "r3f-perf";
import { state } from "../state";

const TilesRendererComponent = ({
  apiKey,
  view = { lat: 35.6586, lon: 139.7454 },
}: {
  apiKey: string;
  view: { lat: number; lon: number };
}) => {
  const { camera, gl } = useThree();
  const groupRef = useRef(null);
  const [tiles, setTiles] = useState(null);
  const setRequestLoader = state((s) => s.setRequestLoader);

  useEffect(() => {
    const newTiles = new TilesRenderer();
    newTiles.registerPlugin(new GoogleCloudAuthPlugin({ apiToken: apiKey }));
    newTiles.registerPlugin(new TileCompressionPlugin());
    newTiles.registerPlugin(new TilesFadePlugin());
    newTiles.registerPlugin(
      new GLTFExtensionsPlugin({
        dracoLoader: new DRACOLoader().setDecoderPath(
          "https://unpkg.com/three@0.153.0/examples/jsm/libs/draco/gltf/"
        ),
      } as any)
    );

    newTiles.setLatLonToYUp(
      view.lat * THREE.MathUtils.DEG2RAD,
      view.lon * THREE.MathUtils.DEG2RAD
    ); // Tokyo Tower

    setTiles(newTiles);

    return () => {
      newTiles.dispose();
    };
  }, [apiKey]);

  useEffect(() => {
    setRequestLoader(true);
    if (tiles && groupRef.current) {
      groupRef.current.add(tiles.group);
    }

    if (tiles) {
      tiles.setLatLonToYUp(
        view.lat * THREE.MathUtils.DEG2RAD,
        view.lon * THREE.MathUtils.DEG2RAD
      );
    }
  }, [tiles, view]);

  const _credits_ = document.querySelector('[data-role="credits"]');

  useFrame(() => {
    if (!tiles) return;
    setRequestLoader(false);
    tiles.setResolutionFromRenderer(camera, gl);
    tiles.setCamera(camera);

    camera.updateMatrixWorld();
    tiles.update();

    const credits = tiles.getAttributions()[0]?.value;
    // const mat = tiles.group.matrixWorld.clone().invert();
    // const vec = camera.position.clone().applyMatrix4( mat );
    // const res = {};
    // WGS84_ELLIPSOID.getPositionToCartographic( vec, res );
    // _credits_.innerText = GeoUtils.toLatLonString( res.lat, res.lon ) + '\n' + credits;
    if (credits !== undefined) {
      _credits_.innerText = credits;
    }
  });

  return <group ref={groupRef} />;
};

export default function Aerial() {
  const google_tile_key = state((s) => s.google_tile_key);
  const viewState = state((s) => s.viewState);

  return (
    <Canvas
      camera={{ fov: 60, position: [500, 500, 500], near: 100, far: 1600000 }}
    >
      <color attach="background" args={["#151c1f"]} />
      <OrbitControls
        minDistance={500}
        maxDistance={20000}
        minPolarAngle={0}
        maxPolarAngle={(3 * Math.PI) / 8}
        enableDamping={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        enablePan={false}
      />
      <TilesRendererComponent
        apiKey={google_tile_key}
        view={{ lat: viewState.latitude, lon: viewState.longitude }}
      />
      {/* todo: im.In LLM Geospatial */}
      {/* <Perf position="top-left" /> */}
    </Canvas>
  );
}
