import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { WISH } from '../config'

/**
 * Footer / Wish — 100vh finale.
 *
 * Clicking the button triggers a confetti burst via canvas-confetti.
 * The button label changes after the first click.
 */
export default function Footer() {
  const [triggered, setTriggered] = useState(false)

  const fire = () => {
    setTriggered(true)

    // Main burst
    confetti({
      particleCount: 180,
      spread: 110,
      origin: { y: 0.45 },
      colors: ['#ff8fb1', '#b388ff', '#ffd479', '#ffd6e7', '#e9d5ff'],
      zIndex: 9999,
    })

    // Two side cannons for a wider feel
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.6 },
      colors: ['#ff8fb1', '#b388ff', '#ffd479'],
      zIndex: 9999,
    })
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.6 },
      colors: ['#ff8fb1', '#b388ff', '#ffd479'],
      zIndex: 9999,
    })
  }

  return (
    <section
      id="wish"
      className="section min-h-screen flex flex-col items-center justify-center text-center"
    >
      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="eyebrow mb-5">{WISH.eyebrow}</p>

        <motion.h2
          className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-glow mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          {WISH.title}
        </motion.h2>

        <motion.p
          className="text-white/70 text-lg md:text-xl leading-relaxed font-light mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
        >
          {WISH.message}
        </motion.p>

        {/* Big glass pill button */}
        <motion.button
          onClick={fire}
          disabled={triggered}
          className="glass-pill px-10 py-4.5 text-base md:text-lg font-medium text-gradient-animated shadow-glow-rose transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          {triggered ? WISH.afterClick : WISH.buttonLabel}
        </motion.button>

        <motion.p
          className="mt-10 text-white/45 text-sm tracking-[0.15em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {WISH.signature}
        </motion.p>
      </motion.div>

      {/* Ambient floating particles that react to the click */}
      {triggered && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-20"
          initial="hidden"
          animate="visible"
          transition={{ duration: 2 }}
        >
          {[...Array(30)].map((_, i) => (
            <motion.span
              key={i}
              className="fixed w-1.5 h-1.5 rounded-full"
              style={{
                left: `${50 + (Math.random() - 0.5) * 40}%`,
                top: `${50 + (Math.random() - 0.5) * 40}%`,
                background: ['#ff8fb1', '#b388ff', '#ffd479'][i % 3],
                boxShadow: `0 0 12px ${['#ff8fb1', '#b388ff', '#ffd479'][i % 3]}`, 
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1, 0], opacity: [1, 1, 0] }}
              transition={{ duration: 1.8, delay: i * 0.02, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
      )}
    </section>
  )
}