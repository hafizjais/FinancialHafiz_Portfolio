export type Concern = {
  id: string;
  label: string;
  /** Phrase used inside the prefilled WhatsApp message. */
  messagePhrase: string;
};

export const concerns: Concern[] = [
  {
    id: "credit_cards",
    label: "Saya ada banyak credit card.",
    messagePhrase: "ada banyak credit card",
  },
  {
    id: "personal_loans",
    label: "Saya mempunyai beberapa personal loan.",
    messagePhrase: "ada beberapa personal loan",
  },
  {
    id: "high_commitment",
    label: "Monthly commitment terlalu tinggi.",
    messagePhrase: "monthly commitment terlalu tinggi",
  },
  {
    id: "tight_cashflow",
    label: "Cashflow semakin ketat.",
    messagePhrase: "cashflow semakin ketat",
  },
  {
    id: "dsr_home",
    label: "Saya nak semak DSR sebelum membeli rumah.",
    messagePhrase: "nak semak DSR sebelum beli rumah",
  },
  {
    id: "restructure",
    label: "Saya nak faham pilihan untuk menyusun semula hutang.",
    messagePhrase: "nak faham pilihan untuk susun semula hutang",
  },
];

export function concernMessage(selectedIds: string[]): string {
  const phrases = concerns.filter((c) => selectedIds.includes(c.id)).map((c) => c.messagePhrase);
  if (phrases.length === 0) {
    return "Hi Hafiz, saya berminat nak check debt consolidation. Boleh bantu semak profile saya?";
  }
  return `Hi Hafiz, saya berminat nak check debt consolidation. Situasi saya: ${phrases.join("; ")}. Boleh bantu semak profile saya?`;
}
