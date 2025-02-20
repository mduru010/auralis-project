/* eslint no-use-before-define: 0 */  // --> OFF

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar"; // Adjust path if needed

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auralis - AI Storytelling",
  description: "Immerse yourself in AI-generated short stories.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="bg-dark p-4 text-center text-sm text-gold">
          © {new Date().getFullYear()} Auralis - AI Storytelling Platform
        </footer>
      </body>
    </html>
  );
}
