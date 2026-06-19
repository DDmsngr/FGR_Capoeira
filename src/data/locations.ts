import locationsData from './locations.json'
import directionsData from './directions.json'
import faqData from './faq.json'

export interface Location {
  id: string
  name: string
  metro: string
  address: string
  venue: string
  days: string
  schedule: string[]
  groups: string
  lat: number
  lng: number
}

export interface Direction {
  icon: string
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
}

export const locations: Location[] = locationsData
export const directions: Direction[] = directionsData
export const faqItems: FAQItem[] = faqData
