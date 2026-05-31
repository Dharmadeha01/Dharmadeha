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
import ParticipantApplyForm, {
  EMPTY_PARTICIPANT_FORM,
  validateParticipantForm,
  type ParticipantFormErrors,
  type ParticipantFormState,
} from "@/components/ParticipantApplyForm";

interface MentorFormState {
  name: string;
  email: string;
  language: string;
  message: string;
}

interface MentorFormErrors {
  name?: string;
  email?: string;
  language?: string;
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

const EMPTY_MENTOR_FORM: MentorFormState = {
  name: "",
  email: "",
  language: "",
  message: "",
};

export default function ApplyModal() {
  const tParticipant = useTranslations("ApplyModal");
  const tMentor = useTranslations("MentorApplyModal");
  const [open, setOpen] = useState(false);
  const [applicationType, setApplicationType] =
    useState<ApplicationType>("participant");
  const [participantForm, setParticipantForm] = useState<ParticipantFormState>(
    EMPTY_PARTICIPANT_FORM
  );
  const [mentorForm, setMentorForm] = useState<MentorFormState>(EMPTY_MENTOR_FORM);
  const [participantErrors, setParticipantErrors] = useState<ParticipantFormErrors>({});
  const [mentorErrors, setMentorErrors] = useState<MentorFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const isMentor = applicationType === "mentor";
  const t = isMentor ? tMentor : tParticipant;

  const languageOptions = tMentor.raw("languageOptions") as {
    value: string;
    label: string;
  }[];

  useEffect(() => {
    const handler = (event: Event) => {
      setApplicationType(parseApplyModalType(event));
      setOpen(true);
      setStatus("idle");
      setParticipantForm(EMPTY_PARTICIPANT_FORM);
      setMentorForm(EMPTY_MENTOR_FORM);
      setParticipantErrors({});
      setMentorErrors({});
    };
    window.addEventListener(APPLY_MODAL_EVENT, handler);
    return () => window.removeEventListener(APPLY_MODAL_EVENT, handler);
  }, []);

  const validateMentor = (): boolean => {
    const next: MentorFormErrors = {};
    if (!mentorForm.name.trim()) next.name = tMentor("requiredError");
    if (!mentorForm.email.trim()) {
      next.email = tMentor("requiredError");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mentorForm.email)) {
      next.email = tMentor("emailError");
    }
    if (!mentorForm.language) next.language = tMentor("requiredError");
    setMentorErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isMentor) {
      if (!validateMentor()) return;
    } else {
      const next = validateParticipantForm(participantForm, tParticipant);
      setParticipantErrors(next);
      if (Object.keys(next).length > 0) return;
    }

    setStatus("loading");
    try {
      const body = isMentor
        ? {
            applicationType: "mentor" as const,
            name: mentorForm.name,
            email: mentorForm.email,
            language: mentorForm.language,
            message: mentorForm.message,
          }
        : {
            applicationType: "participant" as const,
            name: participantForm.name,
            email: participantForm.email,
            phone: participantForm.phone,
            cityCountry: participantForm.cityCountry,
            age: participantForm.age,
            languages: participantForm.languages,
            languageOther: participantForm.languageOther || undefined,
            preferredMentor: participantForm.preferredMentor || undefined,
            hasInitiation: participantForm.hasInitiation === "yes",
            acaryaName:
              participantForm.hasInitiation === "yes"
                ? participantForm.acaryaName
                : undefined,
            courses: participantForm.courses,
            futureTopics: participantForm.futureTopics,
            hearAbout: participantForm.hearAbout,
            expectations: participantForm.expectations,
            interestedInMentor: participantForm.interestedInMentor === "yes",
          };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setStatus(json.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const setMentor =
    (key: keyof MentorFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setMentorForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (mentorErrors[key as keyof MentorFormErrors]) {
        setMentorErrors((prev) => ({ ...prev, [key]: undefined }));
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
          maxWidth: isMentor ? undefined : "560px",
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
              {isMentor ? (
                <>
                  <div className="mb-4">
                    <label style={LABEL_STYLE}>{tMentor("nameLabel")}</label>
                    <input
                      type="text"
                      value={mentorForm.name}
                      onChange={setMentor("name")}
                      placeholder={tMentor("namePlaceholder")}
                      style={mentorErrors.name ? FIELD_ERROR_STYLE : FIELD_STYLE}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.borderColor = "#2AA090";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = mentorErrors.name
                          ? "#E87030"
                          : "rgba(26,48,40,0.18)";
                      }}
                    />
                    {mentorErrors.name && (
                      <p className="mt-1 text-xs" style={{ color: "#E87030" }}>
                        {mentorErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label style={LABEL_STYLE}>{tMentor("emailLabel")}</label>
                    <input
                      type="email"
                      value={mentorForm.email}
                      onChange={setMentor("email")}
                      placeholder={tMentor("emailPlaceholder")}
                      style={mentorErrors.email ? FIELD_ERROR_STYLE : FIELD_STYLE}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.borderColor = "#2AA090";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = mentorErrors.email
                          ? "#E87030"
                          : "rgba(26,48,40,0.18)";
                      }}
                    />
                    {mentorErrors.email && (
                      <p className="mt-1 text-xs" style={{ color: "#E87030" }}>
                        {mentorErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label style={LABEL_STYLE}>{tMentor("languageLabel")}</label>
                    <select
                      value={mentorForm.language}
                      onChange={setMentor("language")}
                      style={mentorErrors.language ? FIELD_ERROR_STYLE : FIELD_STYLE}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.borderColor = "#2AA090";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = mentorErrors.language
                          ? "#E87030"
                          : "rgba(26,48,40,0.18)";
                      }}
                    >
                      <option value="" disabled>
                        {tMentor("languagePlaceholder")}
                      </option>
                      {languageOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {mentorErrors.language && (
                      <p className="mt-1 text-xs" style={{ color: "#E87030" }}>
                        {mentorErrors.language}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label style={LABEL_STYLE}>
                      {tMentor("messageLabel")}{" "}
                      <span style={{ fontWeight: 400, color: "rgba(26,48,40,0.45)" }}>
                        {tMentor("messageLabelOptional")}
                      </span>
                    </label>
                    <textarea
                      value={mentorForm.message}
                      onChange={setMentor("message")}
                      placeholder={tMentor("messagePlaceholder")}
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
                </>
              ) : (
                <ParticipantApplyForm
                  form={participantForm}
                  errors={participantErrors}
                  onChange={setParticipantForm}
                  onClearError={(key) =>
                    setParticipantErrors((prev) => ({ ...prev, [key]: undefined }))
                  }
                />
              )}

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
