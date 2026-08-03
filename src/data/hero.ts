import data from './hero.json'

export interface HeroContent {
  cityBadge: string
  title1: string
  title2: string
  subtitle: string
  tagline: string
  primaryCta: string
  secondaryCta: string
}

export const heroContent: HeroContent = data
