import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, LogOut, Save, FileJson } from 'lucide-react'
import { masters } from '../data/masters'
import { galleryImages } from '../data/gallery'
import { aboutContent, aboutStats } from '../data/content'

const API_URL = 'http://localhost:3001/api'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('masters')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Data states
  const [mastersData, setMastersData] = useState(masters)
  const [galleryData, setGalleryData] = useState(galleryImages)
  const [contentData, setContentData] = useState({ aboutContent, aboutStats })

  const authenticate = (e) => {
    e.preventDefault()
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
    if (password === adminPassword) {
      setIsAuthenticated(true)
      setPassword('')
      setMessage('✓ Авторизация успешна')
      setTimeout(() => setMessage(''), 2000)
    } else {
      setMessage('✗ Неверный пароль')
      setTimeout(() => setMessage(''), 2000)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setPassword('')
    setMessage('')
  }

  const saveData = async () => {
    if (!isAuthenticated) return

    setLoading(true)
    try {
      const payload =
        activeTab === 'masters'
          ? mastersData
          : activeTab === 'gallery'
            ? galleryData
            : contentData

      const response = await fetch(`${API_URL}/content/${activeTab}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'}`,
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (response.ok) {
        setMessage(`✓ ${result.message}`)
      } else {
        setMessage(`✗ Ошибка: ${result.error}`)
      }
    } catch (error) {
      setMessage(`✗ Ошибка подключения: ${error.message}`)
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brazil-green/10 to-brazil-yellow/10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-brazil-green/20">
            <div className="flex items-center justify-center mb-6">
              <Lock className="text-brazil-green" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-brazil-dark text-center mb-2">Админка FGR</h1>
            <p className="text-gray-500 text-center mb-6">Управление контентом сайта</p>

            <form onSubmit={authenticate} className="space-y-4">
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 transition"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brazil-green to-brazil-green/80 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition"
              >
                Войти
              </button>
            </form>

            {message && (
              <div className="mt-4 p-3 bg-gray-100 rounded-lg text-center text-sm">{message}</div>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container-custom px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brazil-dark">Admin Panel</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm font-medium"
          >
            <LogOut size={16} />
            Выход
          </button>
        </div>
      </div>

      <div className="container-custom px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {['masters', 'gallery', 'content'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition border-b-2 ${activeTab === tab
                  ? 'border-brazil-green text-brazil-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab === 'masters' && 'Мастера'}
              {tab === 'gallery' && 'Галерея'}
              {tab === 'content' && 'Контент'}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          {activeTab === 'masters' && (
            <MastersEditor data={mastersData} onChange={setMastersData} />
          )}
          {activeTab === 'gallery' && (
            <GalleryEditor data={galleryData} onChange={setGalleryData} />
          )}
          {activeTab === 'content' && (
            <ContentEditor data={contentData} onChange={setContentData} />
          )}
        </motion.div>

        {/* Save Button & Message */}
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            <FileJson size={16} className="inline mr-2" />
            Изменения будут автоматически закоммичены в GitHub
          </div>
          <button
            onClick={saveData}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brazil-green to-brazil-green/80 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 transition"
          >
            <Save size={18} />
            {loading ? 'Сохранение...' : 'Сохранить и коммитить'}
          </button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-gray-100 rounded-lg text-center font-medium text-sm"
          >
            {message}
          </motion.div>
        )}
      </div>
    </div>
  )
}

function MastersEditor({ data, onChange }) {
  return (
    <div className="space-y-6">
      {data.map((master, idx) => (
        <div key={idx} className="p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-200">
          <input
            type="text"
            value={master.name}
            onChange={(e) => {
              const updated = [...data]
              updated[idx].name = e.target.value
              onChange(updated)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-sm font-semibold"
            placeholder="Имя"
          />
          <input
            type="text"
            value={master.rank}
            onChange={(e) => {
              const updated = [...data]
              updated[idx].rank = e.target.value
              onChange(updated)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-sm"
            placeholder="Звание"
          />
          <textarea
            value={master.bio}
            onChange={(e) => {
              const updated = [...data]
              updated[idx].bio = e.target.value
              onChange(updated)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-sm h-24"
            placeholder="Биография"
          />
          <input
            type="text"
            value={master.photo}
            onChange={(e) => {
              const updated = [...data]
              updated[idx].photo = e.target.value
              onChange(updated)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-xs text-gray-500"
            placeholder="URL фото"
          />
        </div>
      ))}
    </div>
  )
}

function GalleryEditor({ data, onChange }) {
  return (
    <div className="space-y-6">
      {data.map((img, idx) => (
        <div key={idx} className="p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-200">
          <input
            type="text"
            value={img.alt}
            onChange={(e) => {
              const updated = [...data]
              updated[idx].alt = e.target.value
              onChange(updated)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-sm font-semibold"
            placeholder="Описание"
          />
          <input
            type="text"
            value={img.src}
            onChange={(e) => {
              const updated = [...data]
              updated[idx].src = e.target.value
              onChange(updated)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-xs text-gray-500"
            placeholder="URL большого размера"
          />
          {img.thumb && (
            <img src={img.thumb} alt="preview" className="w-full h-32 object-cover rounded-lg" />
          )}
        </div>
      ))}
    </div>
  )
}

function ContentEditor({ data, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">О капоэйре — основной текст</label>
        <textarea
          value={data.aboutContent.intro}
          onChange={(e) => {
            onChange({
              ...data,
              aboutContent: { ...data.aboutContent, intro: e.target.value },
            })
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-sm h-24"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Количество стран</label>
        <input
          type="number"
          value={data.aboutStats.number}
          onChange={(e) => {
            onChange({
              ...data,
              aboutStats: { ...data.aboutStats, number: parseInt(e.target.value) },
            })
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 text-sm"
        />
      </div>
    </div>
  )
}
