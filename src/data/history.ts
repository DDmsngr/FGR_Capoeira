import data from './history.json'

export interface HistoryStat {
  value: string
  label: string
}

export interface HistoryCountry {
  name: string
  code: string
}

export interface HistoryContent {
  sectionTag: string
  titleMain: string
  titleHighlight: string
  paragraphs: string[]
  stats: HistoryStat[]
  countriesTitle: string
  countries: HistoryCountry[]
  quote: string
  quoteAuthor: string
}

export const historyContent: HistoryContent = data
