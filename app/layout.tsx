import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { SessionContext, SessionProvider } from "next-auth/react";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import { authOptions } from "@/utils/auth";
import AuthProvider from "@/utils/sessionProvider";
import { UserDetailsProvider } from "@/contexts/UserDetailsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CraveSeat",
  description: "Get your Cravings satisfied",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        <AuthProvider session={session}>
          <UserDetailsProvider>{children}</UserDetailsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
