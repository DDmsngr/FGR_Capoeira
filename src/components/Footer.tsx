import { getAsset } from '../utils/assets'
import { Heart, ArrowUp, Phone, MessageCircle, ExternalLink, Shield } from 'lucide-react'
import { useState } from 'react'
import { contactsContent, whatsappLink, phoneLink } from '../data/contacts'
import PrivacyPolicyModal from './PrivacyPolicyModal'

export default function Footer() {
  const [policyOpen, setPolicyOpen] = useState(false)

  return (
    <footer className="bg-brazil-dark text-white">
      <PrivacyPolicyModal isOpen={policyOpen} onClose={() => setPolicyOpen(false)} />

      <div className="container-custom px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={getAsset("logo.png")}
                alt="FGR Capoeira"
                className="w-14 h-14 object-contain"
              />
              <div>
                <div className="font-heading font-bold text-lg">{contactsContent.brandName}</div>
                <div className="text-sm text-white/50">{contactsContent.brandTagline}</div>
              </div>
            </div>
            <p className="text-white/60 text-sm max-w-md leading-relaxed">
              {contactsContent.shortDescription}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white/80 mb-4">
              Навигация
            </h4>
            <ul className="space-y-2">
              {[
                ['#about', 'О капоэйре'],
                ['#schedule', 'Расписание'],
                ['#prices', 'Цены'],
                ['#faq', 'FAQ'],
                ['#contact', 'Контакты'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-sm text-white/60 hover:text-brazil-yellow transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white/80 mb-4">
              Контакты
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={phoneLink} className="flex items-center gap-2 text-white/60 hover:text-brazil-yellow transition-colors">
                  <Phone size={14} />
                  {contactsContent.phone}
                </a>
              </li>
              <li>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-brazil-yellow transition-colors">
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={contactsContent.vkUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-brazil-yellow transition-colors">
                  <ExternalLink size={14} />
                  ВКонтакте
                </a>
              </li>
              <li>
                <a href={contactsContent.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-brazil-yellow transition-colors">
                  <ExternalLink size={14} />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-sm text-white/40 flex items-center gap-1.5">
              © {new Date().getFullYear()} {contactsContent.brandName}. Сделано с
              <Heart size={14} className="text-red-500 fill-red-500" />
              в СПб
            </p>
            {/* 152-ФЗ: link to Privacy Policy */}
            <button
              onClick={() => setPolicyOpen(true)}
              className="flex items-center gap-1.5 text-sm text-white/35 hover:text-brazil-yellow transition-colors"
            >
              <Shield size={12} />
              Политика конфиденциальности
            </button>
          </div>
          <a href="#" className="flex items-center gap-2 text-sm text-white/40 hover:text-brazil-yellow transition-colors">
            <ArrowUp size={14} />
            Наверх
          </a>
        </div>
      </div>
    </footer>
  )
}
