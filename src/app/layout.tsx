import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UIOverlay from "@/components/ui/UIOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: 'SmartPulse — Login',
  description: 'Access your SmartPulse account to transform data into smart decisions.',
  keywords: ['SmartPulse', 'login', 'analytics', 'DMI'],
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    title: 'SmartPulse',
    description: 'Transforming data into smart decisions.',
    images: ['/logo/smart-pulse.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-zinc-900 antialiased`}
      >
        {children}
        <UIOverlay />
      </body>
    </html>
  );
}
