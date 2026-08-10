import { Plus, X } from 'lucide-react'
import type { PricingContent, PricingBenefit } from '../../data/pricing'
import { ArrayItem, Field } from '../components/ArrayItem'
import { move, removeAt, updateAt } from '../utils'

interface Props {
  data: PricingContent
  onChange: (data: PricingContent) => void
}

const ICON_OPTIONS = ['Gift', 'Users', 'CreditCard', 'Star', 'Heart', 'Check', 'Zap', 'Trophy', 'Shield']
const EMPTY_BENEFIT: PricingBenefit = { iconName: 'Star', label: '', sub: '' }

export function PricingEditor({ data, onChange }: Props) {
  const update = <K extends keyof PricingContent>(key: K, value: PricingContent[K]) => {
    onChange({ ...data, [key]: value })
  }

  const included = data.included
  const setIncluded = (next: string[]) => update('included', next)

  const benefits = data.benefits
  const setBenefits = (next: PricingBenefit[]) => update('benefits', next)

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Заголовок секции</h3>
        <Field label="Плашка над заголовком" value={data.sectionTag} onChange={(v) => update('sectionTag', v)} />
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Заголовок (тёмный)" value={data.titleMain} onChange={(v) => update('titleMain', v)} />
          <Field label="Заголовок (градиент)" value={data.titleHighlight} onChange={(v) => update('titleHighlight', v)} />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Цена</h3>
        <Field label="Подпись над ценой" value={data.planLabel} onChange={(v) => update('planLabel', v)} />
        <div className="grid sm:grid-cols-[1fr,120px] gap-3">
          <Field label="Число" value={data.price} onChange={(v) => update('price', v)} placeholder="5000" />
          <Field label="Валюта" value={data.currency} onChange={(v) => update('currency', v)} placeholder="₽" />
        </div>
        <Field label="Подпись под ценой" value={data.priceCaption} onChange={(v) => update('priceCaption', v)} />
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Что включено (список с галочками)</h3>
        <div className="space-y-2">
          {included.map((line, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={line}
                onChange={(e) => setIncluded(updateAt(included, i, () => e.target.value))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-sm"
              />
              <button
                type="button"
                onClick={() => setIncluded(move(included, i, i - 1))}
                disabled={i === 0}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-30"
                title="Вверх"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => setIncluded(move(included, i, i + 1))}
                disabled={i === included.length - 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-30"
                title="Вниз"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => setIncluded(removeAt(included, i))}
                className="p-2 rounded text-red-500 hover:bg-red-50"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setIncluded([...included, ''])}
            className="text-xs px-3 py-1.5 rounded bg-brazil-green/10 text-brazil-green hover:bg-brazil-green/20 flex items-center gap-1.5"
          >
            <Plus size={12} /> Добавить пункт
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Кнопка</h3>
        <Field label="Текст кнопки записи" value={data.cta} onChange={(v) => update('cta', v)} />
      </section>

      <section className="space-y-3">
        <div className="border-b pb-2">
          <h3 className="font-semibold text-brazil-dark">Преимущества (3 плашки внизу)</h3>
          <p className="mt-1 text-xs text-gray-500">
            Иконки: <code className="bg-gray-100 px-1 rounded">{ICON_OPTIONS.join(', ')}</code>
          </p>
        </div>
        {benefits.map((b, idx) => (
          <ArrayItem
            key={idx}
            index={idx}
            total={benefits.length}
            title={b.label || 'Новая плашка'}
            onMoveUp={() => setBenefits(move(benefits, idx, idx - 1))}
            onMoveDown={() => setBenefits(move(benefits, idx, idx + 1))}
            onDelete={() => setBenefits(removeAt(benefits, idx))}
          >
            <div className="grid sm:grid-cols-[140px,1fr] gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Иконка</label>
                <select
                  value={b.iconName}
                  onChange={(e) =>
                    setBenefits(updateAt(benefits, idx, (x) => ({ ...x, iconName: e.target.value })))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-sm"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <Field
                label="Заголовок"
                value={b.label}
                onChange={(v) => setBenefits(updateAt(benefits, idx, (x) => ({ ...x, label: v })))}
              />
            </div>
            <Field
              label="Подпись"
              value={b.sub}
              onChange={(v) => setBenefits(updateAt(benefits, idx, (x) => ({ ...x, sub: v })))}
            />
          </ArrayItem>
        ))}
        <button
          type="button"
          onClick={() => setBenefits([...benefits, EMPTY_BENEFIT])}
          className="w-full py-2.5 border-2 border-dashed border-brazil-green/40 text-brazil-green rounded-lg hover:bg-brazil-green/5 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus size={16} /> Добавить плашку
        </button>
      </section>
    </div>
  )
}
