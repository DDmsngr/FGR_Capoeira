interface Env {
  ADMIN_PASSWORD: string
  GITHUB_TOKEN: string
  GITHUB_OWNER: string
  GITHUB_REPO: string
  GITHUB_BRANCH: string
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

const DATA_PATHS: Record<string, string> = {
  masters: 'src/data/masters.json',
  gallery: 'src/data/gallery.json',
  content: 'src/data/content.json',
  locations: 'src/data/locations.json',
  directions: 'src/data/directions.json',
  faq: 'src/data/faq.json',
  hero: 'src/data/hero.json',
  forwhom: 'src/data/forwhom.json',
  school: 'src/data/school.json',
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS_HEADERS })

    const url = new URL(req.url)
    const path = url.pathname

    try {
      if (path === '/api/auth' && req.method === 'POST') return handleAuth(req, env)

      if (!isAuthorized(req, env)) return json({ error: 'Unauthorized' }, 401)

      if (path === '/api/save' && req.method === 'POST') return handleSave(req, env)
      if (path === '/api/upload' && req.method === 'POST') return handleUpload(req, env)
      if (path.startsWith('/api/data/') && req.method === 'GET') {
        const type = path.replace('/api/data/', '')
        return handleGetData(type, env)
      }

      return json({ error: 'Not found' }, 404)
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      return json({ error: msg }, 500)
    }
  },
}

function isAuthorized(req: Request, env: Env): boolean {
  const auth = req.headers.get('Authorization') || ''
  const token = auth.replace(/^Bearer\s+/i, '').trim()
  return token.length > 0 && timingSafeEqual(token, env.ADMIN_PASSWORD)
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

async function handleAuth(req: Request, env: Env): Promise<Response> {
  const { password } = await req.json<{ password?: string }>()
  if (!password || !timingSafeEqual(password, env.ADMIN_PASSWORD)) {
    return json({ ok: false, error: 'Неверный пароль' }, 401)
  }
  return json({ ok: true })
}

async function handleGetData(type: string, env: Env): Promise<Response> {
  const path = DATA_PATHS[type]
  if (!path) return json({ error: 'Unknown type' }, 400)
  const { content, sha } = await ghGetFile(env, path)
  return json({ content: JSON.parse(content), sha })
}

async function handleSave(req: Request, env: Env): Promise<Response> {
  const { type, data, sha } = await req.json<{ type: string; data: unknown; sha?: string }>()
  const path = DATA_PATHS[type]
  if (!path) return json({ error: 'Unknown type' }, 400)
  const content = JSON.stringify(data, null, 2) + '\n'
  const newSha = await ghPutFile(env, path, content, `chore(admin): update ${type}`, sha)
  return json({ ok: true, sha: newSha })
}

async function handleUpload(req: Request, env: Env): Promise<Response> {
  const { filename, base64 } = await req.json<{ filename: string; base64: string }>()
  if (!filename || !base64) return json({ error: 'filename и base64 обязательны' }, 400)
  const safe = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const finalName = `${Date.now()}-${safe}`
  const repoPath = `public/uploads/${finalName}`
  await ghPutBinary(env, repoPath, base64, `chore(admin): upload ${safe}`)
  return json({ ok: true, url: `/uploads/${finalName}` })
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}

const GH_HEADERS = (env: Env) => ({
  Authorization: `Bearer ${env.GITHUB_TOKEN}`,
  'User-Agent': 'fgr-admin-worker',
  Accept: 'application/vnd.github+json',
})

async function ghGetFile(env: Env, path: string): Promise<{ content: string; sha: string }> {
  const url = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}?ref=${env.GITHUB_BRANCH}`
  const resp = await fetch(url, { headers: GH_HEADERS(env) })
  if (!resp.ok) throw new Error(`GitHub GET ${path}: ${resp.status} ${await resp.text()}`)
  const data = (await resp.json()) as { content: string; sha: string }
  const content = atob(data.content.replace(/\n/g, ''))
  return { content: decodeUtf8(content), sha: data.sha }
}

async function ghPutFile(
  env: Env,
  path: string,
  content: string,
  message: string,
  prevSha?: string,
): Promise<string> {
  let sha = prevSha
  if (!sha) {
    try {
      const existing = await ghGetFile(env, path)
      sha = existing.sha
    } catch {
      // файла нет — создаём
    }
  }
  const body: Record<string, unknown> = {
    message,
    content: encodeUtf8ToBase64(content),
    branch: env.GITHUB_BRANCH,
  }
  if (sha) body.sha = sha

  const url = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}`
  const resp = await fetch(url, {
    method: 'PUT',
    headers: { ...GH_HEADERS(env), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!resp.ok) throw new Error(`GitHub PUT ${path}: ${resp.status} ${await resp.text()}`)
  const data = (await resp.json()) as { content: { sha: string } }
  return data.content.sha
}

async function ghPutBinary(env: Env, path: string, base64: string, message: string): Promise<void> {
  const url = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}`
  const resp = await fetch(url, {
    method: 'PUT',
    headers: { ...GH_HEADERS(env), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: base64, branch: env.GITHUB_BRANCH }),
  })
  if (!resp.ok) throw new Error(`GitHub PUT ${path}: ${resp.status} ${await resp.text()}`)
}

function encodeUtf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let bin = ''
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
  return btoa(bin)
}

function decodeUtf8(str: string): string {
  const bytes = new Uint8Array(str.length)
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i)
  return new TextDecoder().decode(bytes)
}
