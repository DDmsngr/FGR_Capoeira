import data from './forwhom.json'

export interface ForWhomCard {
  title: string
  subtitle: string
  description: string
  image: string
  cta: string
}

export interface ForWhomContent {
  sectionTag: string
  sectionTitle: string
  sectionTitleHighlight: string
  children: ForWhomCard
  adults: ForWhomCard
}

export const forWhomContent: ForWhomContent = data
