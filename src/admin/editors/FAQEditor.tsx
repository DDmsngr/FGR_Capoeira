import { Plus } from 'lucide-react'
import type { FAQItem } from '../../data/locations'
import { ArrayItem, Field } from '../components/ArrayItem'
import { move, removeAt, updateAt } from '../utils'

interface Props {
  data: FAQItem[]
  onChange: (data: FAQItem[]) => void
}

const EMPTY: FAQItem = { question: '', answer: '' }

export function FAQEditor({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      {data.map((item, idx) => (
        <ArrayItem
          key={idx}
          index={idx}
          total={data.length}
          title={item.question || 'Новый вопрос'}
          onMoveUp={() => onChange(move(data, idx, idx - 1))}
          onMoveDown={() => onChange(move(data, idx, idx + 1))}
          onDelete={() => onChange(removeAt(data, idx))}
        >
          <Field
            label="Вопрос"
            value={item.question}
            onChange={(v) => onChange(updateAt(data, idx, (x) => ({ ...x, question: v })))}
          />
          <Field
            label="Ответ"
            type="textarea"
            rows={4}
            value={item.answer}
            onChange={(v) => onChange(updateAt(data, idx, (x) => ({ ...x, answer: v })))}
          />
        </ArrayItem>
      ))}
      <button
        type="button"
        onClick={() => onChange([...data, EMPTY])}
        className="w-full py-3 border-2 border-dashed border-brazil-green/40 text-brazil-green rounded-lg hover:bg-brazil-green/5 flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={18} />
        Добавить вопрос
      </button>
    </div>
  )
}
