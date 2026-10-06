import type { Metadata } from "next";

import "./globals.css";





export const metadata: Metadata = {
  title: "GrowthOS | AI Workshop",
  description: "Build Your First AI Project in 60 Minutes",
};

import { PlayerProvider } from '@/contexts/PlayerContext';
import { ClientMotionConfig } from '@/components/layout/ClientMotionConfig';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-void text-ink font-sans antialiased">
        <PlayerProvider>
          <ClientMotionConfig>
          {children}
                  </ClientMotionConfig>
        </PlayerProvider>
      </body>
    </html>
  );
}






