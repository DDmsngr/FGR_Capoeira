import { Plus } from 'lucide-react'
import type { Master } from '../../data/masters'
import { ArrayItem, Field } from '../components/ArrayItem'
import { ImageUpload } from '../components/ImageUpload'
import { move, removeAt, updateAt } from '../utils'

interface Props {
  data: Master[]
  onChange: (data: Master[]) => void
  password: string
}

const EMPTY: Master = {
  name: '',
  rank: '',
  years: '',
  origin: '',
  bio: '',
  rankColor: '#009C3B',
  photo: '',
}

export function MastersEditor({ data, onChange, password }: Props) {
  const updateField = (idx: number, key: keyof Master, value: string) => {
    onChange(updateAt(data, idx, (m) => ({ ...m, [key]: value })))
  }

  return (
    <div className="space-y-4">
      {data.map((master, idx) => (
        <ArrayItem
          key={idx}
          index={idx}
          total={data.length}
          title={master.name || 'Новый мастер'}
          onMoveUp={() => onChange(move(data, idx, idx - 1))}
          onMoveDown={() => onChange(move(data, idx, idx + 1))}
          onDelete={() => onChange(removeAt(data, idx))}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Имя" value={master.name} onChange={(v) => updateField(idx, 'name', v)} />
            <Field label="Звание" value={master.rank} onChange={(v) => updateField(idx, 'rank', v)} />
            <Field label="Опыт" value={master.years} onChange={(v) => updateField(idx, 'years', v)} placeholder="40+ лет практики" />
            <Field label="Город / страна" value={master.origin} onChange={(v) => updateField(idx, 'origin', v)} />
            <Field
              label="Цвет звания (HEX)"
              type="color"
              value={master.rankColor}
              onChange={(v) => updateField(idx, 'rankColor', v)}
            />
          </div>
          <Field
            label="Биография"
            type="textarea"
            rows={4}
            value={master.bio}
            onChange={(v) => updateField(idx, 'bio', v)}
          />
          <ImageUpload
            label="Фото мастера"
            value={master.photo}
            onChange={(url) => updateField(idx, 'photo', url)}
            password={password}
          />
        </ArrayItem>
      ))}
      <button
        type="button"
        onClick={() => onChange([...data, EMPTY])}
        className="w-full py-3 border-2 border-dashed border-brazil-green/40 text-brazil-green rounded-lg hover:bg-brazil-green/5 flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={18} />
        Добавить мастера
      </button>
    </div>
  )
}
