import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Swords, Music, Users, Zap } from 'lucide-react'

const features = [
  { icon: Swords, title: 'Боевое искусство', description: 'Удары, уходы, подсечки и акробатические элементы' },
  { icon: Music,  title: 'Музыка',           description: 'Беримбау, атабак, песни на португальском' },
  { icon: Users,  title: 'Сообщество',       description: 'Дружная семья единомышленников' },
  { icon: Zap,    title: 'Энергия',          description: 'Движение, свобода и радость в каждом занятии' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-brazil-green/10 text-brazil-green text-sm font-semibold rounded-full mb-4">
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
                  className="p-4 bg-gray-50 rounded-xl hover:bg-brazil-green/5 transition-colors group cursor-default"
                >
                  <feature.icon size={24} className="text-brazil-green mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-brazil-dark text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image + floating logo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?w=800&q=80"
                alt="Игра в роде — капоэйра"
                className="w-full h-[400px] md:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brazil-green/30 to-transparent" />
            </div>

            {/* Floating: real logo */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 md:-left-10 bg-white rounded-2xl shadow-xl p-3"
            >
              <img src="/logo.png" alt="FGR" className="w-16 h-16 object-contain" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 md:-right-8 bg-brazil-yellow rounded-2xl shadow-xl p-4 md:p-6"
            >
              <div className="text-3xl md:text-4xl font-heading font-black text-brazil-dark">5</div>
              <div className="text-sm text-brazil-dark/70">стран мира</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
