import { Plus } from 'lucide-react'
import type { SchoolContent } from '../../data/school'
import { ArrayItem, Field } from '../components/ArrayItem'
import { move, removeAt, updateAt } from '../utils'

interface Props {
  data: SchoolContent
  onChange: (data: SchoolContent) => void
}

export function SchoolEditor({ data, onChange }: Props) {
  const update = <K extends keyof SchoolContent>(key: K, value: SchoolContent[K]) => {
    onChange({ ...data, [key]: value })
  }

  const paragraphs = data.paragraphs
  const setParagraphs = (next: string[]) => update('paragraphs', next)

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Заголовок секции</h3>
        <Field
          label="Плашка над заголовком"
          value={data.sectionTag}
          onChange={(v) => update('sectionTag', v)}
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <Field
            label="Заголовок (белый)"
            value={data.titleMain}
            onChange={(v) => update('titleMain', v)}
          />
          <Field
            label="Заголовок (жёлтый градиент)"
            value={data.titleHighlight}
            onChange={(v) => update('titleHighlight', v)}
          />
        </div>
        <Field
          label="Подзаголовок (серый, снизу)"
          value={data.subtitle}
          onChange={(v) => update('subtitle', v)}
        />
      </section>

      <section className="space-y-3">
        <div className="border-b pb-2">
          <h3 className="font-semibold text-brazil-dark">Абзацы истории</h3>
          <p className="mt-1 text-xs text-gray-500">
            Чтобы выделить слово <strong className="text-brazil-dark">жирным</strong>, оберните его
            двумя звёздочками с обеих сторон: <code className="bg-gray-100 px-1 rounded">**слово**</code>
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
              rows={5}
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
          <Plus size={16} />
          Добавить абзац
        </button>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Кнопка внизу</h3>
        <Field
          label="Текст кнопки «Познакомиться с мастерами»"
          value={data.mastersCta}
          onChange={(v) => update('mastersCta', v)}
        />
      </section>
    </div>
  )
}
