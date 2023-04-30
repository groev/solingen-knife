import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Svg } from "@react-three/drei";
import * as THREE from "three";

export default function Knife({ color, ...props }) {
  const ref = useRef();
  const knife = useGLTF("/kitchen_knife.glb");

  const [obj1, setObj1] = useState(knife.nodes.Object_2);
  const [obj2, setObj2] = useState(knife.nodes.Object_3);
  const [obj3, setObj3] = useState(knife.nodes.Object_4);
  const [obj4, setObj4] = useState(knife.nodes.Object_5);
  const [obj5, setObj5] = useState(knife.nodes.Object_6);
  const [obj6, setObj6] = useState(knife.nodes.Object_7);
  const [matcolor, setMatColor] = useState(null);

  const [material, setMaterial] = useState(knife);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.set(
      -1,
      (0.5 + Math.cos(t / 2)) / 8,
      (0.5 + Math.cos(t / 2)) / 8
    );
    ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7 - 0.5;
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
    <group position={[0, -10, 0]} {...props} ref={ref}>
      <mesh {...obj1} />
      <mesh {...obj2} />
      <mesh {...obj3} />
      <mesh {...obj4} />
      <mesh {...obj5} />

      <mesh {...obj6} material={matcolor} />
      <Svg
        rotation={[1.5, 0, 0]}
        scale={[-0.006, 0.006, 0.006]}
        position={[0, 0.1, 2]}
        src={"/1205.svg"}
      />
      <Svg
        rotation={[1.5, 0, 0]}
        scale={[0.006, 0.006, 0.006]}
        position={[-1, -0.15, 2]}
        src={"/1205.svg"}
      />
    </group>
  );
}

useGLTF.preload("/kitchen_knife.glb");
