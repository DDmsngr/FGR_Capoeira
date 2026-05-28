import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyPolicyModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-6 border-b border-gray-100 shrink-0">
              <div className="w-10 h-10 bg-brazil-green/10 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-brazil-green" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-brazil-dark">Политика конфиденциальности</h2>
                <p className="text-xs text-gray-400 mt-0.5">Редакция от 01 января 2025 г.</p>
              </div>
              <button
                onClick={onClose}
                className="ml-auto w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700"
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6 space-y-6 text-sm text-gray-600 leading-relaxed">

              <section>
                <h3 className="font-semibold text-brazil-dark text-base mb-2">1. Общие положения</h3>
                <p>
                  Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки
                  персональных данных пользователей сайта{' '}
                  <span className="font-medium text-brazil-dark">ddmsngr.github.io/FGR_Capoeira/</span>{' '}
                  (далее — «Сайт»).
                </p>
                <p className="mt-2">
                  Оператором персональных данных является{' '}
                  <span className="font-medium text-brazil-dark">
                    Семенов Дмитрий Александрович (инструктор школы капоэйры Familia Ginga e Raça)
                  </span>,
                  г. Санкт-Петербург (далее — «Оператор»).
                </p>
                <p className="mt-2">
                  Обработка персональных данных осуществляется в соответствии с{' '}
                  Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-brazil-dark text-base mb-2">2. Какие данные мы собираем</h3>
                <p>При заполнении формы записи на пробное занятие Оператор получает следующие персональные данные:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                  <li>Имя (фамилия, имя — по желанию)</li>
                  <li>Номер телефона</li>
                  <li>Предпочтительный зал тренировок</li>
                  <li>Текст обращения (необязательно)</li>
                </ul>
                <p className="mt-2">Сайт не использует системы веб-аналитики и не устанавливает сторонние куки-файлы.</p>
              </section>

              <section>
                <h3 className="font-semibold text-brazil-dark text-base mb-2">3. Цели обработки</h3>
                <p>Персональные данные обрабатываются исключительно в следующих целях:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                  <li>Запись на пробное или регулярное занятие по капоэйре</li>
                  <li>Связь с пользователем для согласования времени занятия</li>
                  <li>Информирование об изменениях расписания</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-brazil-dark text-base mb-2">4. Правовое основание</h3>
                <p>
                  Обработка персональных данных осуществляется на основании согласия субъекта персональных данных
                  (ст. 6, ч. 1, п. 1 Федерального закона № 152-ФЗ), которое выражается путём
                  проставления отметки в соответствующем поле формы.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-brazil-dark text-base mb-2">5. Передача третьим лицам</h3>
                <p>
                  Персональные данные могут передаваться сервисам обработки обращений
                  (Telegram Bot API, Formspree) исключительно для доставки сообщения Оператору.
                  Данные не продаются, не передаются третьим лицам в коммерческих целях.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-brazil-dark text-base mb-2">6. Срок хранения</h3>
                <p>
                  Персональные данные хранятся не дольше, чем этого требует цель обработки.
                  После записи на занятие и завершения коммуникации данные удаляются в течение{' '}
                  <span className="font-medium text-brazil-dark">1 года</span> или незамедлительно
                  по требованию субъекта.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-brazil-dark text-base mb-2">7. Права субъекта персональных данных</h3>
                <p>Вы вправе:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                  <li>Получить информацию об обрабатываемых данных</li>
                  <li>Потребовать исправления неточных данных</li>
                  <li>Отозвать согласие на обработку в любой момент</li>
                  <li>Потребовать удаления персональных данных</li>
                </ul>
                <p className="mt-2">
                  Для реализации прав обратитесь по телефону{' '}
                  <a href="tel:+79119440479" className="text-brazil-green font-medium hover:underline">
                    +7 (911) 944-04-79
                  </a>{' '}
                  или через WhatsApp.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-brazil-dark text-base mb-2">8. Изменения Политики</h3>
                <p>
                  Оператор оставляет за собой право вносить изменения в настоящую Политику.
                  Актуальная версия всегда доступна на данной странице.
                </p>
              </section>

              <div className="pt-2 text-xs text-gray-400 border-t border-gray-100">
                Дата последнего обновления: 01.01.2025 · Оператор: Familia Ginga e Raça, г. Санкт-Петербург
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 shrink-0">
              <button
                onClick={onClose}
                className="w-full btn-primary !rounded-xl !py-3 !text-base"
              >
                Понятно
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
