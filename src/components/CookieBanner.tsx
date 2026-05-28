import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Cookie } from 'lucide-react'

const STORAGE_KEY = 'fgr_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) {
      // Показываем баннер с небольшой задержкой
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', damping: 24, stiffness: 260 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[90]"
          role="dialog"
          aria-label="Уведомление об использовании файлов cookie"
        >
          <div
            className="rounded-2xl shadow-2xl border overflow-hidden"
            style={{
              background: 'rgba(15,15,15,0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <div className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 bg-brazil-yellow/15 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <Cookie size={18} className="text-brazil-yellow" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm leading-snug">Файлы cookie</p>
                  <p className="text-white/55 text-xs mt-1 leading-relaxed">
                    Сайт использует технические cookie, необходимые для работы. Аналитика и
                    сторонние трекеры не применяются.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={accept}
                  className="flex-1 py-2.5 rounded-xl bg-brazil-green text-white text-sm font-semibold hover:bg-brazil-green-dark transition-colors"
                >
                  Принять
                </button>
                <button
                  onClick={decline}
                  className="flex-1 py-2.5 rounded-xl text-white/60 text-sm font-medium hover:text-white hover:bg-white/8 transition-colors border border-white/10"
                >
                  Отклонить
                </button>
              </div>

              <p className="text-white/30 text-[10px] text-center mt-3 leading-relaxed">
                В соответствии с 152-ФЗ «О персональных данных»
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
