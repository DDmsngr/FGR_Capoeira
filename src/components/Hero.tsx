import { motion } from 'framer-motion'
import { ChevronDown, Play, CalendarCheck } from 'lucide-react'
import { useState } from 'react'

const logoUrl = new URL('/logo.png', import.meta.url).href

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Реальное фото капоэйры — выступление в Порто Сегуро, Бразилия */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/31251238/pexels-photo-31251238.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-brazil-green/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brazil-green via-brazil-yellow to-brazil-green opacity-70" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 2 === 0 ? 6 : 3,
              height: i % 2 === 0 ? 6 : 3,
              backgroundColor: i % 3 === 0 ? 'rgba(255,223,0,0.45)' : 'rgba(0,156,59,0.35)',
              left: `${10 + i * 11}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 4 + i * 0.8, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo — BASE_URL aware */}
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
            <img
              src={logoUrl}
              alt="Familia Ginga e Raça — логотип"
              className="w-28 h-28 md:w-40 md:h-40 mx-auto object-contain drop-shadow-2xl"
            />
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
          <span className="text-brazil-yellow">E RAÇA</span>
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
          className="text-sm sm:text-base md:text-lg text-white/70 mb-10 max-w-2xl mx-auto"
        >
          Международная школа капоэйры · 30 лет истории · Бразилия · Россия · Ангола · Казахстан · Турция
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contact" className="btn-primary text-base md:text-lg gap-2">
            <CalendarCheck size={20} />
            Записаться на бесплатное пробное
          </a>
          <a href="#about" className="btn-secondary text-base md:text-lg">
            Узнать больше
          </a>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => setShowVideo(true)}
          className="mt-10 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-brazil-yellow group-hover:scale-110 transition-all">
            <Play size={18} className="ml-0.5" />
          </div>
          <span className="text-sm">Смотреть видео</span>
        </motion.button>
      </div>

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
          className="text-white/50 hover:text-white transition-colors"
          aria-label="Прокрутите вниз"
        >
          <ChevronDown size={32} />
        </motion.a>
      </motion.div>

      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden">
            <button onClick={() => setShowVideo(false)} className="absolute -top-12 right-0 text-white hover:text-brazil-yellow transition-colors text-sm font-medium">
              Закрыть ✕
            </button>
            {/* Замените на: <iframe src="https://www.youtube.com/embed/VIDEO_ID" className="w-full h-full" allowFullScreen /> */}
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
