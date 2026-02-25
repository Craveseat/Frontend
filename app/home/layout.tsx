"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import UseViewPortHeight from "@/utils/UseViewPortHeight";
import { authServices } from "@/utils/api";
import { PageLoader } from "@/components/Loader";

const Layout = ({ children }: { children: any }) => {
  UseViewPortHeight();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!authServices.getAccessToken()) {
      router.replace("/signin");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return <PageLoader fullScreen={true} message="Getting Cravings..." />;
  }

  return (
    <div className=" min-h-screen-vh h-full bg-[#EAEAEA]  ">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
