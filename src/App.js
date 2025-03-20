import '@mediapipe/tasks-vision';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import { Suspense } from 'react';

function Soldier({ animationName, position }) {
    const { scene, animations } = useGLTF('/Soldier.glb');
    const { actions } = useAnimations(animations, scene);

    actions[animationName]?.play();

    return <primitive object={scene} position={position} scale={[1.5, 1.5, 1.5]} />;
}

function App() {
    return (
        <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <Suspense fallback={null}>
                <Soldier animationName="Idle" position={[-3, 0, 0]} />
                <Soldier animationName="Walk" position={[0, 0, 0]} />
                <Soldier animationName="Run" position={[3, 0, 0]} />
            </Suspense>

            <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="gray" />
            </mesh>

            <OrbitControls />
        </Canvas>
    );
}

export default App;
