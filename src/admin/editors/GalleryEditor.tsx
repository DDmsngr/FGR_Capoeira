import { Plus } from 'lucide-react'
import type { GalleryImage } from '../../data/gallery'
import { ArrayItem, Field } from '../components/ArrayItem'
import { ImageUpload } from '../components/ImageUpload'
import { move, removeAt, updateAt } from '../utils'

interface Props {
  data: GalleryImage[]
  onChange: (data: GalleryImage[]) => void
  password: string
}

const EMPTY: GalleryImage = { src: '', thumb: '', alt: '' }

export function GalleryEditor({ data, onChange, password }: Props) {
  const updateField = (idx: number, key: keyof GalleryImage, value: string) => {
    onChange(updateAt(data, idx, (m) => ({ ...m, [key]: value })))
  }

  return (
    <div className="space-y-4">
      {data.map((img, idx) => (
        <ArrayItem
          key={idx}
          index={idx}
          total={data.length}
          title={img.alt || 'Без описания'}
          onMoveUp={() => onChange(move(data, idx, idx - 1))}
          onMoveDown={() => onChange(move(data, idx, idx + 1))}
          onDelete={() => onChange(removeAt(data, idx))}
        >
          <Field
            label="Подпись / alt"
            value={img.alt}
            onChange={(v) => updateField(idx, 'alt', v)}
          />
          <ImageUpload
            label="Большое изображение (открывается по клику)"
            value={img.src}
            onChange={(url) => updateField(idx, 'src', url)}
            password={password}
          />
          <ImageUpload
            label="Превью (миниатюра в сетке)"
            value={img.thumb}
            onChange={(url) => updateField(idx, 'thumb', url)}
            password={password}
            preview={false}
          />
        </ArrayItem>
      ))}
      <button
        type="button"
        onClick={() => onChange([...data, EMPTY])}
        className="w-full py-3 border-2 border-dashed border-brazil-green/40 text-brazil-green rounded-lg hover:bg-brazil-green/5 flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={18} />
        Добавить фото
      </button>
    </div>
  )
}
