import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, MessageCircle, Instagram, Send, MapPin, CheckCircle, ExternalLink, Shield } from 'lucide-react'
import { locations } from '../data/locations'
import PrivacyPolicyModal from './PrivacyPolicyModal'

const formSchema = z.object({
  name: z.string().min(2, 'Введите имя').max(50),
  phone: z.string().regex(/^[\d\s\-+()]{10,}$/, 'Введите корректный телефон'),
  location: z.string().min(1, 'Выберите зал'),
  message: z.string().max(500).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо дать согласие на обработку персональных данных' }),
  }),
})

type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [policyOpen, setPolicyOpen] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (_data: FormData) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Ошибка отправки:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-gray-50" ref={ref}>
      <PrivacyPolicyModal isOpen={policyOpen} onClose={() => setPolicyOpen(false)} />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-brazil-green/10 text-brazil-green text-sm font-semibold rounded-full mb-4">
            Контакты
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-brazil-dark">
            Запишитесь на <span className="gradient-text">бесплатное</span>
            <br />
            пробное занятие
          </h2>
          <p className="mt-4 text-gray-600">Оставьте заявку — свяжемся в течение часа</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 text-center"
              >
                <CheckCircle size={64} className="mx-auto text-brazil-green mb-4" />
                <h3 className="font-heading font-bold text-2xl text-brazil-dark mb-2">Заявка отправлена!</h3>
                <p className="text-gray-600 mb-6">Мы свяжемся с вами в ближайшее время.</p>
                <button onClick={() => setIsSubmitted(false)} className="text-brazil-green font-semibold hover:underline">
                  Отправить ещё одну заявку
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Ваше имя *</label>
                    <input
                      {...register('name')} id="name" type="text" placeholder="Как вас зовут?"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:border-brazil-green ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Телефон *</label>
                    <input
                      {...register('phone')} id="phone" type="tel" placeholder="+7 (___) ___-__-__"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:border-brazil-green ${
                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">Выберите зал *</label>
                    <select
                      {...register('location')} id="location"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:border-brazil-green appearance-none bg-white ${
                        errors.location ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <option value="">Выберите удобный зал</option>
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.name}>{loc.name} — {loc.venue}</option>
                      ))}
                    </select>
                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Сообщение (необязательно)</label>
                    <textarea
                      {...register('message')} id="message" rows={3} placeholder="Ваши вопросы или пожелания..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors focus:outline-none focus:border-brazil-green resize-none"
                    />
                  </div>

                  {/* === 152-ФЗ: Consent checkbox === */}
                  <div className={`p-4 rounded-xl border-2 transition-colors ${errors.consent ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative shrink-0 mt-0.5">
                        <input
                          {...register('consent')}
                          type="checkbox"
                          id="consent"
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:bg-brazil-green peer-checked:border-brazil-green transition-colors flex items-center justify-center">
                          <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 12 12">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <span className="text-xs text-gray-600 leading-relaxed select-none">
                        Я даю{' '}
                        <button
                          type="button"
                          onClick={() => setPolicyOpen(true)}
                          className="text-brazil-green font-medium underline hover:text-brazil-green-dark transition-colors"
                        >
                          согласие на обработку персональных данных
                        </button>{' '}
                        в соответствии с Политикой конфиденциальности и Федеральным законом № 152-ФЗ.
                        Согласие может быть отозвано в любой момент.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                        <Shield size={12} />
                        {errors.consent.message}
                      </p>
                    )}
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full btn-primary !rounded-xl disabled:opacity-70 disabled:cursor-not-allowed gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-brazil-dark border-t-transparent rounded-full animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Отправить заявку
                      </>
                    )}
                  </button>

                  {/* 152-ФЗ micro-label */}
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                    <Shield size={11} />
                    <span>Данные защищены согласно 152-ФЗ</span>
                  </div>
                </div>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <a
                href="https://wa.me/79110133710?text=Здравствуйте!%20Хочу%20записаться%20на%20пробное%20занятие%20по%20капоэйре"
                target="_blank" rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center gap-3"
              >
                <MessageCircle size={22} />
                Написать в WhatsApp
              </a>
              <a
                href="tel:+79119440479"
                className="flex items-center justify-center gap-3 w-full px-8 py-4 bg-brazil-green text-white font-bold text-lg rounded-full hover:bg-brazil-green-dark hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Phone size={20} />
                +7 (911) 944-04-79
              </a>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-heading font-bold text-lg text-brazil-dark mb-4">Мы в соцсетях</h3>
              <div className="space-y-3">
                <a
                  href="https://vk.link/fgrcapoeira_spb" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">VK</div>
                  <div>
                    <div className="font-medium text-gray-700 group-hover:text-blue-600">ВКонтакте</div>
                    <div className="text-xs text-gray-400">Наше сообщество</div>
                  </div>
                  <ExternalLink size={14} className="ml-auto text-gray-300 group-hover:text-blue-400" />
                </a>
                <a
                  href="https://instagram.com/fgrcapoeira_spb" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white shrink-0">
                    <Instagram size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 group-hover:text-pink-600">Instagram</div>
                    <div className="text-xs text-gray-400">@fgrcapoeira_spb</div>
                  </div>
                  <ExternalLink size={14} className="ml-auto text-gray-300 group-hover:text-pink-400" />
                </a>
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-heading font-bold text-lg text-brazil-dark mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-brazil-green" />
                Наши залы
              </h3>
              <div className="space-y-3">
                {locations.map((loc) => (
                  <div key={loc.id} className="p-3 bg-gray-50 rounded-xl text-sm">
                    <div className="font-semibold text-brazil-dark">{loc.name}</div>
                    <div className="text-gray-500">{loc.address}</div>
                    <div className="text-brazil-green text-xs mt-1">{loc.days} · {loc.schedule[0]}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
