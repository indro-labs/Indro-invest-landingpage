"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* A single soft petal, extruded from a bezier outline with a bevelled edge. */
function usePetalGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(0.5, 0.32, 0.46, 1.02, 0, 1.42);
    s.bezierCurveTo(-0.46, 1.02, -0.5, 0.32, 0, 0);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.06,
      bevelSegments: 2,
      steps: 1,
      curveSegments: 20,
    });
    g.computeVertexNormals();
    return g;
  }, []);
}

function PetalRing({
  geo,
  count,
  tilt,
  scale,
  color,
  offset = 0,
}: {
  geo: THREE.ExtrudeGeometry;
  count: number;
  tilt: number;
  scale: number;
  color: string;
  offset?: number;
}) {
  const petals = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + offset;
    petals.push(
      <group key={i} rotation={[0, a, 0]}>
        <group rotation={[tilt, 0, 0]}>
          <mesh geometry={geo} scale={scale}>
            <meshStandardMaterial color={color} roughness={0.55} metalness={0} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    );
  }
  return <>{petals}</>;
}

/* One pale lotus, spinning slowly in place. */
function LotusModel({ geo }: { geo: THREE.ExtrudeGeometry }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.1;
  });
  return (
    <group ref={ref}>
      <PetalRing geo={geo} count={8} tilt={1.25} scale={1.15} color="#e2d6d1" offset={0} />
      <PetalRing geo={geo} count={8} tilt={0.9} scale={0.92} color="#ece2dd" offset={0.4} />
      <PetalRing geo={geo} count={6} tilt={0.55} scale={0.68} color="#f4ece8" offset={0.2} />
      <mesh position={[0, 0.15, 0]} scale={[0.32, 0.18, 0.32]}>
        <sphereGeometry args={[0.6, 20, 14]} />
        <meshStandardMaterial color="#e7d7bd" roughness={0.7} />
      </mesh>
    </group>
  );
}

/* Thin concentric ripple rings on the water surface. */
function RippleRings({ count = 3, base = 1.1, gap = 0.5 }: { count?: number; base?: number; gap?: number }) {
  const rings = [];
  for (let i = 0; i < count; i++) {
    const r = base + i * gap;
    rings.push(
      <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[r, r + 0.018, 96]} />
        <meshBasicMaterial color="#aaa191" transparent opacity={Math.max(0.08, 0.34 - i * 0.08)} side={THREE.DoubleSide} />
      </mesh>
    );
  }
  return <>{rings}</>;
}

const LOTUSES: { pos: [number, number, number]; s: number; ripples: { count: number; base: number; gap: number } }[] = [
  { pos: [0, 0, 0], s: 1.0, ripples: { count: 3, base: 1.35, gap: 0.85 } },
  { pos: [0.5, 0, 2.6], s: 0.62, ripples: { count: 3, base: 0.9, gap: 0.45 } },
  { pos: [-0.5, 0, -2.8], s: 0.38, ripples: { count: 2, base: 0.6, gap: 0.32 } },
  { pos: [-3.6, 0, 1.0], s: 0.44, ripples: { count: 3, base: 0.7, gap: 0.36 } },
  { pos: [3.4, 0, -0.7], s: 0.4, ripples: { count: 2, base: 0.72, gap: 0.36 } },
];

function Pond() {
  const geo = usePetalGeometry();
  return (
    <group position={[0, 0, 0]}>
      {LOTUSES.map((l, i) => (
        <group key={i} position={l.pos}>
          <group scale={l.s}>
            <LotusModel geo={geo} />
          </group>
          <group position={[0, -0.05, 0]}>
            <RippleRings {...l.ripples} />
          </group>
        </group>
      ))}
      {/* a ripple-only spot, for calm asymmetry */}
      <group position={[-3.9, -0.05, -1.5]}>
        <RippleRings count={3} base={0.45} gap={0.34} />
      </group>
    </group>
  );
}

export default function Lotus3D() {
  return (
    <Canvas
      camera={{ position: [0, 6, 7.6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 8, 4]} intensity={0.8} />
      <directionalLight position={[-3, 3, -2]} intensity={0.3} color="#d8c4ff" />

      <Pond />

      <ContactShadows position={[0, -0.16, 0]} opacity={0.12} scale={16} blur={3.2} far={4} color="#5f5440" />

      <Environment resolution={128}>
        <Lightformer form="rect" intensity={1.3} position={[2, 4, 2]} scale={[6, 6, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={0.8} position={[-3, 3, 1]} scale={[4, 5, 1]} color="#ffeede" />
      </Environment>
    </Canvas>
  );
}
