"use client";

import { useTranslations } from "next-intl";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ParticipantFormState {
  name: string;
  email: string;
  phone: string;
  cityCountry: string;
  age: string;
  languages: string[];
  languageOther: string;
  preferredMentor: string;
  hasInitiation: "yes" | "no" | "";
  acaryaName: string;
  courses: string[];
  futureTopics: string;
  hearAbout: string;
  expectations: string;
  interestedInMentor: "yes" | "no" | "";
}

export type ParticipantFormErrors = Partial<Record<keyof ParticipantFormState, string>>;

export const EMPTY_PARTICIPANT_FORM: ParticipantFormState = {
  name: "",
  email: "",
  phone: "",
  cityCountry: "",
  age: "",
  languages: [],
  languageOther: "",
  preferredMentor: "",
  hasInitiation: "",
  acaryaName: "",
  courses: [],
  futureTopics: "",
  hearAbout: "",
  expectations: "",
  interestedInMentor: "",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateParticipantForm(form: ParticipantFormState, t: (k: any) => string): ParticipantFormErrors {
  const errors: ParticipantFormErrors = {};
  if (!form.name.trim()) errors.name = t("requiredError");
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = t("emailError");
  if (!form.phone.trim()) errors.phone = t("requiredError");
  if (!form.cityCountry.trim()) errors.cityCountry = t("requiredError");
  if (!form.age.trim()) errors.age = t("requiredError");
  if (form.languages.length === 0) errors.languages = t("requiredError");
  if (form.languages.includes("Other") && !form.languageOther.trim())
    errors.languageOther = t("requiredError");
  if (!form.hasInitiation) errors.hasInitiation = t("requiredError");
  if (form.hasInitiation === "yes" && !form.acaryaName.trim())
    errors.acaryaName = t("requiredError");
  if (form.courses.length === 0) errors.courses = t("requiredError");
  if (!form.futureTopics.trim()) errors.futureTopics = t("requiredError");
  if (!form.hearAbout.trim()) errors.hearAbout = t("requiredError");
  if (!form.expectations.trim()) errors.expectations = t("requiredError");
  if (!form.interestedInMentor) errors.interestedInMentor = t("requiredError");
  return errors;
}

// ── Shared field styles ───────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(26,48,40,0.18)",
  backgroundColor: "#fff",
  color: "#1A3028",
  fontSize: "14px",
  outline: "none",
  fontFamily: "var(--font-dm-sans)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 500,
  color: "rgba(26,48,40,0.65)",
  marginBottom: "6px",
  fontFamily: "var(--font-dm-sans)",
};

const errorStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "#c45520",
  marginTop: "4px",
  fontFamily: "var(--font-dm-sans)",
};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p style={errorStyle}>{msg}</p>;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ParticipantApplyForm({
  form,
  errors,
  onChange,
  onClearError,
}: {
  form: ParticipantFormState;
  errors: ParticipantFormErrors;
  onChange: (f: ParticipantFormState) => void;
  onClearError: (key: keyof ParticipantFormState) => void;
}) {
  const t = useTranslations("ApplyModal");

  const set = <K extends keyof ParticipantFormState>(key: K, val: ParticipantFormState[K]) => {
    onChange({ ...form, [key]: val });
    onClearError(key);
  };

  const toggleMulti = (key: "languages" | "courses", val: string) => {
    const arr = form[key];
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
    onChange({ ...form, [key]: next });
    onClearError(key);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yesNoOptions = t.raw("yesNoOptions") as { value: string; label: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const langOptions = t.raw("languageSpeakOptions") as { value: string; label: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const courseOptions = t.raw("courseOptions") as { value: string; label: string }[];

  return (
    <div className="space-y-4 mb-5">
      {/* Name */}
      <div>
        <label style={labelStyle}>{t("nameLabel")}</label>
        <input
          style={{ ...inputStyle, borderColor: errors.name ? "#c45520" : "rgba(26,48,40,0.18)" }}
          value={form.name}
          placeholder={t("namePlaceholder")}
          onChange={(e) => set("name", e.target.value)}
        />
        <FieldError msg={errors.name} />
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle}>{t("emailLabel")}</label>
        <input
          type="email"
          style={{ ...inputStyle, borderColor: errors.email ? "#c45520" : "rgba(26,48,40,0.18)" }}
          value={form.email}
          placeholder={t("emailPlaceholder")}
          onChange={(e) => set("email", e.target.value)}
        />
        <FieldError msg={errors.email} />
      </div>

      {/* Phone */}
      <div>
        <label style={labelStyle}>{t("phoneLabel")}</label>
        <input
          style={{ ...inputStyle, borderColor: errors.phone ? "#c45520" : "rgba(26,48,40,0.18)" }}
          value={form.phone}
          placeholder={t("phonePlaceholder")}
          onChange={(e) => set("phone", e.target.value)}
        />
        <FieldError msg={errors.phone} />
      </div>

      {/* City / Country + Age — side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label style={labelStyle}>{t("cityCountryLabel")}</label>
          <input
            style={{ ...inputStyle, borderColor: errors.cityCountry ? "#c45520" : "rgba(26,48,40,0.18)" }}
            value={form.cityCountry}
            placeholder={t("cityCountryPlaceholder")}
            onChange={(e) => set("cityCountry", e.target.value)}
          />
          <FieldError msg={errors.cityCountry} />
        </div>
        <div>
          <label style={labelStyle}>{t("ageLabel")}</label>
          <input
            type="number"
            min="10"
            max="120"
            style={{ ...inputStyle, borderColor: errors.age ? "#c45520" : "rgba(26,48,40,0.18)" }}
            value={form.age}
            placeholder={t("agePlaceholder")}
            onChange={(e) => set("age", e.target.value)}
          />
          <FieldError msg={errors.age} />
        </div>
      </div>

      {/* Languages */}
      <div>
        <label style={labelStyle}>{t("languagesSpeakLabel")}</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {langOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleMulti("languages", opt.value)}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "13px",
                border: "1px solid",
                fontFamily: "var(--font-dm-sans)",
                cursor: "pointer",
                transition: "all 0.15s",
                backgroundColor: form.languages.includes(opt.value) ? "#1A3028" : "#fff",
                borderColor: form.languages.includes(opt.value) ? "#1A3028" : "rgba(26,48,40,0.2)",
                color: form.languages.includes(opt.value) ? "#FAF5EC" : "#1A3028",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <FieldError msg={errors.languages} />
        {form.languages.includes("Other") && (
          <input
            className="mt-2"
            style={{ ...inputStyle, borderColor: errors.languageOther ? "#c45520" : "rgba(26,48,40,0.18)" }}
            value={form.languageOther}
            placeholder={t("languageOtherPlaceholder")}
            onChange={(e) => set("languageOther", e.target.value)}
          />
        )}
        <FieldError msg={errors.languageOther} />
      </div>

      {/* Preferred mentor (optional) */}
      <div>
        <label style={labelStyle}>
          {t("preferredMentorLabel")}{" "}
          <span style={{ color: "rgba(26,48,40,0.4)", fontWeight: 400 }}>{t("optionalLabel")}</span>
        </label>
        <input
          style={inputStyle}
          value={form.preferredMentor}
          placeholder={t("preferredMentorPlaceholder")}
          onChange={(e) => set("preferredMentor", e.target.value)}
        />
      </div>

      {/* Has initiation */}
      <div>
        <label style={labelStyle}>{t("hasInitiationLabel")}</label>
        <div className="flex gap-3 mt-1">
          {yesNoOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set("hasInitiation", opt.value as "yes" | "no")}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "10px",
                fontSize: "14px",
                border: "1px solid",
                fontFamily: "var(--font-dm-sans)",
                cursor: "pointer",
                transition: "all 0.15s",
                backgroundColor: form.hasInitiation === opt.value ? "#1A3028" : "#fff",
                borderColor: form.hasInitiation === opt.value ? "#1A3028" : (errors.hasInitiation ? "#c45520" : "rgba(26,48,40,0.18)"),
                color: form.hasInitiation === opt.value ? "#FAF5EC" : "#1A3028",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <FieldError msg={errors.hasInitiation} />
      </div>

      {/* Acarya name (conditional) */}
      {form.hasInitiation === "yes" && (
        <div>
          <label style={labelStyle}>{t("acaryaLabel")}</label>
          <input
            style={{ ...inputStyle, borderColor: errors.acaryaName ? "#c45520" : "rgba(26,48,40,0.18)" }}
            value={form.acaryaName}
            placeholder={t("acaryaPlaceholder")}
            onChange={(e) => set("acaryaName", e.target.value)}
          />
          <FieldError msg={errors.acaryaName} />
        </div>
      )}

      {/* Course selection */}
      <div>
        <label style={labelStyle}>{t("courseLabel")}</label>
        <div className="flex flex-col gap-2 mt-1">
          {courseOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleMulti("courses", opt.value)}
              style={{
                padding: "9px 14px",
                borderRadius: "10px",
                fontSize: "13px",
                border: "1px solid",
                textAlign: "left",
                fontFamily: "var(--font-dm-sans)",
                cursor: "pointer",
                transition: "all 0.15s",
                backgroundColor: form.courses.includes(opt.value) ? "#1A3028" : "#fff",
                borderColor: form.courses.includes(opt.value) ? "#1A3028" : "rgba(26,48,40,0.18)",
                color: form.courses.includes(opt.value) ? "#FAF5EC" : "#1A3028",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <FieldError msg={errors.courses} />
      </div>

      {/* Future topics */}
      <div>
        <label style={labelStyle}>{t("futureTopicsLabel")}</label>
        <textarea
          rows={2}
          style={{ ...inputStyle, resize: "none", borderColor: errors.futureTopics ? "#c45520" : "rgba(26,48,40,0.18)" }}
          value={form.futureTopics}
          placeholder={t("futureTopicsPlaceholder")}
          onChange={(e) => set("futureTopics", e.target.value)}
        />
        <FieldError msg={errors.futureTopics} />
      </div>

      {/* How did you hear */}
      <div>
        <label style={labelStyle}>{t("hearAboutLabel")}</label>
        <input
          style={{ ...inputStyle, borderColor: errors.hearAbout ? "#c45520" : "rgba(26,48,40,0.18)" }}
          value={form.hearAbout}
          placeholder={t("hearAboutPlaceholder")}
          onChange={(e) => set("hearAbout", e.target.value)}
        />
        <FieldError msg={errors.hearAbout} />
      </div>

      {/* Expectations */}
      <div>
        <label style={labelStyle}>{t("expectationsLabel")}</label>
        <textarea
          rows={3}
          style={{ ...inputStyle, resize: "none", borderColor: errors.expectations ? "#c45520" : "rgba(26,48,40,0.18)" }}
          value={form.expectations}
          placeholder={t("expectationsPlaceholder")}
          onChange={(e) => set("expectations", e.target.value)}
        />
        <FieldError msg={errors.expectations} />
      </div>

      {/* Interested in becoming a mentor */}
      <div>
        <label style={labelStyle}>{t("interestedInMentorLabel")}</label>
        <div className="flex gap-3 mt-1">
          {yesNoOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set("interestedInMentor", opt.value as "yes" | "no")}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "10px",
                fontSize: "14px",
                border: "1px solid",
                fontFamily: "var(--font-dm-sans)",
                cursor: "pointer",
                transition: "all 0.15s",
                backgroundColor: form.interestedInMentor === opt.value ? "#1A3028" : "#fff",
                borderColor: form.interestedInMentor === opt.value ? "#1A3028" : (errors.interestedInMentor ? "#c45520" : "rgba(26,48,40,0.18)"),
                color: form.interestedInMentor === opt.value ? "#FAF5EC" : "#1A3028",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <FieldError msg={errors.interestedInMentor} />
      </div>
    </div>
  );
}
