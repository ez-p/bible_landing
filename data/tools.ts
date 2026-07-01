export type StudyTool = {
  href: string;
  icon: string;
  iconAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
};

export const studyTools: StudyTool[] = [
  {
    href: "https://bible-xplr.vercel.app/",
    icon: "/images/Bible_Explorer.png",
    iconAlt: "Word Study",
    eyebrow: "Original Languages",
    title: "Scripture Word Study",
    description:
      "Expound the meaning of a passage through its original Greek and Hebrew words.",
    cta: "Open the study →",
  },
  {
    href: "https://bible-xref2.vercel.app/",
    icon: "/images/bible-xref2.png",
    iconAlt: "Cross-Reference",
    eyebrow: "Context & Connections",
    title: "Cross-Reference Guide",
    description:
      "Generate contextual study guides that connect scripture to scripture.",
    cta: "Open the study →",
  },
];
