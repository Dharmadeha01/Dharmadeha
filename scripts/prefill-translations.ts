/**
 * Prefill Russian and Ukrainian translations into existing Sanity documents.
 * Run: npx tsx scripts/prefill-translations.ts
 */

import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function prefill() {
  // ── Hero ──────────────────────────────────────────────────────────────────
  const hero = await client.fetch('*[_type == "hero"][0] {_id}')
  if (hero?._id) {
    await client.patch(hero._id).set({
      headlineLine1Ru: 'Никто не идёт',
      headlineLine1Ua: 'Ніхто не йде',
      headlineLine2Ru: 'по пути в одиночку.',
      headlineLine2Ua: 'шляхом наодинці.',
      bodyTextRu: 'Мы верим, что настоящая трансформация происходит не в одиночку, а в кругу единомышленников.',
      bodyTextUa: 'Ми віримо, що справжня трансформація відбувається не наодинці, а в колі однодумців.',
      primaryButtonTextRu: 'Присоединиться к ДхармаДехе',
      primaryButtonTextUa: 'Приєднатися до ДхармаДехи',
    }).commit()
    console.log('✅ Hero translated:', hero._id)
  } else {
    console.log('⚠️  Hero document not found, skipping')
  }

  // ── Courses ───────────────────────────────────────────────────────────────
  const courses = await client.fetch('*[_type == "course"] | order(order asc) {_id, title, slug}')
  console.log(`Found ${courses.length} course(s):`, courses.map((c: { _id: string; title?: string }) => `${c._id} (${c.title})`).join(', '))

  const courseTranslations: Record<string, object> = {}

  // Map by _id — try both slug-based and order-based IDs
  for (const course of courses) {
    const id: string = course._id
    const title: string = (course.title || '').toLowerCase()
    const slug: string = (course.slug?.current || '').toLowerCase()

    if (id.includes('fundamental') || title.includes('fundamental') || slug.includes('fundamental')) {
      courseTranslations[id] = {
        titleRu: 'Фундаментальная философия',
        titleUa: 'Фундаментальна філософія',
        taglineRu: 'Основа духовного пути.',
        taglineUa: 'Основа духовного шляху.',
        descriptionRu: 'Глубокое погружение в основные учения философии Ананда Марга — что такое дхарма, зачем мы практикуем, как работает ум и в чём цель жизни.',
        descriptionUa: 'Глибоке занурення в основні вчення філософії Ананда Марга — що таке дхарма, навіщо ми практикуємо, як працює розум і в чому мета життя.',
        whoForRu: [
          { _type: 'whoForItemRu', _key: 'wfr1', text: 'Новичкам в АМ, желающим структурированного введения' },
          { _type: 'whoForItemRu', _key: 'wfr2', text: 'Инициированным, ищущим более глубокой основы' },
          { _type: 'whoForItemRu', _key: 'wfr3', text: 'Тем, кто ищет сообщество для изучения и обсуждения' },
        ],
        whoForUa: [
          { _type: 'whoForItemUa', _key: 'wfu1', text: 'Новачкам в АМ, які бажають структурованого вступу' },
          { _type: 'whoForItemUa', _key: 'wfu2', text: 'Ініційованим, які шукають глибшої основи' },
          { _type: 'whoForItemUa', _key: 'wfu3', text: 'Тим, хто шукає спільноту для вивчення та обговорення' },
        ],
      }
    } else if (id.includes('yama') || title.includes('yama') || slug.includes('yama')) {
      courseTranslations[id] = {
        titleRu: 'Яма и Нияма',
        titleUa: 'Яма і Ніяма',
        taglineRu: 'Десять принципов духовной жизни.',
        taglineUa: 'Десять принципів духовного життя.',
        descriptionRu: 'Практическое изучение десяти основных этических и личных дисциплин — один принцип на встречу, с применением в реальной жизни.',
        descriptionUa: 'Практичне вивчення десяти основних етичних та особистих дисциплін — один принцип на зустріч, із застосуванням у реальному житті.',
        whoForRu: [
          { _type: 'whoForItemRu', _key: 'wfr4', text: 'Желающим углубить ежедневную этическую практику' },
          { _type: 'whoForItemRu', _key: 'wfr5', text: 'Ищущим подотчётности в личной дисциплине' },
          { _type: 'whoForItemRu', _key: 'wfr6', text: 'Интересующимся йогической этикой в современной жизни' },
        ],
        whoForUa: [
          { _type: 'whoForItemUa', _key: 'wfu4', text: 'Тим, хто бажає поглибити щоденну етичну практику' },
          { _type: 'whoForItemUa', _key: 'wfu5', text: 'Тим, хто шукає підзвітності в особистій дисципліні' },
          { _type: 'whoForItemUa', _key: 'wfu6', text: 'Тим, хто цікавиться йогічною етикою в сучасному житті' },
        ],
      }
    } else if (id.includes('seven') || id.includes('secret') || title.includes('secret') || slug.includes('secret')) {
      courseTranslations[id] = {
        titleRu: '7 секретов успеха от Шивы',
        titleUa: '7 секретів успіху від Шіви',
        taglineRu: 'Древняя мудрость для современного успеха.',
        taglineUa: 'Давня мудрість для сучасного успіху.',
        descriptionRu: 'Семь принципов духовного и мирского успеха Шивы — из древнейших слоёв йогической традиции, применимых к современной жизни.',
        descriptionUa: 'Сім принципів духовного та мирського успіху Шіви — з найдавніших шарів йогічної традиції, застосовних до сучасного життя.',
      }
    }
  }

  // Apply course translations by index if no ID match found
  const courseTranslationsByIndex = [
    {
      titleRu: 'Фундаментальная философия',
      titleUa: 'Фундаментальна філософія',
      taglineRu: 'Основа духовного пути.',
      taglineUa: 'Основа духовного шляху.',
      descriptionRu: 'Глубокое погружение в основные учения философии Ананда Марга — что такое дхарма, зачем мы практикуем, как работает ум и в чём цель жизни.',
      descriptionUa: 'Глибоке занурення в основні вчення філософії Ананда Марга — що таке дхарма, навіщо ми практикуємо, як працює розум і в чому мета життя.',
      whoForRu: [
        { _type: 'whoForItemRu', _key: 'wfr1', text: 'Новичкам в АМ, желающим структурированного введения' },
        { _type: 'whoForItemRu', _key: 'wfr2', text: 'Инициированным, ищущим более глубокой основы' },
        { _type: 'whoForItemRu', _key: 'wfr3', text: 'Тем, кто ищет сообщество для изучения и обсуждения' },
      ],
      whoForUa: [
        { _type: 'whoForItemUa', _key: 'wfu1', text: 'Новачкам в АМ, які бажають структурованого вступу' },
        { _type: 'whoForItemUa', _key: 'wfu2', text: 'Ініційованим, які шукають глибшої основи' },
        { _type: 'whoForItemUa', _key: 'wfu3', text: 'Тим, хто шукає спільноту для вивчення та обговорення' },
      ],
    },
    {
      titleRu: 'Яма и Нияма',
      titleUa: 'Яма і Ніяма',
      taglineRu: 'Десять принципов духовной жизни.',
      taglineUa: 'Десять принципів духовного життя.',
      descriptionRu: 'Практическое изучение десяти основных этических и личных дисциплин — один принцип на встречу, с применением в реальной жизни.',
      descriptionUa: 'Практичне вивчення десяти основних етичних та особистих дисциплін — один принцип на зустріч, із застосуванням у реальному житті.',
      whoForRu: [
        { _type: 'whoForItemRu', _key: 'wfr4', text: 'Желающим углубить ежедневную этическую практику' },
        { _type: 'whoForItemRu', _key: 'wfr5', text: 'Ищущим подотчётности в личной дисциплине' },
        { _type: 'whoForItemRu', _key: 'wfr6', text: 'Интересующимся йогической этикой в современной жизни' },
      ],
      whoForUa: [
        { _type: 'whoForItemUa', _key: 'wfu4', text: 'Тим, хто бажає поглибити щоденну етичну практику' },
        { _type: 'whoForItemUa', _key: 'wfu5', text: 'Тим, хто шукає підзвітності в особистій дисципліні' },
        { _type: 'whoForItemUa', _key: 'wfu6', text: 'Тим, хто цікавиться йогічною етикою в сучасному житті' },
      ],
    },
    {
      titleRu: '7 секретов успеха от Шивы',
      titleUa: '7 секретів успіху від Шіви',
      taglineRu: 'Древняя мудрость для современного успеха.',
      taglineUa: 'Давня мудрість для сучасного успіху.',
      descriptionRu: 'Семь принципов духовного и мирского успеха Шивы — из древнейших слоёв йогической традиции, применимых к современной жизни.',
      descriptionUa: 'Сім принципів духовного та мирського успіху Шіви — з найдавніших шарів йогічної традиції, застосовних до сучасного життя.',
    },
  ]

  for (let i = 0; i < courses.length; i++) {
    const id: string = courses[i]._id
    const translations = courseTranslations[id] ?? courseTranslationsByIndex[i]
    if (translations) {
      await client.patch(id).set(translations).commit()
      console.log(`✅ Course ${i + 1} translated:`, id)
    }
  }

  // ── FAQ ───────────────────────────────────────────────────────────────────
  const faqs = await client.fetch('*[_type == "faq"] | order(order asc) {_id, question}')
  console.log(`Found ${faqs.length} FAQ item(s)`)

  const faqTranslations = [
    { ru: { q: 'Сколько времени это занимает в неделю?', a: 'Одна встреча около 80 минут плюс 30–45 минут изучения материала. Около 2 часов в неделю.' }, ua: { q: 'Скільки часу це займає на тиждень?', a: 'Одна зустріч близько 80 хвилин плюс 30–45 хвилин вивчення матеріалу. Близько 2 годин на тиждень.' } },
    { ru: { q: 'Это бесплатно?', a: 'Да, присоединиться бесплатно. Пожертвования приветствуются.' }, ua: { q: 'Це безкоштовно?', a: 'Так, приєднатися безкоштовно. Пожертвування вітаються.' } },
    { ru: { q: 'Какова продолжительность ДхармаДехи?', a: 'Обычно около 3 месяцев. Потом можно выбрать новый курс или продолжить с той же группой.' }, ua: { q: 'Яка тривалість ДхармаДехи?', a: 'Зазвичай близько 3 місяців. Потім можна обрати новий курс або продовжити з тією ж групою.' } },
    { ru: { q: 'На каком языке проходят встречи?', a: 'Русский, английский, украинский, итальянский.' }, ua: { q: 'Якою мовою проходять зустрічі?', a: 'Російська, англійська, українська, італійська.' } },
    { ru: { q: 'Нужно ли быть инициированным в АМ?', a: 'Нет. ДхармаДеха открыта для всех серьёзных практикующих.' }, ua: { q: 'Чи потрібно бути ініційованим в АМ?', a: 'Ні. ДхармаДеха відкрита для всіх серйозних практикуючих.' } },
    { ru: { q: 'Что если я пропущу встречу?', a: 'Изучите материал самостоятельно и предупредите ментора заранее.' }, ua: { q: 'Що якщо я пропущу зустріч?', a: 'Опрацюйте матеріал самостійно і попередьте ментора заздалегідь.' } },
    { ru: { q: 'Встречи онлайн или офлайн?', a: 'Большинство встреч онлайн через Zoom. Офлайн — если участники рядом.' }, ua: { q: 'Зустрічі онлайн чи офлайн?', a: 'Більшість зустрічей онлайн через Zoom. Офлайн — якщо учасники поруч.' } },
    { ru: { q: 'Как вступить?', a: 'Нажмите «Присоединиться». Мы подберём группу в течение 1–2 недель.' }, ua: { q: 'Як вступити?', a: 'Натисніть «Приєднатися». Ми підберемо групу протягом 1–2 тижнів.' } },
  ]

  for (let i = 0; i < faqs.length && i < faqTranslations.length; i++) {
    await client.patch(faqs[i]._id).set({
      questionRu: faqTranslations[i].ru.q,
      answerRu: faqTranslations[i].ru.a,
      questionUa: faqTranslations[i].ua.q,
      answerUa: faqTranslations[i].ua.a,
    }).commit()
    console.log(`✅ FAQ ${i + 1} translated:`, faqs[i]._id)
  }

  console.log('\n🎉 All translations prefilled!')
}

prefill().catch(console.error)
