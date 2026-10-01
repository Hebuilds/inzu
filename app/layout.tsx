import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";

import { MotionProvider } from "@/components/motion/motion-provider";

import "./globals.css";

// Stand-ins for Signifier and Söhne, the licensed faces named in doc/DESIGN.md.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.inzuconnect.com"),
  title: "Inzu Connect — Property management software for Africa",
  description:
    "The all-in-one platform for landlords, property managers and real estate companies across Africa. Rent collection, tenant management, maintenance workflows and analytics in one place.",
  openGraph: {
    title: "Inzu Connect — Manage properties smarter, not harder",
    description:
      "Rent collection, tenant management, maintenance workflows and analytics in one place, built for African real estate markets.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${newsreader.variable} ${inter.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
