import { getAsset } from '../utils/assets'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Swords, Music, Users, Zap } from 'lucide-react'

const features = [
  { icon: Swords, title: 'Боевое искусство', description: 'Удары, уходы, подсечки и акробатические элементы', color: 'from-brazil-green/20 to-brazil-green/5' },
  { icon: Music,  title: 'Музыка',           description: 'Беримбау, атабак, песни на португальском', color: 'from-brazil-yellow/20 to-brazil-yellow/5' },
  { icon: Users,  title: 'Сообщество',       description: 'Дружная семья единомышленников', color: 'from-brazil-green/20 to-brazil-green/5' },
  { icon: Zap,    title: 'Энергия',          description: 'Движение, свобода и радость в каждом занятии', color: 'from-brazil-yellow/20 to-brazil-yellow/5' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding bg-white noise-overlay" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-brazil-green/10 text-brazil-green text-sm font-semibold rounded-full mb-4 tracking-wide">
                О капоэйре
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-brazil-dark mb-6">
                Что такое <span className="gradient-text">капоэйра?</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed"
            >
              <p>
                <strong className="text-brazil-dark">Капоэйра (Capoeira)</strong> — бразильское боевое
                искусство, сочетающее боевую технику, элементы танца, музыку и акробатику.
              </p>
              <p>
                Это не просто спорт — это целая культура, где сила встречается с грацией,
                а боевой дух — с радостью игры.
              </p>
              <p>
                Хотите стать сильным и выносливым, развить чувство равновесия и ритма,
                узнать о традициях Бразилии, научиться играть на бразильских инструментах
                и узнать основы португальского языка?
              </p>
              <p className="font-semibold text-brazil-green text-xl">Приходите!</p>
            </motion.div>

            {/* === PREMIUM feature cards: gradient bg + glow on hover === */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-3 mt-8"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="glow-card p-4 rounded-xl cursor-default group relative overflow-hidden border border-gray-100"
                >
                  {/* Gradient bg that reveals on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                  {/* Shimmer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  </div>
                  <div className="relative z-10">
                    <feature.icon size={24} className="text-brazil-green mb-2 group-hover:scale-110 group-hover:text-brazil-green-dark transition-transform duration-300" />
                    <h3 className="font-semibold text-brazil-dark text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image + floating elements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Decorative glow behind image */}
            <div className="absolute inset-4 bg-brazil-green/10 rounded-3xl blur-3xl" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/32418072/pexels-photo-32418072.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Игра в роде — капоэйра"
                className="w-full h-[400px] md:h-[500px] object-cover"
                loading="lazy"
              />
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-brazil-green/30 to-transparent" />
              {/* Bottom text overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white/80 text-xs tracking-widest uppercase font-semibold">Roda de Capoeira</p>
              </div>
            </div>

            {/* Floating: real logo — premium glass style */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 md:-left-10 rounded-2xl shadow-xl p-3 border border-white/60"
              style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <img src={getAsset("logo.png")} alt="FGR" className="w-16 h-16 object-contain" />
            </motion.div>

            {/* Floating: "5 стран" badge */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 md:-right-8 rounded-2xl shadow-xl p-4 md:p-6 animate-glow-pulse"
              style={{
                background: 'linear-gradient(135deg, #FFDF00, #FFD700)',
                boxShadow: '0 8px 32px rgba(255,223,0,0.35)',
              }}
            >
              <div className="text-3xl md:text-4xl font-heading font-black text-brazil-dark">5</div>
              <div className="text-sm text-brazil-dark/70 font-medium">стран мира</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
