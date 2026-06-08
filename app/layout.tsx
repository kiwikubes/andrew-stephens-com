import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andrew Stephens | Creative Digital Studio",
  description:
    "A clean white creative digital studio concept for andrew-stephens.com with drone video, photography, web design, and digital content."
};

export const viewport: Viewport = {
  themeColor: "#fbfaf6",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
