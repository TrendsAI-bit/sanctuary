import type { Metadata } from "next";
import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400","600","700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "The Sanctuary",
  description: "A quiet place for spirit and light.",
  openGraph: {
    title: "The Sanctuary",
    description: "A quiet place for spirit and light.",
  },
  twitter: { card: "summary_large_image", title: "The Sanctuary", description: "A quiet place for spirit and light." }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-sanctuary text-ink antialiased">{children}</body>
    </html>
  );
}
