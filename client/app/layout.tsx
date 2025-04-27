import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Sometype_Mono } from "next/font/google";

const sometypeMono = Sometype_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Secure File Sharing Platform",
  description:
    "A secure file sharing platform with military-grade encryption (AES/RSA).",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={sometypeMono.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
