"use client";
import React from "react";
import Image from "next/image";
import logo from "@/public/Images/logo.png";
import bottomImg from "@/public/Images/bottomImg.png";
import facebook from "@/public/Images/facebook.png";
import insta from "@/public/Images/insta.png";
import x from "@/public/Images/x.png";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import UseViewPortHeight from "@/utils/UseViewPortHeight";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "600",
});
function Page() {
  UseViewPortHeight();
  return (
    <div
      className={`bg-[#EAEAEA] h-screen-vh w-screen flex items-center justify-center relative ${montserrat.className} `}
    >
      <div className="flex flex-col gap-7 items-center justify-center">
        <div>
          <Image
            src={logo}
            priority={true}
            placeholder="blur"
            width={200}
            height={200}
            alt="craveseatLogo"
          />
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-4">
          <Link
            className="text-white bg-[#EC5934] rounded-xl px-20 border border-[#EC5934] h-[50px] flex items-center justify-center text-center  text-xl  "
            href="/signin"
          >
            {" "}
            Sign in
          </Link>
          <Link
            className="text-[#EC5934] bg-transparent border border-[#EC5934] rounded-xl px-20 h-[50px] flex items-center justify-center text-center text-xl "
            href="/signup"
          >
            {" "}
            Sign up
          </Link>
          <div className="flex flex-col justify-center items-center mt-3 gap-3">
            <p>or follow us on </p>
            <div className="flex gap-4 items-center">
              <Image src={x} alt="xlogo" />
              <Image src={facebook} alt="facebooklogo" />
              <Image src={insta} alt="instalogo" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 ">
        <Image src={bottomImg} width={100} alt="craveseatLogo" />
      </div>
    </div>
  );
}

export default Page;
