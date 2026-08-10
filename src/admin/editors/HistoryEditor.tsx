import { Plus } from 'lucide-react'
import type { HistoryContent, HistoryStat, HistoryCountry } from '../../data/history'
import { ArrayItem, Field } from '../components/ArrayItem'
import { move, removeAt, updateAt } from '../utils'

interface Props {
  data: HistoryContent
  onChange: (data: HistoryContent) => void
}

const EMPTY_STAT: HistoryStat = { value: '', label: '' }
const EMPTY_COUNTRY: HistoryCountry = { name: '', code: '' }

export function HistoryEditor({ data, onChange }: Props) {
  const update = <K extends keyof HistoryContent>(key: K, value: HistoryContent[K]) => {
    onChange({ ...data, [key]: value })
  }

  const paragraphs = data.paragraphs
  const setParagraphs = (next: string[]) => update('paragraphs', next)

  const stats = data.stats
  const setStats = (next: HistoryStat[]) => update('stats', next)

  const countries = data.countries
  const setCountries = (next: HistoryCountry[]) => update('countries', next)

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Заголовок секции</h3>
        <Field label="Плашка над заголовком" value={data.sectionTag} onChange={(v) => update('sectionTag', v)} />
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Заголовок (белый)" value={data.titleMain} onChange={(v) => update('titleMain', v)} />
          <Field
            label="Заголовок (жёлтый градиент)"
            value={data.titleHighlight}
            onChange={(v) => update('titleHighlight', v)}
          />
        </div>
      </section>

      <section className="space-y-3">
        <div className="border-b pb-2">
          <h3 className="font-semibold text-brazil-dark">Абзацы описания</h3>
          <p className="mt-1 text-xs text-gray-500">
            Выделить <strong className="text-brazil-dark">жирным</strong>:{' '}
            <code className="bg-gray-100 px-1 rounded">**слово**</code>
          </p>
        </div>
        {paragraphs.map((p, idx) => (
          <ArrayItem
            key={idx}
            index={idx}
            total={paragraphs.length}
            title={p.slice(0, 40).replace(/\*\*/g, '') + (p.length > 40 ? '…' : '')}
            onMoveUp={() => setParagraphs(move(paragraphs, idx, idx - 1))}
            onMoveDown={() => setParagraphs(move(paragraphs, idx, idx + 1))}
            onDelete={() => setParagraphs(removeAt(paragraphs, idx))}
          >
            <Field
              label="Текст абзаца"
              type="textarea"
              rows={4}
              value={p}
              onChange={(v) => setParagraphs(updateAt(paragraphs, idx, () => v))}
            />
          </ArrayItem>
        ))}
        <button
          type="button"
          onClick={() => setParagraphs([...paragraphs, ''])}
          className="w-full py-2.5 border-2 border-dashed border-brazil-green/40 text-brazil-green rounded-lg hover:bg-brazil-green/5 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus size={16} /> Добавить абзац
        </button>
      </section>

      <section className="space-y-3">
        <div className="border-b pb-2">
          <h3 className="font-semibold text-brazil-dark">Плашки со статистикой</h3>
          <p className="mt-1 text-xs text-gray-500">
            Три плашки под текстом (30+/лет истории, 5/стран, ∞/энергии). Иконки к каждой плашке
            подставляются автоматически.
          </p>
        </div>
        {stats.map((s, idx) => (
          <ArrayItem
            key={idx}
            index={idx}
            total={stats.length}
            title={`${s.value} ${s.label}`}
            onMoveUp={() => setStats(move(stats, idx, idx - 1))}
            onMoveDown={() => setStats(move(stats, idx, idx + 1))}
            onDelete={() => setStats(removeAt(stats, idx))}
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <Field
                label="Число / значение"
                value={s.value}
                onChange={(v) => setStats(updateAt(stats, idx, (x) => ({ ...x, value: v })))}
              />
              <Field
                label="Подпись"
                value={s.label}
                onChange={(v) => setStats(updateAt(stats, idx, (x) => ({ ...x, label: v })))}
              />
            </div>
          </ArrayItem>
        ))}
        <button
          type="button"
          onClick={() => setStats([...stats, EMPTY_STAT])}
          className="w-full py-2.5 border-2 border-dashed border-brazil-green/40 text-brazil-green rounded-lg hover:bg-brazil-green/5 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus size={16} /> Добавить плашку
        </button>
      </section>

      <section className="space-y-3">
        <div className="border-b pb-2">
          <h3 className="font-semibold text-brazil-dark">Страны с флагами</h3>
          <p className="mt-1 text-xs text-gray-500">
            <strong>Код страны</strong> — двухбуквенный ISO-код в нижнем регистре (по нему подгружается
            флаг). Например: <code className="bg-gray-100 px-1 rounded">br</code> — Бразилия,{' '}
            <code className="bg-gray-100 px-1 rounded">ru</code> — Россия,{' '}
            <code className="bg-gray-100 px-1 rounded">ao</code> — Ангола,{' '}
            <code className="bg-gray-100 px-1 rounded">kz</code> — Казахстан,{' '}
            <code className="bg-gray-100 px-1 rounded">tr</code> — Турция,{' '}
            <code className="bg-gray-100 px-1 rounded">mz</code> — Мозамбик.
          </p>
        </div>
        <Field
          label="Заголовок панели"
          value={data.countriesTitle}
          onChange={(v) => update('countriesTitle', v)}
        />
        {countries.map((c, idx) => (
          <ArrayItem
            key={idx}
            index={idx}
            total={countries.length}
            title={c.name || 'Новая страна'}
            onMoveUp={() => setCountries(move(countries, idx, idx - 1))}
            onMoveDown={() => setCountries(move(countries, idx, idx + 1))}
            onDelete={() => setCountries(removeAt(countries, idx))}
          >
            <div className="grid sm:grid-cols-[1fr,120px] gap-3">
              <Field
                label="Название"
                value={c.name}
                onChange={(v) => setCountries(updateAt(countries, idx, (x) => ({ ...x, name: v })))}
              />
              <Field
                label="Код (br, ru...)"
                value={c.code}
                onChange={(v) =>
                  setCountries(updateAt(countries, idx, (x) => ({ ...x, code: v.toLowerCase().trim() })))
                }
              />
            </div>
            {c.code && (
              <img
                src={`https://flagcdn.com/40x30/${c.code}.png`}
                alt={c.name}
                className="mt-1 rounded shadow-sm border border-gray-200"
                width={40}
                height={30}
              />
            )}
          </ArrayItem>
        ))}
        <button
          type="button"
          onClick={() => setCountries([...countries, EMPTY_COUNTRY])}
          className="w-full py-2.5 border-2 border-dashed border-brazil-green/40 text-brazil-green rounded-lg hover:bg-brazil-green/5 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus size={16} /> Добавить страну
        </button>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Цитата</h3>
        <Field
          label="Текст цитаты"
          type="textarea"
          rows={3}
          value={data.quote}
          onChange={(v) => update('quote', v)}
        />
        <Field
          label="Автор (например «— Mestre Jair»)"
          value={data.quoteAuthor}
          onChange={(v) => update('quoteAuthor', v)}
        />
      </section>
    </div>
  )
}
