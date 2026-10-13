import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({ id, eyebrow, title, children, align = "center", tone = "light" }: Props) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p
          className={`text-xs font-bold uppercase tracking-[0.18em] ${dark ? "text-gold-300" : "text-gold-700"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`mt-2 text-balance text-[1.75rem] leading-tight font-extrabold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-navy-950"}`}
      >
        {title}
      </h2>
      {children && (
        <div className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-navy-100" : "text-navy-700"}`}>
          {children}
        </div>
      )}
    </div>
  );
}
