import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Svg } from "@react-three/drei";
import * as THREE from "three";

export default function Rim({ open, color, ...props }) {
  const ref = useRef();
  const rim = useGLTF("/rim.glb");
  const [scene, setScene] = useState(rim.scene);

  const [matcolor, setMatColor] = useState(null);

  const [material, setMaterial] = useState(rim);

  useEffect(() => {
    const plastik = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 10,
      metalness: 0.1,
      flatShading: true,
    });
    setMatColor(plastik);
  }, [color]);

  return (
    <group position={[0, 2, 0]} {...props} ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/rim.glb");
