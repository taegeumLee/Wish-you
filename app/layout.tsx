import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { AnimatePresence } from "framer-motion";

const metadata: Metadata = {
  title: "MinsTaegram",
  description: "MinsTaegram - Connect with people",
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} antialiased`}>
        <AuthProvider>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </AuthProvider>
      </body>
    </html>
  );
}
