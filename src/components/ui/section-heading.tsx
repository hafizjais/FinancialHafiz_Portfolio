import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  children?: ReactNode;
  tone?: "light" | "dark";
};

export function SectionHeading({ id, title, children, tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <div className="max-w-xl">
      <h2
        id={id}
        className={`font-serif text-[1.85rem] leading-[1.15] font-bold tracking-tight text-balance sm:text-[2.4rem] ${dark ? "text-white" : "text-navy-950"}`}
      >
        {title}
      </h2>
      {children && (
        <div className={`mt-4 max-w-prose text-[1.0625rem] leading-relaxed ${dark ? "text-navy-100" : "text-navy-700"}`}>
          {children}
        </div>
      )}
    </div>
  );
}
