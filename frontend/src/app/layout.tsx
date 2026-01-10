import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { QueryProvider } from "@/providers/react-query";

import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Snap Docs",
  description: "Stop chasing clients for documents.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
