import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollToTop from './components/ScrollToTop'
import MobileCTA from './components/MobileCTA'

const About = lazy(() => import('./components/About'))
const ForWhom = lazy(() => import('./components/ForWhom'))
const Schedule = lazy(() => import('./components/Schedule'))
const Directions = lazy(() => import('./components/Directions'))
const Pricing = lazy(() => import('./components/Pricing'))
const Gallery = lazy(() => import('./components/Gallery'))
const History = lazy(() => import('./components/History'))
const FAQ = lazy(() => import('./components/FAQ'))
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
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
          <ForWhom />
          <Schedule />
          <Directions />
          <Pricing />
          <Gallery />
          <History />
          <FAQ />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <ScrollToTop />
      <MobileCTA />
    </div>
  )
}
