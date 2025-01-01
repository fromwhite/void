import { useFrame, ThreeElements } from "@react-three/fiber";
import { Mesh } from "three";
import { Coordinates } from "react-three-map";
import { useRef, useState } from "react";
import { im } from "./context";

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

export const Uluru = () => {
  return (
    <im.In>
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
    </im.In>
  );
};
