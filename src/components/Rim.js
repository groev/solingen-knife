import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export default function Rim({ speed, open, color, ...props }) {
  const ref = useRef();
  const rim = useGLTF("/rim.glb");
  const [scene, setScene] = useState(rim.scene);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    ref.current.rotation.z = a * speed;
  });

  return (
    <>
      <Html center></Html>
      <group position={[0, 1, 0]} {...props} ref={ref}>
        <primitive object={scene} />
      </group>
    </>
  );
}

useGLTF.preload("/rim.glb");
