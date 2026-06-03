import { motion } from 'framer-motion'
import { ArrowLeft, MapPin } from 'lucide-react'
import { getAsset } from '../utils/assets'

const masters = [
  {
    name: 'Mestre Jair',
    rank: 'Мастер',
    years: '40+ лет практики',
    origin: 'Сальвадор, Бразилия',
    bio: 'Основатель школы Familia Ginga e Raça. Начал заниматься капоэйрой в Сальвадоре в 1983 году и прошёл путь от ученика до мастера под руководством Mestre Canjiquinha. Сегодня руководит школой из Бразилии и регулярно приезжает на семинары в Россию.',
    rankColor: '#009C3B',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Contramestre Alexandre',
    rank: 'Контраместе',
    years: '20 лет практики',
    origin: 'Санкт-Петербург',
    bio: 'Руководитель санкт-петербургского филиала FGR. Начал заниматься в 2003 году, прошёл подготовку в Бразилии. Проводит основные группы взрослых и подростков, организует Родас и городские мероприятия.',
    rankColor: '#FFDF00',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Кирилл Морозов',
    rank: 'Профессор',
    years: '12 лет практики',
    origin: 'Санкт-Петербург',
    bio: 'Тренер детских групп школы FGR с 2016 года. Специализируется на работе с детьми 3–12 лет: игровой формат, акробатика, ритмика. Параллельно преподаёт атабак и пандейру в музыкальной группе.',
    rankColor: '#009C3B',
    photo: 'https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Анастасия Волкова',
    rank: 'Профессора',
    years: '10 лет практики',
    origin: 'Санкт-Петербург',
    bio: 'Тренер по Capoeira Angola и португальскому языку. Прошла подготовку в Бразилии, обучалась у Mestre Moraes. Ведёт группы взрослых, а также занятия по афробразильским танцам — Макулеле и Коку ди Рода.',
    rankColor: '#FFDF00',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

export default function MastersPage() {
  const goBack = () => {
    window.location.hash = ''
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#080808' }}>

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="container-custom flex items-center gap-4 h-16 px-4 sm:px-6 lg:px-8">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            На главную
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <img src={getAsset('logo.png')} alt="FGR" className="w-8 h-8 object-contain" />
            <span className="font-heading font-bold text-white text-sm hidden sm:block">Familia Ginga e Raça</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-4">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute rounded-full"
            style={{
              width: 900, height: 900,
              top: '-30%', left: '50%', transform: 'translateX(-50%)',
              background: 'radial-gradient(circle, rgba(0,156,59,0.12) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-custom text-center relative z-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brazil-green/20 text-brazil-green text-sm font-semibold rounded-full mb-6 border border-brazil-green/20">
            <MapPin size={13} />
            Санкт-Петербургский филиал
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            Мастера и{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #FFDF00, #FFD700, #fff9c4, #FFDF00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%',
              }}
              className="animate-gradient-shift"
            >
              преподаватели
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Escola de Capoeira Familia Ginga e Raça
          </p>
        </motion.div>
      </div>

      {/* Masters grid */}
      <div className="container-custom px-4 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {masters.map((master, i) => (
            <motion.div
              key={master.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={master.photo}
                  alt={master.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

                {/* Rank badge */}
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: master.rankColor,
                    color: master.rankColor === '#FFDF00' ? '#111' : '#fff',
                  }}
                >
                  {master.rank}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h2 className="font-heading font-bold text-xl text-white mb-0.5">{master.name}</h2>
                <div className="flex items-center gap-1 text-white/40 text-xs mb-3">
                  <MapPin size={11} />
                  {master.origin} · {master.years}
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{master.bio}</p>
              </div>

              {/* Bottom accent line */}
              <div
                className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${master.rankColor}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 text-sm mb-6">Хотите познакомиться лично — приходите на пробное занятие</p>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-brazil-dark transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FFDF00, #FFD700)' }}
          >
            Записаться на пробное занятие
            <ArrowLeft size={16} className="rotate-180" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
