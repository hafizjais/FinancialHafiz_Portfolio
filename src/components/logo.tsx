import { siteConfig } from "@/lib/site";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-xl bg-navy-900 text-sm font-extrabold tracking-tight text-gold-300 ring-1 ring-gold-400/40"
      >
        FH
      </span>
      <span
        className={`text-[1.05rem] font-extrabold tracking-tight ${tone === "dark" ? "text-white" : "text-navy-950"}`}
      >
        {siteConfig.brand}
      </span>
    </span>
  );
}
