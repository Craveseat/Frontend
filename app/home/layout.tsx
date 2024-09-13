"use client";
import React from "react";
import Footer from "@/components/footer";
import Link from "next/link";
import UseViewPortHeight from "@/utils/UseViewPortHeight";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: any }) => {
  UseViewPortHeight();
  const session = useSession();

  if (session.status === "unauthenticated") {
    redirect("/signin");
  }
  return (
    <div className=" min-h-screen-vh h-full pb-[70px]  ">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
