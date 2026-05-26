/**
 * Seed script — populates Sanity with the current hardcoded content.
 *
 * Usage:
 *   npx tsx scripts/seed-sanity.ts
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ── Hero ──────────────────────────────────────────────────────────────────────
const hero = {
  _type: "hero",
  headlineLine1: "No one walks",
  headlineLine2: "the path alone.",
  bodyText:
    "We believe that true transformation happens not alone, but in a circle of like-minded souls.",
  primaryButtonText: "Join a DharmaDeha",
  secondaryButtonText: "How it works →",
};

// ── Courses ───────────────────────────────────────────────────────────────────
const courses = [
  {
    _type: "course",
    title: "Fundamental Philosophy",
    tagline:
      "A grounding in the core teachings of Ananda Marga philosophy — what dharma is, why we practice, and what the goal of life actually is.",
    description:
      "A grounding in the core teachings of Ananda Marga philosophy — what dharma is, why we practice, how the mind works, and what the goal of life actually is.",
    status: "active",
    lessons: 10,
    authorName: "Dada Nityabodha",
    authorRole: "Author of the Fundamental Philosophy course",
    whoFor: [
      "New to AM wanting a structured introduction",
      "Initiated but wanting a deeper foundation",
      "Looking for community to study with",
    ],
    curriculum: [
      { number: 1, title: "What is Dharma" },
      { number: 2, title: "Structure of the mind" },
      { number: 3, title: "Yama — ethical foundations" },
      { number: 4, title: "Niyama — personal discipline" },
      { number: 5, title: "The goal of life" },
      { number: 6, title: "Role of the guru" },
      { number: 7, title: "Microvita and consciousness" },
      { number: 8, title: "Service as practice" },
      { number: 9, title: "Community and sangha" },
      { number: 10, title: "Integration and next steps" },
    ],
    order: 1,
  },
  {
    _type: "course",
    title: "Yama and Niyama",
    tagline:
      "A practical study of the ten core ethical and personal disciplines — one principle per meeting, with real-world application.",
    description:
      "A practical study of the ten core ethical and personal disciplines — one principle per meeting, with real-world application.",
    status: "active",
    lessons: 10,
    authorName: "Dada Sadananda",
    authorRole: "Author of the Yama and Niyama course",
    whoFor: [
      "Want to deepen daily ethical practice",
      "Looking for accountability in personal discipline",
      "Interested in yogic ethics applied to modern life",
    ],
    curriculum: [
      { number: 1, title: "Ahimsa" },
      { number: 2, title: "Satya" },
      { number: 3, title: "Asteya" },
      { number: 4, title: "Brahmacarya" },
      { number: 5, title: "Aparigraha" },
      { number: 6, title: "Shaoca" },
      { number: 7, title: "Santosha" },
      { number: 8, title: "Tapah" },
      { number: 9, title: "Svadhyaya" },
      { number: 10, title: "Ishvara Pranidhana" },
    ],
    order: 2,
  },
  {
    _type: "course",
    title: "7 Secrets of Success by Shiva",
    tagline:
      "Shiva's seven principles of spiritual and worldly success — drawn from the oldest layers of yogic tradition.",
    description:
      "Shiva's seven principles of spiritual and worldly success — drawn from the oldest layers of yogic tradition.",
    status: "coming-soon",
    lessons: 7,
    authorName: "Dada Sadananda",
    authorRole: "Senior teacher and founder of the DharmaDeha concept",
    whoFor: [],
    curriculum: [],
    order: 3,
  },
];

// ── Authors ───────────────────────────────────────────────────────────────────
const authors = [
  {
    _type: "author",
    name: "Dada Nityabodha",
    role: "Author of the Fundamental Philosophy course",
    initials: "DN",
    order: 1,
  },
  {
    _type: "author",
    name: "Dada Sadananda",
    role: "Senior teacher and founder of the DharmaDeha concept",
    initials: "DS",
    order: 2,
  },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqItems = [
  {
    _type: "faq",
    question: "How much time does it take per week?",
    answer:
      "One weekly meeting of about 80 minutes, plus 15–30 minutes of self-study before each session. Around 95–110 minutes in total.",
    order: 1,
  },
  {
    _type: "faq",
    question: "Is it free?",
    answer:
      "Yes, fully free. We operate on a voluntary basis. If DharmaDeha brings value to your life, you are welcome to support the project through a donation — but this is never required.",
    order: 2,
  },
  {
    _type: "faq",
    question: "What is the duration of a DharmaDeha?",
    answer:
      "One cycle of a DharmaDeha corresponds to one course — 7 or 10 sessions. After finishing, participants can continue with another course or take a break.",
    order: 3,
  },
  {
    _type: "faq",
    question: "What language are the meetings in?",
    answer:
      "English, Russian, Ukrainian, and Italian. When you apply, you choose your preferred language and are placed in a matching group.",
    order: 4,
  },
  {
    _type: "faq",
    question: "Do I need to be initiated in Ananda Marga?",
    answer:
      "No. Most participants are initiated, but DharmaDeha is open to anyone sincere on a spiritual path.",
    order: 5,
  },
  {
    _type: "faq",
    question: "What if I miss a meeting?",
    answer:
      "Life happens. Please let your mentor know in advance. You can catch up by reading the lesson material. Missing too many sessions may mean completing the course in the next cycle.",
    order: 6,
  },
  {
    _type: "faq",
    question: "Are DharmaDehas online or in person?",
    answer:
      "Most DharmaDehas meet online via Zoom. In some cities, in-person groups exist or are forming — ask when you apply.",
    order: 7,
  },
  {
    _type: "faq",
    question: "How do I join?",
    answer:
      "Click the 'Join a DharmaDeha' button, fill in a short form with your preferred language, course, and availability. We'll match you with a group within 1–2 weeks.",
    order: 8,
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  {
    _type: "testimonial",
    quote:
      "My DharmaDeha is the one place where my whole life makes sense — work, family, practice. All in one room.",
    name: "Maria",
    role: "Participant for 8 months",
    order: 1,
  },
  {
    _type: "testimonial",
    quote:
      "I came as a mentor thinking I'd give. I leave every meeting having received more.",
    name: "Andrei",
    role: "Mentor",
    order: 2,
  },
  {
    _type: "testimonial",
    quote:
      "I'd stopped meditating consistently before joining. Now I haven't missed a day in months.",
    name: "Anna",
    role: "Participant",
    order: 3,
  },
];

// ── Site Settings ─────────────────────────────────────────────────────────────
const siteSettings = {
  _type: "siteSettings",
  siteName: "DharmaDeha",
  footerTagline: "No one is left behind.",
  joinButtonText: "Join a DharmaDeha",
  contactEmail: "hello@dharmadeha.com",
};

// ── Seed ──────────────────────────────────────────────────────────────────────
async function seed() {
  console.log("🌱  Seeding Sanity project:", projectId);

  const transaction = client.transaction();

  transaction.createOrReplace({ ...hero, _id: "hero-main" });

  courses.forEach((course, i) => {
    transaction.createOrReplace({ ...course, _id: `course-${i + 1}` });
  });

  authors.forEach((author, i) => {
    transaction.createOrReplace({ ...author, _id: `author-${i + 1}` });
  });

  faqItems.forEach((item, i) => {
    transaction.createOrReplace({ ...item, _id: `faq-${i + 1}` });
  });

  testimonials.forEach((t, i) => {
    transaction.createOrReplace({ ...t, _id: `testimonial-${i + 1}` });
  });

  transaction.createOrReplace({ ...siteSettings, _id: "site-settings" });

  await transaction.commit();

  console.log("✅  Seeded:");
  console.log("   • 1 hero document");
  console.log("   • 3 courses");
  console.log("   • 2 authors");
  console.log("   • 8 FAQ items");
  console.log("   • 3 testimonials");
  console.log("   • 1 site settings document");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});
