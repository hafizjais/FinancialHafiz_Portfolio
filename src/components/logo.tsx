import { siteConfig } from "@/lib/site";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      className={`font-serif text-xl leading-none font-bold tracking-tight ${tone === "dark" ? "text-white" : "text-navy-950"}`}
    >
      {siteConfig.brand}
    </span>
  );
}
