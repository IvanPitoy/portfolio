import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KIV — Video Editor Portfolio",
  description: "Crafting engaging videos through thoughtful editing, motion design, and visual storytelling for creators, brands, and businesses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Syne:wght@700;800&family=Anton&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}