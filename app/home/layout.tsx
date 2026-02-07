"use client";
import React from "react";
import Footer from "@/components/footer";

import UseViewPortHeight from "@/utils/UseViewPortHeight";

import { redirect } from "next/navigation";
import { authServices } from "@/utils/api";

const Layout = ({ children }: { children: any }) => {
  UseViewPortHeight();

  if (!authServices.getAccessToken()) {
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
