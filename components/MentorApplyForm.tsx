"use client";

import { useTranslations } from "next-intl";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface MentorFormState {
  name: string;
  email: string;
  phone: string;
  cityCountry: string;
  age: string;
  languages: string[];
  languageOther: string;
  hasInitiation: "yes" | "no" | "";
  acaryaName: string;
  hearAbout: string;
  expectations: string;
}

export type MentorFormErrors = Partial<Record<keyof MentorFormState, string>>;

export const EMPTY_MENTOR_FORM: MentorFormState = {
  name: "",
  email: "",
  phone: "",
  cityCountry: "",
  age: "",
  languages: [],
  languageOther: "",
  hasInitiation: "",
  acaryaName: "",
  hearAbout: "",
  expectations: "",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateMentorForm(form: MentorFormState, t: (k: any) => string): MentorFormErrors {
  const errors: MentorFormErrors = {};
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
  if (!form.hearAbout.trim()) errors.hearAbout = t("requiredError");
  if (!form.expectations.trim()) errors.expectations = t("requiredError");
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

export default function MentorApplyForm({
  form,
  errors,
  onChange,
  onClearError,
}: {
  form: MentorFormState;
  errors: MentorFormErrors;
  onChange: (f: MentorFormState) => void;
  onClearError: (key: keyof MentorFormState) => void;
}) {
  // Shared labels come from ApplyModal; mentor-specific from MentorApplyModal
  const tShared = useTranslations("ApplyModal");
  const tMentor = useTranslations("MentorApplyModal");

  const set = <K extends keyof MentorFormState>(key: K, val: MentorFormState[K]) => {
    onChange({ ...form, [key]: val });
    onClearError(key);
  };

  const toggleLanguage = (val: string) => {
    const arr = form.languages;
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
    onChange({ ...form, languages: next });
    onClearError("languages");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yesNoOptions = tShared.raw("yesNoOptions") as { value: string; label: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const langOptions = tShared.raw("languageSpeakOptions") as { value: string; label: string }[];

  return (
    <div className="space-y-4 mb-5">
      {/* Name */}
      <div>
        <label style={labelStyle}>{tShared("nameLabel")}</label>
        <input
          style={{ ...inputStyle, borderColor: errors.name ? "#c45520" : "rgba(26,48,40,0.18)" }}
          value={form.name}
          placeholder={tShared("namePlaceholder")}
          onChange={(e) => set("name", e.target.value)}
        />
        <FieldError msg={errors.name} />
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle}>{tShared("emailLabel")}</label>
        <input
          type="email"
          style={{ ...inputStyle, borderColor: errors.email ? "#c45520" : "rgba(26,48,40,0.18)" }}
          value={form.email}
          placeholder={tShared("emailPlaceholder")}
          onChange={(e) => set("email", e.target.value)}
        />
        <FieldError msg={errors.email} />
      </div>

      {/* Phone */}
      <div>
        <label style={labelStyle}>{tShared("phoneLabel")}</label>
        <input
          style={{ ...inputStyle, borderColor: errors.phone ? "#c45520" : "rgba(26,48,40,0.18)" }}
          value={form.phone}
          placeholder={tShared("phonePlaceholder")}
          onChange={(e) => set("phone", e.target.value)}
        />
        <FieldError msg={errors.phone} />
      </div>

      {/* City / Country + Age */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label style={labelStyle}>{tShared("cityCountryLabel")}</label>
          <input
            style={{ ...inputStyle, borderColor: errors.cityCountry ? "#c45520" : "rgba(26,48,40,0.18)" }}
            value={form.cityCountry}
            placeholder={tShared("cityCountryPlaceholder")}
            onChange={(e) => set("cityCountry", e.target.value)}
          />
          <FieldError msg={errors.cityCountry} />
        </div>
        <div>
          <label style={labelStyle}>{tShared("ageLabel")}</label>
          <input
            type="number"
            min="10"
            max="120"
            style={{ ...inputStyle, borderColor: errors.age ? "#c45520" : "rgba(26,48,40,0.18)" }}
            value={form.age}
            placeholder={tShared("agePlaceholder")}
            onChange={(e) => set("age", e.target.value)}
          />
          <FieldError msg={errors.age} />
        </div>
      </div>

      {/* Languages mentor can lead in */}
      <div>
        <label style={labelStyle}>{tMentor("languageLabel")}</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {langOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleLanguage(opt.value)}
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
            placeholder={tShared("languageOtherPlaceholder")}
            onChange={(e) => set("languageOther", e.target.value)}
          />
        )}
        <FieldError msg={errors.languageOther} />
      </div>

      {/* Has initiation */}
      <div>
        <label style={labelStyle}>{tShared("hasInitiationLabel")}</label>
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
          <label style={labelStyle}>{tShared("acaryaLabel")}</label>
          <input
            style={{ ...inputStyle, borderColor: errors.acaryaName ? "#c45520" : "rgba(26,48,40,0.18)" }}
            value={form.acaryaName}
            placeholder={tShared("acaryaPlaceholder")}
            onChange={(e) => set("acaryaName", e.target.value)}
          />
          <FieldError msg={errors.acaryaName} />
        </div>
      )}

      {/* How did you hear */}
      <div>
        <label style={labelStyle}>{tShared("hearAboutLabel")}</label>
        <input
          style={{ ...inputStyle, borderColor: errors.hearAbout ? "#c45520" : "rgba(26,48,40,0.18)" }}
          value={form.hearAbout}
          placeholder={tShared("hearAboutPlaceholder")}
          onChange={(e) => set("hearAbout", e.target.value)}
        />
        <FieldError msg={errors.hearAbout} />
      </div>

      {/* Motivation / Expectations */}
      <div>
        <label style={labelStyle}>{tMentor("expectationsLabel")}</label>
        <textarea
          rows={3}
          style={{ ...inputStyle, resize: "none", borderColor: errors.expectations ? "#c45520" : "rgba(26,48,40,0.18)" }}
          value={form.expectations}
          placeholder={tMentor("expectationsPlaceholder")}
          onChange={(e) => set("expectations", e.target.value)}
        />
        <FieldError msg={errors.expectations} />
      </div>
    </div>
  );
}
