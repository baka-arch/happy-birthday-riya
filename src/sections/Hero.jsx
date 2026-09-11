import { motion } from 'framer-motion'
import { HERO } from '../config'

/**
 * Hero — 100vh opening screen.
 *
 * The headline is split into words, each word into letters, and every
 * letter animates in with a stagger. Framer Motion's variant propagation
 * means we only define the timing once on the parent.
 */

// Parent controls the stagger timing for all children
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.4 },
  },
}

// Each letter rises + fades + un-blurs into place
const letter = {
  hidden: { opacity: 0, y: 40, rotateX: -60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 14, stiffness: 120 },
  },
}

// Simple fade-up used for the eyebrow, subtitle and scroll hint
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] } },
})

export default function Hero() {
  const words = HERO.title.split(' ')

  return (
    <section
      id="hero"
      className="section min-h-screen flex flex-col items-center justify-center text-center"
    >
      <motion.p
        className="eyebrow mb-8"
        variants={fadeUp(0)}
        initial="hidden"
        animate="visible"
      >
        {HERO.eyebrow}
      </motion.p>

      {/* Staggered headline */}
      <motion.h1
        className="font-display font-bold leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-glow perspective-1200"
        variants={container}
        initial="hidden"
        animate="visible"
        aria-label={HERO.title}
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0">
            {word.split('').map((ch, ci) => (
              <motion.span
                key={ci}
                variants={letter}
                className={`inline-block ${wi === words.length - 1 ? 'text-gradient-animated' : ''}`}
                style={{ transformOrigin: 'bottom center' }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h1>

      <motion.p
        className="mt-8 max-w-xl text-base md:text-lg text-white/65 font-light leading-relaxed"
        variants={fadeUp(1.6)}
        initial="hidden"
        animate="visible"
      >
        {HERO.subtitle}
      </motion.p>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-3 text-white/40"
        variants={fadeUp(2.2)}
        initial="hidden"
        animate="visible"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">scroll</span>
        <span className="block w-px h-12 bg-gradient-to-b from-rose/80 to-transparent animate-pulse-glow" />
      </motion.div>
    </section>
  )
}