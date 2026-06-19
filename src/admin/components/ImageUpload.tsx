import { useState, useRef } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import { uploadImage } from '../api'

interface Props {
  value: string
  onChange: (url: string) => void
  password: string
  label?: string
  preview?: boolean
}

export function ImageUpload({ value, onChange, password, label = 'Фото', preview = true }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setError('')
    setUploading(true)
    try {
      const { url } = await uploadImage(file, password)
      onChange(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-gray-600">{label}</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-brazil-green/10 text-brazil-green hover:bg-brazil-green/20 disabled:opacity-50"
        >
          {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
          {uploading ? 'Загрузка…' : 'Загрузить'}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="URL или загрузите файл"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-xs"
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {preview && value && (
        <img
          src={value}
          alt=""
          className="mt-2 w-full max-h-40 object-cover rounded-lg border border-gray-200"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      )}
    </div>
  )
}
