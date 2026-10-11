import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const title = `${profile.name} — ${profile.role}`;

// Vercel sets this to the live domain; link-preview images need an absolute address.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: profile.bio,
  openGraph: {
    title,
    description: profile.bio,
    type: "website",
    images: [{ url: "/victor.jpg", width: 934, height: 934, alt: profile.name }],
  },
  twitter: {
    card: "summary",
    title,
    description: profile.bio,
    images: ["/victor.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#09090a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} antialiased`}
    >
      <body className="grain min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}
