import type { HeroContent } from '../../data/hero'
import { Field } from '../components/ArrayItem'

interface Props {
  data: HeroContent
  onChange: (data: HeroContent) => void
}

export function HeroEditor({ data, onChange }: Props) {
  const update = (key: keyof HeroContent, value: string) => {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Первый экран</h3>
        <Field
          label="Бейдж города (над заголовком)"
          value={data.cityBadge}
          onChange={(v) => update('cityBadge', v)}
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <Field
            label="Заголовок — строка 1 (белая)"
            value={data.title1}
            onChange={(v) => update('title1', v)}
          />
          <Field
            label="Заголовок — строка 2 (жёлтая)"
            value={data.title2}
            onChange={(v) => update('title2', v)}
          />
        </div>
        <Field
          label="Подзаголовок (крупный, под тайтлом)"
          value={data.subtitle}
          onChange={(v) => update('subtitle', v)}
        />
        <Field
          label="Описание (мелким шрифтом)"
          type="textarea"
          rows={2}
          value={data.tagline}
          onChange={(v) => update('tagline', v)}
        />
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Кнопки</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field
            label="Основная (жёлтая)"
            value={data.primaryCta}
            onChange={(v) => update('primaryCta', v)}
          />
          <Field
            label="Вторая (прозрачная)"
            value={data.secondaryCta}
            onChange={(v) => update('secondaryCta', v)}
          />
        </div>
      </section>
    </div>
  )
}
