import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PerformancePolyfills from "./components/PerformancePolyfills";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Internship Fair 2026 - MPSTME TRC",
  description: "Mukesh Patel School of Technology Management's Technical and Research Cell present Internship Fair 2026.",
  icons: {
    icon: "/trclogosvg.svg",
    shortcut: "/trclogosvg.svg",
    apple: "/trclogosvg.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col pt-32 selection:bg-gradient-brand/30 selection:text-red-200`}>
        <PerformancePolyfills />
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
