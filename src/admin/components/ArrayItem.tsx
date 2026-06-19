import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react'
import { ReactNode } from 'react'

interface Props {
  index: number
  total: number
  title?: string
  onMoveUp: () => void
  onMoveDown: () => void
  onDelete: () => void
  children: ReactNode
}

export function ArrayItem({ index, total, title, onMoveUp, onMoveDown, onDelete, children }: Props) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          #{index + 1}
          {title ? ` — ${title}` : ''}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Вверх"
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Вниз"
          >
            <ChevronDown size={16} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded text-red-500 hover:bg-red-50"
            title="Удалить"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: 'text' | 'textarea' | 'url' | 'number' | 'color'
  rows?: number
}

export function Field({ label, value, onChange, placeholder, type = 'text', rows = 3 }: FieldProps) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-gray-600 mb-1">{label}</span>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-sm"
        />
      ) : (
        <input
          type={type === 'color' ? 'color' : type === 'number' ? 'number' : 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-sm"
        />
      )}
    </label>
  )
}
