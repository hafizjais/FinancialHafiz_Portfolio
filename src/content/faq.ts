export type FaqItem = {
  id: string;
  question: string;
  /** Paragraphs. Keep answers factual, non-promissory and free of guarantees. */
  answer: string[];
  link?: { label: string; href: string };
};

export const faqItems: FaqItem[] = [
  {
    id: "what_is",
    question: "Apa itu debt consolidation?",
    answer: [
      "Debt consolidation ialah konsep menggabungkan hutang tertentu — contohnya baki credit card atau personal financing — ke dalam satu pembiayaan baharu, jika produk tersebut tersedia dan anda layak. Pembiayaan baharu digunakan untuk menyelesaikan hutang sedia ada, dan selepas itu anda membayar satu ansuran bulanan.",
      "Ia bukan penghapusan hutang. Jumlah yang perlu dibayar masih wujud, cuma struktur bayarannya berubah.",
    ],
  },
  {
    id: "who_can_check",
    question: "Siapa yang boleh membuat semakan?",
    answer: [
      "Sesiapa yang mahu memahami komitmen kewangan semasa boleh mulakan perbincangan. Ia biasanya relevan untuk mereka yang ada pendapatan tetap dan beberapa komitmen bulanan seperti credit card atau personal loan.",
      "Sama ada anda layak untuk sebarang pembiayaan bergantung kepada kriteria bank atau institusi pembiayaan — contohnya pendapatan, jenis pekerjaan, komitmen sedia ada dan rekod kredit.",
    ],
  },
  {
    id: "all_debts",
    question: "Adakah semua hutang boleh digabungkan?",
    answer: [
      "Tidak semestinya. Jenis hutang yang boleh dimasukkan bergantung kepada produk yang tersedia dan keputusan pihak pembiayaan.",
      "Hutang seperti pinjaman perumahan, pinjaman kereta atau PTPTN mempunyai struktur tersendiri dan tidak boleh dianggap automatik termasuk dalam consolidation. Setiap kes perlu disemak satu per satu.",
    ],
  },
  {
    id: "lower_monthly",
    question: "Adakah debt consolidation menjamin bayaran bulanan lebih rendah?",
    answer: [
      "Tidak. Ansuran bulanan bergantung kepada kadar faedah/keuntungan, tempoh bayaran, fi dan amaun yang diselesaikan.",
      "Ansuran yang lebih rendah kadangkala datang daripada tempoh bayaran yang lebih panjang — dan ini boleh menyebabkan jumlah kos keseluruhan menjadi lebih tinggi. Sebab itu jumlah bayaran keseluruhan perlu dibandingkan, bukan ansuran bulanan sahaja.",
    ],
  },
  {
    id: "ctos_ccris",
    question: "Boleh ke semak kalau ada CTOS atau rekod CCRIS kurang baik?",
    answer: [
      "Boleh berbincang. Namun rekod kredit adalah antara faktor penting dalam penilaian pihak pembiayaan, jadi pilihan yang ada mungkin lebih terhad dan tiada jaminan kelulusan.",
      "Langkah pertama yang baik ialah memahami laporan kredit anda sendiri. Anda boleh mendapatkan laporan CCRIS anda melalui Bank Negara Malaysia.",
    ],
  },
  {
    id: "arrears",
    question: "Kalau ada tunggakan, apa pilihan yang mungkin ada?",
    answer: [
      "Situasi tunggakan perlu dinilai dengan teliti. Mengambil pembiayaan baharu bukan semestinya penyelesaian yang sesuai, dan permohonan juga mungkin sukar diluluskan.",
      "Pilihan yang mungkin ada termasuk berbincang terus dengan bank anda tentang penstrukturan atau penjadualan semula bayaran, atau mendapatkan khidmat kaunseling daripada AKPK (Agensi Kaunseling dan Pengurusan Kredit). Saya boleh bantu anda fahami situasi dan saluran yang mungkin sesuai.",
    ],
    link: { label: "Laman rasmi AKPK", href: "https://www.akpk.org.my/" },
  },
  {
    id: "check_not_approval",
    question: "Adakah semakan bermaksud permohonan sudah diluluskan?",
    answer: [
      "Tidak. Semakan awal hanyalah untuk memahami situasi dan pilihan yang mungkin ada.",
      "Kelulusan pembiayaan adalah keputusan bank atau institusi pembiayaan selepas permohonan rasmi, semakan dokumen dan penilaian kredit mereka.",
    ],
  },
  {
    id: "info_needed",
    question: "Apa maklumat yang perlu saya sediakan?",
    answer: [
      "Untuk perbincangan awal, anggaran sudah memadai: pendapatan bulanan, senarai komitmen, baki tertunggak dan ansuran bulanan.",
      "Jika anda memilih untuk teruskan, dokumen biasa termasuk slip gaji, penyata bank dan penyata credit card — senarai sebenar bergantung kepada pihak pembiayaan. Jangan sesekali kongsi kata laluan, PIN, TAC/OTP atau nombor kad penuh dengan sesiapa.",
    ],
  },
  {
    id: "no_obligation",
    question: "Adakah saya perlu terus mengambil pembiayaan baharu?",
    answer: [
      "Tidak. Tiada kewajipan untuk memohon apa-apa. Anda boleh bertanya, fahami pilihan dan buat keputusan sendiri.",
      "Dalam sesetengah situasi, pembiayaan baharu mungkin bukan pilihan terbaik — contohnya menyusun bajet atau keutamaan bayaran mungkin lebih sesuai.",
    ],
  },
  {
    id: "akpk_dmp",
    question: "Bagaimana jika saya sedang mengikuti program pengurusan hutang AKPK?",
    answer: [
      "Jika anda sedang mengikuti program pengurusan hutang AKPK, bincang dahulu dengan AKPK sebelum mempertimbangkan sebarang pembiayaan baharu, kerana program tersebut mempunyai syarat dan pelan bayaran tersendiri.",
      "Saya tidak akan menggalakkan anda mengambil hutang baharu atau keluar daripada program tanpa penilaian yang sewajarnya.",
    ],
    link: { label: "Laman rasmi AKPK", href: "https://www.akpk.org.my/" },
  },
];
