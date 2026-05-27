import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Theater, Zap, RefreshCw, Swords,
  Music, Sparkles, Languages, Heart,
} from 'lucide-react'
import { directions } from '../data/locations'

const iconMap = {
  Theater, Zap, RefreshCw, Swords,
  Music, Sparkles, Languages, Heart,
} as const
type IconName = keyof typeof iconMap

// Подобранные тематические фото для верхнего баннера каждого направления
const directionImages: Record<string, string> = {
  'Capoeira Angola':        'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&q=70',
  'Capoeira Regional':      'https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?w=400&q=70',
  'Capoeira Contemporânea': 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&q=70',
  'Maculelê':               'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=70',
  'Музыкальные занятия':    'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=70',
  'Акробатика':             'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=70',
  'Португальский язык':     'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=70',
  'Samba de Roda':          'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&q=70',
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
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
                {/* Image strip */}
                {imgSrc && (
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={dir.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Icon overlay */}
                    <div className="absolute bottom-3 left-3 w-9 h-9 bg-white/90 rounded-lg flex items-center justify-center">
                      <Icon size={18} className="text-brazil-green" />
                    </div>
                  </div>
                )}
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
