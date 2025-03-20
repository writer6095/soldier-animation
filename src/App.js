import '@mediapipe/tasks-vision';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import { Suspense } from 'react';

function Soldier({ animationName, position }) {
    const { scene, animations } = useGLTF('/Soldier.glb');
    const { actions } = useAnimations(animations, scene);

    // Ensure animation starts only after model is loaded
    if (actions[animationName]) {
        actions[animationName].reset().play();
    }

    return <primitive object={scene} position={position} scale={[1.5, 1.5, 1.5]} />;
}

function App() {
    return (
        <Canvas camera={{ position: [0, 2, 10] }}>
            {/* Lighting for better visibility */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <Suspense fallback={null}>
                {/* Three soldiers side by side */}
                <Soldier animationName="Idle" position={[-3, 0, 0]} />
                <Soldier animationName="Walk" position={[0, 0, 0]} />
                <Soldier animationName="Run" position={[3, 0, 0]} />
            </Suspense>

            <OrbitControls />
        </Canvas>
    );
}

export default App;
