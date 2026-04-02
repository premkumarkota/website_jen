"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OrbitalCluster() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.14;
    }
    if (ringARef.current) {
      ringARef.current.rotation.z = t * 0.2;
      ringARef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.z = -t * 0.16;
      ringBRef.current.rotation.y = Math.cos(t * 0.24) * 0.3;
    }
    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, index) => {
        const angle = t * (0.35 + index * 0.03) + index * 1.35;
        const radius = 1.65 + ((index % 3) * 0.22);
        child.position.x = Math.cos(angle) * radius;
        child.position.y = Math.sin(angle * 0.7) * 0.42;
        child.position.z = Math.sin(angle) * radius * 0.65;
      });
    }
  });


  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.05, 36, 36]} />
        <meshStandardMaterial
          color="#4F46E5"
          emissive="#4F46E5"
          emissiveIntensity={0.22}
          roughness={0.2}
          metalness={0.6}
          transparent
          opacity={0.18}
        />
      </mesh>

      <mesh ref={ringARef} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.95, 0.02, 12, 170]} />
        <meshStandardMaterial color="#6366F1" transparent opacity={0.35} />
      </mesh>

      <mesh ref={ringBRef} rotation={[Math.PI / 2.15, 0.4, 0]}>
        <torusGeometry args={[2.35, 0.018, 12, 170]} />
        <meshStandardMaterial color="#06B6D4" transparent opacity={0.28} />
      </mesh>

      <group ref={nodesRef}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.085, 12, 12]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#4F46E5" : "#06B6D4"}
              emissive={i % 2 === 0 ? "#4F46E5" : "#06B6D4"}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 3, 4]} intensity={0.95} color="#FFFFFF" />
      <pointLight position={[-4, 2, -3]} intensity={0.8} color="#6366F1" />
      <pointLight position={[0, -3, 2]} intensity={0.45} color="#06B6D4" />
      <OrbitalCluster />
    </Canvas>
  );
}
