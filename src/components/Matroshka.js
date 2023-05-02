import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Svg } from "@react-three/drei";
import * as THREE from "three";

export default function Knife({ open, color, ...props }) {
  const ref = useRef();
  const knife = useGLTF("/matryoshka_doll.glb");
  console.log(knife);
  const [obj2, setObj2] = useState(knife.nodes.Matroska_bottom__0);
  const [obj4, setObj4] = useState(knife.nodes.Matroska_top__0);

  const [matcolor, setMatColor] = useState(null);

  const [material, setMaterial] = useState(knife);

  const top = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.set(
      Math.PI / -2,
      (0.5 + Math.cos(t / 2)) / 8,
      (-12 + Math.cos(t / 2)) / 8
    );
    ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7 - 0.5;
  });

  useFrame(() => {
    console.log(top.current.position);

    if (open) {
      top.current.position.lerp(new THREE.Vector3(0, 0, 0.21), 0.1);
    } else {
      top.current.position.lerp(new THREE.Vector3(0, 0, 0.128), 0.1);
    }
  });

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
    <group position={[0, 10, 0]} {...props} ref={ref}>
      <mesh {...obj2} />
      <mesh {...obj4} position={[0, 0, 0.11]} ref={top} />
    </group>
  );
}

useGLTF.preload("/matryoshka_doll.glb");
