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
import MentorApplyForm, {
  EMPTY_MENTOR_FORM,
  validateMentorForm,
  type MentorFormErrors,
  type MentorFormState,
} from "@/components/MentorApplyForm";

type SubmitStatus = "idle" | "loading" | "success" | "error";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isMentor) {
      const next = validateMentorForm(mentorForm, tMentor);
      setMentorErrors(next);
      if (Object.keys(next).length > 0) return;
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
            phone: mentorForm.phone,
            cityCountry: mentorForm.cityCountry,
            age: mentorForm.age,
            languages: mentorForm.languages,
            languageOther: mentorForm.languageOther || undefined,
            hasInitiation: mentorForm.hasInitiation === "yes",
            acaryaName:
              mentorForm.hasInitiation === "yes" ? mentorForm.acaryaName : undefined,
            hearAbout: mentorForm.hearAbout,
            expectations: mentorForm.expectations,
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

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && setOpen(false)}>
      <DialogContent
        className="max-w-lg w-full p-0 overflow-hidden"
        style={{
          backgroundColor: "#FAF5EC",
          maxHeight: "92dvh",
          overflowY: "auto",
          maxWidth: "560px",
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
                <MentorApplyForm
                  form={mentorForm}
                  errors={mentorErrors}
                  onChange={setMentorForm}
                  onClearError={(key) =>
                    setMentorErrors((prev) => ({ ...prev, [key]: undefined }))
                  }
                />
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
