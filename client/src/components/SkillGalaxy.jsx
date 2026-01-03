import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Html, Float } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// --- INDIVIDUAL PLANET COMPONENT ---
const Planet = ({ course, position, onClick }) => {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  // Randomize planet properties (size, color, speed)
  const size = useMemo(() => Math.random() * 0.5 + 0.8, []); 
  const color = useMemo(() => {
    const colors = ['#00c3ff', '#a855f7', '#10b981', '#f59e0b', '#ef4444'];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);
  const speed = useMemo(() => Math.random() * 0.01 + 0.002, []);

  // Rotate the planet every frame
  useFrame(() => {
    if (mesh.current) {
        mesh.current.rotation.y += speed;
        mesh.current.rotation.x += speed * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={position}>
        <mesh
          ref={mesh}
          onClick={() => onClick(course.courseId)}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
          onPointerOut={() => { document.body.style.cursor = 'default'; setHover(false); }}
          scale={hovered ? 1.2 : 1}
        >
          {/* Wireframe Planet Look */}
          <icosahedronGeometry args={[size, 1]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 2 : 0.5} 
            wireframe={true}
          />
        </mesh>

        {/* Inner Core (Solid) */}
        <mesh scale={size * 0.5}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="white" />
        </mesh>

        {/* Floating Label (HTML overlay) */}
        <Html distanceFactor={10}>
          <div 
            className={`pointer-events-none px-3 py-1 rounded bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-mono transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-60'}`}
            style={{ width: '150px', textAlign: 'center', transform: 'translate3d(-50%, -150%, 0)' }}
          >
            <div className="font-bold text-cyan-300">{course.title}</div>
            <div className="text-[10px] text-gray-400">{course.progress}% Complete</div>
          </div>
        </Html>
      </group>
    </Float>
  );
};

// --- MAIN GALAXY SCENE ---
const SkillGalaxy = ({ courses }) => {
  const navigate = useNavigate();

  // Generate random positions for planets
  const positions = useMemo(() => {
    return courses.map(() => [
      (Math.random() - 0.5) * 15, // X
      (Math.random() - 0.5) * 8,  // Y
      (Math.random() - 0.5) * 5   // Z
    ]);
  }, [courses]);

  return (
    <div className="w-full h-[500px] bg-black/20 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
      <div className="absolute top-4 left-4 z-10 bg-black/50 px-3 py-1 rounded text-xs font-mono text-cyan-400 border border-cyan-500/30">
        ✨ 3D INTERACTIVE MODE: Drag to Rotate • Scroll to Zoom
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {courses.map((course, i) => (
          <Planet 
            key={course.courseId} 
            course={course} 
            position={positions[i]} 
            onClick={(id) => navigate(`/course/${id}`)}
          />
        ))}

        <OrbitControls enablePan={false} minDistance={5} maxDistance={20} />
      </Canvas>
    </div>
  );
};

export default SkillGalaxy;