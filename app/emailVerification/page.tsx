"use client";

import React from "react";
import { Montserrat } from "next/font/google";
// import Image from "next/image";
// import Email from "@/public/Images/email.png";
// import backarrow2 from "@/public/Images/backarrow2.png";
import Headers from "@/components/headers";
import UseViewPortHeight from "@/utils/UseViewPortHeight";

const montserrat = Montserrat({
  subsets: ["latin"],
  //   weight: "600",
});
const Page = () => {
  UseViewPortHeight();
  return (
    <div
      className={`w-screen min-h-screen-vh h-full p-10 px-10 bg-[#EAEAEA] flex flex-col items-center pt-20  gap-16 ${montserrat.className}  `}
    >
      <Headers text="Verification" />

      <div>
        <h1>Email Verification</h1>
        <p>Enter the OTP code sent to craveseat@email.com</p>

        <p>Enter the code below</p>

        <div>{/* figure out how to do code text box */}</div>
      </div>
    </div>
  );
};

export default Page;
