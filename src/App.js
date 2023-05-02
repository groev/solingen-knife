import "./App.scss";
import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import Knife from "./components/Knife.js";
import Matroshka from "./components/Matroshka";
import Rim from "./components/Rim";
import { TextureLoader } from "three";
import * as THREE from "three";

import Camera from "./components/Camera.js";
import { io } from "socket.io-client";
//const ioSocket = io("ws://localhost:8000");

export default function App() {
  const [open, setOpen] = useState(false);
  const cam = useRef();
  const colors = ["rgb(183, 209, 42)", "#022e3e", "teal", "pink", "grey"];
  const [color, setColor] = useState(colors[0]);
  const [logo, setLogo] = useState(null);
  const [ratio, setRatio] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const textureUrl = reader.result;

      const texture = new TextureLoader().load(textureUrl);
      const image = new Image();
      image.src = textureUrl;
      image.onload = function () {
        const ratio = this.width / this.height;
        texture.format = THREE.RGBAFormat;
        texture && (texture.wrapS = texture.wrapT = THREE.RepeatWrapping);
        setRatio(ratio);
        setLogo(texture);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Canvas>
        <OrbitControls />

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
          position={[0, -1, 0]}
          opacity={1}
          blur={1.5}
          far={3}
        />
        <Knife
          open={open}
          color={color}
          scale={[0.5, 0.5, 0.5]}
          rotation={[0, 0, 0]}
          logo={logo}
          ratio={ratio}
        />
      </Canvas>

      <div className="colorpicker" onClick={() => setOpen(!open)}>
        {colors &&
          colors.map((color) => {
            return (
              <div
                className="color"
                key={color}
                onClick={() => setColor(color)}
                style={{ backgroundColor: color }}
              ></div>
            );
          })}
      </div>
      <div className="filepicker">
        <input onChange={handleFileChange} type="file" />
      </div>
    </>
  );
}
