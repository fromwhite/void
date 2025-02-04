/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    horse: THREE.SkinnedMesh;
    horse_coth: THREE.Mesh;
    horse_strap: THREE.Mesh;
    horse_strap001: THREE.Mesh;
    strap_hook: THREE.Mesh;
    strap_hook001: THREE.Mesh;
    strap_hook002: THREE.Mesh;
    strap_hook003: THREE.Mesh;
    ankou_sickle: THREE.SkinnedMesh;
    ankou002: THREE.SkinnedMesh;
    accroche_crane: THREE.SkinnedMesh;
    cart_shaft: THREE.Mesh;
    bloc_wheel_D: THREE.SkinnedMesh;
    bloc_wheel_G: THREE.SkinnedMesh;
    cart_base: THREE.SkinnedMesh;
    cart_boad_AB: THREE.SkinnedMesh;
    cart_boad_AH: THREE.SkinnedMesh;
    cart_boad_DB: THREE.SkinnedMesh;
    cart_boad_DH: THREE.SkinnedMesh;
    cart_boad_GB: THREE.SkinnedMesh;
    cart_boad_GH: THREE.SkinnedMesh;
    cart_post_AD: THREE.SkinnedMesh;
    cart_post_AG: THREE.SkinnedMesh;
    cart_post_AM: THREE.SkinnedMesh;
    cart_post_Ar: THREE.SkinnedMesh;
    cart_post_ArD: THREE.SkinnedMesh;
    cart_post_ArG: THREE.SkinnedMesh;
    cart_post_crane: THREE.SkinnedMesh;
    cart_post_DMA: THREE.SkinnedMesh;
    cart_post_DMAr: THREE.SkinnedMesh;
    cart_post_GMA: THREE.SkinnedMesh;
    cart_post_GMAr: THREE.SkinnedMesh;
    cart_rope: THREE.SkinnedMesh;
    hub_wheel_D: THREE.SkinnedMesh;
    hub_wheel_G: THREE.SkinnedMesh;
    skull_1: THREE.SkinnedMesh;
    spokes_wheel_D: THREE.SkinnedMesh;
    spokes_wheel_G: THREE.SkinnedMesh;
    steel_wheel_D: THREE.SkinnedMesh;
    steel_wheel_G: THREE.SkinnedMesh;
    wood_wheel_D: THREE.SkinnedMesh;
    wood_wheel_G: THREE.SkinnedMesh;
    rootankou: THREE.Bone;
    spine004: THREE.Bone;
    cart: THREE.Bone;
  };
  materials: {
    ["color_main.002"]: THREE.MeshStandardMaterial;
  };
};

type ActionName =
  | "course_ankou"
  | "pose_ankou"
  | "course_cheval"
  | "pose_cheval"
  | "course_charette"
  | "pose_charette";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ankou-with-cart/model.gltf"
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions>(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.rootankou} />
      <group name="ankou">
        <primitive object={nodes.spine004} />
        <skinnedMesh
          geometry={nodes.horse.geometry}
          material={nodes.horse.material}
          skeleton={nodes.horse.skeleton}
        />
        <mesh
          geometry={nodes.horse_coth.geometry}
          material={nodes.horse_coth.material}
          rotation={[0, 0.01, 0]}
        />
        <mesh
          geometry={nodes.horse_strap.geometry}
          material={nodes.horse_strap.material}
          rotation={[0, 0.01, 0]}
        />
        <mesh
          geometry={nodes.horse_strap001.geometry}
          material={nodes.horse_strap001.material}
          rotation={[0, 0.01, 0]}
        />
        <mesh
          geometry={nodes.strap_hook.geometry}
          material={nodes.strap_hook.material}
          rotation={[Math.PI / 2, 0, -0.01]}
        />
        <mesh
          geometry={nodes.strap_hook001.geometry}
          material={nodes.strap_hook001.material}
          position={[1.28, 0, -0.01]}
          rotation={[Math.PI / 2, 0, -0.01]}
        />
        <mesh
          geometry={nodes.strap_hook002.geometry}
          material={nodes.strap_hook002.material}
          position={[0, 0.01, 0.36]}
          rotation={[Math.PI / 2, 0, -0.01]}
        />
        <mesh
          geometry={nodes.strap_hook003.geometry}
          material={nodes.strap_hook003.material}
          position={[1.28, 0.01, 0.35]}
          rotation={[Math.PI / 2, 0, -0.01]}
        />
      </group>
      <skinnedMesh
        geometry={nodes.ankou_sickle.geometry}
        material={nodes.ankou_sickle.material}
        skeleton={nodes.ankou_sickle.skeleton}
      />
      <skinnedMesh
        geometry={nodes.ankou002.geometry}
        material={nodes.ankou002.material}
        skeleton={nodes.ankou002.skeleton}
      />
      <group position={[-0.08, 0.81, -0.78]}>
        <primitive object={nodes.cart} />
        <skinnedMesh
          geometry={nodes.accroche_crane.geometry}
          material={nodes.accroche_crane.material}
          skeleton={nodes.accroche_crane.skeleton}
        />
        <mesh
          geometry={nodes.cart_shaft.geometry}
          material={nodes.cart_shaft.material}
          position={[0.1, -0.8, 0.78]}
          rotation={[Math.PI / 2, 0, -1.56]}
        />
        <skinnedMesh
          geometry={nodes.bloc_wheel_D.geometry}
          material={nodes.bloc_wheel_D.material}
          skeleton={nodes.bloc_wheel_D.skeleton}
        />
        <skinnedMesh
          geometry={nodes.bloc_wheel_G.geometry}
          material={nodes.bloc_wheel_G.material}
          skeleton={nodes.bloc_wheel_G.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_base.geometry}
          material={nodes.cart_base.material}
          skeleton={nodes.cart_base.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_boad_AB.geometry}
          material={nodes.cart_boad_AB.material}
          skeleton={nodes.cart_boad_AB.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_boad_AH.geometry}
          material={nodes.cart_boad_AH.material}
          skeleton={nodes.cart_boad_AH.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_boad_DB.geometry}
          material={nodes.cart_boad_DB.material}
          skeleton={nodes.cart_boad_DB.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_boad_DH.geometry}
          material={nodes.cart_boad_DH.material}
          skeleton={nodes.cart_boad_DH.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_boad_GB.geometry}
          material={nodes.cart_boad_GB.material}
          skeleton={nodes.cart_boad_GB.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_boad_GH.geometry}
          material={nodes.cart_boad_GH.material}
          skeleton={nodes.cart_boad_GH.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_post_AD.geometry}
          material={nodes.cart_post_AD.material}
          skeleton={nodes.cart_post_AD.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_post_AG.geometry}
          material={nodes.cart_post_AG.material}
          skeleton={nodes.cart_post_AG.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_post_AM.geometry}
          material={nodes.cart_post_AM.material}
          skeleton={nodes.cart_post_AM.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_post_Ar.geometry}
          material={nodes.cart_post_Ar.material}
          skeleton={nodes.cart_post_Ar.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_post_ArD.geometry}
          material={nodes.cart_post_ArD.material}
          skeleton={nodes.cart_post_ArD.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_post_ArG.geometry}
          material={nodes.cart_post_ArG.material}
          skeleton={nodes.cart_post_ArG.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_post_crane.geometry}
          material={nodes.cart_post_crane.material}
          skeleton={nodes.cart_post_crane.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_post_DMA.geometry}
          material={nodes.cart_post_DMA.material}
          skeleton={nodes.cart_post_DMA.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_post_DMAr.geometry}
          material={nodes.cart_post_DMAr.material}
          skeleton={nodes.cart_post_DMAr.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_post_GMA.geometry}
          material={nodes.cart_post_GMA.material}
          skeleton={nodes.cart_post_GMA.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_post_GMAr.geometry}
          material={nodes.cart_post_GMAr.material}
          skeleton={nodes.cart_post_GMAr.skeleton}
        />
        <skinnedMesh
          geometry={nodes.cart_rope.geometry}
          material={nodes.cart_rope.material}
          skeleton={nodes.cart_rope.skeleton}
        />
        <skinnedMesh
          geometry={nodes.hub_wheel_D.geometry}
          material={nodes.hub_wheel_D.material}
          skeleton={nodes.hub_wheel_D.skeleton}
        />
        <skinnedMesh
          geometry={nodes.hub_wheel_G.geometry}
          material={nodes.hub_wheel_G.material}
          skeleton={nodes.hub_wheel_G.skeleton}
        />
        <skinnedMesh
          geometry={nodes.skull_1.geometry}
          material={nodes.skull_1.material}
          skeleton={nodes.skull_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.spokes_wheel_D.geometry}
          material={nodes.spokes_wheel_D.material}
          skeleton={nodes.spokes_wheel_D.skeleton}
        />
        <skinnedMesh
          geometry={nodes.spokes_wheel_G.geometry}
          material={nodes.spokes_wheel_G.material}
          skeleton={nodes.spokes_wheel_G.skeleton}
        />
        <skinnedMesh
          geometry={nodes.steel_wheel_D.geometry}
          material={nodes.steel_wheel_D.material}
          skeleton={nodes.steel_wheel_D.skeleton}
        />
        <skinnedMesh
          geometry={nodes.steel_wheel_G.geometry}
          material={nodes.steel_wheel_G.material}
          skeleton={nodes.steel_wheel_G.skeleton}
        />
        <skinnedMesh
          geometry={nodes.wood_wheel_D.geometry}
          material={nodes.wood_wheel_D.material}
          skeleton={nodes.wood_wheel_D.skeleton}
        />
        <skinnedMesh
          geometry={nodes.wood_wheel_G.geometry}
          material={nodes.wood_wheel_G.material}
          skeleton={nodes.wood_wheel_G.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ankou-with-cart/model.gltf"
);
