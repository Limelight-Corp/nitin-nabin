import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"]
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"]
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#21130D",
};

export const metadata: Metadata = {
  title: "Nitin Nabin | National President, Bharatiya Janata Party",
  description: "Official public record and leadership documentation of Nitin Nabin, National President of the Bharatiya Janata Party and Member of the Bihar Legislative Assembly.",
  keywords: ["Nitin Nabin", "BJP National President", "Bankipur", "Bihar BJP", "Bharatiya Janata Party", "Nitin Nabin Bihar"],
  authors: [{ name: "Office of Nitin Nabin" }],
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body className="antialiased selection:bg-[#E87518] selection:text-black">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
