import React, { useEffect, useState, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

export default function Camera({ socket }) {
  const cam = useRef();
  const [position, setPosition] = useState([1, 1, 0]);

  const { camera, controls } = useThree();

  useEffect(() => {}, [camera]);

  useEffect(() => {
    socket.on("movement", (position) => {
      camera.position.set(position.x * 10, 0, -position.y * 10);
      controls.update();
    });
  }, []);

  return <OrbitControls maxDistance={4} ref={cam} fov={40} makeDefault />;
}
