import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Sparkles, Stars } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Particles from './Particles'
import Model from './Model'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scene — the fixed, full-screen 3D background.
 *
 * Rendered once in App.jsx behind all HTML sections.
 * Everything scroll-related lives in <ScrollRig>, which is a child of
 * <Canvas> so it can access the R3F camera via useThree().
 */
export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 7], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Lighting — warm key + cool fill for a romantic two-tone rim */}
        <ambientLight intensity={0.4} />
        <spotLight position={[6, 8, 6]} intensity={40} color="#ffd6e7" angle={0.4} penumbra={1} />
        <pointLight position={[-6, -3, -4]} intensity={30} color="#b388ff" />
        <pointLight position={[0, 4, -6]} intensity={15} color="#ff8fb1" />

        <Suspense fallback={null}>
          {/* HDRI reflections make the glass material read as glass */}
          <Environment preset="night" />
          <ScrollRig />
          <Particles />
          <Sparkles count={120} scale={12} size={3} speed={0.3} color="#ffd479" opacity={0.5} />
          <Stars radius={60} depth={40} count={1500} factor={3} fade speed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}

/**
 * ScrollRig — binds camera + model transforms to the page scroll.
 *
 * A single GSAP timeline is scrubbed by ScrollTrigger over the whole
 * document. Each section gets a label so it's easy to tune:
 *
 *   Hero     → model centred, camera front-on
 *   Journey  → model slides RIGHT (text lives on the left)
 *   Gallery  → model recedes + drops behind the carousel
 *   Wish     → model returns to centre, camera pulls back for the finale
 *
 * Because targets are Three.js objects (camera.position, group.rotation)
 * GSAP mutates them directly — no React re-renders on scroll.
 */
function ScrollRig() {
  const modelRef = useRef()
  const { camera } = useThree()

  useEffect(() => {
    const model = modelRef.current
    if (!model) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#page',          // the scrolling wrapper in App.jsx
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,                // smooth, slightly laggy follow
        },
      })

      // ── Hero → Journey : slide model to the right, rotate
      tl.to(model.position, { x: 2.6, y: 0.2, z: 0, ease: 'power2.inOut', duration: 1 }, 0)
        .to(model.rotation, { y: Math.PI * 1.2, ease: 'none', duration: 1 }, 0)
        .to(camera.position, { x: -0.4, z: 6.5, ease: 'power2.inOut', duration: 1 }, 0)

      // ── Journey → Gallery : push model back and down, dim its presence
      tl.to(model.position, { x: 0, y: -1.2, z: -4, ease: 'power2.inOut', duration: 1.5 }, 1)
        .to(model.rotation, { y: Math.PI * 2.4, x: 0.6, ease: 'none', duration: 1.5 }, 1)
        .to(model.scale, { x: 0.7, y: 0.7, z: 0.7, ease: 'power2.inOut', duration: 1.5 }, 1)
        .to(camera.position, { x: 0, y: 0.6, z: 8, ease: 'power2.inOut', duration: 1.5 }, 1)

      // ── Gallery → Wish : bring it home for the finale
      tl.to(model.position, { x: 0, y: 0, z: 0, ease: 'power2.inOut', duration: 1 }, 2.5)
        .to(model.rotation, { y: Math.PI * 4, x: 0, ease: 'none', duration: 1 }, 2.5)
        .to(model.scale, { x: 1.15, y: 1.15, z: 1.15, ease: 'back.out(1.4)', duration: 1 }, 2.5)
        .to(camera.position, { x: 0, y: 0, z: 6, ease: 'power2.inOut', duration: 1 }, 2.5)
    })

    // Keep camera looking at the origin every frame — cheap and robust
    const onUpdate = () => camera.lookAt(0, 0, 0)
    gsap.ticker.add(onUpdate)

    return () => {
      ctx.revert()
      gsap.ticker.remove(onUpdate)
    }
  }, [camera])

  return <Model ref={modelRef} position={[0, 0, 0]} />
}