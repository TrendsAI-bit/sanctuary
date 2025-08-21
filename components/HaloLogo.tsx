"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/** Standalone halo ring for logo */
function LogoRing() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      // Gentle rotation for the logo
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  const material = new THREE.MeshPhysicalMaterial({
    color: "#c9a64b",
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    emissive: new THREE.Color("#c9a64b"),
    emissiveIntensity: 0.3
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <torusGeometry args={[2.0, 0.35, 64, 256]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/** Logo component with transparent background */
export default function HaloLogo({ onCanvasReady }: { onCanvasReady?: (canvas: HTMLCanvasElement) => void }) {
  return (
    <div className="w-[500px] h-[500px] bg-transparent">
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ 
          preserveDrawingBuffer: true, 
          alpha: true,
          antialias: true 
        }}
        onCreated={({ gl }) => {
          if (onCanvasReady) {
            // Wait a moment for the scene to render
            setTimeout(() => onCanvasReady(gl.domElement), 1000);
          }
        }}
      >
        {/* Optimal lighting for logo */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          castShadow 
          intensity={1.2} 
          position={[5, 5, 5]} 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight 
          intensity={2.5} 
          position={[-3, 4, 2]} 
          angle={0.4} 
          penumbra={0.6} 
          color="#c9a64b" 
          castShadow
        />
        <pointLight 
          intensity={1.2} 
          position={[2, -2, 3]} 
          color="#ffffff" 
        />
        <pointLight 
          intensity={1.0} 
          position={[0, 0, 3]} 
          color="#c9a64b" 
        />
        
        <LogoRing />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
