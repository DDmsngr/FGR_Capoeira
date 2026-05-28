import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  color: string
}

const COLORS = [
  'rgba(0,156,59,',
  'rgba(255,223,0,',
  'rgba(0,180,70,',
  'rgba(255,200,0,',
]

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      if (!active) setActive(true)
      for (let i = 0; i < 5; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 14,
          y: e.clientY + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8 - 0.6,
          life: 1,
          size: 2 + Math.random() * 4.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
      if (particles.current.length > 250) {
        particles.current = particles.current.slice(-250)
      }
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current = particles.current.filter(p => p.life > 0.01)
      for (const p of particles.current) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.045
        p.life -= 0.022
        const alpha = p.life * p.life
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.1, p.size * p.life), 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${alpha.toFixed(3)})`
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />
}
