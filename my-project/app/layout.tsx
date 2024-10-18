import type { Metadata } from "next";
import localFont from "next/font/local";
import AstroNav from "@/components/AstroNav";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Vedic Astrologer",
  description: "Get personalized astrological readings using AI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="relative min-h-screen">
            {/* Navigation bar with fixed positioning */}
            <div className="fixed top-0 left-0 right-0 z-50">
              <AstroNav />
            </div>
            
            {/* Main content */}
            <main className="relative">
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}