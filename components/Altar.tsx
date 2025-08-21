"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Elegant light orb - minimalist alternative to candles */
function LightOrb({ position }: { position: [number, number, number] }) {
  const orbRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  
  useFrame(() => {
    if (orbRef.current && glowRef.current) {
      // Gentle pulsing glow
      const pulse = Math.sin(Date.now() * 0.003) * 0.1 + 0.9;
      orbRef.current.scale.setScalar(pulse);
      glowRef.current.scale.setScalar(pulse * 1.5);
      
      // Subtle floating
      orbRef.current.position.y = position[1] + Math.sin(Date.now() * 0.002) * 0.02;
      glowRef.current.position.y = position[1] + Math.sin(Date.now() * 0.002) * 0.02;
    }
  });

  return (
    <group position={position}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.08, 16, 12]} />
        <meshBasicMaterial 
          color="#c9a64b" 
          transparent 
          opacity={0.15}
        />
      </mesh>
      
      {/* Core light orb */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.04, 16, 12]} />
        <meshPhysicalMaterial 
          color="#c9a64b"
          emissive="#c9a64b"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>
      
      {/* Point light */}
      <pointLight 
        position={[0, 0, 0]} 
        color="#c9a64b" 
        intensity={0.4} 
        distance={3} 
      />
    </group>
  );
}

/** Clean, professional altar structure */
function AltarBase() {
  return (
    <group>
      {/* Main altar pedestal - cylindrical for elegance */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.8, 1.0, 0.8, 32]} />
        <meshPhysicalMaterial 
          color="#f8f8f8"
          roughness={0.1}
          metalness={0.05}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Altar platform - clean circular top */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.12, 64]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          roughness={0.05}
          metalness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
        />
      </mesh>
      
      {/* Subtle ring detail */}
      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[1.0, 0.02, 8, 64]} />
        <meshPhysicalMaterial 
          color="#c9a64b"
          roughness={0.1}
          metalness={0.8}
          clearcoat={0.9}
          emissive="#c9a64b"
          emissiveIntensity={0.1}
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
      // Very gentle floating animation - more subtle
      groupRef.current.position.y = Math.sin(Date.now() * 0.0008) * 0.03;
      
      // Smooth rotation for ethereal feel
      groupRef.current.rotation.y += delta * 0.1;
      
      // Fade in/out animation
      const targetOpacity = visible ? 1 : 0;
      if (groupRef.current.children) {
        groupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const material = child.material as THREE.MeshPhysicalMaterial;
            if (material.opacity !== undefined) {
              material.opacity = THREE.MathUtils.lerp(
                material.opacity, 
                targetOpacity, 
                delta * 2
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
    <group ref={groupRef} position={[0, -0.8, -1.5]}>
      {/* Altar base */}
      <AltarBase />
      
      {/* Light orbs in elegant positions */}
      <LightOrb position={[0.7, 0.2, 0]} />
      <LightOrb position={[-0.7, 0.2, 0]} />
      <LightOrb position={[0, 0.2, 0.7]} />
      <LightOrb position={[0, 0.2, -0.7]} />
      
      {/* Central elevated orb */}
      <LightOrb position={[0, 0.4, 0]} />
      
      {/* Soft ambient light from altar */}
      <pointLight 
        position={[0, 1, 0]} 
        color="#ffffff" 
        intensity={0.6} 
        distance={5} 
      />
      
      {/* Golden accent light from above */}
      <spotLight 
        position={[0, 3, 0]} 
        target-position={[0, 0, 0]}
        color="#c9a64b" 
        intensity={0.8} 
        angle={0.4} 
        penumbra={0.9}
        castShadow
      />
    </group>
  );
}
