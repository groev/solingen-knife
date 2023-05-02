import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Svg } from "@react-three/drei";
import * as THREE from "three";

export default function Knife({ open, closed, color, ...props }) {
  const ref = useRef();
  const knife = useGLTF("/matryoshka_doll.glb");

  const [obj2, setObj2] = useState(knife.nodes.Matroska_bottom__0);
  const [obj4, setObj4] = useState(knife.nodes.Matroska_top__0);
  const [obj5, setObj5] = useState(knife.nodes.Matroska_bottom__0);
  const [obj6, setObj6] = useState(knife.nodes.Matroska_top__0);
  const top = useRef();
  const top2 = useRef();

  useFrame(() => {
    if (open) {
      top.current.position.lerp(new THREE.Vector3(0, 0, 0.41), 0.1);
      setTimeout(() => {
        top2.current.position.lerp(new THREE.Vector3(0, 0, 0.21), 0.1);
      }, 500);
    }
    if (closed) {
      top2.current.position.lerp(new THREE.Vector3(0, 0, 0.128), 0.1);
      setTimeout(() => {
        top.current.position.lerp(new THREE.Vector3(0, 0, 0.128), 0.1);
      }, 500);
    }
  });

  return (
    <>
      <group
        position={[0, 0, 0]}
        rotation={[Math.PI / -2, 0, 0]}
        scale={[6, 6, 6]}
        ref={ref}
      >
        <mesh {...obj2} />
        <mesh {...obj4} position={[0, 0, 0.11]} ref={top} />
        <mesh {...obj5} scale={[0.8, 0.8, 0.8]} />
        <mesh
          {...obj6}
          scale={[0.8, 0.8, 0.8]}
          position={[0, 0, 0.11]}
          ref={top2}
        />
      </group>
    </>
  );
}

useGLTF.preload("/matryoshka_doll.glb");
