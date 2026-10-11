import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import About from './components/About';
import Beyond from './components/Beyond';
import Achievements from './components/Achievements';
import CaseStudies from './components/CaseStudies';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Loader from './components/Loader';
import Marquee from './components/Marquee';
import Navbar from './components/Navbar';
import Passion from './components/Passion';
import Projects from './components/Projects';
import ScrollProgress from './components/ScrollProgress';
import Skills from './components/Skills';
import Tools from './components/Tools';
import { ScrollTrigger } from './lib/gsap';
import { preloadHero } from './lib/heroAssets';
import type { HeroAssets } from './lib/heroAssets';
import { startLenis, stopLenis } from './lib/lenis';
import { prefersReducedMotion } from './lib/motion';

export default function App() {
  const [assets, setAssets] = useState<HeroAssets | null>(null);
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  // 1) Preload critical hero assets (with a graceful fallback)
  useEffect(() => {
    let alive = true;
    preloadHero((p) => alive && setProgress(p)).then((a) => alive && setAssets(a));
    return () => {
      alive = false;
    };
  }, []);

  // 2) Smooth scrolling (Lenis) once the page content exists
  useEffect(() => {
    if (!assets || prefersReducedMotion()) return;
    startLenis();
    return () => stopLenis();
  }, [assets]);

  // 3) Re-measure scroll positions once fonts are ready
  useEffect(() => {
    if (!assets) return;
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [assets]);

  const finishLoader = useCallback(() => setShowLoader(false), []);

  const onLoaderGone = () => {
    document.documentElement.classList.remove('is-loading');
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  };

  return (
    <MotionConfig reducedMotion="user">
      <a href="#about" className="skip-link">
        Skip to content
      </a>

      <AnimatePresence onExitComplete={onLoaderGone}>
        {showLoader && <Loader key="loader" progress={progress} ready={!!assets} onFinish={finishLoader} />}
      </AnimatePresence>

      {assets && (
        <>
          <Cursor />
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero assets={assets} />
            <About />
            <Marquee />
            <Passion />
            <Beyond />
            <Skills />
            <Projects />
            <CaseStudies />
            <Journey />
            <Tools />
            <Achievements />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </MotionConfig>
  );
}
