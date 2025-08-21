"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Simple candle with flame */
function Candle({ position }: { position: [number, number, number] }) {
  const flameRef = useRef<THREE.Mesh>(null!);
  
  useFrame((_, delta) => {
    if (flameRef.current) {
      // Subtle flame flicker
      flameRef.current.scale.y = 1 + Math.sin(Date.now() * 0.01) * 0.1;
      flameRef.current.position.y = position[1] + 0.6 + Math.sin(Date.now() * 0.008) * 0.02;
    }
  });

  return (
    <group position={position}>
      {/* Candle body */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
        <meshPhysicalMaterial 
          color="#f8f6f0" 
          roughness={0.3} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Flame */}
      <mesh ref={flameRef} position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.03, 8, 6]} />
        <meshBasicMaterial 
          color="#ffaa44" 
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Flame glow */}
      <pointLight 
        position={[0, 0.6, 0]} 
        color="#ffaa44" 
        intensity={0.5} 
        distance={2} 
      />
    </group>
  );
}

/** Sacred altar structure */
function AltarBase() {
  return (
    <group>
      {/* Main altar block */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[2.4, 0.6, 1.2]} />
        <meshPhysicalMaterial 
          color="#e8e6e0"
          roughness={0.4}
          metalness={0.1}
          clearcoat={0.3}
        />
      </mesh>
      
      {/* Altar top (slightly raised) */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2.6, 0.1, 1.4]} />
        <meshPhysicalMaterial 
          color="#f2f0ea"
          roughness={0.2}
          metalness={0.05}
          clearcoat={0.5}
        />
      </mesh>
      
      {/* Sacred symbol (simple cross indentation) */}
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.05]} />
        <meshPhysicalMaterial 
          color="#d4d2cc"
          roughness={0.6}
        />
      </mesh>
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[0.05, 0.02, 0.3]} />
        <meshPhysicalMaterial 
          color="#d4d2cc"
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}

/** Complete altar scene */
export default function Altar({ visible }: { visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
      
      // Fade in/out animation
      const targetOpacity = visible ? 1 : 0;
      if (groupRef.current.children) {
        groupRef.current.children.forEach((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const material = child.material as THREE.MeshPhysicalMaterial;
            if (material.opacity !== undefined) {
              material.opacity = THREE.MathUtils.lerp(
                material.opacity, 
                targetOpacity, 
                delta * 3
              );
              material.transparent = true;
            }
          }
        });
      }
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[0, -1, -1]}>
      {/* Altar base */}
      <AltarBase />
      
      {/* Candles */}
      <Candle position={[-0.8, 0.1, 0.3]} />
      <Candle position={[0.8, 0.1, 0.3]} />
      <Candle position={[-0.8, 0.1, -0.3]} />
      <Candle position={[0.8, 0.1, -0.3]} />
      
      {/* Soft ambient light from altar */}
      <pointLight 
        position={[0, 0.5, 0]} 
        color="#fff8e7" 
        intensity={0.8} 
        distance={4} 
      />
      
      {/* Golden accent light */}
      <spotLight 
        position={[0, 2, 1]} 
        target-position={[0, 0, 0]}
        color="#c9a64b" 
        intensity={0.6} 
        angle={0.6} 
        penumbra={0.8}
      />
    </group>
  );
}
