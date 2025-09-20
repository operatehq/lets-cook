import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DevTools } from "@/components/dev-tools";
import { Header } from "@/components/header";
import { DatabaseProvider } from "@/components/database-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "Let's Cook › Recipe Manager",
    default: "Let's Cook › Recipe Manager",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <DatabaseProvider>
          <Header />
          {children}
          <DevTools />
        </DatabaseProvider>
      </body>
    </html>
  );
}
