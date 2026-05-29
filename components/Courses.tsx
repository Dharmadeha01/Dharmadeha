"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FadeInView from "./FadeInView";
import type { SanityCourse } from "@/lib/sanity";
import { loc, locArray } from "@/lib/localize";

interface CourseData {
  title: string;
  shortDescription: string;
  description: string;
  author: string;
  authorRole: string;
  whoFor: string[];
  curriculum: string[];
}

const courseMeta = [
  {
    id: 1,
    lessons: 10,
    status: "active" as const,
    gradient: "linear-gradient(135deg, #2AA090 0%, #1a6a5a 100%)",
    cover: "/courses/fundamental-philosophy.png",
  },
  {
    id: 2,
    lessons: 10,
    status: "active" as const,
    gradient: "linear-gradient(135deg, #E87030 0%, #c45520 100%)",
    cover: "/courses/yama-niyama.png",
  },
  {
    id: 3,
    lessons: 7,
    status: "coming-soon" as const,
    gradient: "linear-gradient(135deg, #E8A840 0%, #c48020 100%)",
    cover: "/courses/seven-secrets.jpg",
  },
];

/** Map Sanity course _id to localised text keys */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCourseI18n(id: string, t: (k: any) => string) {
  const map: Record<string, { title: string; tagline: string; description: string }> = {
    'course-1': { title: t('course1Title'), tagline: t('course1Tagline'), description: t('course1Description') },
    'course-2': { title: t('course2Title'), tagline: t('course2Tagline'), description: t('course2Description') },
    'course-3': { title: t('course3Title'), tagline: t('course3Tagline'), description: t('course3Description') },
  }
  return map[id]
}

/** Map Sanity _id or slug to local fallback image */
function getLocalFallback(id: string, index: number): string {
  const idMap: Record<string, string> = {
    'course-fundamental-philosophy': '/courses/fundamental-philosophy.png',
    'course-yama-niyama': '/courses/yama-niyama.png',
    'course-seven-secrets': '/courses/seven-secrets.jpg',
  };
  if (idMap[id]) return idMap[id];
  return courseMeta[index]?.cover || '/courses/placeholder.jpg';
}

type Course = CourseData & {
  id: number;
  lessons: number;
  status: "active" | "coming-soon";
  gradient: string;
  cover?: string;
};

function CourseCard({
  course,
  onOpen,
  statusActive,
  statusComingSoon,
  lessonsLabel,
  viewCourse,
}: {
  course: Course;
  onOpen: (c: Course) => void;
  statusActive: string;
  statusComingSoon: string;
  lessonsLabel: string;
  viewCourse: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(26,48,40,0.12)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
      style={{ backgroundColor: "#fff", boxShadow: "0 1px 6px rgba(26,48,40,0.07)" }}
      onClick={() => onOpen(course)}
    >
      {/* Cover image */}
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '1rem 1rem 0 0', overflow: 'hidden', backgroundColor: '#1A3028', flexShrink: 0 }}>
        {course.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.cover}
            alt={course.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: course.gradient }} />
        )}
        <span
          className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full"
          style={
            course.status === "active"
              ? {
                  backgroundColor: "rgba(0,0,0,0.35)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.35)",
                  backdropFilter: "blur(4px)",
                }
              : {
                  backgroundColor: "rgba(232,168,64,0.25)",
                  color: "#fff8e0",
                  border: "1px solid rgba(232,168,64,0.5)",
                  backdropFilter: "blur(4px)",
                }
          }
        >
          {course.status === "active" ? statusActive : statusComingSoon}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex-1">
          <h3
            className="text-lg md:text-xl mb-2"
            style={{ fontFamily: "var(--font-dm-serif)", color: "#1A3028" }}
          >
            {course.title}
          </h3>
          <p
            className="text-sm leading-relaxed line-clamp-2"
            style={{ color: "rgba(26,48,40,0.65)" }}
          >
            {course.shortDescription}
          </p>
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xs" style={{ color: "rgba(26,48,40,0.45)" }}>
            {course.lessons} {lessonsLabel}
          </span>
          <span
            className="text-sm font-medium group-hover:underline group-hover:translate-x-1 inline-block transition-transform duration-200"
            style={{ color: "#E87030" }}
          >
            {viewCourse}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CourseModal({
  course,
  open,
  onClose,
  labels,
}: {
  course: Course | null;
  open: boolean;
  onClose: () => void;
  labels: {
    taughtBy: string;
    whoFor: string;
    curriculum: string;
    joinCta: string;
  };
}) {
  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="max-w-2xl p-0 overflow-hidden w-full"
        style={{
          backgroundColor: "#FAF5EC",
          maxHeight: "92dvh",
          overflowY: "auto",
        }}
      >
        {/* Cover image header */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '1rem 1rem 0 0', overflow: 'hidden', flexShrink: 0, backgroundColor: '#1A3028' }}>
          {course.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={course.cover}
              alt={course.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: course.gradient }} />
          )}
          {/* Visible close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.92)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              backdropFilter: 'blur(4px)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#fff')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.92)')}
          >
            <X size={14} style={{ color: '#1A3028' }} />
          </button>
        </div>

        <div className="px-6 md:px-8 pb-8 pt-4 md:pt-5">
          <DialogHeader className="mb-4">
            <DialogTitle
              className="text-xl md:text-2xl"
              style={{ fontFamily: "var(--font-dm-serif)", color: "#1A3028" }}
            >
              {course.title}
            </DialogTitle>
          </DialogHeader>

          {/* AUTHOR BLOCK */}
          <div
            className="mb-5 pb-5"
            style={{ borderBottom: "1px solid rgba(26,48,40,0.1)" }}
          >
            <p
              className="mb-2"
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#2AA090",
              }}
            >
              {labels.taughtBy}
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "20px",
                color: "#1A3028",
                lineHeight: 1.2,
              }}
            >
              {course.author}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(26,48,40,0.55)",
                marginTop: "2px",
              }}
            >
              {course.authorRole}
            </p>
          </div>

          <p
            className="leading-relaxed mb-6 text-sm md:text-base"
            style={{ color: "rgba(26,48,40,0.78)" }}
          >
            {course.description}
          </p>

          {course.whoFor.length > 0 && (
            <div className="mb-6">
              <p
                className="text-xs font-medium uppercase tracking-widest mb-3"
                style={{ color: "#2AA090" }}
              >
                {labels.whoFor}
              </p>
              <ul className="space-y-2">
                {course.whoFor.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-relaxed"
                    style={{ color: "rgba(26,48,40,0.78)" }}
                  >
                    <span style={{ color: "#2AA090", marginTop: 1 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {course.curriculum.length > 0 && (
            <div className="mb-6">
              <p
                className="text-xs font-medium uppercase tracking-widest mb-3"
                style={{ color: "#2AA090" }}
              >
                {labels.curriculum}
              </p>
              <ol className="space-y-2">
                {course.curriculum.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: "rgba(26,48,40,0.78)" }}
                  >
                    <span
                      className="font-medium w-5 shrink-0 tabular-nums"
                      style={{ color: "#E8A840" }}
                    >
                      {i + 1}.
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          )}

          <button
            className="block w-full text-center py-3.5 rounded-full font-medium text-white transition-colors cursor-pointer"
            style={{ backgroundColor: "#E87030" }}
            onClick={() => {
              onClose();
              window.dispatchEvent(new CustomEvent("open-apply-modal"));
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#d4612a")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#E87030")
            }
          >
            {labels.joinCta}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Courses({
  sanityData,
  locale = "en",
}: {
  sanityData?: SanityCourse[] | null;
  locale?: string;
}) {
  const t = useTranslations("Courses");
  const [selected, setSelected] = useState<Course | null>(null);
  const [open, setOpen] = useState(false);

  // Build course list: prefer Sanity data, fall back to translation files
  let courses: Course[];
  if (sanityData && sanityData.length > 0) {
    courses = sanityData.map((sc, i) => {
      // Locale-aware title/tagline/description — Sanity RU/UA first, then i18n fallback
      const i18n = getCourseI18n(sc._id, t);
      const title = loc(sc, 'title', locale) || i18n?.title || sc.title || '';
      const shortDescription = loc(sc, 'tagline', locale) || i18n?.tagline || sc.tagline || sc.description || '';
      const description = loc(sc, 'description', locale) || i18n?.description || sc.description || '';

      // Locale-aware whoFor array
      const rawWhoFor = locArray(sc, 'whoFor', locale);
      const whoFor = rawWhoFor.map((w) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof w === 'string' ? w : ((w as any).text ?? '')
      ).filter(Boolean);

      // Locale-aware curriculum array
      const rawCurriculum = locArray(sc, 'curriculum', locale);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const curriculum = rawCurriculum.map((c: any) => c.title ?? '').filter(Boolean);

      return {
        id: i + 1,
        gradient: courseMeta[i]?.gradient ?? "linear-gradient(135deg, #2AA090 0%, #1a6a5a 100%)",
        cover: sc.coverUrl || getLocalFallback(sc._id, i),
        title,
        shortDescription,
        description,
        author: sc.authorName ?? "",
        authorRole: sc.authorRole ?? "",
        whoFor,
        curriculum,
        lessons: sc.lessons ?? courseMeta[i]?.lessons ?? 0,
        status: (sc.status as "active" | "coming-soon") ?? courseMeta[i]?.status ?? "active",
      };
    });
  } else {
    const courseDataList = t.raw("list") as CourseData[];
    courses = courseMeta.map((meta, i) => ({
      ...meta,
      ...courseDataList[i],
    }));
  }

  const modalLabels = {
    taughtBy: t("taughtByLabel"),
    whoFor: t("whoForLabel"),
    curriculum: t("curriculumLabel"),
    joinCta: t("joinThisCourse"),
  };

  const handleOpen = (course: Course) => {
    setSelected(course);
    setOpen(true);
  };

  return (
    <section id="courses" style={{ backgroundColor: "#FEF3E8" }} className="py-7 md:py-10">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInView>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4 md:mb-5"
            style={{ color: "#2AA090" }}
          >
            {t("eyebrow")}
          </p>
          <h2 className="mb-5 md:mb-6">
            <span
              className="block"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(28px, 4.5vw, 52px)",
                color: "#1A3028",
                lineHeight: 1.1,
              }}
            >
              {t("headline1")}
            </span>
            <span
              className="block italic"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(28px, 4.5vw, 52px)",
                color: "#E87030",
                lineHeight: 1.1,
              }}
            >
              {t("headline2")}
            </span>
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mb-10 md:mb-14 max-w-2xl"
            style={{ color: "rgba(26,48,40,0.65)" }}
          >
            {t("body")}
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {courses.map((course, i) => (
            <FadeInView key={course.id} delay={i * 0.1} className="h-full">
              <CourseCard
                course={course}
                onOpen={handleOpen}
                statusActive={t("statusActive")}
                statusComingSoon={t("statusComingSoon")}
                lessonsLabel={t("lessonsSuffix")}
                viewCourse={t("viewCourse")}
              />
            </FadeInView>
          ))}
        </div>
      </div>

      <CourseModal
        course={selected}
        open={open}
        onClose={() => setOpen(false)}
        labels={modalLabels}
      />
    </section>
  );
}
