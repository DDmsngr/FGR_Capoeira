import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Theater, Zap,
  Music, Sparkles, Languages,
} from 'lucide-react'
import { directions } from '../data/locations'

const iconMap = {
  Theater, Zap,
  Music, Sparkles, Languages,
} as const
type IconName = keyof typeof iconMap

const directionImages: Record<string, string> = {
  'Capoeira':
    'https://images.pexels.com/photos/31251238/pexels-photo-31251238.jpeg?auto=compress&cs=tinysrgb&w=400',
  'Музыкальные занятия':
    'https://images.pexels.com/photos/37192943/pexels-photo-37192943.jpeg?auto=compress&cs=tinysrgb&w=400',
  'Танцы':
    'https://images.pexels.com/photos/26864611/pexels-photo-26864611.jpeg?auto=compress&cs=tinysrgb&w=400',
  'Акробатика':
    'https://images.pexels.com/photos/32418072/pexels-photo-32418072.jpeg?auto=compress&cs=tinysrgb&w=400',
  'Португальский язык':
    'https://images.pexels.com/photos/30495349/pexels-photo-30495349.jpeg?auto=compress&cs=tinysrgb&w=400',
}

export default function Directions() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="directions" className="section-padding bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-brazil-green/10 text-brazil-green text-sm font-semibold rounded-full mb-4">
            Направления
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-brazil-dark">
            Что мы <span className="gradient-text">практикуем</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Капоэйра — многогранное искусство, в котором каждый найдёт собственный путь
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
          {directions.map((dir, i) => {
            const Icon = iconMap[dir.icon as IconName] ?? Sparkles
            const imgSrc = directionImages[dir.title]
            return (
              <motion.div
                key={dir.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover cursor-default"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={dir.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-9 h-9 bg-white/95 rounded-lg flex items-center justify-center shadow">
                    <Icon size={18} className="text-brazil-green" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-base text-brazil-dark mb-1.5">{dir.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{dir.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
