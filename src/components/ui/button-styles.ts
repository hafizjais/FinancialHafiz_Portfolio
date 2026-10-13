type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-bold transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-gold-400 text-navy-950 hover:bg-gold-300 focus-visible:outline-navy-700",
  secondary:
    "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white focus-visible:outline-navy-700",
  inverse:
    "border-2 border-white/40 text-white hover:border-white hover:bg-white/10 focus-visible:outline-gold-300",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-13 px-6 text-base",
};

export function buttonStyles(variant: Variant = "primary", size: Size = "lg", extra = ""): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}
