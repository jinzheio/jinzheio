import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Newsreader,
  Spline_Sans,
} from "next/font/google";
import "./globals.css";

const display = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const sans = Spline_Sans({
  variable: "--font-spline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "jinzhe.io — Projects & Philosophy",
  description:
    "Personal project landing pages + long-form philosophical discussions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
