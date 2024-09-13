"use client";

import React from "react";
import { Montserrat } from "next/font/google";
// import Link from "next/link";
import Image from "next/image";
import Email from "@/public/Images/email.png";
// import backarrow2 from "@/public/Images/backarrow2.png";
import Headers from "@/components/headers";
import UseViewPortHeight from "@/utils/UseViewPortHeight";

const montserrat = Montserrat({
  subsets: ["latin"],
  //   weight: "600",
});
function Page() {
  UseViewPortHeight();
  return (
    <div
      className={`w-screen min-h-screen-vh h-full p-10 px-10 bg-[#EAEAEA] flex flex-col items-center gap-16 ${montserrat.className}  `}
    >
      <Headers text="Forgot Password" />

      <div className="flex flex-col items-center w-full justify-center gap-4 mt-4 ">
        <h2 className="text-center text-lg font-medium ">
          Let us find your Craveseat account
        </h2>
        <p className="text-center">
          Enter your email address below, your password reset link will be sent
          to your email
        </p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="p-3 px-7 w-full flex items-center gap-2 border rounded-2xl shadow-lg border-[#EC5934] ">
          <Image src={Email} alt="Email" />
          <input
            className=" rounded-lg bg-transparent outline-none w-full border-none "
            type="email"
            name="email   "
            placeholder="Email Address    "
            id="email "
          />
        </div>
        <button className="bg-[#EC5934] w-full text-white rounded-2xl px-5 py-4 mt-6 shadow-lg ">
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default Page;
