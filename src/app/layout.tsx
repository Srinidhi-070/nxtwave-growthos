import type { Metadata } from "next";
import { Inter, VT323 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GrowthOS | AI Workshop",
  description: "Build Your First AI Project in 60 Minutes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${vt323.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-pixel text-[10px] sm:text-xs tracking-wider uppercase leading-relaxed">{children}</body>
    </html>
  );
}

