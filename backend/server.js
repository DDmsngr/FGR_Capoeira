import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readContent, writeContent } from './utils/fileHandler.js'
import { commitChanges } from './utils/git.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '50mb' }))

// Simple password auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (token === process.env.VITE_ADMIN_PASSWORD) {
    next()
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

// Routes

// GET content
app.get('/api/content/:type', authMiddleware, async (req, res) => {
  const { type } = req.params
  const result = await readContent(type)
  if (result.success) {
    res.json(result.data)
  } else {
    res.status(400).json({ error: result.error })
  }
})

// POST/UPDATE content with auto-commit
app.post('/api/content/:type/save', authMiddleware, async (req, res) => {
  const { type } = req.params
  const data = req.body

  // Write to file
  const writeResult = await writeContent(type, data)
  if (!writeResult.success) {
    return res.status(400).json({ error: writeResult.error })
  }

  // Auto-commit to GitHub
  const message = `Update ${type} data via admin panel`
  const commitResult = await commitChanges(message)

  res.json({
    success: true,
    message: 'Контент сохранён' + (commitResult.success ? ' и закоммичен' : ''),
    commit: commitResult,
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`✓ Admin backend running on http://localhost:${PORT}`)
  console.log(`✓ API ready at http://localhost:${PORT}/api`)
})
