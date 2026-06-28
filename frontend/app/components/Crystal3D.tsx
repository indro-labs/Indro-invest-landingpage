"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  ContactShadows,
} from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

/* An elongated faceted gem — the Selnite crystal — in glossy refractive
   glass, slowly turning. Lit by an in-scene studio so it reads as a real
   3D render without fetching any external HDR. */
function Crystal() {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.32;
  });
  return (
    <Float speed={1.3} rotationIntensity={0.45} floatIntensity={0.7}>
      <group ref={ref} rotation={[0.15, 0, 0.08]}>
        <mesh scale={[0.95, 1.55, 0.95]}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#aebfff"
            metalness={0.2}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
            iridescence={1}
            iridescenceIOR={1.4}
            iridescenceThicknessRange={[120, 760]}
            envMapIntensity={1.5}
            flatShading
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function Crystal3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 34 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} />
      <pointLight position={[-4, 1, 3]} intensity={20} color="#9bb8ff" />
      <pointLight position={[4, -2, 2]} intensity={14} color="#c8b0ff" />

      <Crystal />

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.32}
        scale={9}
        blur={2.8}
        far={4}
        color="#1a2240"
      />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.2} position={[3, 3, 3]} scale={[5, 5, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.5} position={[-5, 2, 1]} scale={[4, 6, 1]} color="#9bb8ff" />
        <Lightformer form="circle" intensity={1.8} position={[0, 5, -4]} scale={4} color="#d4c2ff" />
        <Lightformer form="rect" intensity={1.2} position={[0, -3, 3]} scale={[6, 3, 1]} color="#ffffff" />
      </Environment>
    </Canvas>
  );
}
