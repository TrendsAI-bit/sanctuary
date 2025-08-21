"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/** Torus halo mesh */
function Ring({ color = "#c9a64b" }) {
  const m = new THREE.MeshPhysicalMaterial({
    color, metalness: 0.8, roughness: 0.2, clearcoat: 1.0, clearcoatRoughness: 0.1,
    emissive: new THREE.Color("#c9a64b"), emissiveIntensity: 0.15
  });
  return (
    <mesh castShadow receiveShadow>
      <torusGeometry args={[1.6, 0.28, 64, 256]} />
      <primitive object={m} attach="material" />
    </mesh>
  );
}

/** A group that slowly swims across the viewport in a gentle, holy drift */
function Swimmer({ speed = 0.6 }: { speed?: number }) {
  const g = useRef<THREE.Group>(null!);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta * speed;

    // Lissajous-like path
    const x = Math.sin(t.current * 0.8) * 1.8;
    const y = Math.cos(t.current * 0.5) * 0.9;

    g.current.position.set(x, y, 0);
    g.current.rotation.x += delta * 0.25;
    g.current.rotation.y += delta * 0.45;
  });

  return (
    <group ref={g}>
      <Ring />
    </group>
  );
}

export default function HaloField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight castShadow intensity={0.8} position={[5, 5, 5]} />
        <spotLight intensity={1.2} position={[-3, 4, 2]} angle={0.3} penumbra={0.8} color="#c9a64b" />
        <pointLight intensity={0.6} position={[2, -2, 3]} color="#ffffff" />
        <Swimmer />
        <Environment preset="sunset" />
        <ContactShadows position={[0, -2, 0]} opacity={0.25} blur={3} far={4} />
      </Canvas>
    </div>
  );
}
