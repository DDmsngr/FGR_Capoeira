import data from './gallery.json'

export interface GalleryImage {
  src: string
  thumb: string
  alt: string
}

export const galleryImages: GalleryImage[] = data
