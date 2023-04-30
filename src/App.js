import "./App.scss";
import { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  MeshTransmissionMaterial,
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import Knife from "./components/Knife.js";

export default function App() {
  const colors = ["rgb(183, 209, 42)", "#022e3e", "teal", "pink", "grey"];

  const [color, setColor] = useState(colors[0]);
  return (
    <>
      <Canvas
        eventSource={document.getElementById("root")}
        eventPrefix="client"
        camera={{ position: [0, 1, 4], fov: 40 }}
      >
        <spotLight
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[-10, -5, 0]}
          castShadow
        />
        <Environment preset="warehouse" background blur={1} intensity={0.5} />
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -0.7, 0]}
          opacity={1}
          blur={1.5}
          far={3}
        />

        <OrbitControls regress />
        <Knife color={color} scale={[0.3, 0.3, 0.3]} rotation={[1, 1, 0]} />
      </Canvas>
      <div className="colorpicker">
        {colors.map((selcol, idx) => (
          <div
            className={`color ${selcol == color ? "active" : ""}`}
            onClick={() => setColor(selcol)}
            style={{ backgroundColor: selcol }}
          ></div>
        ))}
      </div>
    </>
  );
}
