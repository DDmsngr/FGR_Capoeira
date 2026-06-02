import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, Award, Globe, Calendar } from 'lucide-react'

const masters = [
  {
    id: 'jair',
    name: 'Mestre Jair',
    title: 'Основатель школы FGR',
    apelido: 'Jair do Bonfim',
    belt: 'Mestre',
    country: 'Бразилия',
    flag: 'br',
    photo: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Основал школу Familia Ginga e Raça более 30 лет назад в Бразилии. Прошёл путь от ученика до мастера в традиционной школе капоэйры, сохраняя аутентичность техники и передавая философию игры новым поколениям. Сегодня FGR объединяет практиков в пяти странах.',
  },
  {
    id: 'spb',
    name: 'Contra-Mestre Vladislav',
    title: 'Руководитель СПб-филиала',
    apelido: 'Gavião',
    belt: 'Contra-Mestre',
    country: 'Россия',
    flag: 'ru',
    photo: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Ученик Mestre Jair с 2005 года. Открыл петербургский филиал школы и за эти годы воспитал несколько сотен учеников разного возраста. Специализируется на педагогике капоэйры для детей и юношества, регулярно выезжает на трейнинги в Бразилию.',
  },
  {
    id: 'monitor',
    name: 'Monitor Ekaterina',
    title: 'Инструктор · Направление «Танцы»',
    apelido: 'Gata',
    belt: 'Monitor',
    country: 'Россия',
    flag: 'ru',
    photo: 'https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Практикует капоэйру с 2011 года. Ведёт направления Макулеле и Коку ди Рода. Участница международных батизаду и фестивалей в Бразилии, Турции и Казахстане. Её занятия — живые, энергичные и насыщены культурой afro-brasiliero.',
  },
]

function MasterCard({ master, index, isInView }: { master: typeof masters[0]; index: number; isInView: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      {/* Photo */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={master.photo}
          alt={master.name}
          className="w-full h-full object-cover object-top grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Belt badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(0,156,59,0.85)', backdropFilter: 'blur(8px)' }}>
          <Award size={10} />
          {master.belt}
        </div>
        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
          <div className="flex items-center gap-2">
            <img
              src={`https://flagcdn.com/24x18/${master.flag}.png`}
              alt={master.country}
              className="rounded-sm opacity-80"
              width={24}
              height={18}
            />
            <span className="text-white/60 text-xs">{master.country}</span>
          </div>
          <p className="text-white font-heading font-bold text-lg leading-tight mt-0.5">{master.name}</p>
          <p className="text-brazil-yellow text-xs font-medium tracking-wide">«{master.apelido}»</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-white/50 text-xs tracking-wide uppercase mb-3">{master.title}</p>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full text-left text-white/70 hover:text-white transition-colors text-sm"
        >
          <span>Биография</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-white/60 text-sm leading-relaxed mt-3 overflow-hidden"
            >
              {master.bio}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function School() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="school"
      ref={ref}
      className="section-padding relative overflow-hidden noise-overlay"
      style={{ background: '#080808' }}
    >
      {/* Gradient mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: 800, height: 800,
            top: '-25%', right: '-10%',
            background: 'radial-gradient(circle, rgba(0,156,59,0.18) 0%, transparent 65%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: 600, height: 600,
            bottom: '-20%', left: '-10%',
            background: 'radial-gradient(circle, rgba(180,130,0,0.14) 0%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-brazil-green/20 text-brazil-green text-sm font-semibold rounded-full mb-4 border border-brazil-green/20">
            История
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Санкт-Петербургский{' '}
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
              филиал
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">Escola de Capoeira Familia Ginga e Raça</p>
        </motion.div>

        {/* History block */}
        <div className="grid lg:grid-cols-5 gap-10 mb-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-5 text-white/70 text-base md:text-lg leading-relaxed"
          >
            <p>
              Школа <strong className="text-white">Familia Ginga e Raça (FGR)</strong> — международное братство
              капоэйры с бразильскими корнями и более чем 30-летней историей. Основанная Mestre Jair'ом
              в традициях Angola и Regional, школа сегодня объединяет практиков в пяти странах: Бразилии,
              России, Анголе, Казахстане и Турции.
            </p>
            <p>
              <strong className="text-white">Санкт-Петербургский филиал</strong> был открыт в начале 2000-х годов
              под руководством Contra-Mestre Vladislav'а. За эти годы через залы школы прошли сотни учеников —
              от детей 3 лет до взрослых 50+. FGR в Петербурге — это не просто спортивная секция,
              а живое сообщество, где традиция встречается с северным городом.
            </p>
            <p>
              Мы регулярно участвуем в международных <em>батизаду</em> и фестивалях, принимаем мастеров
              из Бразилии и других стран. Ученики школы выступают на городских и региональных мероприятиях,
              представляя афро-бразильскую культуру в Петербурге.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            {[
              { icon: Calendar, value: '30+', label: 'лет школы' },
              { icon: Globe, value: '5', label: 'стран мира' },
              { icon: Award, value: '3', label: 'мастера в СПб' },
              { icon: Award, value: '200+', label: 'учеников' },
            ].map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="flex flex-col items-center justify-center p-5 rounded-2xl text-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Icon className="text-brazil-yellow mb-2" size={22} />
                <div className="text-2xl font-heading font-black text-white">{value}</div>
                <div className="text-xs text-white/45 mt-0.5">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        {/* Masters section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-brazil-yellow/15 text-brazil-yellow text-sm font-semibold rounded-full mb-4 border border-brazil-yellow/20">
            Мастера
          </span>
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Наши <span className="gradient-text">преподаватели</span>
          </h3>
          <p className="text-white/45 mt-2 text-sm">Нажмите на карточку, чтобы узнать больше</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {masters.map((master, i) => (
            <MasterCard key={master.id} master={master} index={i} isInView={isInView} />
          ))}
        </div>

      </div>
    </section>
  )
}
