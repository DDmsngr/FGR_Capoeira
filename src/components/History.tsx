import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Globe, Calendar, Heart } from 'lucide-react'

const countries = [
  { name: 'Бразилия', code: 'br' },
  { name: 'Россия',   code: 'ru' },
  { name: 'Ангола',   code: 'ao' },
  { name: 'Казахстан', code: 'kz' },
  { name: 'Турция',   code: 'tr' },
]

export default function History() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="history" className="section-padding text-white relative overflow-hidden noise-overlay" ref={ref}
      style={{ background: '#0a0a0a' }}
    >
      {/* === GRADIENT MESH BACKGROUND === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep green blob — top left */}
        <div
          className="absolute rounded-full animate-blob-1 will-change-transform"
          style={{
            width: 700,
            height: 700,
            top: '-20%',
            left: '-15%',
            background: 'radial-gradient(circle, rgba(0,100,0,0.35) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Gold blob — bottom right */}
        <div
          className="absolute rounded-full animate-blob-2 will-change-transform"
          style={{
            width: 600,
            height: 600,
            bottom: '-20%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(180,130,0,0.25) 0%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Mid green — center */}
        <div
          className="absolute rounded-full animate-blob-3 will-change-transform"
          style={{
            width: 400,
            height: 400,
            top: '30%',
            left: '40%',
            background: 'radial-gradient(circle, rgba(0,156,59,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-brazil-green/20 text-brazil-green text-sm font-semibold rounded-full mb-4 tracking-wide border border-brazil-green/20">
                О школе
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl mb-6">
                Familia Ginga
                <br />
                {/* Animated yellow gradient text */}
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
                  e Raça
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-white/75 text-base md:text-lg leading-relaxed"
            >
              <p>
                Международная школа капоэйры с более чем{' '}
                <strong className="text-white">30-летней историей</strong>.
              </p>
              <p>
                FGR объединяет практиков капоэйры на нескольких континентах. Наша философия —
                это не просто движения, это особый стиль, энергия и братство.
              </p>
              <p>
                Мы сохраняем традиции капоэйры, передавая их новым поколениям,
                и создаём пространство для роста каждого ученика.
              </p>
            </motion.div>

            {/* Stats — glass cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              {[
                { icon: Calendar, value: '30+', label: 'лет истории' },
                { icon: Globe, value: '5', label: 'стран' },
                { icon: Heart, value: '∞', label: 'энергии' },
              ].map(({ icon: Icon, value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-center p-4 rounded-2xl glass-card shimmer group hover:border-white/25 transition-all duration-300"
                >
                  <Icon className="mx-auto text-brazil-yellow mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <div className="text-2xl font-heading font-black text-white">{value}</div>
                  <div className="text-xs text-white/55 mt-0.5">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Countries panel — glass */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="rounded-3xl p-8 glass-card relative overflow-hidden">
              {/* Inner glow top */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <h3 className="font-heading font-bold text-xl mb-6 text-center tracking-wide">Мы в мире</h3>
              <div className="space-y-3">
                {countries.map((country, i) => (
                  <motion.div
                    key={country.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-4 p-3 rounded-xl transition-all duration-300 cursor-default group"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                  >
                    <img
                      src={`https://flagcdn.com/40x30/${country.code}.png`}
                      srcSet={`https://flagcdn.com/80x60/${country.code}.png 2x`}
                      width={40}
                      height={30}
                      alt={`Флаг: ${country.name}`}
                      className="rounded-sm object-cover shrink-0 shadow-md"
                      loading="lazy"
                    />
                    <span className="font-medium group-hover:text-white transition-colors">{country.name}</span>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-brazil-green rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-brazil-yellow rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                {/* Decorative quote mark */}
                <div className="text-5xl leading-none text-brazil-green/30 font-serif mb-2">"</div>
                <p className="text-white/55 text-sm italic leading-relaxed">
                  Капоэйра — это мой способ выражать себя, моя жизнь,
                  которую я проживаю каждый день.
                </p>
                <p className="text-brazil-yellow text-sm font-semibold mt-3 tracking-wide">— Mestre Jair</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
