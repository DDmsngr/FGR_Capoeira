import data from './navbar.json'

export interface NavLink {
  href: string
  label: string
}

export interface NavbarContent {
  links: NavLink[]
  ctaLabel: string
}

export const navbarContent: NavbarContent = data
