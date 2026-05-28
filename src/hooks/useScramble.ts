import { useState, useEffect } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#$@!?%&'

export function useScramble(finalText: string, duration = 1400, startDelay = 0) {
  const [display, setDisplay] = useState(() =>
    Array.from(finalText)
      .map(ch => (ch === ' ' || ch === '\n' ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join('')
  )

  useEffect(() => {
    let rafId: number
    let startTime: number | null = null

    const tick = (ts: number) => {
      if (!startTime) startTime = ts + startDelay
      const elapsed = Math.max(0, ts - startTime)
      const progress = Math.min(elapsed / duration, 1)

      let result = ''
      for (let i = 0; i < finalText.length; i++) {
        const ch = finalText[i]
        if (ch === ' ' || ch === '\n') {
          result += ch
        } else if (i / finalText.length <= progress) {
          result += ch
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplay(result)

      if (progress < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [finalText, duration, startDelay])

  return display
}
