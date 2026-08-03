import { Fragment, type ReactNode } from 'react'

// Простой парсер: **жирный текст** → <strong>. Остальное — как есть.
export function renderRichText(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/)
    if (m) {
      return (
        <strong key={i} className="text-white">
          {m[1]}
        </strong>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}
