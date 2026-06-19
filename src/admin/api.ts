const API_URL = import.meta.env.VITE_API_URL || ''

export type DataType = 'masters' | 'gallery' | 'content' | 'locations' | 'directions' | 'faq'

export interface LoadResult<T> {
  content: T
  sha: string
}

function authHeader(password: string) {
  return { Authorization: `Bearer ${password}` }
}

async function handle<T>(resp: Response): Promise<T> {
  if (!resp.ok) {
    let msg = `HTTP ${resp.status}`
    try {
      const body = await resp.json()
      if (body?.error) msg = body.error
    } catch { /* not json */ }
    throw new Error(msg)
  }
  return resp.json() as Promise<T>
}

export async function authenticate(password: string): Promise<void> {
  if (!API_URL) throw new Error('VITE_API_URL не задан. См. worker/README.md')
  const resp = await fetch(`${API_URL}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  await handle<{ ok: boolean }>(resp)
}

export async function loadData<T>(type: DataType, password: string): Promise<LoadResult<T>> {
  const resp = await fetch(`${API_URL}/api/data/${type}`, { headers: authHeader(password) })
  return handle<LoadResult<T>>(resp)
}

export async function saveData(
  type: DataType,
  data: unknown,
  password: string,
  sha?: string,
): Promise<{ sha: string }> {
  const resp = await fetch(`${API_URL}/api/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader(password) },
    body: JSON.stringify({ type, data, sha }),
  })
  return handle<{ sha: string }>(resp)
}

export async function uploadImage(file: File, password: string): Promise<{ url: string }> {
  const base64 = await fileToBase64(file)
  const resp = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader(password) },
    body: JSON.stringify({ filename: file.name, base64 }),
  })
  return handle<{ url: string }>(resp)
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1])
    }
    reader.readAsDataURL(file)
  })
}
