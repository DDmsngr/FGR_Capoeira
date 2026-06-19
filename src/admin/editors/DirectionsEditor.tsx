import { Plus } from 'lucide-react'
import type { Direction } from '../../data/locations'
import { ArrayItem, Field } from '../components/ArrayItem'
import { move, removeAt, updateAt } from '../utils'

interface Props {
  data: Direction[]
  onChange: (data: Direction[]) => void
}

const ICON_OPTIONS = ['Theater', 'Music', 'Sparkles', 'Zap', 'Languages', 'Drum', 'Flame', 'Heart', 'Trophy', 'Star']

const EMPTY: Direction = { icon: 'Sparkles', title: '', description: '' }

export function DirectionsEditor({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200">
        💡 <strong>Иконки</strong>: имя из библиотеки lucide-react. Распознаются:{' '}
        {ICON_OPTIONS.join(', ')}.
      </p>
      {data.map((dir, idx) => (
        <ArrayItem
          key={idx}
          index={idx}
          total={data.length}
          title={dir.title || 'Новое направление'}
          onMoveUp={() => onChange(move(data, idx, idx - 1))}
          onMoveDown={() => onChange(move(data, idx, idx + 1))}
          onDelete={() => onChange(removeAt(data, idx))}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Иконка</label>
              <select
                value={dir.icon}
                onChange={(e) =>
                  onChange(updateAt(data, idx, (d) => ({ ...d, icon: e.target.value })))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-sm"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="Название"
              value={dir.title}
              onChange={(v) => onChange(updateAt(data, idx, (d) => ({ ...d, title: v })))}
            />
          </div>
          <Field
            label="Описание"
            type="textarea"
            rows={3}
            value={dir.description}
            onChange={(v) => onChange(updateAt(data, idx, (d) => ({ ...d, description: v })))}
          />
        </ArrayItem>
      ))}
      <button
        type="button"
        onClick={() => onChange([...data, EMPTY])}
        className="w-full py-3 border-2 border-dashed border-brazil-green/40 text-brazil-green rounded-lg hover:bg-brazil-green/5 flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={18} />
        Добавить направление
      </button>
    </div>
  )
}
