import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MEMORIES } from '../config'

gsap.registerPlugin(ScrollTrigger)

/**
 * Gallery — 150vh section with a curved, 3D-looking carousel.
 *
 * How the curve works:
 *  • Each card is positioned at the centre of a "ring" and pushed outward
 *    with  rotateY(θ) translateZ(R)  — that places it on a cylinder.
 *  • The ring container rotates around Y as the user scrolls (GSAP scrub),
 *    so cards sweep past the viewer.
 *  • The section is 150vh; the inner stage is `sticky` so the carousel stays
 *    in view while the extra 50vh of scroll drives the rotation.
 *
 * Cards facing away are dimmed via a per-frame opacity update.
 */
export default function Gallery() {
  const sectionRef = useRef(null)
  const ringRef = useRef(null)
  const cardRefs = useRef([])

  const count = MEMORIES.length
  const step = 360 / count            // angle between cards
  const radius = 520                   // px — bigger = flatter curve

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    const ctx = gsap.context(() => {
      // Rotate the whole ring as the section scrolls by
      gsap.to(ring, {
        rotateY: -step * (count - 1),     // stop with the last card in front
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: updateCardOpacity,
        },
      })

      // Intro: cards fly in from the sides once
      gsap.from(cardRefs.current, {
        opacity: 0,
        scale: 0.6,
        stagger: 0.06,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }, sectionRef)

    updateCardOpacity()
    return () => ctx.revert()

    /**
     * Fade / shrink cards proportionally to how far they've rotated away
     * from the front-facing position (0°).
     */
    function updateCardOpacity() {
      const ringRot = gsap.getProperty(ring, 'rotateY') || 0
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        // angle of this card relative to the viewer, normalised to [-180, 180]
        let a = (i * step + ringRot) % 360
        if (a > 180) a -= 360
        if (a < -180) a += 360
        const t = Math.abs(a) / 180                // 0 = front, 1 = back
        card.style.opacity = String(1 - t * 0.85)
        card.style.filter = `blur(${t * 3}px) saturate(${1 - t * 0.5})`
      })
    }
  }, [count, step])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section relative"
      style={{ minHeight: '150vh' }}
    >
      {/* Sticky stage — stays pinned while the 150vh section scrolls */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          className="text-center mb-6 md:mb-10 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="eyebrow mb-3">Little moments, kept forever</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-glow">
            Our <span className="text-gradient italic">memories</span>
          </h2>
        </motion.div>

        {/* 3D viewport */}
        <div className="perspective-1200 w-full flex items-center justify-center">
          <div
            ref={ringRef}
            className="preserve-3d relative"
            style={{ width: 260, height: 360 }}
          >
            {MEMORIES.map((m, i) => (
              <figure
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                className="glass absolute inset-0 overflow-hidden group"
                style={{
                  transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                  transition: 'opacity 0.2s linear',
                }}
              >
                <img
                  src={m.src}
                  alt={m.caption}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable={false}
                />
                {/* Gradient overlay for caption legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent" />
                <figcaption className="absolute bottom-0 inset-x-0 p-5">
                  <span className="block text-[10px] tracking-[0.3em] uppercase text-rose/80 mb-1">
                    {m.date}
                  </span>
                  <span className="font-display text-lg leading-snug">{m.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="mt-8 text-[10px] tracking-[0.35em] uppercase text-white/35 relative z-20">
          keep scrolling to turn the pages
        </p>
      </div>
    </section>
  )
}