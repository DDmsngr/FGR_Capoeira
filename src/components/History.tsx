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
    <section id="history" className="section-padding bg-brazil-dark text-white" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-brazil-green/20 text-brazil-green text-sm font-semibold rounded-full mb-4">
                О школе
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl mb-6">
                Familia Ginga
                <br />
                <span className="text-brazil-yellow">e Raça</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-white/80 text-base md:text-lg leading-relaxed"
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

            {/* Stats */}
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
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur">
                  <Icon className="mx-auto text-brazil-yellow mb-2" size={24} />
                  <div className="text-2xl font-heading font-black text-white">{value}</div>
                  <div className="text-xs text-white/60">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Countries */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h3 className="font-heading font-bold text-xl mb-6 text-center">Мы в мире</h3>
              <div className="space-y-3">
                {countries.map((country, i) => (
                  <motion.div
                    key={country.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    {/* Real flag image from flagcdn */}
                    <img
                      src={`https://flagcdn.com/40x30/${country.code}.png`}
                      srcSet={`https://flagcdn.com/80x60/${country.code}.png 2x`}
                      width={40}
                      height={30}
                      alt={`Флаг: ${country.name}`}
                      className="rounded-sm object-cover shrink-0"
                      loading="lazy"
                    />
                    <span className="font-medium">{country.name}</span>
                    <div className="ml-auto w-2 h-2 bg-brazil-green rounded-full animate-pulse" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-white/60 text-sm italic">
                  "Капоэйра — это мой способ выражать себя, моя жизнь,
                  которую я проживаю каждый день."
                </p>
                <p className="text-brazil-yellow text-sm font-medium mt-2">— Mestre Jair</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
