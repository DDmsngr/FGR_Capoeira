import data from './pricing.json'

export interface PricingBenefit {
  iconName: string
  label: string
  sub: string
}

export interface PricingContent {
  sectionTag: string
  titleMain: string
  titleHighlight: string
  planLabel: string
  price: string
  currency: string
  priceCaption: string
  included: string[]
  cta: string
  benefits: PricingBenefit[]
}

export const pricingContent: PricingContent = data
