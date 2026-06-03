import { getAsset } from '../utils/assets'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Gift, Users, CreditCard, ArrowRight } from 'lucide-react'

const included = [
  'Все тренировки в зале',
  'Участие в Roda',
  'Музыкальные занятия',
]

const benefits = [
  { icon: Gift,       label: 'Пробное бесплатно', sub: 'Первое занятие' },
  { icon: Users,      label: 'Семейные скидки',   sub: 'Уточняйте' },
  { icon: CreditCard, label: 'Удобная оплата',     sub: 'Наличные / Перевод' },
]

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="prices" className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-brazil-green/10 text-brazil-green text-sm font-semibold rounded-full mb-4">
            Цены
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-brazil-dark">
            Стоимость <span className="gradient-text">занятий</span>
          </h2>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-gradient-to-br from-brazil-green to-brazil-green-dark rounded-3xl p-8 md:p-10 text-white shadow-2xl shadow-brazil-green/20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            {/* Logo watermark */}
            <img
              src={getAsset("logo.png")}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 w-32 h-32 object-contain opacity-10 pointer-events-none"
            />

            <div className="relative">
              <div className="text-center mb-8">
                <p className="text-white/80 text-sm font-medium mb-2">Абонемент на месяц</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl md:text-6xl font-heading font-black">5000</span>
                  <span className="text-2xl font-heading font-bold">₽</span>
                </div>
                <p className="text-white/60 text-sm mt-2">безлимитные занятия</p>
              </div>

              <div className="space-y-3 mb-8">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-brazil-yellow rounded-full flex items-center justify-center shrink-0">
                      <Check size={12} className="text-brazil-dark" strokeWidth={3} />
                    </div>
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="flex items-center justify-center gap-2 w-full py-4 bg-brazil-yellow text-brazil-dark font-bold text-lg rounded-full hover:bg-brazil-gold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Записаться сейчас
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-3 gap-4 mt-8"
          >
            {benefits.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="text-center p-4 bg-gray-50 rounded-2xl">
                <Icon className="mx-auto text-brazil-green mb-2" size={28} />
                <p className="text-sm font-semibold text-brazil-dark">{label}</p>
                <p className="text-xs text-gray-500 mt-1">{sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
