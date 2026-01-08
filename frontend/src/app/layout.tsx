import "./globals.css";
import type { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
