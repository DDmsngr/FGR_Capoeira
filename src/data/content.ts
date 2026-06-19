import data from './content.json'

export interface Feature {
  title: string
  description: string
}

export interface AboutContent {
  tagline: string
  title: string
  subtitle: string
  intro: string
  description1: string
  description2: string
  cta: string
  imageUrl: string
  imageAlt: string
  features: Feature[]
}

export interface AboutStats {
  number: number
  label: string
}

export const aboutContent: AboutContent = data.aboutContent
export const aboutStats: AboutStats = data.aboutStats
