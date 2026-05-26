"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FadeInView from "./FadeInView";

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
  },
  {
    id: 2,
    lessons: 10,
    status: "active" as const,
    gradient: "linear-gradient(135deg, #E87030 0%, #c45520 100%)",
  },
  {
    id: 3,
    lessons: 7,
    status: "coming-soon" as const,
    gradient: "linear-gradient(135deg, #E8A840 0%, #c48020 100%)",
  },
];

type Course = CourseData & {
  id: number;
  lessons: number;
  status: "active" | "coming-soon";
  gradient: string;
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
    <div
      className="rounded-2xl overflow-hidden cursor-pointer group transition-shadow hover:shadow-lg"
      style={{ backgroundColor: "#fff", boxShadow: "0 1px 6px rgba(26,48,40,0.07)" }}
      onClick={() => onOpen(course)}
    >
      {/* Gradient cover */}
      <div
        className="h-40 md:h-48 w-full flex items-end p-4 md:p-5"
        style={{ background: course.gradient }}
      >
        <span
          className="text-xs font-medium px-3 py-1 rounded-full"
          style={
            course.status === "active"
              ? {
                  backgroundColor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.35)",
                }
              : {
                  backgroundColor: "rgba(232,168,64,0.2)",
                  color: "#fff8e0",
                  border: "1px solid rgba(232,168,64,0.4)",
                }
          }
        >
          {course.status === "active" ? statusActive : statusComingSoon}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <h3
          className="text-lg md:text-xl mb-2"
          style={{ fontFamily: "var(--font-dm-serif)", color: "#1A3028" }}
        >
          {course.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: "rgba(26,48,40,0.65)" }}
        >
          {course.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "rgba(26,48,40,0.45)" }}>
            {course.lessons} {lessonsLabel}
          </span>
          <span
            className="text-sm font-medium group-hover:underline"
            style={{ color: "#E87030" }}
          >
            {viewCourse}
          </span>
        </div>
      </div>
    </div>
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
        {/* Gradient header */}
        <div
          className="h-28 md:h-36 w-full flex-shrink-0"
          style={{ background: course.gradient }}
        />

        <div className="px-6 md:px-8 pb-8 pt-4 md:pt-5">
          <DialogHeader className="mb-4">
            <DialogTitle
              className="text-xl md:text-2xl"
              style={{ fontFamily: "var(--font-dm-serif)", color: "#1A3028" }}
            >
              {course.title}
            </DialogTitle>
          </DialogHeader>

          {/* AUTHOR BLOCK — at top, above description */}
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

export default function Courses() {
  const t = useTranslations("Courses");
  const [selected, setSelected] = useState<Course | null>(null);
  const [open, setOpen] = useState(false);

  const courseDataList = t.raw("list") as CourseData[];
  const courses: Course[] = courseMeta.map((meta, i) => ({
    ...meta,
    ...courseDataList[i],
  }));

  const modalLabels = {
    taughtBy: t("modal.taughtBy"),
    whoFor: t("modal.whoFor"),
    curriculum: t("modal.curriculum"),
    joinCta: t("modal.joinCta"),
  };

  const handleOpen = (course: Course) => {
    setSelected(course);
    setOpen(true);
  };

  return (
    <section id="courses" style={{ backgroundColor: "#FEF3E8" }} className="py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInView>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4 md:mb-5"
            style={{ color: "#2AA090" }}
          >
            {t("eyebrow")}
          </p>
          <h2 className="mb-10 md:mb-16">
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
        </FadeInView>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {courses.map((course, i) => (
            <FadeInView key={course.id} delay={i * 0.1}>
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
