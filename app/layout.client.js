// app/layout.client.js
"use client";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children, geistSans, geistMono }) {
  const pathname = usePathname();
  const isBackendPage = pathname.includes("backend");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!isBackendPage && <Header />}
        <div className="max-w-screen mx-auto overflow-hidden">{children}</div>
        {!isBackendPage && <Footer />}
      </body>
    </html>
  );
}
