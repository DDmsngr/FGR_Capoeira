import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, ArrowRight } from 'lucide-react'
import { schoolContent } from '../data/school'
import { renderRichText } from '../utils/richText'

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
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-brazil-green/20 text-brazil-green text-sm font-semibold rounded-full mb-4 border border-brazil-green/20">
            {schoolContent.sectionTag}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            {schoolContent.titleMain}{' '}
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
              {schoolContent.titleHighlight}
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">{schoolContent.subtitle}</p>
        </motion.div>

        {/* History text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto space-y-5 text-white/70 text-base md:text-lg leading-relaxed text-center"
        >
          {schoolContent.paragraphs.map((p, i) => (
            <p key={i}>{renderRichText(p)}</p>
          ))}
        </motion.div>

        {/* Masters CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-10"
        >
          <a
            href="#/masters"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all text-sm font-medium group"
          >
            <Users size={16} className="text-brazil-green" />
            {schoolContent.mastersCta}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
