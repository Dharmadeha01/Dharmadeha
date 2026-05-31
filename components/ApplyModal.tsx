"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  APPLY_MODAL_EVENT,
  parseApplyModalType,
  type ApplicationType,
} from "@/lib/application";

interface FormState {
  name: string;
  email: string;
  language: string;
  course: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  language?: string;
  course?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const FIELD_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(26,48,40,0.18)",
  backgroundColor: "#fff",
  color: "#1A3028",
  fontSize: "14px",
  fontFamily: "var(--font-dm-sans)",
  outline: "none",
  transition: "border-color 0.15s",
};

const FIELD_ERROR_STYLE: React.CSSProperties = {
  ...FIELD_STYLE,
  border: "1px solid #E87030",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 500,
  color: "rgba(26,48,40,0.8)",
  marginBottom: "6px",
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  language: "",
  course: "",
  message: "",
};

export default function ApplyModal() {
  const tParticipant = useTranslations("ApplyModal");
  const tMentor = useTranslations("MentorApplyModal");
  const [open, setOpen] = useState(false);
  const [applicationType, setApplicationType] =
    useState<ApplicationType>("participant");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const isMentor = applicationType === "mentor";
  const t = isMentor ? tMentor : tParticipant;

  const languageOptions = t.raw("languageOptions") as {
    value: string;
    label: string;
  }[];
  const courseOptions = isMentor
    ? []
    : (tParticipant.raw("courseOptions") as { value: string; label: string }[]);

  useEffect(() => {
    const handler = (event: Event) => {
      setApplicationType(parseApplyModalType(event));
      setOpen(true);
      setStatus("idle");
      setForm(EMPTY_FORM);
      setErrors({});
    };
    window.addEventListener(APPLY_MODAL_EVENT, handler);
    return () => window.removeEventListener(APPLY_MODAL_EVENT, handler);
  }, []);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = t("requiredError");
    if (!form.email.trim()) {
      next.email = t("requiredError");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = t("emailError");
    }
    if (!form.language) next.language = t("requiredError");
    if (!isMentor && !form.course) next.course = t("requiredError");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationType,
          name: form.name,
          email: form.email,
          language: form.language,
          course: isMentor ? undefined : form.course,
          message: form.message,
        }),
      });
      const json = await res.json();
      setStatus(json.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && setOpen(false)}>
      <DialogContent
        className="max-w-lg w-full p-0 overflow-hidden"
        style={{
          backgroundColor: "#FAF5EC",
          maxHeight: "92dvh",
          overflowY: "auto",
        }}
        showCloseButton={false}
      >
        <div
          className="flex items-center justify-between px-6 md:px-8 pt-6 pb-4"
          style={{ borderBottom: "1px solid rgba(26,48,40,0.08)" }}
        >
          <DialogHeader>
            <DialogTitle
              className="text-xl md:text-2xl"
              style={{ fontFamily: "var(--font-dm-serif)", color: "#1A3028" }}
            >
              {t("title")}
            </DialogTitle>
          </DialogHeader>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: "rgba(26,48,40,0.5)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#1A3028")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(26,48,40,0.5)")}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 md:px-8 py-6">
          {status === "success" ? (
            <div className="py-6 text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "#EEF6F5" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#2AA090" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p
                className="text-xl mb-3"
                style={{ fontFamily: "var(--font-dm-serif)", color: "#1A3028" }}
              >
                {t("successTitle")}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(26,48,40,0.65)" }}
              >
                {t("successMessage")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label style={LABEL_STYLE}>{t("nameLabel")}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder={t("namePlaceholder")}
                  style={errors.name ? FIELD_ERROR_STYLE : FIELD_STYLE}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = "#2AA090";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = errors.name
                      ? "#E87030"
                      : "rgba(26,48,40,0.18)";
                  }}
                />
                {errors.name && (
                  <p className="mt-1 text-xs" style={{ color: "#E87030" }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label style={LABEL_STYLE}>{t("emailLabel")}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder={t("emailPlaceholder")}
                  style={errors.email ? FIELD_ERROR_STYLE : FIELD_STYLE}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = "#2AA090";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = errors.email
                      ? "#E87030"
                      : "rgba(26,48,40,0.18)";
                  }}
                />
                {errors.email && (
                  <p className="mt-1 text-xs" style={{ color: "#E87030" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div
                className={
                  isMentor
                    ? "mb-4"
                    : "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                }
              >
                <div>
                  <label style={LABEL_STYLE}>{t("languageLabel")}</label>
                  <select
                    value={form.language}
                    onChange={set("language")}
                    style={errors.language ? FIELD_ERROR_STYLE : FIELD_STYLE}
                    onFocus={(e) => {
                      (e.target as HTMLElement).style.borderColor = "#2AA090";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLElement).style.borderColor = errors.language
                        ? "#E87030"
                        : "rgba(26,48,40,0.18)";
                    }}
                  >
                    <option value="" disabled>
                      {t("languagePlaceholder")}
                    </option>
                    {languageOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.language && (
                    <p className="mt-1 text-xs" style={{ color: "#E87030" }}>
                      {errors.language}
                    </p>
                  )}
                </div>

                {!isMentor && (
                  <div>
                    <label style={LABEL_STYLE}>{tParticipant("courseLabel")}</label>
                    <select
                      value={form.course}
                      onChange={set("course")}
                      style={errors.course ? FIELD_ERROR_STYLE : FIELD_STYLE}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.borderColor = "#2AA090";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = errors.course
                          ? "#E87030"
                          : "rgba(26,48,40,0.18)";
                      }}
                    >
                      <option value="" disabled>
                        {tParticipant("coursePlaceholder")}
                      </option>
                      {courseOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.course && (
                      <p className="mt-1 text-xs" style={{ color: "#E87030" }}>
                        {errors.course}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label style={LABEL_STYLE}>
                  {t("messageLabel")}{" "}
                  <span style={{ fontWeight: 400, color: "rgba(26,48,40,0.45)" }}>
                    {t("messageLabelOptional")}
                  </span>
                </label>
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  placeholder={t("messagePlaceholder")}
                  rows={3}
                  style={{
                    ...FIELD_STYLE,
                    resize: "vertical",
                    minHeight: "80px",
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = "#2AA090";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = "rgba(26,48,40,0.18)";
                  }}
                />
              </div>

              {status === "error" && (
                <div
                  className="mb-4 px-4 py-3 rounded-xl text-sm"
                  style={{
                    backgroundColor: "rgba(232,112,48,0.08)",
                    border: "1px solid rgba(232,112,48,0.25)",
                    color: "#c45520",
                  }}
                >
                  {t("errorMessage")}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-full font-medium text-white transition-colors"
                style={{
                  backgroundColor: status === "loading" ? "rgba(232,112,48,0.6)" : "#E87030",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  fontSize: "15px",
                }}
                onMouseEnter={(e) => {
                  if (status !== "loading")
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#d4612a";
                }}
                onMouseLeave={(e) => {
                  if (status !== "loading")
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#E87030";
                }}
              >
                {status === "loading" ? t("submitting") : t("submitButton")}
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
