import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Lock, LogOut, Save, Loader2, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react'
import { authenticate, loadData, saveData, type DataType } from '../admin/api'
import { MastersEditor } from '../admin/editors/MastersEditor'
import { GalleryEditor } from '../admin/editors/GalleryEditor'
import { ContentEditor, type ContentPayload } from '../admin/editors/ContentEditor'
import { LocationsEditor } from '../admin/editors/LocationsEditor'
import { DirectionsEditor } from '../admin/editors/DirectionsEditor'
import { FAQEditor } from '../admin/editors/FAQEditor'
import { HeroEditor } from '../admin/editors/HeroEditor'
import { ForWhomEditor } from '../admin/editors/ForWhomEditor'
import { SchoolEditor } from '../admin/editors/SchoolEditor'
import { HistoryEditor } from '../admin/editors/HistoryEditor'
import { PricingEditor } from '../admin/editors/PricingEditor'
import { ContactsEditor } from '../admin/editors/ContactsEditor'
import { NavbarEditor } from '../admin/editors/NavbarEditor'
import type { Master } from '../data/masters'
import type { GalleryImage } from '../data/gallery'
import type { Location, Direction, FAQItem } from '../data/locations'
import type { HeroContent } from '../data/hero'
import type { ForWhomContent } from '../data/forwhom'
import type { SchoolContent } from '../data/school'
import type { HistoryContent } from '../data/history'
import type { PricingContent } from '../data/pricing'
import type { ContactsContent } from '../data/contacts'
import type { NavbarContent } from '../data/navbar'

const TABS: { key: DataType; label: string }[] = [
  { key: 'navbar', label: 'Шапка' },
  { key: 'hero', label: 'Главный экран' },
  { key: 'content', label: 'О капоэйре' },
  { key: 'history', label: 'О школе' },
  { key: 'forwhom', label: 'Для кого' },
  { key: 'school', label: 'СПб филиал' },
  { key: 'masters', label: 'Мастера' },
  { key: 'gallery', label: 'Галерея' },
  { key: 'locations', label: 'Локации' },
  { key: 'directions', label: 'Направления' },
  { key: 'pricing', label: 'Цены' },
  { key: 'faq', label: 'FAQ' },
  { key: 'contacts', label: 'Контакты' },
]

const PASS_KEY = 'fgr_admin_pass'

interface SectionState {
  data: unknown
  sha: string
  initial: string
  loaded: boolean
  loading: boolean
  error: string
}

const EMPTY: SectionState = { data: null, sha: '', initial: '', loaded: false, loading: false, error: '' }

const emptySections = (): Record<DataType, SectionState> =>
  TABS.reduce(
    (acc, t) => {
      acc[t.key] = { ...EMPTY }
      return acc
    },
    {} as Record<DataType, SectionState>,
  )

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuth, setIsAuth] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<DataType>(TABS[0].key)
  const [sections, setSections] = useState<Record<DataType, SectionState>>(emptySections)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)

  const current = sections[activeTab]
  const isDirty = current.loaded && JSON.stringify(current.data) !== current.initial

  // restore password from sessionStorage (только на время вкладки)
  useEffect(() => {
    const saved = sessionStorage.getItem(PASS_KEY)
    if (saved) {
      authenticate(saved)
        .then(() => {
          setPassword(saved)
          setIsAuth(true)
        })
        .catch(() => sessionStorage.removeItem(PASS_KEY))
    }
  }, [])

  // load active tab data when auth or tab changes
  const loadTab = useCallback(
    async (tab: DataType) => {
      setSections((prev) => ({ ...prev, [tab]: { ...prev[tab], loading: true, error: '' } }))
      try {
        const { content, sha } = await loadData<unknown>(tab, password)
        setSections((prev) => ({
          ...prev,
          [tab]: {
            data: content,
            sha,
            initial: JSON.stringify(content),
            loaded: true,
            loading: false,
            error: '',
          },
        }))
      } catch (e) {
        setSections((prev) => ({
          ...prev,
          [tab]: {
            ...prev[tab],
            loading: false,
            error: e instanceof Error ? e.message : 'Ошибка загрузки',
          },
        }))
      }
    },
    [password],
  )

  useEffect(() => {
    if (isAuth && !sections[activeTab].loaded && !sections[activeTab].loading) {
      loadTab(activeTab)
    }
  }, [isAuth, activeTab, sections, loadTab])

  // warn before leaving with unsaved changes
  useEffect(() => {
    const anyDirty = Object.values(sections).some(
      (s) => s.loaded && JSON.stringify(s.data) !== s.initial,
    )
    if (!anyDirty) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [sections])

  const showToast = (kind: 'ok' | 'err', text: string) => {
    setToast({ kind, text })
    setTimeout(() => setToast(null), 3500)
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    try {
      await authenticate(password)
      setIsAuth(true)
      sessionStorage.setItem(PASS_KEY, password)
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Ошибка авторизации')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(PASS_KEY)
    setIsAuth(false)
    setPassword('')
    setSections(emptySections())
  }

  const handleSave = async () => {
    if (!isDirty) return
    setSaving(true)
    try {
      const { sha } = await saveData(activeTab, current.data, password, current.sha)
      setSections((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          sha,
          initial: JSON.stringify(prev[activeTab].data),
        },
      }))
      showToast('ok', 'Сохранено. GitHub Actions запустит деплой через ~1 минуту.')
    } catch (e) {
      showToast('err', e instanceof Error ? e.message : 'Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  const handleRevert = () => {
    if (!isDirty) return
    if (!confirm('Откатить все изменения этой вкладки?')) return
    setSections((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], data: JSON.parse(prev[activeTab].initial) },
    }))
  }

  const updateActive = (data: unknown) => {
    setSections((prev) => ({ ...prev, [activeTab]: { ...prev[activeTab], data } }))
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brazil-green/10 to-brazil-yellow/10 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-brazil-green/20">
            <div className="flex items-center justify-center mb-6">
              <Lock className="text-brazil-green" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-brazil-dark text-center mb-2">Админка FGR</h1>
            <p className="text-gray-500 text-center mb-6">Управление контентом сайта</p>

            <form onSubmit={handleAuth} className="space-y-4">
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={authLoading}
                autoFocus
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brazil-green/50 transition disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={authLoading || !password}
                className="w-full bg-gradient-to-r from-brazil-green to-brazil-green/80 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {authLoading && <Loader2 size={16} className="animate-spin" />}
                Войти
              </button>
            </form>

            {authError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-center text-sm text-red-700 flex items-center justify-center gap-2">
                <AlertCircle size={16} /> {authError}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container-custom px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-brazil-dark">FGR · Админка</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm font-medium"
          >
            <LogOut size={16} />
            Выход
          </button>
        </div>
      </div>

      <div className="container-custom px-4 py-6">
        <div className="flex gap-1 mb-6 border-b border-gray-200 overflow-x-auto -mx-4 px-4">
          {TABS.map((tab) => {
            const s = sections[tab.key]
            const tabDirty = s.loaded && JSON.stringify(s.data) !== s.initial
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 px-4 sm:px-5 py-3 font-semibold transition border-b-2 text-sm sm:text-base ${
                  activeTab === tab.key
                    ? 'border-brazil-green text-brazil-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {tabDirty && <span className="ml-1.5 inline-block w-1.5 h-1.5 bg-orange-500 rounded-full" />}
              </button>
            )
          })}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
        >
          {current.loading && (
            <div className="flex items-center justify-center py-16 text-gray-500">
              <Loader2 className="animate-spin mr-2" size={20} /> Загрузка…
            </div>
          )}
          {current.error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 text-sm text-red-700">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">Не удалось загрузить</p>
                <p className="mt-1">{current.error}</p>
                <button
                  onClick={() => loadTab(activeTab)}
                  className="mt-2 text-xs font-semibold text-red-700 underline"
                >
                  Повторить
                </button>
              </div>
            </div>
          )}
          {current.loaded && !current.error && (
            <ActiveEditor tab={activeTab} data={current.data} onChange={updateActive} password={password} />
          )}
        </motion.div>
      </div>

      {current.loaded && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
          <div className="container-custom px-4 py-3 flex items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-gray-500">
              {isDirty ? (
                <span className="text-orange-600 font-medium">● Есть несохранённые изменения</span>
              ) : (
                <span>Изменений нет</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRevert}
                disabled={!isDirty || saving}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-30"
              >
                <RotateCcw size={14} />
                <span className="hidden sm:inline">Откатить</span>
              </button>
              <button
                onClick={handleSave}
                disabled={!isDirty || saving}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 bg-gradient-to-r from-brazil-green to-brazil-green/80 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-40 transition text-sm"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'Сохранение…' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-20 right-4 z-30 max-w-sm p-4 rounded-lg shadow-lg flex items-start gap-3 ${
            toast.kind === 'ok' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {toast.kind === 'ok' ? (
            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
          )}
          <p className="text-sm font-medium">{toast.text}</p>
        </motion.div>
      )}
    </div>
  )
}

function ActiveEditor({
  tab,
  data,
  onChange,
  password,
}: {
  tab: DataType
  data: unknown
  onChange: (d: unknown) => void
  password: string
}) {
  switch (tab) {
    case 'hero':
      return <HeroEditor data={data as HeroContent} onChange={onChange} />
    case 'content':
      return <ContentEditor data={data as ContentPayload} onChange={onChange} password={password} />
    case 'forwhom':
      return <ForWhomEditor data={data as ForWhomContent} onChange={onChange} password={password} />
    case 'school':
      return <SchoolEditor data={data as SchoolContent} onChange={onChange} />
    case 'history':
      return <HistoryEditor data={data as HistoryContent} onChange={onChange} />
    case 'pricing':
      return <PricingEditor data={data as PricingContent} onChange={onChange} />
    case 'contacts':
      return <ContactsEditor data={data as ContactsContent} onChange={onChange} />
    case 'navbar':
      return <NavbarEditor data={data as NavbarContent} onChange={onChange} />
    case 'masters':
      return <MastersEditor data={data as Master[]} onChange={onChange} password={password} />
    case 'gallery':
      return <GalleryEditor data={data as GalleryImage[]} onChange={onChange} password={password} />
    case 'locations':
      return <LocationsEditor data={data as Location[]} onChange={onChange} />
    case 'directions':
      return <DirectionsEditor data={data as Direction[]} onChange={onChange} />
    case 'faq':
      return <FAQEditor data={data as FAQItem[]} onChange={onChange} />
  }
}
