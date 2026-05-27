import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

// Подобраны конкретные фото: roda, акробатика, дети, берибао, фестиваль, группа
const images = [
  {
    src: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=450&q=70',
    alt: 'Игра в роде — капоэйра',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?w=450&q=70',
    alt: 'Акробатика — au mortal',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=450&q=70',
    alt: 'Детская тренировка',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=450&q=70',
    alt: 'Беримбау — музыкальный инструмент',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=450&q=70',
    alt: 'Групповая тренировка',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=450&q=70',
    alt: 'Фестиваль капоэйры',
    tall: true,
  },
]

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const closeLightbox = () => setLightboxIndex(null)
  const nextImage = () => setLightboxIndex((p) => (p !== null ? (p + 1) % images.length : null))
  const prevImage = () => setLightboxIndex((p) => (p !== null ? (p - 1 + images.length) % images.length : null))

  // Keyboard navigation
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'Escape') closeLightbox()
  }

  return (
    <section id="gallery" className="section-padding bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-brazil-green/10 text-brazil-green text-sm font-semibold rounded-full mb-4">
            Галерея
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-brazil-dark">
            Моменты из жизни <span className="gradient-text">FGR</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => setLightboxIndex(i)}
              className={`group relative overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-brazil-green ${
                img.tall ? 'md:row-span-2' : ''
              }`}
              aria-label={`Открыть: ${img.alt}`}
            >
              <img
                src={img.thumb}
                alt={img.alt}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  img.tall ? 'h-52 md:h-full md:min-h-[440px]' : 'h-48 md:h-52'
                }`}
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brazil-green/0 group-hover:bg-brazil-green/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                  <ZoomIn size={18} className="text-brazil-green" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-medium">{img.alt}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKey}
            tabIndex={0}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Предыдущее"
            >
              <ChevronLeft size={24} />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Следующее"
            >
              <ChevronRight size={24} />
            </button>

            {/* Caption + counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white/80 text-sm mb-1">{images[lightboxIndex].alt}</p>
              <p className="text-white/40 text-xs">{lightboxIndex + 1} / {images.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
