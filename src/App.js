import '@mediapipe/tasks-vision';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';

function Soldier({ animationName, position }) {
    const group = useRef();
    const { scene, animations } = useGLTF('/Soldier.glb');
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (actions[animationName]) {
            actions[animationName].reset().fadeIn(0.5).play();
        }
    }, [actions, animationName]);

    return <primitive ref={group} object={scene} position={position} scale={[1.5, 1.5, 1.5]} />;
}

function App() {
    return (
        <Canvas camera={{ position: [0, 1.5, 5] }}>
            {/* Lighting for improved model visibility */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <Suspense fallback={null}>
                {/* Three soldiers side by side */}
                <Soldier animationName="Idle" position={[-2.5, 0, 0]} />
                <Soldier animationName="Walk" position={[0, 0, 0]} />
                <Soldier animationName="Run" position={[2.5, 0, 0]} />
            </Suspense>

            <OrbitControls />
        </Canvas>
    );
}

export default App;