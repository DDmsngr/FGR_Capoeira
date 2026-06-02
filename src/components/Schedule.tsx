import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { MapPin, Clock, Users, Navigation } from 'lucide-react'
import { locations } from '../data/locations'

export default function Schedule() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeLocation, setActiveLocation] = useState(0)

  return (
    <section id="schedule" className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-brazil-green/10 text-brazil-green text-sm font-semibold rounded-full mb-4">
            Расписание
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-brazil-dark">
            Где и когда <span className="gradient-text">тренируемся</span>
          </h2>
        </motion.div>

        {/* Location Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {locations.map((loc, i) => (
            <button
              key={loc.id}
              onClick={() => setActiveLocation(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeLocation === i
                  ? 'bg-brazil-green text-white shadow-lg shadow-brazil-green/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </motion.div>

        {/* Location Details */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            key={activeLocation}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-brazil-green/10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="text-brazil-green" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-brazil-dark">
                  {locations[activeLocation].venue}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{locations[activeLocation].address}</p>
                {locations[activeLocation].metro && (
                  <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    м. {locations[activeLocation].metro}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                <Clock size={18} className="text-brazil-green shrink-0" />
                <div>
                  <div className="text-sm text-gray-500">Дни тренировок</div>
                  <div className="font-semibold text-brazil-dark">{locations[activeLocation].days}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                <Clock size={18} className="text-brazil-yellow shrink-0" />
                <div>
                  <div className="text-sm text-gray-500">Время</div>
                  <div className="font-semibold text-brazil-dark">
                    {locations[activeLocation].schedule.join(' / ')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                <Users size={18} className="text-brazil-green shrink-0" />
                <div>
                  <div className="text-sm text-gray-500">Группы</div>
                  <div className="font-semibold text-brazil-dark">{locations[activeLocation].groups}</div>
                </div>
              </div>
            </div>

            <a
              href={`https://yandex.ru/maps/?text=${encodeURIComponent(locations[activeLocation].address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-brazil-green text-white rounded-full font-semibold hover:bg-brazil-green-dark transition-colors"
            >
              <Navigation size={16} />
              Как добраться
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 min-h-[400px] bg-gray-100"
          >
            <iframe
              key={activeLocation}
              src={`https://yandex.ru/map-widget/v1/?ll=${locations[activeLocation].lng}%2C${locations[activeLocation].lat}&z=15&pt=${locations[activeLocation].lng}%2C${locations[activeLocation].lat}%2Cpm2grnm`}
              width="100%"
              height="100%"
              style={{ minHeight: '400px', border: 0 }}
              allowFullScreen
              loading="lazy"
              title={`Карта: ${locations[activeLocation].venue}`}
            />
          </motion.div>
        </div>

        {/* All locations grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {locations.map((loc, i) => (
            <button
              key={loc.id}
              onClick={() => setActiveLocation(i)}
              className={`text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                activeLocation === i
                  ? 'border-brazil-green bg-brazil-green/5 shadow-md'
                  : 'border-gray-100 hover:border-brazil-green/30 hover:shadow-sm'
              }`}
            >
              <div className="font-semibold text-sm text-brazil-dark mb-1">{loc.name}</div>
              <div className="text-xs text-gray-500">{loc.days}</div>
              <div className="text-xs text-brazil-green font-medium mt-1">{loc.schedule[0]}</div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
