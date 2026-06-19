import { lazy, Suspense, useState, useEffect } from 'react'
import { useScroll, useSpring, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollToTop from './components/ScrollToTop'
import MobileCTA from './components/MobileCTA'
import CookieBanner from './components/CookieBanner'
import CursorTrail from './components/CursorTrail'
import MastersPage from './pages/MastersPage'
import AdminPage from './pages/AdminPage'

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #009C3B 0%, #FFDF00 50%, #009C3B 100%)',
      }}
    />
  )
}

const About = lazy(() => import('./components/About'))
const School = lazy(() => import('./components/School'))
const ForWhom = lazy(() => import('./components/ForWhom'))
const Schedule = lazy(() => import('./components/Schedule'))
const Pricing = lazy(() => import('./components/Pricing'))
const Directions = lazy(() => import('./components/Directions'))
const Gallery = lazy(() => import('./components/Gallery'))
const History = lazy(() => import('./components/History'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-brazil-green border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash
    if (hash === '#/masters') return 'masters'
    if (hash === '#/admin') return 'admin'
    return 'main'
  })

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash
      if (hash === '#/masters') setPage('masters')
      else if (hash === '#/admin') setPage('admin')
      else setPage('main')
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  if (page === 'masters') return <MastersPage />
  if (page === 'admin') return <AdminPage />

  return (
    <div className="overflow-x-hidden">
      <ScrollProgressBar />
      <CursorTrail />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
          <School />
          <ForWhom />
          <Schedule />
          <Pricing />
          <Directions />
          <Gallery />
          <History />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <ScrollToTop />
      <MobileCTA />
      {/* 152-ФЗ: Cookie consent banner */}
      <CookieBanner />
    </div>
  )
}
