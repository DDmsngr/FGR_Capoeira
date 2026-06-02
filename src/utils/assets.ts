/// <reference types="vite/client" />
export function getAsset(filename: string): string {
  return `${import.meta.env.BASE_URL}${filename}`
}
