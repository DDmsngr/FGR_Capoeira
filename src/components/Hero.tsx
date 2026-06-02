import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Play, CalendarCheck, MapPin } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useScramble } from '../hooks/useScramble'

const logoUrl = new URL('/logo.png', import.meta.url).href

// Чередование: Санкт-Петербург + капоэйра
const BG_IMAGES = [
  'https://images.pexels.com/photos/3573990/pexels-photo-3573990.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/31251238/pexels-photo-31251238.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/2069373/pexels-photo-2069373.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/28975498/pexels-photo-28975498.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/1128408/pexels-photo-1128408.jpeg?auto=compress&cs=tinysrgb&w=1920',
]

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false)
  const [bgIndex, setBgIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const id = setInterval(() => setBgIndex(i => (i + 1) % BG_IMAGES.length), 6000)
    return () => clearInterval(id)
  }, [])
  const line1 = useScramble('FAMILIA GINGA', 1300, 400)
  const line2 = useScramble('E RAÇA', 900, 1000)
  const { scrollY } = useScroll()
  // Parallax: bg moves at 0.4x scroll speed
  const bgY = useTransform(scrollY, [0, 600], [0, 240])
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0])
  const contentY = useTransform(scrollY, [0, 350], [0, -60])

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
      {/* === PARALLAX BACKGROUND SLIDESHOW === */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${BG_IMAGES[bgIndex]}')` }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-brazil-green/20 to-transparent pointer-events-none" />

      {/* === AURORA LAYER === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Green aurora band */}
        <motion.div
          style={{
            position: 'absolute',
            width: '160%',
            height: '55%',
            top: '15%',
            left: '-30%',
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,156,59,0.38) 40%, rgba(0,156,59,0.28) 60%, transparent 100%)',
            filter: 'blur(48px)',
          }}
          animate={{ y: [0, -45, 20, 0], x: [0, 35, -25, 0], scaleX: [1, 1.1, 0.94, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Yellow aurora band */}
        <motion.div
          style={{
            position: 'absolute',
            width: '150%',
            height: '45%',
            top: '2%',
            left: '-25%',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,223,0,0.22) 45%, rgba(255,223,0,0.16) 60%, transparent 100%)',
            filter: 'blur(65px)',
          }}
          animate={{ y: [0, 35, -28, 0], x: [0, -45, 25, 0], scaleX: [1, 0.9, 1.12, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Brazil blue deep accent */}
        <motion.div
          style={{
            position: 'absolute',
            width: '130%',
            height: '40%',
            bottom: '5%',
            left: '-15%',
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,39,118,0.2) 50%, transparent 100%)',
            filter: 'blur(55px)',
          }}
          animate={{ y: [0, -30, 42, 0], scaleX: [1, 1.14, 0.87, 1] }}
          transition={{ duration: 27, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

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

        {/* СПб-бейдж */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white/90 border border-white/20 bg-white/10 backdrop-blur-sm">
            <MapPin size={13} className="text-brazil-yellow" />
            Санкт-Петербургский филиал
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-4 text-shadow-lg tracking-tight"
        >
          {line1}
          <br />
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
            {line2}
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

      {/* === ST. PETERSBURG CITYSCAPE SILHOUETTE === */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[3]" aria-hidden="true">
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: 180, display: 'block' }}
        >
          <g fill="rgba(255,255,255,0.09)">
            {/* === МЕДНЫЙ ВСАДНИК === */}
            {/* Гром-камень */}
            <path d="M32,180 L32,152 C44,144 60,138 78,136 C92,134 108,137 120,143 C132,149 144,155 155,157 C164,159 174,157 180,152 L188,150 L188,180 Z" />
            {/* Лошадь и всадник */}
            <path d="M80,136 C82,126 86,116 93,108 C99,101 106,97 110,94 C108,86 107,78 110,71 C112,65 117,61 122,62 C127,63 130,69 128,75 C126,81 122,86 123,91 C129,87 136,86 140,90 C144,95 142,103 137,107 C132,111 125,111 120,109 C122,113 123,118 121,123 C119,128 114,132 109,134 L100,136 L88,137 Z" />

            {/* === РОСТРАЛЬНАЯ КОЛОННА === */}
            {/* Основание */}
            <path d="M230,180 L230,162 L248,162 L248,180 Z" />
            {/* Ствол */}
            <path d="M234,162 L234,108 L244,108 L244,162 Z" />
            {/* Носы кораблей (декор) */}
            <rect x="228" y="148" width="9" height="7" rx="2" />
            <rect x="241" y="140" width="9" height="7" rx="2" />
            <rect x="228" y="128" width="9" height="7" rx="2" />
            <rect x="241" y="120" width="9" height="7" rx="2" />
            {/* Огонь */}
            <path d="M234,108 L239,90 L244,108 Z" />

            {/* === ПЕТРОПАВЛОВСКАЯ КРЕПОСТЬ === */}
            {/* Стены с зубцами */}
            <path d="
              M278,180 L278,148
              L290,148 L290,136 L304,136 L304,148
              L318,148 L318,136 L332,136 L332,148
              L350,148 L350,136 L364,136 L364,148
              L382,148
              L382,110 L394,110 L394,98
              L394,98 L388,96 L388,80 L392,78 L392,64
              L394,62 L396,48 L398,32 L400,16 L401,6 L402,0 L403,0
              L404,6 L405,16 L407,32 L409,48 L411,62
              L413,64 L413,78 L417,80 L417,96 L411,98
              L411,110 L434,110
              L434,140 L450,140 L450,130 L464,130 L464,140
              L492,140 L492,130 L506,130 L506,140
              L534,140 L534,145 L562,145 L562,148 L576,148 L576,180 Z
            " />
            {/* Главная башня (Петровские ворота) */}
            <rect x="340" y="105" width="40" height="45" />

            {/* === ДВОРЦОВЫЙ МОСТ (разведён) === */}
            {/* Опоры */}
            <rect x="856" y="72" width="16" height="108" />
            <rect x="952" y="72" width="16" height="108" />
            {/* Шапки опор */}
            <rect x="848" y="66" width="32" height="10" />
            <rect x="944" y="66" width="32" height="10" />
            {/* Левый пролёт (поднят) */}
            <path d="M750,180 L790,180 L790,174 L868,72 L856,66 L792,174 L750,180 Z" />
            {/* Правый пролёт (поднят) */}
            <path d="M1024,180 L1064,180 L1064,174 L980,66 L968,72 L1056,174 L1024,180 Z" />
            {/* Проезжая часть между опорами */}
            <rect x="872" y="170" width="80" height="10" />

            {/* === ИСААКИЕВСКИЙ СОБОР === */}
            {/* Основной объём */}
            <rect x="1168" y="120" width="220" height="60" />
            {/* Колонны портика */}
            <rect x="1188" y="100" width="8" height="22" />
            <rect x="1204" y="100" width="8" height="22" />
            <rect x="1220" y="100" width="8" height="22" />
            <rect x="1236" y="100" width="8" height="22" />
            <rect x="1316" y="100" width="8" height="22" />
            <rect x="1332" y="100" width="8" height="22" />
            <rect x="1348" y="100" width="8" height="22" />
            <rect x="1364" y="100" width="8" height="22" />
            {/* Фронтон */}
            <polygon points="1180,100 1378,100 1278,82" />
            {/* Барабан */}
            <ellipse cx="1278" cy="96" rx="52" ry="16" />
            {/* Купол */}
            <path d="M1226,96 C1226,70 1250,50 1278,46 C1306,50 1330,70 1330,96 Z" />
            {/* Фонарь */}
            <rect x="1270" y="38" width="16" height="10" />
            <path d="M1270,38 C1274,28 1282,26 1286,38 Z" />
            {/* Крест */}
            <rect x="1276" y="18" width="4" height="12" />
            <rect x="1271" y="22" width="14" height="4" />
          </g>
        </svg>
      </div>

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
