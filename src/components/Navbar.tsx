import { getAsset } from '../utils/assets'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { useScrollDirection } from '../hooks/useScrollDirection'

const navLinks = [
  { href: '#about', label: 'О капоэйре' },
  { href: '#for-whom', label: 'Для кого' },
  { href: '#schedule', label: 'Расписание' },
  { href: '#directions', label: 'Направления' },
  { href: '#prices', label: 'Цены' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Контакты' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollDirection, isAtTop } = useScrollDirection()
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const isHidden = scrollDirection === 'down' && !isAtTop && !isOpen

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isAtTop ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-lg'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group" aria-label="FGR Capoeira — на главную">
              <img
                src={getAsset("logo.png")}
                alt="Familia Ginga e Raça — логотип"
                className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform"
              />
              <div
                className={`font-heading font-bold text-sm md:text-base transition-colors ${
                  isAtTop ? 'text-white' : 'text-brazil-dark'
                }`}
              >
                <span className="block leading-tight">Familia Ginga</span>
                <span className="block text-brazil-green leading-tight text-xs">e Raça</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Основная навигация">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-brazil-green/10 ${
                    activeSection === link.href
                      ? isAtTop ? 'text-brazil-yellow' : 'text-brazil-green'
                      : isAtTop ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-brazil-green'
                  }`}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-brazil-green rounded-full"
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+79119440479"
                className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 whitespace-nowrap ${
                  isAtTop
                    ? 'text-white border border-white/30 hover:bg-white/10'
                    : 'text-brazil-green border border-brazil-green/30 hover:bg-brazil-green/5'
                }`}
              >
                <Phone size={14} />
                +7 911 944-04-79
              </a>
              <a href="#contact" className="hidden md:inline-flex btn-primary !py-2 !px-5 !text-sm">
                Записаться
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                  isAtTop ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl pt-20 px-6"
              aria-label="Мобильное меню"
            >
              {/* Logo in mobile menu */}
              <div className="flex items-center gap-3 px-4 mb-4 pb-4 border-b border-gray-100">
                <img src={getAsset("logo.png")} alt="FGR" className="w-10 h-10 object-contain" />
                <span className="font-heading font-bold text-sm text-brazil-dark">Familia Ginga e Raça</span>
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                    initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:text-brazil-green hover:bg-brazil-green/5 rounded-xl transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 space-y-3">
                <a href="#contact" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center">
                  Записаться
                </a>
                <a href="tel:+79119440479" className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border-2 border-brazil-green text-brazil-green font-semibold hover:bg-brazil-green hover:text-white transition-colors">
                  <Phone size={18} />
                  +7 911 944-04-79
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
