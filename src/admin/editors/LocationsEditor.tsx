import { Plus, X } from 'lucide-react'
import type { Location } from '../../data/locations'
import { ArrayItem, Field } from '../components/ArrayItem'
import { move, removeAt, updateAt } from '../utils'

interface Props {
  data: Location[]
  onChange: (data: Location[]) => void
}

const EMPTY: Location = {
  id: '',
  name: '',
  metro: '',
  address: '',
  venue: '',
  days: '',
  schedule: [''],
  groups: '',
  lat: 59.93,
  lng: 30.34,
}

export function LocationsEditor({ data, onChange }: Props) {
  const update = (idx: number, patch: Partial<Location>) => {
    onChange(updateAt(data, idx, (loc) => ({ ...loc, ...patch })))
  }

  return (
    <div className="space-y-4">
      {data.map((loc, idx) => (
        <ArrayItem
          key={idx}
          index={idx}
          total={data.length}
          title={loc.name || loc.venue || 'Новая локация'}
          onMoveUp={() => onChange(move(data, idx, idx - 1))}
          onMoveDown={() => onChange(move(data, idx, idx + 1))}
          onDelete={() => onChange(removeAt(data, idx))}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="ID (slug, для якорей)" value={loc.id} onChange={(v) => update(idx, { id: v })} placeholder="narvskaya" />
            <Field label="Название" value={loc.name} onChange={(v) => update(idx, { name: v })} placeholder="м. Нарвская" />
            <Field label="Метро" value={loc.metro} onChange={(v) => update(idx, { metro: v })} />
            <Field label="Зал / площадка" value={loc.venue} onChange={(v) => update(idx, { venue: v })} />
          </div>
          <Field label="Адрес" value={loc.address} onChange={(v) => update(idx, { address: v })} />
          <Field label="Дни недели" value={loc.days} onChange={(v) => update(idx, { days: v })} placeholder="Понедельник, Среда" />
          <Field label="Группы" value={loc.groups} onChange={(v) => update(idx, { groups: v })} placeholder="Взрослые, дети" />

          <div>
            <span className="block text-xs font-semibold text-gray-600 mb-1">Расписание (по строкам)</span>
            <div className="space-y-2">
              {loc.schedule.map((slot, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={slot}
                    onChange={(e) => {
                      const next = [...loc.schedule]
                      next[i] = e.target.value
                      update(idx, { schedule: next })
                    }}
                    placeholder="20:00–21:30"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => update(idx, { schedule: loc.schedule.filter((_, j) => j !== i) })}
                    className="p-2 rounded text-red-500 hover:bg-red-50"
                    title="Удалить слот"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => update(idx, { schedule: [...loc.schedule, ''] })}
                className="text-xs px-3 py-1.5 rounded bg-brazil-green/10 text-brazil-green hover:bg-brazil-green/20 flex items-center gap-1.5"
              >
                <Plus size={12} /> Добавить слот
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Широта (lat)"
              type="number"
              value={String(loc.lat)}
              onChange={(v) => update(idx, { lat: parseFloat(v) || 0 })}
            />
            <Field
              label="Долгота (lng)"
              type="number"
              value={String(loc.lng)}
              onChange={(v) => update(idx, { lng: parseFloat(v) || 0 })}
            />
          </div>
        </ArrayItem>
      ))}
      <button
        type="button"
        onClick={() => onChange([...data, EMPTY])}
        className="w-full py-3 border-2 border-dashed border-brazil-green/40 text-brazil-green rounded-lg hover:bg-brazil-green/5 flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={18} />
        Добавить локацию
      </button>
    </div>
  )
}
