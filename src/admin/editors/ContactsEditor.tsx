import type { ContactsContent } from '../../data/contacts'
import { Field } from '../components/ArrayItem'

interface Props {
  data: ContactsContent
  onChange: (data: ContactsContent) => void
}

export function ContactsEditor({ data, onChange }: Props) {
  const update = (key: keyof ContactsContent, value: string) => {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <div className="border-b pb-2">
          <h3 className="font-semibold text-brazil-dark">Бренд</h3>
          <p className="mt-1 text-xs text-gray-500">
            Используется в шапке, футере и мета-описании сайта.
          </p>
        </div>
        <Field label="Название бренда" value={data.brandName} onChange={(v) => update('brandName', v)} />
        <Field
          label="Слоган (короткая подпись под брендом)"
          value={data.brandTagline}
          onChange={(v) => update('brandTagline', v)}
        />
        <Field
          label="Короткое описание (в футере)"
          type="textarea"
          rows={2}
          value={data.shortDescription}
          onChange={(v) => update('shortDescription', v)}
        />
      </section>

      <section className="space-y-3">
        <div className="border-b pb-2">
          <h3 className="font-semibold text-brazil-dark">Телефон</h3>
          <p className="mt-1 text-xs text-gray-500">
            Отображаемая версия — с пробелами и скобками. Для звонка — только цифры и «+».
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field
            label="Для отображения"
            value={data.phone}
            onChange={(v) => update('phone', v)}
            placeholder="+7 (911) 944-04-79"
          />
          <Field
            label="Для звонка (только цифры)"
            value={data.phoneHref}
            onChange={(v) => update('phoneHref', v)}
            placeholder="+79119440479"
          />
        </div>
      </section>

      <section className="space-y-3">
        <div className="border-b pb-2">
          <h3 className="font-semibold text-brazil-dark">WhatsApp</h3>
          <p className="mt-1 text-xs text-gray-500">
            Может быть <strong>другой номер</strong>, чем для звонков. Только цифры без «+».
          </p>
        </div>
        <Field
          label="Номер WhatsApp (без «+», только цифры)"
          value={data.whatsappNumber}
          onChange={(v) => update('whatsappNumber', v)}
          placeholder="79110133710"
        />
        <Field
          label="Приветственное сообщение"
          type="textarea"
          rows={2}
          value={data.whatsappGreeting}
          onChange={(v) => update('whatsappGreeting', v)}
        />
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Соцсети</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field
            label="ВКонтакте (URL)"
            value={data.vkUrl}
            onChange={(v) => update('vkUrl', v)}
            placeholder="https://vk.link/..."
          />
          <Field label="ВКонтакте — подпись" value={data.vkLabel} onChange={(v) => update('vkLabel', v)} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field
            label="Instagram (URL)"
            value={data.instagramUrl}
            onChange={(v) => update('instagramUrl', v)}
            placeholder="https://instagram.com/..."
          />
          <Field
            label="Instagram — @ник"
            value={data.instagramHandle}
            onChange={(v) => update('instagramHandle', v)}
            placeholder="@fgrcapoeira_spb"
          />
        </div>
      </section>
    </div>
  )
}
