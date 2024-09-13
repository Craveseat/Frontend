import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { SessionContext, SessionProvider } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthProvider from "@/utils/sessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CraveSeat",
  description: "Get your Cravings satisfied",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
