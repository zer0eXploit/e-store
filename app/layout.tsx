import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";

import ReactQueryProvider from "@/lib/react-query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "An e-commerce application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen bg-gray-50">{children}</main>
            <Toaster />
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
