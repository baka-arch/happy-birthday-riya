/**
 * App — page shell.
 *
 * <Scene> sits fixed to the viewport and stays alive the entire
 * scroll.  HTML content is layered on top via z-index so scrolling
 * happens naturally over the 3D scene.
 *
 * Sections are deliberately 100vh (or 150vh for Gallery) so each
 * one fills the screen and ScrollTrigger in Scene.jsx has room
 * to drive the camera through the whole journey.
 */
import Scene from './three/Scene'
import Hero from './sections/Hero'
import Journey from './sections/Journey'
import Gallery from './sections/Gallery'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div id="page">
      {/* Fixed 3D canvas — pointer-events: none lets clicks fall through */}
      <Scene />

      {/* Scrollable HTML overlay */}
      <main className="relative z-10 pointer-events-auto">
        <Hero />
        <Journey />
        <Gallery />
        <Footer />
      </main>
    </div>
  )
}


