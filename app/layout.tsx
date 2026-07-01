import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paul's Bible Tools",
  description:
    "A collection of simple but powerful web tools to help you dig deep into scripture and rightly handle the Word of truth.",
  metadataBase: new URL("https://paulpowell.cc"),
  openGraph: {
    title: "Paul's Bible Tools",
    description:
      "A collection of simple but powerful web tools to help you dig deep into scripture and rightly handle the Word of truth.",
    url: "https://paulpowell.cc",
    siteName: "Paul's Bible Tools",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${ebGaramond.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
