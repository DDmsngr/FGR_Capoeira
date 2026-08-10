import { Plus } from 'lucide-react'
import type { NavbarContent, NavLink } from '../../data/navbar'
import { ArrayItem, Field } from '../components/ArrayItem'
import { move, removeAt, updateAt } from '../utils'

interface Props {
  data: NavbarContent
  onChange: (data: NavbarContent) => void
}

const EMPTY_LINK: NavLink = { href: '#', label: '' }

const KNOWN_HREFS: { href: string; hint: string }[] = [
  { href: '#hero', hint: 'Первый экран' },
  { href: '#about', hint: 'О капоэйре' },
  { href: '#school', hint: 'СПб филиал' },
  { href: '#for-whom', hint: 'Для кого' },
  { href: '#schedule', hint: 'Расписание' },
  { href: '#prices', hint: 'Цены' },
  { href: '#directions', hint: 'Направления' },
  { href: '#gallery', hint: 'Галерея' },
  { href: '#history', hint: 'История' },
  { href: '#contact', hint: 'Контакты' },
]

export function NavbarEditor({ data, onChange }: Props) {
  const links = data.links
  const setLinks = (next: NavLink[]) => onChange({ ...data, links: next })

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <div className="border-b pb-2">
          <h3 className="font-semibold text-brazil-dark">Пункты меню</h3>
          <p className="mt-1 text-xs text-gray-500">
            <strong>Якорь</strong> — ссылка на секцию сайта, начинается с <code className="bg-gray-100 px-1 rounded">#</code>.
            Доступные:{' '}
            {KNOWN_HREFS.map((k, i) => (
              <span key={k.href}>
                {i > 0 && ', '}
                <code className="bg-gray-100 px-1 rounded">{k.href}</code> ({k.hint})
              </span>
            ))}
            .
          </p>
        </div>
        {links.map((link, idx) => (
          <ArrayItem
            key={idx}
            index={idx}
            total={links.length}
            title={link.label || 'Новый пункт'}
            onMoveUp={() => setLinks(move(links, idx, idx - 1))}
            onMoveDown={() => setLinks(move(links, idx, idx + 1))}
            onDelete={() => setLinks(removeAt(links, idx))}
          >
            <div className="grid sm:grid-cols-[160px,1fr] gap-3">
              <Field
                label="Якорь"
                value={link.href}
                onChange={(v) => setLinks(updateAt(links, idx, (x) => ({ ...x, href: v })))}
                placeholder="#about"
              />
              <Field
                label="Название"
                value={link.label}
                onChange={(v) => setLinks(updateAt(links, idx, (x) => ({ ...x, label: v })))}
              />
            </div>
          </ArrayItem>
        ))}
        <button
          type="button"
          onClick={() => setLinks([...links, EMPTY_LINK])}
          className="w-full py-2.5 border-2 border-dashed border-brazil-green/40 text-brazil-green rounded-lg hover:bg-brazil-green/5 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus size={16} /> Добавить пункт
        </button>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-brazil-dark border-b pb-2">Кнопка «Записаться» (справа в шапке)</h3>
        <Field
          label="Текст кнопки"
          value={data.ctaLabel}
          onChange={(v) => onChange({ ...data, ctaLabel: v })}
        />
      </section>
    </div>
  )
}
