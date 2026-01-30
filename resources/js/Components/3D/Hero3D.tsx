import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
    const mesh = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh
                ref={mesh}
                scale={hovered ? 2.2 : 1.8}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <MeshDistortMaterial
                    color={hovered ? '#0ea5e9' : '#4f46e5'}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-[-1]">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />

                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />

                <AnimatedSphere />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}
