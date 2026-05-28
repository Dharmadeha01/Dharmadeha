/**
 * Seed script — populates Sanity with all initial DharmaDeha content.
 * Run: npx tsx scripts/seed-sanity.ts
 *
 * Uses createIfNotExists — re-running is safe, existing docs are not overwritten.
 * Loads credentials from .env.local without requiring the dotenv package.
 */
import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@sanity/client'

// ── Load .env.local without dotenv ────────────────────────────────────────────
function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) return
  const content = fs.readFileSync(envPath, 'utf-8')
  for (const line of content.split('\n')) {
    const eq = line.indexOf('=')
    if (eq < 0 || line.trimStart().startsWith('#')) continue
    const key = line.slice(0, eq).trim()
    const val = line.slice(eq + 1).trim()
    if (key && !process.env[key]) process.env[key] = val
  }
}
loadEnvLocal()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token     = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, useCdn: false, apiVersion: '2024-01-01' })

// ── Helpers ───────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upsert(doc: any) {
  const res = await client.createIfNotExists(doc)
  const existed = res._createdAt !== res._updatedAt
  console.log(`  [${String(doc._type).padEnd(14)}] ${doc._id} — ${existed ? 'already exists' : 'created ✓'}`)
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🌱  Seeding Sanity  (project: ${projectId}, dataset: ${dataset})\n`)

  // ── Hero ────────────────────────────────────────────────────────────────────
  await upsert({
    _type: 'hero',
    _id: 'hero-main',
    headlineLine1: 'Никто не идёт',
    headlineLine2: 'по пути в одиночку.',
    bodyText: 'Мы верим, что настоящая трансформация происходит не в одиночестве, а в кругу единомышленников.',
    primaryButtonText: 'Присоединиться к DharmaDeha',
    secondaryButtonText: 'Как это работает →',
  })

  // ── Site Settings ────────────────────────────────────────────────────────────
  await upsert({
    _type: 'siteSettings',
    _id: 'site-settings',
    siteName: 'DharmaDeha',
    footerTagline: 'Никто не остаётся позади.',
    joinButtonText: 'Присоединиться к DharmaDeha',
    mentorButtonText: 'Стать ментором',
  })

  // ── Video Section ────────────────────────────────────────────────────────────
  await upsert({
    _type: 'videoSection',
    _id: 'video-main',
    headline: 'Несколько слов',
    headlineItalic: 'от нас.',
    body: 'Приглашение и объяснение о DharmaDeha.',
    youtubeId: '5BcRI87s8q4',
  })

  // ── Courses ──────────────────────────────────────────────────────────────────
  await upsert({
    _type: 'course',
    _id: 'course-fundamental-philosophy',
    order: 1,
    title: 'Фундаментальная философия',
    tagline: 'Основа духовного пути.',
    status: 'active',
    lessons: 10,
    duration: '~3 месяца',
    description: 'Глубокое погружение в основные учения философии Ананда Марга — что такое дхарма, зачем мы практикуем, как работает ум и в чём цель жизни.',
    authorName: 'Дада Нитьябодха',
    authorRole: 'Автор курса «Фундаментальная философия»',
    whoFor: [
      'Новичкам в АМ, желающим структурированного введения',
      'Посвящённым, ищущим более глубокой основы',
      'Тем, кто ищет сообщество для изучения и обсуждения',
    ],
    curriculum: [
      { _key: 'c1-1',  number: 1,  title: 'Что такое Дхарма',           topic: 'Природа духовного пути' },
      { _key: 'c1-2',  number: 2,  title: 'Структура ума',               topic: 'Слои, функции, трансформация' },
      { _key: 'c1-3',  number: 3,  title: 'Яма — этические основы',      topic: 'Пять универсальных принципов' },
      { _key: 'c1-4',  number: 4,  title: 'Нияма — личная дисциплина',   topic: 'Пять личных практик' },
      { _key: 'c1-5',  number: 5,  title: 'Цель жизни',                  topic: 'Зачем мы практикуем' },
      { _key: 'c1-6',  number: 6,  title: 'Роль гуру',                   topic: 'Наставничество на пути' },
      { _key: 'c1-7',  number: 7,  title: 'Микровита и сознание',        topic: 'Тонкие сущности вселенной' },
      { _key: 'c1-8',  number: 8,  title: 'Служение как практика',       topic: 'Как сева трансформирует практикующего' },
      { _key: 'c1-9',  number: 9,  title: 'Сообщество и сангха',         topic: 'Почему мы идём вместе' },
      { _key: 'c1-10', number: 10, title: 'Интеграция и следующие шаги', topic: 'Жизнь в философии' },
    ],
  })

  await upsert({
    _type: 'course',
    _id: 'course-yama-niyama',
    order: 2,
    title: 'Яма и Нияма',
    tagline: 'Десять принципов духовной жизни.',
    status: 'active',
    lessons: 10,
    duration: '~3 месяца',
    description: 'Практическое изучение десяти основных этических и личных дисциплин — один принцип на встречу, с применением в реальной жизни.',
    authorName: 'Дада Садананда',
    authorRole: 'Автор курса «Яма и Нияма»',
    whoFor: [
      'Желающим углубить ежедневную этическую практику',
      'Ищущим подотчётности в личной дисциплине',
      'Интересующимся йогической этикой в современной жизни',
    ],
    curriculum: [
      { _key: 'c2-1',  number: 1,  title: 'Ахимса',              topic: 'Ненасилие в мыслях, словах и делах' },
      { _key: 'c2-2',  number: 2,  title: 'Сатья',               topic: 'Правдивость и правильная речь' },
      { _key: 'c2-3',  number: 3,  title: 'Астея',               topic: 'Неприсвоение и удовлетворённость' },
      { _key: 'c2-4',  number: 4,  title: 'Брахмачарья',         topic: 'Правильное использование энергии' },
      { _key: 'c2-5',  number: 5,  title: 'Апариграха',          topic: 'Ненакопительство и простота' },
      { _key: 'c2-6',  number: 6,  title: 'Шауча',               topic: 'Чистота тела и ума' },
      { _key: 'c2-7',  number: 7,  title: 'Сантоша',             topic: 'Удовлетворённость как практика' },
      { _key: 'c2-8',  number: 8,  title: 'Тапах',               topic: 'Служение и добровольная жертва' },
      { _key: 'c2-9',  number: 9,  title: 'Свадхьяя',            topic: 'Самоизучение и духовное чтение' },
      { _key: 'c2-10', number: 10, title: 'Ишвара Пранидхана',   topic: 'Вручение себя Высшему' },
    ],
  })

  await upsert({
    _type: 'course',
    _id: 'course-seven-secrets',
    order: 3,
    title: '7 секретов успеха от Шивы',
    tagline: 'Древняя мудрость для современного успеха.',
    status: 'coming-soon',
    lessons: 7,
    duration: '~2 месяца',
    description: 'Семь принципов духовного и мирского успеха Шивы — из древнейших слоёв йогической традиции, применимых к современной жизни.',
    authorName: 'Дада Садананда',
    authorRole: 'Старший учитель и основатель концепции DharmaDeha',
    whoFor: [
      'Желающим применить древнюю мудрость к современным вызовам',
      'Ищущим короткий формат обучения (7 уроков)',
      'Новичкам в АМ, ищущим доступную точку входа',
    ],
    curriculum: [
      { _key: 'c3-1', number: 1, title: 'Скоро', topic: 'Полная программа будет объявлена' },
    ],
  })

  // ── Authors ──────────────────────────────────────────────────────────────────
  await upsert({
    _type: 'author',
    _id: 'author-dada-sadananda',
    order: 1,
    name: 'Дада Садананда',
    role: 'Старший учитель · Основатель концепции DharmaDeha · Автор курса «Яма и Нияма»',
    bio: 'Старший учитель Ананда Марга, придумавший фреймворк DharmaDeha. Автор курсов «Яма и Нияма» и «7 секретов успеха от Шивы».',
    initials: 'ДС',
  })

  await upsert({
    _type: 'author',
    _id: 'author-dada-nityabodha',
    order: 2,
    name: 'Дада Нитьябодха',
    role: 'Автор курса «Фундаментальная философия»',
    bio: 'Учитель Ананда Марга, автор курса «Фундаментальная философия».',
    initials: 'ДН',
  })

  await upsert({
    _type: 'author',
    _id: 'author-anandamurti',
    order: 3,
    name: 'Шрии Шрии Анандамурти',
    role: 'Наш Гуру. Источник всей мудрости.',
    bio: 'Основатель Ананда Марга, источник всех учений и вдохновения.',
    initials: 'ССА',
  })

  // ── FAQ (8 items) ────────────────────────────────────────────────────────────
  const faqItems = [
    { order: 1, question: 'Сколько времени это занимает в неделю?',      answer: 'Одна еженедельная встреча около 80 минут плюс 15–30 минут самостоятельного изучения перед каждой сессией. Около 95–110 минут в неделю.' },
    { order: 2, question: 'Это бесплатно?',                               answer: 'Да, полностью бесплатно. Мы работаем на добровольной основе. Если DharmaDeha приносит ценность в вашу жизнь, вы можете поддержать проект пожертвованием — но это никогда не обязательно.' },
    { order: 3, question: 'Какова продолжительность DharmaDeha?',         answer: 'Один цикл DharmaDeha соответствует одному курсу — 7 или 10 сессий. После завершения участники могут продолжить с другим курсом или взять паузу.' },
    { order: 4, question: 'На каком языке проходят встречи?',             answer: 'На английском, русском, украинском и итальянском. При подаче заявки вы выбираете предпочтительный язык и попадаете в соответствующую группу.' },
    { order: 5, question: 'Нужно ли быть посвящённым в Ананда Маргу?',   answer: 'Нет. Большинство участников посвящены, но DharmaDeha открыта для всех, кто искренне идёт духовным путём.' },
    { order: 6, question: 'Что если я пропущу встречу?',                  answer: 'Жизнь непредсказуема. Пожалуйста, заранее предупредите ментора. Вы можете наверстать, изучив материал занятия. Слишком большое количество пропусков может означать прохождение курса в следующем цикле.' },
    { order: 7, question: 'DharmaDeha онлайн или оффлайн?',              answer: 'Большинство DharmaDeha встречаются онлайн через Zoom. В некоторых городах существуют или формируются очные группы — уточните при подаче заявки.' },
    { order: 8, question: 'Как присоединиться?',                          answer: 'Нажмите кнопку «Присоединиться к DharmaDeha», заполните короткую форму с предпочтительным языком, курсом и доступностью. Мы подберём вам группу в течение 1–2 недель.' },
  ]
  for (const item of faqItems) {
    await upsert({ _type: 'faq', _id: `faq-${item.order}`, ...item })
  }

  // ── Testimonials ─────────────────────────────────────────────────────────────
  await upsert({ _type: 'testimonial', _id: 'testimonial-1', order: 1, name: 'Мария',  role: 'Участница в течение 8 месяцев', quote: 'Моя DharmaDeha — единственное место, где вся моя жизнь обретает смысл: работа, семья, практика. Всё в одной комнате.' })
  await upsert({ _type: 'testimonial', _id: 'testimonial-2', order: 2, name: 'Андрей', role: 'Ментор',                        quote: 'Я пришёл как ментор думая, что буду давать. Но каждую встречу ухожу получив больше.' })
  await upsert({ _type: 'testimonial', _id: 'testimonial-3', order: 3, name: 'Анна',   role: 'Участница',                     quote: 'До того как присоединиться, я перестал медитировать регулярно. Теперь не пропустил ни дня за несколько месяцев.' })

  // ── Principles ───────────────────────────────────────────────────────────────
  await upsert({ _type: 'principle', _id: 'principle-1', order: 1, title: 'Конфиденциальность', body: 'То, чем мы делимся в группе, остаётся внутри группы.' })
  await upsert({ _type: 'principle', _id: 'principle-2', order: 2, title: 'Осторожность',       body: 'Мы говорим от своего имени — без осуждения, споров и непрошеных советов. Каждый голос равен.' })
  await upsert({ _type: 'principle', _id: 'principle-3', order: 3, title: 'Добровольность',     body: 'Вы участвуете в соответствии со своим состоянием — можете говорить или просто сказать «пас».' })
  await upsert({ _type: 'principle', _id: 'principle-4', order: 4, title: 'Вовлечённость',      body: 'Мы приходим регулярно, заранее предупреждаем об отсутствии и участвуем в коллективных медитациях.' })

  // ── Summary ───────────────────────────────────────────────────────────────────
  console.log('\n✅  Seeding complete!\n')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('IMPORTANT: Go to https://sanity.io/manage')
  console.log('  → your project → API → CORS Origins → Add:')
  console.log('      http://localhost:3000')
  console.log('      https://dharmadeha.vercel.app')
  console.log('  This is required for Sanity Studio to work.')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main().catch((err) => {
  console.error('❌  Seed failed:', err?.message ?? err)
  process.exit(1)
})
