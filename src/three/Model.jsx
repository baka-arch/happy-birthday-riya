import { forwardRef, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'

/**
 * Model — the hero 3D object in the centre of the scene.
 *
 * ┌──────────────────────────────────────────────────────────────┐
 * │  HOW TO SWAP IN YOUR OWN GLTF LATER                          │
 * │                                                              │
 * │  1. Put the file in /public/models/heart.glb                 │
 * │  2. Replace <PlaceholderGeometry /> with:                    │
 * │                                                              │
 * │       import { useGLTF } from '@react-three/drei'            │
 * │       const { scene } = useGLTF('/models/heart.glb')         │
 * │       return <primitive object={scene} scale={1.2} />        │
 * │                                                              │
 * │  3. (Optional) Preload:  useGLTF.preload('/models/heart.glb')│
 * │                                                              │
 * │  The outer <group ref> stays the same, so Scene.jsx's        │
 * │  GSAP ScrollTrigger animation keeps working untouched.       │
 * └──────────────────────────────────────────────────────────────┘
 *
 * The ref is forwarded to the outer <group> so Scene.jsx can drive
 * its rotation / position from scroll.
 */
const Model = forwardRef(function Model(props, ref) {
  const innerRef = useRef()

  // Idle motion, independent of scroll — keeps it alive when the user stops
  useFrame((state, delta) => {
    if (!innerRef.current) return
    innerRef.current.rotation.x += delta * 0.12
    innerRef.current.rotation.z += delta * 0.08
  })

  return (
    <group ref={ref} {...props}>
      {/* Float adds a subtle hover so the object never feels static */}
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <group ref={innerRef}>
          <PlaceholderGeometry />
        </group>
      </Float>
    </group>
  )
})

export default Model

/**
 * PlaceholderGeometry — a glassy TorusKnot.
 * Delete this component once you have a real GLTF model.
 */
function PlaceholderGeometry() {
  return (
    <mesh castShadow>
      <torusKnotGeometry args={[1, 0.32, 220, 32, 2, 3]} />
      {/* Transmission material = frosted glass look that catches the lights */}
      <MeshTransmissionMaterial
        backside
        samples={6}
        thickness={0.6}
        roughness={0.15}
        transmission={1}
        ior={1.4}
        chromaticAberration={0.06}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.4}
        temporalDistortion={0.1}
        color="#e2c8ff"
        attenuationColor="#ff8fb1"
        attenuationDistance={1.5}
      />
    </mesh>
  )
}