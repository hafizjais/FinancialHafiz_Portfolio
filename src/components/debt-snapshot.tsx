"use client";

import { useId, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Calculator, Lock, RotateCcw } from "lucide-react";
import { concerns } from "@/content/concerns";
import { track } from "@/lib/analytics";
import { formatPercent, formatRM, groupThousands, sanitizeAmount } from "@/lib/format";
import { openWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons/brand-icons";
import { buttonStyles } from "./ui/button-styles";
import { SectionHeading } from "./ui/section-heading";
import { WhatsAppLink } from "./whatsapp-link";

/*
 * PRIVACY: everything here lives in React state only. Nothing is written to storage, URLs of
 * this site, or analytics payloads. Inputs deliberately have no `name` and use autoComplete="off"
 * so browsers do not keep the figures in autofill history.
 */

const employmentOptions = [
  { value: "swasta", label: "Sektor swasta" },
  { value: "kerajaan", label: "Kerajaan" },
  { value: "sendiri", label: "Bekerja sendiri" },
  { value: "lain", label: "Lain-lain" },
] as const;

const reasonOptions = [
  ...concerns.map((c) => ({ value: c.id, label: c.label.replace(/\.$/, "") })),
  { value: "lain", label: "Lain-lain" },
];

const cardCountOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

type FormState = {
  employment: string;
  grossIncome: string;
  netIncome: string;
  cardCount: string;
  cardOutstanding: string;
  personalOutstanding: string;
  monthlyCommitment: string;
  reason: string;
};

type Field = keyof FormState;

const initialState: FormState = {
  employment: "",
  grossIncome: "",
  netIncome: "",
  cardCount: "",
  cardOutstanding: "",
  personalOutstanding: "",
  monthlyCommitment: "",
  reason: "",
};

const fieldOrder: Field[] = [
  "employment",
  "grossIncome",
  "netIncome",
  "cardCount",
  "cardOutstanding",
  "personalOutstanding",
  "monthlyCommitment",
  "reason",
];

function validate(state: FormState): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  const gross = Number(state.grossIncome);
  const net = Number(state.netIncome);

  if (!state.employment) errors.employment = "Sila pilih kategori pekerjaan.";
  if (!state.grossIncome || gross <= 0) errors.grossIncome = "Sila masukkan anggaran gaji kasar bulanan.";
  if (!state.netIncome || net <= 0) {
    errors.netIncome = "Sila masukkan anggaran gaji bersih bulanan.";
  } else if (gross > 0 && net > gross) {
    errors.netIncome = "Gaji bersih biasanya tidak melebihi gaji kasar. Sila semak semula.";
  }
  if (state.monthlyCommitment === "") {
    errors.monthlyCommitment = "Sila masukkan anggaran jumlah komitmen bulanan (masukkan 0 jika tiada).";
  }
  if (!state.reason) errors.reason = "Sila pilih sebab utama.";
  return errors;
}

function labelFor<T extends { value: string; label: string }>(options: readonly T[], value: string) {
  return options.find((o) => o.value === value)?.label ?? "";
}

function amountOrDash(value: string) {
  return value === "" ? "Tidak dinyatakan" : formatRM(Number(value));
}

function computeIndicators(state: FormState) {
  const gross = Number(state.grossIncome);
  const net = Number(state.netIncome);
  const commitment = Number(state.monthlyCommitment);
  const hasCommitment = state.monthlyCommitment !== "";
  return {
    ratio: hasCommitment && gross > 0 ? (commitment / gross) * 100 : null,
    remaining: hasCommitment && net > 0 ? net - commitment : null,
    totalOutstanding:
      state.cardOutstanding !== "" || state.personalOutstanding !== ""
        ? Number(state.cardOutstanding || 0) + Number(state.personalOutstanding || 0)
        : null,
  };
}

function formatSigned(value: number) {
  return value < 0 ? `-${formatRM(Math.abs(value))}` : formatRM(value);
}

function buildSummaryMessage(state: FormState): string {
  const { ratio } = computeIndicators(state);
  const lines = [
    "Hi Hafiz, saya berminat nak check debt consolidation. Ini ringkasan anggaran saya:",
    "",
    "*Debt Snapshot (anggaran)*",
    `• Pekerjaan: ${labelFor(employmentOptions, state.employment)}`,
    `• Gaji kasar bulanan: ${amountOrDash(state.grossIncome)}`,
    `• Gaji bersih bulanan: ${amountOrDash(state.netIncome)}`,
    `• Bilangan credit card: ${state.cardCount || "Tidak dinyatakan"}`,
    `• Baki credit card: ${amountOrDash(state.cardOutstanding)}`,
    `• Baki personal financing: ${amountOrDash(state.personalOutstanding)}`,
    `• Jumlah komitmen bulanan: ${amountOrDash(state.monthlyCommitment)}`,
  ];
  if (ratio !== null) lines.push(`• Anggaran nisbah komitmen (atas gaji kasar): ${formatPercent(ratio)}`);
  lines.push(`• Sebab utama: ${labelFor(reasonOptions, state.reason)}`, "", "Boleh bantu semak profile saya?");
  return lines.join("\n");
}

export function DebtSnapshot() {
  const [state, setState] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const startedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const baseId = useId();
  const fieldId = (field: Field) => `${baseId}-${field}`;

  const errors = validate(state);
  const errorCount = Object.keys(errors).length;
  const showError = (field: Field) => (submitted || touched[field] ? errors[field] : undefined);
  const indicators = computeIndicators(state);

  const update = (field: Field, value: string) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("debt_assessment_started");
    }
    setState((s) => ({ ...s, [field]: value }));
  };

  const markTouched = (field: Field) => setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (errorCount > 0) {
      const firstInvalid = fieldOrder.find((f) => errors[f]);
      if (firstInvalid) {
        const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`);
        el?.focus();
      }
      return;
    }
    track("debt_assessment_completed");
    track("whatsapp_cta_click", { location: "snapshot", message_type: "summary" });
    openWhatsApp(buildSummaryMessage(state));
  };

  const handleReset = () => {
    setState(initialState);
    setTouched({});
    setSubmitted(false);
  };

  return (
    <section id="snapshot" aria-labelledby="snapshot-title" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="snapshot-title" eyebrow="Pilihan · 2 minit" title="Debt Snapshot Ringkas">
          <p>
            Masukkan anggaran sahaja. Kami sediakan ringkasan yang boleh anda hantar terus ke WhatsApp —
            supaya perbincangan lebih cepat dan fokus.
          </p>
        </SectionHeading>

        <p className="mx-auto mt-5 flex max-w-2xl items-start gap-2 text-sm text-navy-700 sm:justify-center sm:text-center">
          <Lock className="mt-0.5 size-4 shrink-0 text-navy-500" aria-hidden="true" />
          <span>
            Dikira dalam pelayar anda sahaja — tidak disimpan atau dihantar ke mana-mana sehingga anda
            sendiri tekan butang WhatsApp. Jangan masukkan nombor IC, akaun bank atau kad.
          </span>
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          aria-describedby={`${baseId}-intro`}
          className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start"
        >
          <p id={`${baseId}-intro`} className="sr-only">
            Medan bertanda bintang wajib diisi. Semua angka adalah anggaran dalam Ringgit Malaysia.
          </p>

          <div className="rounded-3xl border border-navy-100 bg-white p-5 shadow-sm sm:p-7">
            <fieldset aria-describedby={showError("employment") ? `${fieldId("employment")}-error` : undefined}>
              <legend className="text-sm font-bold text-navy-950">
                Kategori pekerjaan <span className="text-gold-700" aria-hidden="true">*</span>
              </legend>
              <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {employmentOptions.map((opt, index) => {
                  const checked = state.employment === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 px-3 text-center text-sm font-semibold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy-700 ${
                        checked
                          ? "border-navy-700 bg-navy-800 text-white"
                          : "border-navy-100 bg-white text-navy-800 hover:border-navy-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${baseId}-employment`}
                        className="sr-only"
                        value={opt.value}
                        checked={checked}
                        onChange={() => update("employment", opt.value)}
                        onBlur={() => markTouched("employment")}
                        data-field={index === 0 ? "employment" : undefined}
                        required
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
              <FieldError id={`${fieldId("employment")}-error`} message={showError("employment")} />
            </fieldset>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <AmountField
                id={fieldId("grossIncome")}
                field="grossIncome"
                label="Anggaran gaji kasar bulanan"
                hint="Sebelum potongan KWSP, PERKESO, cukai."
                required
                value={state.grossIncome}
                error={showError("grossIncome")}
                onChange={(v) => update("grossIncome", v)}
                onBlur={() => markTouched("grossIncome")}
              />
              <AmountField
                id={fieldId("netIncome")}
                field="netIncome"
                label="Anggaran gaji bersih bulanan"
                hint="Jumlah yang masuk ke akaun bank."
                required
                value={state.netIncome}
                error={showError("netIncome")}
                onChange={(v) => update("netIncome", v)}
                onBlur={() => markTouched("netIncome")}
              />

              <div>
                <FieldLabel htmlFor={fieldId("cardCount")}>Bilangan credit card</FieldLabel>
                <select
                  id={fieldId("cardCount")}
                  data-field="cardCount"
                  value={state.cardCount}
                  onChange={(e) => update("cardCount", e.target.value)}
                  className={`mt-1.5 ${inputClass(false)}`}
                >
                  <option value="">Pilih</option>
                  {cardCountOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <AmountField
                id={fieldId("cardOutstanding")}
                field="cardOutstanding"
                label="Jumlah baki credit card"
                hint="Anggaran semua kad."
                value={state.cardOutstanding}
                onChange={(v) => update("cardOutstanding", v)}
              />
              <AmountField
                id={fieldId("personalOutstanding")}
                field="personalOutstanding"
                label="Jumlah baki personal financing"
                hint="Semua personal loan / financing."
                value={state.personalOutstanding}
                onChange={(v) => update("personalOutstanding", v)}
              />
              <AmountField
                id={fieldId("monthlyCommitment")}
                field="monthlyCommitment"
                label="Jumlah komitmen hutang bulanan"
                hint="Semua ansuran & bayaran hutang sebulan."
                required
                value={state.monthlyCommitment}
                error={showError("monthlyCommitment")}
                onChange={(v) => update("monthlyCommitment", v)}
                onBlur={() => markTouched("monthlyCommitment")}
              />
            </div>

            <div className="mt-5">
              <FieldLabel htmlFor={fieldId("reason")} required>
                Sebab utama mahu semak consolidation
              </FieldLabel>
              <select
                id={fieldId("reason")}
                data-field="reason"
                value={state.reason}
                onChange={(e) => update("reason", e.target.value)}
                onBlur={() => markTouched("reason")}
                aria-required="true"
                aria-invalid={Boolean(showError("reason"))}
                aria-describedby={showError("reason") ? `${fieldId("reason")}-error` : undefined}
                className={`mt-1.5 ${inputClass(Boolean(showError("reason")))}`}
              >
                <option value="">Pilih sebab utama</option>
                {reasonOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <FieldError id={`${fieldId("reason")}-error`} message={showError("reason")} />
            </div>
          </div>

          {/* Summary */}
          <aside
            aria-labelledby={`${baseId}-summary-title`}
            className="rounded-3xl bg-navy-900 p-5 text-white shadow-lg sm:p-7 lg:sticky lg:top-24"
          >
            <h3 id={`${baseId}-summary-title`} className="flex items-center gap-2 text-lg font-bold">
              <Calculator className="size-5 text-gold-300" aria-hidden="true" />
              Ringkasan anda
            </h3>

            <dl className="mt-4 divide-y divide-white/10 text-sm">
              <SummaryRow label="Pekerjaan" value={labelFor(employmentOptions, state.employment)} />
              <SummaryRow label="Gaji kasar" value={state.grossIncome && formatRM(Number(state.grossIncome))} />
              <SummaryRow label="Gaji bersih" value={state.netIncome && formatRM(Number(state.netIncome))} />
              <SummaryRow label="Credit card" value={state.cardCount && `${state.cardCount} kad`} />
              <SummaryRow
                label="Jumlah baki hutang"
                value={indicators.totalOutstanding !== null ? formatRM(indicators.totalOutstanding) : ""}
              />
              <SummaryRow
                label="Komitmen bulanan"
                value={state.monthlyCommitment && formatRM(Number(state.monthlyCommitment))}
              />
              <SummaryRow label="Sebab utama" value={labelFor(reasonOptions, state.reason)} />
            </dl>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/10 p-3.5 ring-1 ring-white/10">
                <p className="text-xs leading-snug text-navy-200">Anggaran nisbah komitmen*</p>
                <p className="mt-1 text-2xl font-extrabold tabular-nums" aria-live="polite">
                  {indicators.ratio !== null ? formatPercent(indicators.ratio) : "—"}
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3.5 ring-1 ring-white/10">
                <p className="text-xs leading-snug text-navy-200">Baki gaji bersih selepas komitmen**</p>
                <p className="mt-1 text-2xl font-extrabold tabular-nums" aria-live="polite">
                  {indicators.remaining !== null ? formatSigned(indicators.remaining) : "—"}
                </p>
              </div>
            </div>
            <div className="mt-3 space-y-1.5 text-xs leading-relaxed text-navy-200">
              <p>
                *Anggaran indikatif sahaja: jumlah komitmen bulanan ÷ <strong className="text-white">gaji kasar</strong>.
                Ini <strong className="text-white">bukan</strong> pengiraan DSR rasmi — setiap bank menggunakan kaedah,
                jenis pendapatan dan komitmen yang berbeza.
              </p>
              <p>
                **Gaji bersih − komitmen bulanan. Jika sebahagian ansuran sudah dipotong terus daripada gaji,
                angka ini mungkin berbeza.
              </p>
            </div>

            {submitted && errorCount > 0 && (
              <p role="alert" className="mt-5 rounded-xl bg-gold-100 px-3.5 py-2.5 text-sm font-semibold text-navy-950">
                Sila lengkapkan {errorCount} medan yang ditanda sebelum menghantar ringkasan.
              </p>
            )}

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row lg:flex-col">
              <button type="submit" className={buttonStyles("primary", "lg", "flex-1")}>
                <WhatsAppIcon className="size-5" />
                WhatsApp Ringkasan Saya
              </button>
              <button type="button" onClick={handleReset} className={buttonStyles("inverse", "lg", "flex-1")}>
                <RotateCcw className="size-4" aria-hidden="true" />
                Reset
              </button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-navy-200">
              Ringkasan ini tidak menentukan kelayakan atau kelulusan. Ia hanya membantu perbincangan awal.
            </p>
          </aside>
        </form>

        <p className="mt-8 text-center text-sm text-navy-700">
          Tak selesa kongsi angka?{" "}
          <WhatsAppLink
            location="snapshot"
            className="inline-flex min-h-11 items-center font-bold text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-4 hover:decoration-navy-900"
          >
            Terus WhatsApp Hafiz
          </WhatsAppLink>{" "}
          — itu pun okay.
        </p>
      </div>
    </section>
  );
}

function inputClass(invalid: boolean) {
  return `block min-h-12 w-full rounded-xl border-2 bg-white px-3.5 text-base text-navy-950 transition-colors focus:border-navy-700 focus:outline-none focus-visible:ring-3 focus-visible:ring-navy-200 ${
    invalid ? "border-red-500" : "border-navy-100 hover:border-navy-300"
  }`;
}

function FieldLabel({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-bold text-navy-950">
      {children}
      {required && (
        <span className="text-gold-700" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

type AmountFieldProps = {
  id: string;
  field: Field;
  label: string;
  hint?: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

function AmountField({ id, field, label, hint, required, value, error, onChange, onBlur }: AmountFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  // Number of digits before the caret, so it can be restored after thousands separators are re-applied.
  const caretDigits = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = inputRef.current;
    const target = caretDigits.current;
    caretDigits.current = null;
    if (!el || target === null || document.activeElement !== el) return;
    let pos = 0;
    for (let seen = 0; pos < el.value.length && seen < target; pos++) {
      if (/\d/.test(el.value[pos])) seen++;
    }
    el.setSelectionRange(pos, pos);
  }, [value]);

  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ");
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className="relative mt-1.5">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm font-bold text-navy-500"
        >
          RM
        </span>
        <input
          ref={inputRef}
          id={id}
          data-field={field}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="0"
          value={groupThousands(value)}
          onChange={(e) => {
            const el = e.target;
            const caret = el.selectionStart ?? el.value.length;
            caretDigits.current = el.value.slice(0, caret).replace(/\D/g, "").length;
            onChange(sanitizeAmount(el.value));
          }}
          onBlur={onBlur}
          aria-required={required || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          className={`${inputClass(Boolean(error))} pl-11 tabular-nums`}
        />
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-navy-600">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <dt className="text-navy-200">{label}</dt>
      <dd className="text-right font-semibold">{value || <span className="text-navy-400">—</span>}</dd>
    </div>
  );
}
