import data from './masters.json'

export interface Master {
  name: string
  rank: string
  years: string
  origin: string
  bio: string
  rankColor: string
  photo: string
}

export const masters: Master[] = data
