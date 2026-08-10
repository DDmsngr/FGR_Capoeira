import data from './contacts.json'

export interface ContactsContent {
  brandName: string
  brandTagline: string
  shortDescription: string
  phone: string
  phoneHref: string
  whatsappNumber: string
  whatsappGreeting: string
  vkUrl: string
  vkLabel: string
  instagramUrl: string
  instagramHandle: string
}

export const contactsContent: ContactsContent = data

// Готовая ссылка на WhatsApp с приветствием
export const whatsappLink = (() => {
  const num = contactsContent.whatsappNumber.replace(/\D/g, '')
  const greeting = encodeURIComponent(contactsContent.whatsappGreeting)
  return `https://wa.me/${num}?text=${greeting}`
})()

export const phoneLink = `tel:+${contactsContent.phoneHref.replace(/\D/g, '')}`
