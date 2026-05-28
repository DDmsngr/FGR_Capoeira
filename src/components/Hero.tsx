import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Play, CalendarCheck } from 'lucide-react'
import { useState, useRef } from 'react'

const logoUrl = new URL('/logo.png', import.meta.url).href

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  // Parallax: bg moves at 0.4x scroll speed
  const bgY = useTransform(scrollY, [0, 600], [0, 240])
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0])
  const contentY = useTransform(scrollY, [0, 350], [0, -60])

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
      {/* === PARALLAX BACKGROUND === */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/31251238/pexels-photo-31251238.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-brazil-green/20 to-transparent pointer-events-none" />

      {/* === ANIMATED GRADIENT MESH BLOBS === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Green blob top-left */}
        <div
          className="absolute rounded-full animate-blob-1 will-change-transform"
          style={{
            width: 600,
            height: 600,
            top: '-10%',
            left: '-5%',
            background: 'radial-gradient(circle, rgba(0,156,59,0.22) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Yellow blob bottom-right */}
        <div
          className="absolute rounded-full animate-blob-2 will-change-transform"
          style={{
            width: 700,
            height: 700,
            bottom: '-15%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(255,223,0,0.14) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Small green blob center */}
        <div
          className="absolute rounded-full animate-blob-3 will-change-transform"
          style={{
            width: 350,
            height: 350,
            top: '40%',
            left: '45%',
            background: 'radial-gradient(circle, rgba(0,156,59,0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Accent bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brazil-green to-brazil-yellow opacity-80 pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 2 === 0 ? 5 : 3,
              height: i % 2 === 0 ? 5 : 3,
              backgroundColor: i % 3 === 0 ? 'rgba(255,223,0,0.5)' : 'rgba(0,156,59,0.4)',
              left: `${8 + i * 9}%`,
              top: `${15 + (i % 4) * 18}%`,
            }}
            animate={{ y: [0, -35, 0], opacity: [0.2, 0.9, 0.2], scale: [1, 1.4, 1] }}
            transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* === CONTENT WITH FADE-OUT ON SCROLL === */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 container-custom px-4 sm:px-6 lg:px-8 text-center will-change-transform"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >
            {/* Premium glow ring behind logo */}
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-full animate-glow-pulse scale-110 opacity-60" />
              <img
                src={logoUrl}
                alt="Familia Ginga e Raça — логотип"
                className="w-28 h-28 md:w-40 md:h-40 mx-auto object-contain drop-shadow-2xl relative z-10"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-4 text-shadow-lg tracking-tight"
        >
          FAMILIA GINGA
          <br />
          {/* Animated gradient on yellow text */}
          <span
            className="animate-gradient-shift"
            style={{
              backgroundImage: 'linear-gradient(90deg, #FFDF00, #FFD700, #fff176, #FFDF00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 200%',
            }}
          >
            E RAÇA
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light mb-2 text-shadow"
        >
          Капоэйра в Санкт-Петербурге
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-white/65 mb-10 max-w-2xl mx-auto"
        >
          Международная школа капоэйры · 30 лет истории · Бразилия · Россия · Ангола · Казахстан · Турция
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contact" className="btn-primary text-base md:text-lg gap-2 shadow-[0_0_30px_rgba(255,223,0,0.25)] hover:shadow-[0_0_40px_rgba(255,223,0,0.45)]">
            <CalendarCheck size={20} />
            Записаться на бесплатное пробное
          </a>
          {/* Glassmorphism secondary button */}
          <a
            href="#about"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg text-white transition-all duration-300
              border border-white/20 hover:border-white/50
              bg-white/5 hover:bg-white/12
              backdrop-blur-sm
              hover:scale-105 active:scale-95"
          >
            Узнать больше
          </a>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => setShowVideo(true)}
          className="mt-10 inline-flex items-center gap-2 text-white/55 hover:text-white transition-colors group"
        >
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center
            group-hover:border-brazil-yellow group-hover:scale-110 transition-all
            bg-white/5 backdrop-blur-sm group-hover:bg-white/10">
            <Play size={18} className="ml-0.5" />
          </div>
          <span className="text-sm tracking-wide">Смотреть видео</span>
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/40 hover:text-white transition-colors flex flex-col items-center gap-1"
          aria-label="Прокрутите вниз"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase opacity-60">scroll</span>
          <ChevronDown size={28} />
        </motion.a>
      </motion.div>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-brazil-dark rounded-2xl overflow-hidden border border-white/10">
            <button onClick={() => setShowVideo(false)} className="absolute -top-12 right-0 text-white hover:text-brazil-yellow transition-colors text-sm font-medium">
              Закрыть ✕
            </button>
            <div className="w-full h-full flex items-center justify-center text-white/40">
              <div className="text-center">
                <Play size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-sm">Вставьте YouTube embed в Hero.tsx</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
