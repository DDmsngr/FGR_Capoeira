import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = path.join(__dirname, '../..')
const dataDir = path.join(projectRoot, 'src/data')

export async function readContent(type) {
  try {
    const filePath = path.join(dataDir, `${type}.ts`)
    const content = await fs.readFile(filePath, 'utf-8')

    // Parse TypeScript export to JSON
    const jsonMatch = content.match(/export const \w+ = (\{[\s\S]*\})\s*$/)
    if (!jsonMatch) {
      throw new Error('Invalid file format')
    }

    // Simple eval for demo (NOT for production!)
    const data = eval(`(${jsonMatch[1]})`)
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function writeContent(type, data) {
  try {
    const filePath = path.join(dataDir, `${type}.ts`)

    // Generate TypeScript content
    let content
    if (type === 'masters') {
      content = `export interface Master {
  name: string
  rank: string
  years: string
  origin: string
  bio: string
  rankColor: string
  photo: string
}

export const masters: Master[] = ${JSON.stringify(data, null, 2)}
`
    } else if (type === 'gallery') {
      content = `export interface GalleryImage {
  src: string
  thumb: string
  alt: string
}

export const galleryImages: GalleryImage[] = ${JSON.stringify(data, null, 2)}
`
    } else if (type === 'content') {
      content = `export interface Feature {
  title: string
  description: string
}

export const aboutContent = ${JSON.stringify(data.aboutContent, null, 2)}

export const aboutStats = ${JSON.stringify(data.aboutStats, null, 2)}
`
    }

    await fs.writeFile(filePath, content, 'utf-8')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
