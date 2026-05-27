import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Baby, Dumbbell, ArrowRight } from 'lucide-react'

const cards = [
  {
    id: 'children',
    icon: Baby,
    title: 'Для детей',
    subtitle: '3–5 лет · 6–9 лет · 10–15 лет',
    description: 'Развитие координации, гибкости, дисциплины. Учимся работать в команде, преодолевать страхи, верить в себя. Яркие эмоции и настоящие друзья!',
    // Ребёнок делает мостик / акробатику
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=700&q=80',
    borderColor: 'border-brazil-yellow',
    cta: 'Записать ребёнка',
    ctaClass: 'bg-brazil-yellow text-brazil-dark hover:bg-brazil-gold',
  },
  {
    id: 'adults',
    icon: Dumbbell,
    title: 'Для взрослых',
    subtitle: 'Любой возраст и уровень подготовки',
    description: 'Необычный фитнес + боевое искусство + танец. Снимите стресс после работы, получите заряд энергии, научитесь владеть своим телом.',
    // Взрослые тренируются — бразильское боевое искусство
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=700&q=80',
    borderColor: 'border-brazil-green',
    cta: 'Записаться',
    ctaClass: 'bg-brazil-green text-white hover:bg-brazil-green-dark',
  },
]

export default function ForWhom() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="for-whom" className="section-padding bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-brazil-green/10 text-brazil-green text-sm font-semibold rounded-full mb-4">
            Для кого
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-brazil-dark">
            Капоэйра для <span className="gradient-text">каждого</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg card-hover border-2 ${card.borderColor}/20 hover:border-brazil-green/50 transition-colors`}
            >
              {/* Image */}
              <div className="relative h-60 md:h-72 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Icon badge */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <card.icon className="text-brazil-green" size={24} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-heading font-bold text-2xl text-brazil-dark mb-1">{card.title}</h3>
                <p className="text-brazil-green font-medium text-sm mb-3">{card.subtitle}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{card.description}</p>
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${card.ctaClass}`}
                >
                  {card.cta}
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
