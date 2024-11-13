import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { AnimatePresence } from "framer-motion";

const metadata: Metadata = {
  title: "MinsTaegram",
  description: "MinsTaegram - Connect with people",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <AuthProvider>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </AuthProvider>
      </body>
    </html>
  );
}
