import type { Metadata } from "next";
import "./globals.css";

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
