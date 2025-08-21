"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/** Torus halo mesh */
function Ring({ color = "#0a0a0a" }) {
  const m = new THREE.MeshPhysicalMaterial({
    color, metalness: 1, roughness: 0.35, clearcoat: 0.9, clearcoatRoughness: 0.1,
    emissive: new THREE.Color(color), emissiveIntensity: 0.06
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
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight castShadow intensity={0.6} position={[3, 3, 5]} />
        <spotLight intensity={0.8} position={[-4, 6, 3]} angle={0.4} penumbra={0.7} />
        <Swimmer />
        <Environment preset="studio" />
        <ContactShadows position={[0, -2, 0]} opacity={0.18} blur={2.2} far={3.5} />
      </Canvas>
    </div>
  );
}
