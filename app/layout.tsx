import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/modules/Header";
import Footer from "@/modules/Footer";
import { CartProvider } from "@/context/CartContext";
import { LikeProvider } from "@/context/LikeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodLove",
  description: "FoodLove Restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning >
        <CartProvider>
          <LikeProvider>
            {children}
          </LikeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
