import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter, Space_Grotesk } from "next/font/google";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:9002"),
  title: "DocuMind",
  description: "Yapay Zekâ Destekli Doküman Arama ve Özetleme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased",
          fontInter.variable,
          fontSpaceGrotesk.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
