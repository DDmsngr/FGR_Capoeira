import { getAsset } from '../utils/assets'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef, type MouseEvent } from 'react'
import { Swords, Music, Users, Zap } from 'lucide-react'
import { aboutContent, aboutStats } from '../data/content'
import { renderRichText } from '../utils/richText'

const featureIcons = [Swords, Music, Users, Zap]
const featureColors = [
  'from-brazil-green/20 to-brazil-green/5',
  'from-brazil-yellow/20 to-brazil-yellow/5',
  'from-brazil-green/20 to-brazil-green/5',
  'from-brazil-yellow/20 to-brazil-yellow/5',
]

const features = aboutContent.features.map((f, i) => ({
  icon: featureIcons[i % featureIcons.length],
  title: f.title,
  description: f.description,
  color: featureColors[i % featureColors.length],
}))

function TiltCard({ feature, index, isInView }: {
  feature: typeof features[0]
  index: number
  isInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 200, damping: 20 })
  const y = useSpring(rawY, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0) }}
      style={{ rotateX, rotateY, transformPerspective: 700, transformStyle: 'preserve-3d' }}
      className="glow-card p-4 rounded-xl cursor-default group relative overflow-hidden border border-gray-100"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
      </div>
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <feature.icon size={24} className="text-brazil-green mb-2 group-hover:scale-110 group-hover:text-brazil-green-dark transition-transform duration-300" />
        <h3 className="font-semibold text-brazil-dark text-sm mb-1">{feature.title}</h3>
        <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">{feature.description}</p>
      </div>
    </motion.div>
  )
}

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
                {aboutContent.tagline}
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-brazil-dark mb-6">
                {aboutContent.title.split(aboutContent.subtitle)[0]}
                <span className="gradient-text">{aboutContent.subtitle}</span>
                {aboutContent.title.split(aboutContent.subtitle)[1] || ''}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed"
            >
              <p>{renderRichText(aboutContent.intro, 'text-brazil-dark')}</p>
              <p>{aboutContent.description1}</p>
              <p>{aboutContent.description2}</p>
              <p className="font-semibold text-brazil-green text-xl">{aboutContent.cta}</p>
            </motion.div>

            {/* === PREMIUM feature cards: gradient bg + glow on hover === */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-3 mt-8"
            >
              {features.map((feature, i) => (
                <TiltCard key={feature.title} feature={feature} index={i} isInView={isInView} />
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
                src={aboutContent.imageUrl}
                alt={aboutContent.imageAlt}
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
              <div className="text-3xl md:text-4xl font-heading font-black text-brazil-dark">{aboutStats.number}</div>
              <div className="text-sm text-brazil-dark/70 font-medium">{aboutStats.label}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
