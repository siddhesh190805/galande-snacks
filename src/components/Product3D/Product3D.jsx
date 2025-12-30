import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    Float,
    Environment,
    MeshTransmissionMaterial,
    Text,
    PerspectiveCamera,
    OrbitControls
} from '@react-three/drei';
import * as THREE from 'three';
import './Product3D.css';

// 3D Product Bag Mesh
function ProductBag({ color = '#8B4513', name = 'Product', rotation = [0, 0, 0] }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Auto-rotate animation
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    // Create gradient-like material
    const gradientColor = useMemo(() => new THREE.Color(color), [color]);
    const lighterColor = useMemo(() => {
        const c = new THREE.Color(color);
        c.offsetHSL(0, 0, 0.2);
        return c;
    }, [color]);

    return (
        <group ref={meshRef} rotation={rotation}>
            {/* Main bag body */}
            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.05 : 1}
            >
                <boxGeometry args={[2, 2.8, 0.6]} />
                <meshPhysicalMaterial
                    color={gradientColor}
                    metalness={0.1}
                    roughness={0.3}
                    clearcoat={0.8}
                    clearcoatRoughness={0.2}
                    envMapIntensity={1.5}
                />
            </mesh>

            {/* Bag top fold */}
            <mesh position={[0, 1.6, 0]}>
                <boxGeometry args={[2.1, 0.4, 0.7]} />
                <meshPhysicalMaterial
                    color={lighterColor}
                    metalness={0.1}
                    roughness={0.4}
                />
            </mesh>

            {/* Shiny accent strip */}
            <mesh position={[0, 0, 0.31]}>
                <planeGeometry args={[1.8, 2.4]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Neon glow ring */}
            <mesh position={[0, 0, 0.35]} rotation={[0, 0, Math.PI / 4]}>
                <ringGeometry args={[0.6, 0.65, 32]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} />
            </mesh>
        </group>
    );
}

// Floating particles around the product
function FloatingParticles({ color = '#8B4513', count = 20 }) {
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const radius = 2 + Math.random() * 2;
            temp.push({
                position: [
                    Math.cos(theta) * radius,
                    (Math.random() - 0.5) * 3,
                    Math.sin(theta) * radius
                ],
                scale: 0.05 + Math.random() * 0.15,
                speed: 0.2 + Math.random() * 0.5,
                offset: Math.random() * Math.PI * 2
            });
        }
        return temp;
    }, [count]);

    return (
        <group>
            {particles.map((particle, i) => (
                <FloatingParticle key={i} {...particle} color={color} />
            ))}
        </group>
    );
}

function FloatingParticle({ position, scale, speed, offset, color }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.5;
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
                color={color}
                metalness={0.3}
                roughness={0.4}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
}

// Glowing orb effect
function GlowOrb({ color = '#00f0ff', position = [0, 0, -2] }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.15} />
        </mesh>
    );
}

// Main Product3D Component
export default function Product3D({
    product = null,
    color = '#8B4513',
    name = 'Product',
    interactive = true,
    showParticles = true,
    className = ''
}) {
    const productColor = product?.color || color;
    const productName = product?.name || name;

    return (
        <div className={`product-3d-container ${className}`}>
            <Canvas
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />

                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00f0ff" />
                <pointLight position={[5, -5, 5]} intensity={0.3} color="#bf00ff" />

                {/* Environment for reflections */}
                <Environment preset="city" />

                {/* Glow background */}
                <GlowOrb color={productColor} />

                {/* Main product with floating animation */}
                <Float
                    speed={2}
                    rotationIntensity={0.5}
                    floatIntensity={1}
                >
                    <ProductBag color={productColor} name={productName} />
                </Float>

                {/* Floating particles */}
                {showParticles && <FloatingParticles color={productColor} count={15} />}

                {/* Controls */}
                {interactive && (
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 1.5}
                        autoRotate={false}
                    />
                )}
            </Canvas>

            {/* Product name overlay */}
            <div className="product-3d-overlay">
                <span className="product-3d-brand">Galande</span>
                <span className="product-3d-name">{productName}</span>
            </div>
        </div>
    );
}
