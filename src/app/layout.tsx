import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Sovereign Wealth Fund Map — $13.5T in State Capital",
  description: "Interactive visualization of sovereign wealth fund assets, strategic tech/defense investments, and cross-border acquisition patterns showing geopolitical leverage through capital.",
  openGraph: {
    title: "Global Sovereign Wealth Fund Map",
    description: "Track $13.5T+ in state-controlled capital shaping global power dynamics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
