import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function School() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="school"
      ref={ref}
      className="section-padding relative overflow-hidden noise-overlay"
      style={{ background: '#080808' }}
    >
      {/* Gradient mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: 800, height: 800,
            top: '-25%', right: '-10%',
            background: 'radial-gradient(circle, rgba(0,156,59,0.18) 0%, transparent 65%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: 600, height: 600,
            bottom: '-20%', left: '-10%',
            background: 'radial-gradient(circle, rgba(180,130,0,0.14) 0%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-brazil-green/20 text-brazil-green text-sm font-semibold rounded-full mb-4 border border-brazil-green/20">
            История
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Санкт-Петербургский{' '}
            <span
              className="animate-gradient-shift"
              style={{
                backgroundImage: 'linear-gradient(90deg, #FFDF00, #FFD700, #fff9c4, #FFDF00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%',
              }}
            >
              филиал
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">Escola de Capoeira Familia Ginga e Raça</p>
        </motion.div>

        {/* History text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto space-y-5 text-white/70 text-base md:text-lg leading-relaxed text-center"
        >
          <p>
            Школа <strong className="text-white">Familia Ginga e Raça (FGR)</strong> — международное братство
            капоэйры с бразильскими корнями и более чем 30-летней историей. Основанная Mestre Jair'ом
            в традициях Angola и Regional, школа сегодня объединяет практиков в пяти странах: Бразилии,
            России, Анголе, Казахстане и Турции.
          </p>
          <p>
            <strong className="text-white">Санкт-Петербургский филиал</strong> открылся в начале 2000-х годов
            и за эти годы объединил сотни учеников — от детей 3 лет до взрослых 50+.
            FGR в Петербурге — это не просто спортивная секция, а живое сообщество,
            где традиция встречается с северным городом.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
