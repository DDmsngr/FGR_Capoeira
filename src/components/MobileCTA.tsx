import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, CalendarCheck } from 'lucide-react'

export default function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
        >
          <div className="flex gap-2">
            <a
              href="#contact"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-brazil-yellow text-brazil-dark font-bold rounded-full hover:bg-brazil-gold transition-colors text-sm"
            >
              <CalendarCheck size={16} />
              Записаться
            </a>
            <a
              href="https://wa.me/79110133710?text=Здравствуйте!%20Хочу%20записаться%20на%20пробное%20занятие"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
