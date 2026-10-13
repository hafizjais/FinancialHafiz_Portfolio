type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-400 text-navy-950 shadow-[0_8px_20px_-8px_rgba(232,174,12,0.8)] hover:bg-gold-300 focus-visible:outline-navy-700",
  secondary:
    "border-2 border-navy-200 bg-white text-navy-900 hover:border-navy-400 hover:bg-navy-50 focus-visible:outline-navy-700",
  inverse:
    "border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 focus-visible:outline-gold-300",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-6 text-base",
};

export function buttonStyles(variant: Variant = "primary", size: Size = "lg", extra = ""): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}
