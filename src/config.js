/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — edit everything personal here.
 *  No need to touch component code to change names, copy or photos.
 * ─────────────────────────────────────────────────────────────
 */

export const HER_NAME = 'Riya' // ← change me

export const HERO = {
  eyebrow: 'A little corner of the internet, made just for you',
  title: `Happy Birthday, ${HER_NAME}`,
  subtitle: 'Scroll slowly. Every part of this was built with you in mind.',
}

export const JOURNEY = {
  eyebrow: 'Dr. in the making',
  title: 'To the girl who heals',
  paragraphs: [
    'Between the late-night Organon revisions, the endless Materia Medica, and those clinical postings that never seem to end — you keep showing up.',
    'BHMS isn\'t just a degree you\'re studying. It\'s the quiet promise that one day, someone will feel better because you cared enough to listen.',
    'I see how hard you work. I see the doubt on tough days and the spark when it finally clicks. I\'m proud of you — every single day.',
  ],
  stats: [
    { value: '∞', label: 'cups of chai' },
    { value: '1000s', label: 'pages turned' },
    { value: '1', label: 'future Dr.' },
  ],
}

/**
 * MEMORY GALLERY
 * Drop your photos into /public/memories/ and reference them here.
 * Placeholder images from picsum are used until you do.
 */
export const MEMORIES = [
  { src: 'memories/1.jpeg', caption: 'Where it all began', date: 'Day one' },
  { src: 'memories/2.jpeg', caption: 'That rainy evening', date: 'Monsoon' },
  { src: 'memories/3.jpeg', caption: 'Your first white coat', date: 'Proudest day' },
  { src: 'memories/4.jpeg', caption: 'Chai & chaos', date: 'Every Sunday' },
  { src: 'memories/5.jpeg', caption: 'Golden hour, golden you', date: 'Last summer' },
  { src: 'memories/6.jpeg', caption: 'Home is a person', date: 'Always' },
]

export const WISH = {
  eyebrow: 'One last thing',
  title: 'Make a wish',
  message:
    'You spend so much of your life caring for others. Today, let the world care for you. I love you — more than any words on a screen could hold.',
  buttonLabel: 'Tap to celebrate 🎂',
  afterClick: 'Happy Birthday, my love. Here\'s to every year ahead — together.',
  signature: '— Yours, always',
}
