import data from './school.json'

export interface SchoolContent {
  sectionTag: string
  titleMain: string
  titleHighlight: string
  subtitle: string
  paragraphs: string[]
  mastersCta: string
}

export const schoolContent: SchoolContent = data
