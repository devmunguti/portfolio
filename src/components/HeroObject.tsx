"use client";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

export default function HeroObject() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]} aria-hidden>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 4]} intensity={1.8} color="#E8EDF5" />
      <pointLight position={[-3, -2, 2]} intensity={1.2} color="#FFD9CE" />
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.25, 32]} />
          <MeshDistortMaterial
            color="#C7D7EC"
            distort={0.38}
            speed={1.5}
            roughness={0.25}
            metalness={0.15}
            clearcoat={0.6}
            clearcoatRoughness={0.15}
          />
        </mesh>
      </Float>
    </Canvas>
  );
}
