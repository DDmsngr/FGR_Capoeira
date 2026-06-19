import { Plus } from 'lucide-react'
import type { AboutContent, AboutStats, Feature } from '../../data/content'
import { ArrayItem, Field } from '../components/ArrayItem'
import { ImageUpload } from '../components/ImageUpload'
import { move, removeAt, updateAt } from '../utils'

export interface ContentPayload {
  aboutContent: AboutContent
  aboutStats: AboutStats
}

interface Props {
  data: ContentPayload
  onChange: (data: ContentPayload) => void
  password: string
}

const EMPTY_FEATURE: Feature = { title: '', description: '' }

export function ContentEditor({ data, onChange, password }: Props) {
  const updateAbout = (key: keyof AboutContent, value: string | Feature[]) => {
    onChange({ ...data, aboutContent: { ...data.aboutContent, [key]: value } })
  }

  const updateFeatures = (features: Feature[]) => {
    updateAbout('features', features)
  }

  const updateStats = (key: keyof AboutStats, value: string | number) => {
    onChange({ ...data, aboutStats: { ...data.aboutStats, [key]: value } })
  }

  const features = data.aboutContent.features

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Секция «О капоэйре»</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Тэглайн (надпись над заголовком)" value={data.aboutContent.tagline} onChange={(v) => updateAbout('tagline', v)} />
          <Field label="Подзаголовок (gradient слово)" value={data.aboutContent.subtitle} onChange={(v) => updateAbout('subtitle', v)} />
        </div>
        <Field label="Заголовок" value={data.aboutContent.title} onChange={(v) => updateAbout('title', v)} />
        <Field label="Вступление (intro)" type="textarea" value={data.aboutContent.intro} onChange={(v) => updateAbout('intro', v)} />
        <Field label="Описание 1" type="textarea" value={data.aboutContent.description1} onChange={(v) => updateAbout('description1', v)} />
        <Field label="Описание 2" type="textarea" value={data.aboutContent.description2} onChange={(v) => updateAbout('description2', v)} />
        <Field label="CTA-надпись" value={data.aboutContent.cta} onChange={(v) => updateAbout('cta', v)} />
        <ImageUpload
          label="Фото секции"
          value={data.aboutContent.imageUrl}
          onChange={(url) => updateAbout('imageUrl', url)}
          password={password}
        />
        <Field label="Описание фото (alt)" value={data.aboutContent.imageAlt} onChange={(v) => updateAbout('imageAlt', v)} />
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Четыре фичи (карточки)</h3>
        {features.map((f, idx) => (
          <ArrayItem
            key={idx}
            index={idx}
            total={features.length}
            title={f.title || 'Новая фича'}
            onMoveUp={() => updateFeatures(move(features, idx, idx - 1))}
            onMoveDown={() => updateFeatures(move(features, idx, idx + 1))}
            onDelete={() => updateFeatures(removeAt(features, idx))}
          >
            <Field
              label="Заголовок"
              value={f.title}
              onChange={(v) => updateFeatures(updateAt(features, idx, (x) => ({ ...x, title: v })))}
            />
            <Field
              label="Описание"
              type="textarea"
              rows={2}
              value={f.description}
              onChange={(v) =>
                updateFeatures(updateAt(features, idx, (x) => ({ ...x, description: v })))
              }
            />
          </ArrayItem>
        ))}
        <button
          type="button"
          onClick={() => updateFeatures([...features, EMPTY_FEATURE])}
          className="w-full py-2.5 border-2 border-dashed border-brazil-green/40 text-brazil-green rounded-lg hover:bg-brazil-green/5 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus size={16} />
          Добавить фичу
        </button>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Статистика</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field
            label="Число"
            type="number"
            value={String(data.aboutStats.number)}
            onChange={(v) => updateStats('number', parseInt(v) || 0)}
          />
          <Field label="Подпись" value={data.aboutStats.label} onChange={(v) => updateStats('label', v)} />
        </div>
      </section>
    </div>
  )
}
