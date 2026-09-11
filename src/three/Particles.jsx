import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Particles — a slow-drifting cloud of glowing dust.
 *
 * Implementation notes:
 *  • One BufferGeometry + PointsMaterial → a single draw call, so even
 *    2000 particles are cheap.
 *  • Each particle gets a random "phase" so they don't bob in unison.
 *  • Positions are updated on the CPU in useFrame. For 2k points this is
 *    fine; if you go past ~10k, move the motion into a vertex shader.
 */
export default function Particles({ count = 1800, radius = 14 }) {
  const pointsRef = useRef()

  // Build positions + per-particle phase once
  const { positions, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // Spread points inside a flattened sphere so most are near the camera plane
      const r = radius * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      positions[i * 3 + 2] = r * Math.cos(phi) - 2
      phases[i] = Math.random() * Math.PI * 2
    }
    return { positions, phases }
  }, [count, radius])

  // Soft circular sprite so points look like glowing dust, not squares
  const sprite = useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.4, 'rgba(255,214,231,0.6)')
    g.addColorStop(1, 'rgba(179,136,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  useFrame((state) => {
    const pts = pointsRef.current
    if (!pts) return
    const t = state.clock.elapsedTime
    const pos = pts.geometry.attributes.position

    // Gentle vertical bob + slow orbit around Y
    for (let i = 0; i < count; i++) {
      const ph = phases[i]
      pos.array[i * 3 + 1] += Math.sin(t * 0.4 + ph) * 0.0015
    }
    pos.needsUpdate = true
    pts.rotation.y = t * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.09}
        sizeAttenuation
        transparent
        depthWrite={false}
        opacity={0.85}
        color="#e9d5ff"
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}