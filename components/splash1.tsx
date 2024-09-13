"use client";
import React, { useEffect } from "react";
import { Nosifer, Pacifico } from "next/font/google";
import Image from "next/image";
import logo from "@/public/Images/logo.png";
import backarrow2 from "@/public/Images/backarrow2.png";
import { redirect } from "next/navigation";
import Link from "next/link";

const nosifer = Nosifer({
  subsets: ["latin"],
  weight: "400",
});
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

function Splash1() {
  //   useEffect(() => {
  //     setTimeout(() => {
  //       redirect("/welcome");
  //     }, 6000);
  //   }, []);

  return (
    <div className="splash h-full w-full px-10 pt-10 flex flex-col justify-center items-center gap-16  ">
      <div
        className={`flex flex-col justify-center items-center text-white text-[32px] ${nosifer.className} `}
      >
        <h1>WELCOME</h1>
        <h1>TO</h1>
        <h1>CRAVESEAT</h1>
      </div>
      <div>
        <Image src={logo} alt="craveseatLogo" />
      </div>
      <div
        className={` text-white text-[36px] flex items-center gap-4 mt-16 ${pacifico.className} `}
      >
        <p>Crave On!</p>

        <Link href={"/welcome"}>
          <Image
            className=" rotate-180 "
            src={backarrow2}
            width={32}
            height={32}
            alt="back"
          />
        </Link>
      </div>
    </div>
  );
}

export default Splash1;
