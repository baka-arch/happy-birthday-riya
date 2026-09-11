import { motion } from 'framer-motion'
import { JOURNEY } from '../config'

/**
 * Journey — 100vh section honouring her BHMS grind.
 *
 * Layout: 2-column grid. Text is pinned to the LEFT column; the RIGHT
 * column is intentionally empty so the 3D model (driven by ScrollRig in
 * Scene.jsx) has room to rotate into view behind it.
 *
 * `whileInView` triggers the reveal when the section scrolls in.
 */

const reveal = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Journey() {
  return (
    <section
      id="journey"
      className="section min-h-screen flex items-center"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* ── LEFT: copy ─────────────────────────────────────── */}
        <div className="max-w-xl">
          <motion.p
            className="eyebrow mb-5"
            variants={reveal}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {JOURNEY.eyebrow}
          </motion.p>

          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-glow mb-8"
            variants={reveal}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {JOURNEY.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-gradient italic">
              {JOURNEY.title.split(' ').slice(-1)}
            </span>
          </motion.h2>

          <div className="space-y-5">
            {JOURNEY.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                className="text-white/70 text-base md:text-lg leading-relaxed font-light"
                variants={reveal}
                custom={2 + i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Glass stat chips */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            variants={reveal}
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {JOURNEY.stats.map((s) => (
              <div key={s.label} className="glass px-5 py-4 min-w-[120px]">
                <div className="font-display text-2xl md:text-3xl text-gradient">{s.value}</div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: intentionally empty — the 3D model lives here ── */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  )
}