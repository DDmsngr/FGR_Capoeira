import type { ForWhomContent, ForWhomCard } from '../../data/forwhom'
import { Field } from '../components/ArrayItem'
import { ImageUpload } from '../components/ImageUpload'

interface Props {
  data: ForWhomContent
  onChange: (data: ForWhomContent) => void
  password: string
}

type CardKey = 'children' | 'adults'

const CARD_LABELS: Record<CardKey, string> = {
  children: 'Карточка «Для детей и подростков»',
  adults: 'Карточка «Для взрослых»',
}

export function ForWhomEditor({ data, onChange, password }: Props) {
  const updateRoot = (key: keyof ForWhomContent, value: string) => {
    onChange({ ...data, [key]: value })
  }

  const updateCard = (which: CardKey, key: keyof ForWhomCard, value: string) => {
    onChange({ ...data, [which]: { ...data[which], [key]: value } })
  }

  const renderCard = (which: CardKey) => {
    const card = data[which]
    return (
      <section className="space-y-3" key={which}>
        <h3 className="font-semibold text-brazil-dark border-b pb-2">{CARD_LABELS[which]}</h3>
        <Field label="Заголовок" value={card.title} onChange={(v) => updateCard(which, 'title', v)} />
        <Field
          label="Подзаголовок (зелёный, под заголовком)"
          value={card.subtitle}
          onChange={(v) => updateCard(which, 'subtitle', v)}
        />
        <Field
          label="Описание"
          type="textarea"
          value={card.description}
          onChange={(v) => updateCard(which, 'description', v)}
        />
        <ImageUpload
          label="Фото карточки"
          value={card.image}
          onChange={(v) => updateCard(which, 'image', v)}
          password={password}
        />
        <Field label="Текст кнопки" value={card.cta} onChange={(v) => updateCard(which, 'cta', v)} />
      </section>
    )
  }

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Заголовок секции</h3>
        <Field
          label="Плашка над заголовком"
          value={data.sectionTag}
          onChange={(v) => updateRoot('sectionTag', v)}
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <Field
            label="Заголовок (тёмный)"
            value={data.sectionTitle}
            onChange={(v) => updateRoot('sectionTitle', v)}
          />
          <Field
            label="Заголовок (градиент, второе слово)"
            value={data.sectionTitleHighlight}
            onChange={(v) => updateRoot('sectionTitleHighlight', v)}
          />
        </div>
      </section>

      {renderCard('children')}
      {renderCard('adults')}
    </div>
  )
}
