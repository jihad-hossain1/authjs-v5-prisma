import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header/Header";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Toaster from '@/components/Toaster'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>

          <SessionProvider session={session}>
            <Header />
            <section>{children}</section>

            <Toaster position="top-center"
              reverseOrder={false}
              gutter={8}
              toastOptions={{
                className: '',
                duration: 5000,
                style: {
                  background: '#fff',
                  color: '#000000',
                },
                success: {
                  duration: 3000,
                },
              }} />
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
